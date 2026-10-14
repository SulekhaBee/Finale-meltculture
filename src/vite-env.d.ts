/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAZORPAY_KEY_ID?: string
  readonly VITE_RAZORPAY_ORDER_ENDPOINT?: string
  readonly VITE_RAZORPAY_VERIFY_ENDPOINT?: string
  readonly VITE_WHATSAPP_SUPPORT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
