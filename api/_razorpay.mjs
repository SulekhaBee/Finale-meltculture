import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"

const PRODUCT_PRICES = new Map([
  [1, 509],
  [2, 499],
  [3, 399],
  [4, 499],
  [5, 499],
  [6, 529],
  [7, 2499],
  [9, 499],
  [10, 450],
  [11, 459],
  [12, 599],
  [20, 899],
  [21, 799],
  [22, 599],
  [23, 699],
  [24, 799],
  [25, 1699],
  [26, 1699],
  [27, 899],
  [28, 899],
  [101, 450],
  [102, 450],
  [103, 529],
  [104, 499],
  [105, 450],
  [106, 499],
  [107, 529],
  [110, 229],
  [111, 309],
  [112, 599],
  [113, 499],
])

const PACKAGING_PRICES = { kraft: 0, aqua: 99, black: 149 }
const LARGE_ITEM_IDS = new Set([20, 21, 22, 23, 24, 25, 26, 27, 28, 110])

export function json(response, status, body) {
  response.status(status).json(body)
}

export function allowPost(request, response) {
  if (request.method === "POST") return true
  response.setHeader("Allow", "POST")
  json(response, 405, { error: "Method not allowed" })
  return false
}

export function requireServerConfig() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  const tokenSecret = process.env.ORDER_TOKEN_SECRET
  if (!keyId || !keySecret || !tokenSecret) {
    throw new Error("Razorpay server environment is incomplete")
  }
  return { keyId, keySecret, tokenSecret }
}

export function calculateOrder(body) {
  if (!Array.isArray(body?.items) || body.items.length === 0) {
    throw new Error("The gift bag is empty")
  }

  let itemCount = 0
  let merchandise = 0
  let hasLargeItem = false
  const items = body.items.map((item) => {
    const id = Number(item.id)
    const quantity = Number(item.quantity)
    const price = PRODUCT_PRICES.get(id)
    if (!price || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error("The gift bag contains an invalid item")
    }
    itemCount += quantity
    merchandise += price * quantity
    hasLargeItem ||= LARGE_ITEM_IDS.has(id)
    return { id, quantity, unitPrice: price }
  })
  if (itemCount > 50) throw new Error("The gift bag exceeds the item limit")

  const packaging = String(body.packaging)
  const packagingPrice = PACKAGING_PRICES[packaging]
  if (packagingPrice === undefined) throw new Error("Invalid packaging option")

  const giftWrap = body.giftWrap === true
  const deliveryFee = hasLargeItem || itemCount >= 2 ? 169 : 89
  const deliveryDiscount = merchandise >= 1200 ? deliveryFee : 0
  const amount =
    merchandise +
    packagingPrice +
    (giftWrap ? 49 : 0) +
    deliveryFee -
    deliveryDiscount

  const delivery = body.delivery ?? {}
  for (const field of ["email", "mobile", "fullName", "address", "pin", "city", "state"]) {
    if (typeof delivery[field] !== "string" || !delivery[field].trim()) {
      throw new Error("Delivery details are incomplete")
    }
  }
  if (!/^\d{6}$/.test(delivery.pin) || !/^\d{10}$/.test(delivery.mobile)) {
    throw new Error("Delivery contact details are invalid")
  }

  return {
    amount,
    deliveryDiscount,
    deliveryFee,
    giftWrap,
    items,
    message: String(body.message ?? "").slice(0, 120),
    packaging,
    packagingPrice,
    delivery: Object.fromEntries(
      Object.entries(delivery).map(([key, value]) => [
        key,
        String(value).trim().slice(0, key === "address" ? 300 : 100),
      ]),
    ),
  }
}

export function createOrderToken(payload, secret) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url")
  return `${encoded}.${sign(encoded, secret)}`
}

export function readOrderToken(token, secret) {
  const [encoded, suppliedSignature] = String(token).split(".")
  if (!encoded || !suppliedSignature || !safeEqual(sign(encoded, secret), suppliedSignature)) {
    throw new Error("Invalid order token")
  }
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"))
  if (Date.now() - payload.createdAt > 30 * 60 * 1000) {
    throw new Error("Order token expired")
  }
  return payload
}

export function verifyCheckoutSignature(orderId, paymentId, signature, secret) {
  return safeEqual(sign(`${orderId}|${paymentId}`, secret), String(signature))
}

export async function razorpayRequest(path, keyId, keySecret, options = {}) {
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result?.error?.description ?? "Razorpay request failed")
  }
  return result
}

export function createReference() {
  return `MC-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`
}

function sign(value, secret) {
  return createHmac("sha256", secret).update(value).digest("hex")
}

function safeEqual(expected, supplied) {
  const left = Buffer.from(expected)
  const right = Buffer.from(supplied)
  return left.length === right.length && timingSafeEqual(left, right)
}
