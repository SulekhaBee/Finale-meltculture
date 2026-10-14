import {
  allowPost,
  json,
  razorpayRequest,
  readOrderToken,
  requireServerConfig,
  verifyCheckoutSignature,
} from "./_razorpay.mjs"

export default async function handler(request, response) {
  if (!allowPost(request, response)) return

  try {
    const { keyId, keySecret, tokenSecret } = requireServerConfig()
    const {
      orderToken,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = request.body ?? {}
    const order = readOrderToken(orderToken, tokenSecret)
    if (
      order.razorpayOrderId !== razorpayOrderId ||
      !verifyCheckoutSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        keySecret,
      )
    ) {
      throw new Error("Payment signature did not match")
    }

    let payment = await razorpayRequest(
      `/payments/${encodeURIComponent(razorpayPaymentId)}`,
      keyId,
      keySecret,
    )
    if (
      payment.order_id !== razorpayOrderId ||
      payment.amount !== order.amount * 100
    ) {
      throw new Error("Payment did not match the order")
    }
    if (payment.status === "authorized") {
      payment = await razorpayRequest(
        `/payments/${encodeURIComponent(razorpayPaymentId)}/capture`,
        keyId,
        keySecret,
        {
          method: "POST",
          body: JSON.stringify({
            amount: order.amount * 100,
            currency: "INR",
          }),
        },
      )
    }
    if (payment.status !== "captured") {
      throw new Error("Payment is not captured")
    }

    if (process.env.ZAPIER_ORDER_WEBHOOK_URL) {
      const webhookResponse = await fetch(process.env.ZAPIER_ORDER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: order.amount,
          customer: order.delivery,
          eventType: "order.paid",
          giftWrap: order.giftWrap,
          items: order.items,
          message: order.message,
          orderId: order.reference,
          packaging: order.packaging,
          paymentId: razorpayPaymentId,
          razorpayOrderId,
          source: "melt-culture-storefront",
        }),
      })
      if (!webhookResponse.ok) {
        console.error("Order webhook failed", webhookResponse.status)
      }
    }

    json(response, 200, { reference: order.reference, verified: true })
  } catch (error) {
    console.error("Razorpay payment verification failed", error)
    json(response, 400, { error: "Payment could not be verified", verified: false })
  }
}
