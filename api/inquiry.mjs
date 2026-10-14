import { allowPost, json } from "./_razorpay.mjs"

const ALLOWED_SOURCES = new Set([
  "melt-culture-storefront",
  "melt-culture-bulk-gifting",
])

export default async function handler(request, response) {
  if (!allowPost(request, response)) return

  try {
    const webhookUrl = process.env.ZAPIER_INQUIRY_WEBHOOK_URL
    if (!webhookUrl) throw new Error("Inquiry webhook is not configured")

    const body = request.body ?? {}
    if (!ALLOWED_SOURCES.has(body.source)) {
      throw new Error("Invalid inquiry source")
    }

    const name = clean(body.name, 100)
    const email = clean(body.email, 150)
    const mobile = clean(body.mobile, 20)
    if (!name || !email || !mobile) {
      throw new Error("Required inquiry fields are missing")
    }

    const payload = {
      budget: clean(body.budget, 100),
      company: clean(body.company, 150),
      email,
      eventType:
        body.source === "melt-culture-bulk-gifting"
          ? "inquiry.bulk-gifting"
          : "inquiry.support",
      message: clean(body.message, 1000),
      mobile,
      name,
      occasion: clean(body.occasion, 150),
      orderId: clean(body.orderId, 100),
      quantity: clean(body.quantity, 50),
      receivedAt: new Date().toISOString(),
      source: body.source,
      timeline: clean(body.timeline, 100),
    }
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!webhookResponse.ok) {
      throw new Error(`Zapier returned ${webhookResponse.status}`)
    }

    json(response, 200, { received: true })
  } catch (error) {
    console.error("Inquiry submission failed", error)
    json(response, 503, {
      error: "The inquiry could not be delivered",
      received: false,
    })
  }
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}
