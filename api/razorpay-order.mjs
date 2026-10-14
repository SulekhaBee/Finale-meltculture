import {
  allowPost,
  calculateOrder,
  createOrderToken,
  createReference,
  json,
  razorpayRequest,
  requireServerConfig,
} from "./_razorpay.mjs"

export default async function handler(request, response) {
  if (!allowPost(request, response)) return

  try {
    const { keyId, keySecret, tokenSecret } = requireServerConfig()
    const calculated = calculateOrder(request.body)
    const reference = createReference()
    const order = await razorpayRequest("/orders", keyId, keySecret, {
      method: "POST",
      body: JSON.stringify({
        amount: calculated.amount * 100,
        currency: "INR",
        receipt: reference,
        notes: { storefront: "melt-culture" },
      }),
    })
    const orderToken = createOrderToken(
      {
        ...calculated,
        createdAt: Date.now(),
        razorpayOrderId: order.id,
        reference,
      },
      tokenSecret,
    )

    json(response, 200, {
      amount: order.amount,
      currency: order.currency,
      id: order.id,
      orderToken,
      reference,
    })
  } catch (error) {
    console.error("Razorpay order creation failed", error)
    json(response, 400, { error: "Could not create a secure payment order" })
  }
}
