# Razorpay production setup

The storefront creates payment orders and verifies/captures payments through the
Node-compatible serverless routes in `api/`. The browser never receives the key
secret and cannot choose the payable amount: `api/_razorpay.mjs` recalculates
prices, packaging, gift wrap, and delivery from the authoritative price table.

## 1. Rotate the exposed credentials

The credentials previously pasted into chat and shown in an uploaded screenshot
must be considered compromised. Regenerate the live key in Razorpay before
deployment. Do not reuse either exposed secret.

## 2. Configure environment variables

Copy the names from `.env.example` into the deployment platform:

- Browser/build: `VITE_RAZORPAY_KEY_ID`,
  `VITE_RAZORPAY_ORDER_ENDPOINT`, and `VITE_RAZORPAY_VERIFY_ENDPOINT`.
- Server only: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and a long random
  `ORDER_TOKEN_SECRET`.
- Optional: `ZAPIER_ORDER_WEBHOOK_URL` receives verified order data only after
  Razorpay confirms and captures payment.
- `ZAPIER_INQUIRY_WEBHOOK_URL` receives support and bulk-gifting forms through
  the private `/api/inquiry` relay. The Zapier URL is never exposed in browser
  JavaScript.

Never prefix a secret with `VITE_`; Vite exposes every such value in browser
JavaScript.

The default endpoint paths in `.env.example` match Vercel's `api/` routing. On
another host, deploy both handlers as Node serverless functions and set the two
public endpoint variables to their HTTPS URLs. Restrict CORS at the platform or
function gateway to `https://www.meltculture.com`.

The endpoint variables already default to their same-origin `/api/` paths, so
they may be omitted on Vercel. `VITE_RAZORPAY_KEY_ID` is still required because
Razorpay Checkout needs the public key ID in the browser.

## 3. Razorpay dashboard

Enable automatic capture if desired. The verification route also captures an
authorized payment, so the order is confirmed only when Razorpay reports
`captured`.

Use Razorpay test keys first and complete these cases before switching to a newly
rotated live key:

1. Successful card/UPI payment shows a dynamic `MC-…` order reference.
2. Failed or dismissed payment does not show confirmation.
3. A changed amount or product price in the browser is rejected/recalculated by
   the server.
4. A replayed or altered signature is rejected.
5. The optional Zapier webhook receives Order ID, Customer, Amount, and payment
   IDs after verification.

For durable fulfilment, configure the webhook destination to store orders
idempotently using `razorpayOrderId` as the unique key.

## 4. Inquiry notifications

Set `ZAPIER_INQUIRY_WEBHOOK_URL` to the Catch Hook URL for the Zap that should
receive both support and bulk-gifting submissions. When one shared Catch Hook is
used for orders and inquiries, set both webhook variables to the same URL and
branch on `eventType`: `order.paid`, `inquiry.support`, or
`inquiry.bulk-gifting`.

To receive a notification on your phone, add an action after the webhook:

1. Use **Filter by Zapier** to require a non-empty `mobile` and `name`.
2. Choose your notification channel: WhatsApp Business provider, SMS by Zapier,
   Twilio, or the Zapier mobile app.
3. Send the notification to your private owner number and include `source`,
   `name`, `mobile`, `email`, and `message`.

The owner phone number belongs in the selected Zapier action, not in this
repository or in a public Vite environment variable.
