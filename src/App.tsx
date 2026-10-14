import {
  FormEvent,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

const BrandMoodboard = lazy(() => import("./BrandMoodboard"))

type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  line: string
  tag?: string
  imageFit?: "cover" | "contain"
  dimensions?: {
    length: number
    breadth: number
    height: number
  }
  relatedIds: number[]
  mediaGallery?: string[]
}

type DeliveryDetails = {
  email: string
  mobile: string
  fullName: string
  address: string
  pin: string
  city: string
  state: string
}

const halloweenProducts: Product[] = [
  {
    id: 11,
    name: "Kaddu Ki Kasam — Pumpkin Cup",
    category: "Halloween special",
    price: 459,
    image: "/products/single-orange-pumpkin-cup-front.jpg",
    line: "One bright sculpted pumpkin in a creamy glass cup—tiny, dramatic, and ready for October.",
    tag: "Minimal edition",
    relatedIds: [12, 1, 5],
    mediaGallery: [
      "/products/single-orange-pumpkin-cup-front.jpg",
      "/products/single-orange-pumpkin-cup-top.jpg",
    ],
  },
  {
    id: 12,
    name: "Golden Pumpkin Pair with Green Leaves",
    category: "Halloween special",
    price: 599,
    image: "/products/golden-pumpkin-pair-with-green-leaves-front.jpg",
    line: "A golden pumpkin pair with sculpted green leaves in a softly glowing glass bowl.",
    relatedIds: [11, 5, 9],
    mediaGallery: [
      "/products/golden-pumpkin-pair-with-green-leaves-front.jpg",
      "/products/golden-pumpkin-pair-with-green-leaves-top.jpg",
    ],
  },
  {
    id: 1,
    name: "Pastel Skull, Jack-o’-Lantern and Witch Hat",
    category: "Halloween special",
    price: 509,
    image:
      "/products/pastel-skull-jack-o-lantern-and-witch-hat-front.jpg",
    line: "A pastel skull, jack-o’-lantern, and witch hat gathered for a playful little haunting.",
    tag: "Limited drop",
    dimensions: { length: 6, breadth: 6, height: 5 },
    relatedIds: [10, 11, 5],
    mediaGallery: [
      "/products/pastel-skull-jack-o-lantern-and-witch-hat-front.jpg",
      "/products/pastel-skull-jack-o-lantern-and-witch-hat-top.jpg",
    ],
  },
  {
    id: 10,
    name: "Pastel Halloween Assortment",
    category: "Halloween special",
    price: 450,
    image: "/products/pastel-halloween-assortment-front.jpg",
    line: "Pastel skulls, spiders, coffins, and sculpted details make a softly spooky centrepiece.",
    tag: "Detailed pour",
    relatedIds: [1, 5, 9],
    mediaGallery: [
      "/products/pastel-halloween-assortment-front.jpg",
      "/products/pastel-halloween-assortment-top.jpg",
    ],
  },
  {
    id: 5,
    name: "Olive and Orange Pumpkins with Autumn Leaves",
    category: "Halloween special",
    price: 499,
    image:
      "/products/olive-and-orange-pumpkins-with-autumn-leaves-front.jpg",
    line: "Olive and orange pumpkins with autumn leaves, poured for warm October tables.",
    tag: "Autumn favourite",
    relatedIds: [9, 12, 10],
    mediaGallery: [
      "/products/olive-and-orange-pumpkins-with-autumn-leaves-front.jpg",
      "/products/olive-and-orange-pumpkins-with-autumn-leaves-top.jpg",
    ],
  },
  {
    id: 9,
    name: "Orange Pumpkin Duo with Maple Leaves",
    category: "Halloween special",
    price: 499,
    image: "/products/orange-pumpkin-duo-with-maple-leaves-front.jpg",
    line: "An orange pumpkin duo with maple leaves and a warm amber pour that glows past midnight.",
    relatedIds: [5, 12, 1],
    mediaGallery: [
      "/products/orange-pumpkin-duo-with-maple-leaves-front.jpg",
      "/products/orange-pumpkin-duo-with-maple-leaves-top.jpg",
    ],
  },
]

const botanicalProducts: Product[] = [
  {
    id: 4,
    name: "Evergreen Reverie — Succulent Bowl",
    category: "Succulent candle",
    price: 499,
    image: "/products/lemongrass-succulent-bowl-front.jpg",
    line: "A tiny wax garden with the clean, uplifting spirit of lemongrass.",
    tag: "Bestseller",
    dimensions: { length: 10, breadth: 10, height: 10 },
    relatedIds: [6, 103, 104],
    mediaGallery: [
      "/products/lemongrass-succulent-bowl-front.jpg",
      "/products/lemongrass-succulent-bowl-top.jpg",
    ],
  },
  {
    id: 6,
    name: "Cotton Candy — Succulent Trio",
    category: "Succulent candle",
    price: 529,
    image: "/products/pastel-succulent-trio-front.jpg",
    line: "A pastel wax garden, hand-poured in our soy wax and beeswax blend.",
    relatedIds: [4, 101, 103],
    mediaGallery: [
      "/products/pastel-succulent-trio-front.jpg",
      "/products/pastel-succulent-trio-top.jpg",
    ],
  },
  {
    id: 101,
    name: "Always Blue — Aquaria",
    category: "Floral succulent candle",
    price: 450,
    image: "/products/blue-and-blush-echeveria-front.jpg",
    line: "Blue sculpted succulents in an artisan, clean-burning ivory pour.",
    tag: "Gift favourite",
    relatedIds: [6, 102, 104],
    mediaGallery: [
      "/products/blue-and-blush-echeveria-front.jpg",
      "/products/blue-and-blush-echeveria-top.jpg",
    ],
  },
  {
    id: 102,
    name: "Pinky Promise — Rosette Bowl",
    category: "Floral candle bowl",
    price: 450,
    image: "/products/lilac-rosette-bowl-front.jpg",
    line: "Pink rosettes and blue succulents, hand-finished over a lilac wax bowl.",
    relatedIds: [101, 103, 104],
    mediaGallery: [
      "/products/lilac-rosette-bowl-front.jpg",
      "/products/lilac-rosette-bowl-top.jpg",
    ],
  },
  {
    id: 103,
    name: "Soft Launch — Spring Garden",
    category: "Succulent candle",
    price: 529,
    image: "/products/spring-succulent-garden-front.png",
    line: "Sculpted lotus leaves and succulents set in a creamy soy-beeswax blend.",
    relatedIds: [4, 6, 104],
    mediaGallery: [
      "/products/spring-succulent-garden-front.png",
      "/products/spring-succulent-garden-top.jpg",
    ],
  },
  {
    id: 104,
    name: "Just Chill — Forest Bowl",
    category: "Botanical candle",
    price: 499,
    image: "/products/forest-succulent-bowl-front.jpg",
    line: "Deep forest succulents in a toxin-free fragrance and clean layered pour.",
    tag: "New",
    relatedIds: [4, 102, 103],
    mediaGallery: [
      "/products/forest-succulent-bowl-front.jpg",
      "/products/forest-succulent-bowl-top.jpg",
    ],
  },
]

// Keep these edits data-driven so the succulent and floral stories can evolve independently.
const succulentProducts = botanicalProducts.filter((product) =>
  [4, 6, 103, 104].includes(product.id),
)
const floralProducts = botanicalProducts.filter((product) =>
  [101, 102].includes(product.id),
)

const products = [...halloweenProducts, ...botanicalProducts]

const catalogClassics: Product[] = [
  {
    id: 2,
    name: "Blueberry Bliss — Berry Bowl",
    category: "Dessert-inspired candle",
    price: 499,
    image: "/products/neeli-aankhen-blueberry-bowl.png",
    line: "Deep-blue sculpted berries over a bold blueberry layer and a clean ivory wax base.",
    tag: "Bestseller",
    relatedIds: [106, 107, 105],
  },
  {
    id: 105,
    name: "Jalebi Ki Badi Behen — Imarti Bowl",
    category: "Dessert-inspired candle",
    price: 450,
    image: "/products/jalebi-ki-badi-behen-imarti-bowl.png",
    line: "A sculpted orange Imarti over a clean ivory wax layer, finished with delicate silver-leaf detail.",
    tag: "New",
    relatedIds: [106, 112, 111],
  },
  {
    id: 106,
    name: "Lal Pari — Raspberry Bowl",
    category: "Dessert-inspired candle",
    price: 499,
    image: "/products/lal-pari-raspberry-bowl.png",
    line: "A generous bowl of hand-sculpted red raspberries over distinct red and ivory wax layers.",
    tag: "Berry edit",
    relatedIds: [107, 105, 113],
  },
  {
    id: 107,
    name: "Do Me? Do You. — Mixed Berry Bowl",
    category: "Dessert-inspired candle",
    price: 529,
    image: "/products/do-me-do-you-mixed-berry-bowl.png",
    line: "Red raspberries and deep-blue berries arranged over a berry-toned and ivory layered pour.",
    relatedIds: [106, 113, 112],
  },
  {
    id: 112,
    name: "Imarti Behen, Kaju Ke Saath — White Chocolate Bowl",
    category: "Dessert-inspired candle",
    price: 599,
    image:
      "/products/imarti-behen-kaju-ke-saath-white-chocolate-bowl.png",
    line: "A glossy orange Imarti form with kaju katli-inspired white-chocolate wax pieces and hand-applied silver leaf.",
    relatedIds: [105, 111, 110],
  },
  {
    id: 113,
    name: "Bade Miyan Chote Miyan — Gulab Jamun Bowl",
    category: "Dessert-inspired candle",
    price: 499,
    image: "/products/bade-miyan-chote-miyan-gulab-jamun-bowl.png",
    line: "A silver-leaf Gulab Jamun duo set into a warm syrup-toned pour over a distinct ivory wax layer.",
    tag: "Mithai edit",
    relatedIds: [107, 106, 110],
  },
  {
    id: 110,
    name: "Not Your Cup of Tea — Biscuit Cup",
    category: "Dessert-inspired candle",
    price: 229,
    image: "/products/not-your-cup-of-tea-biscuit-cup.png",
    line: "A caramel-toned biscuit candle in a labelled glass cup, styled as a playful teatime illusion.",
    tag: "Set of two · ₹309",
    relatedIds: [112, 113, 111],
  },
  {
    id: 111,
    name: "Zero Sugar — Dessert Wax Gift Box",
    category: "Dessert-inspired gift set",
    price: 309,
    image: "/products/zero-sugar-dessert-wax-gift-box.png",
    line: "A gift-ready assortment of sculpted mithai-inspired wax pieces with silver-leaf finishing.",
    tag: "Gift set",
    relatedIds: [105, 112, 110],
  },
  {
    id: 3,
    name: "Tapri Wali Shaam — Chai Candle",
    category: "Nostalgia series",
    price: 399,
    image: "/products/kadak-chai.jpg",
    line: "Warm spice, slow conversations, and the comfort of one more cup.",
    relatedIds: [4, 2, 7],
  },
  {
    id: 7,
    name: "Chic Chaka-Chic — Designer Glass Candle",
    category: "Designer glass",
    price: 2499,
    image: "/products/designer-glass-candle.jpg",
    line: "Petals in glass, poured as a bright little garden for their bedside.",
    tag: "Gift favourite",
    relatedIds: [2, 4, 6],
  },
]

const dessertProducts = catalogClassics.filter((product) =>
  [2, 106, 107, 112, 113, 110, 111, 105].includes(product.id),
)

const urliMedia = [
  "/products/neel-pushp-urli.jpg",
  "/products/genda-glow-urli.jpg",
  "/products/laal-phool-urli.jpg",
  "/products/lilac-garden-urli.jpg",
  "/products/full-bloom-urli.jpg",
]

const seasonalUrliSlides = [
  {
    image: "/products/lilac-garden-urli.jpg",
    name: "Sakura — Lilac Garden Urli",
  },
  {
    image: "/products/neel-pushp-urli.jpg",
    name: "Heroine — Neel Pushp Urli",
  },
  {
    image: "/products/genda-glow-urli.jpg",
    name: "Chatak — Genda Glow Urli",
  },
  {
    image: "/products/laal-phool-urli.jpg",
    name: "Lahu Luhan — Laal Phool Urli",
  },
  {
    image: "/products/full-bloom-urli.jpg",
    name: "Main Character, Always — Full Bloom Urli",
  },
]

const urliProducts: Product[] = [
  {
    id: 20,
    name: "Heroine — Neel Pushp Urli",
    category: "Urli collection",
    price: 899,
    image: "/products/neel-pushp-urli.jpg",
    line: "Blue florals and warm brass, composed for a table full of light.",
    tag: "Festive edition",
    relatedIds: [21, 2, 7],
    mediaGallery: urliMedia,
  },
  {
    id: 21,
    name: "Chatak — Genda Glow Urli",
    category: "Urli collection",
    price: 799,
    image: "/products/genda-glow-urli.jpg",
    line: "Marigold-toned blooms that bring Diwali warmth to every gathering.",
    tag: "Festive edition",
    relatedIds: [22, 3, 20],
    mediaGallery: [urliMedia[1], urliMedia[0], ...urliMedia.slice(2)],
  },
  {
    id: 22,
    name: "Lahu Luhan — Laal Phool Urli",
    category: "Urli collection",
    price: 599,
    image: "/products/laal-phool-urli.jpg",
    line: "Deep red wax florals arranged for wedding tables and joyful rituals.",
    tag: "Wedding favourite",
    relatedIds: [21, 7, 23],
    mediaGallery: [
      urliMedia[2],
      urliMedia[0],
      urliMedia[1],
      ...urliMedia.slice(3),
    ],
  },
  {
    id: 23,
    name: "Sakura — Lilac Garden Urli",
    category: "Urli collection",
    price: 699,
    image: "/products/lilac-garden-urli.jpg",
    line: "A soft lilac garden designed for quiet celebrations and thoughtful gifts.",
    tag: "Limited pour",
    relatedIds: [20, 2, 6],
    mediaGallery: [urliMedia[3], ...urliMedia.slice(0, 3), urliMedia[4]],
  },
  {
    id: 24,
    name: "Main Character, Always — Full Bloom Urli",
    category: "Urli collection",
    price: 799,
    image: "/products/full-bloom-urli.jpg",
    line: "A generous bed of pink and crimson blooms, poured for the grandest gifting moments.",
    tag: "New design",
    relatedIds: [22, 23, 21],
    mediaGallery: [urliMedia[4], ...urliMedia.slice(0, 4)],
  },
]

const grandUrliProducts: Product[] = [
  {
    id: 25,
    name: "Mint Pushp Grand Urli",
    category: "Urli collection",
    price: 1699,
    image: "/products/mint-pushp-grand-urli.jpg",
    line: "A generous gold bowl with mint wax, blue chrysanthemums, and soft pink blooms.",
    tag: "Grand format",
    relatedIds: [27, 20, 23],
  },
  {
    id: 26,
    name: "Boss Energy — Saffron Sky Grand Urli",
    category: "Urli collection",
    price: 1699,
    image: "/products/saffron-sky-grand-urli.jpg",
    line: "Orange and yellow florals glow against sky-blue wax in a broad gold bowl.",
    tag: "Grand format",
    relatedIds: [28, 21, 24],
  },
  {
    id: 27,
    name: "No Filter — Midnight Pushp Grand Urli",
    category: "Urli collection",
    price: 899,
    image: "/products/midnight-pushp-grand-urli.jpg",
    line: "A generous black bowl with a mint pour and a garden of blue and pink wax flowers.",
    tag: "Only 4 left",
    relatedIds: [25, 28, 20],
  },
  {
    id: 28,
    name: "Midnight Saffron Grand Urli",
    category: "Urli collection",
    price: 899,
    image: "/products/midnight-saffron-grand-urli.jpg",
    line: "A statement black bowl with blue wax, saffron hibiscus, and hand-finished petals.",
    tag: "Only 4 left",
    relatedIds: [26, 27, 22],
  },
]

const allProducts = [
  ...products,
  ...catalogClassics,
  ...urliProducts,
  ...grandUrliProducts,
]

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const responsiveProductImage = (source: string) => {
  const match = source.match(/^\/products\/(.+)\.(?:jpe?g|png)$/i)
  if (!match) return null
  return {
    small: `/products/webp/480/${match[1]}.webp`,
    large: `/products/webp/960/${match[1]}.webp`,
    xlarge: `/products/webp/2000/${match[1]}.webp`,
  }
}

const giftingSeoCopy =
  "Handmade candle gift bowl for festive décor. Unique artisanal wax florals, toxin-free blend."

const productDescription = (product: Product) =>
  `${product.line} ${giftingSeoCopy}`

const productCardCtas = (product: Product) => {
  const category = product.category.toLowerCase()

  if (category.includes("halloween")) {
    return { primary: "Light the night", secondary: "Explore trio" }
  }
  if (category.includes("urli")) {
    return { primary: "Add to hamper", secondary: "View ritual piece" }
  }
  if (category.includes("floral")) {
    return { primary: "Celebrate with blooms", secondary: "Discover more" }
  }
  if (category.includes("dessert") || category.includes("sculptural")) {
    return { primary: "Gift this illusion", secondary: "See the layers" }
  }
  return { primary: "Gift this garden", secondary: "See details" }
}

const packagingOptions = [
  {
    value: "kraft",
    label: "Brown corrugated box",
    description: "Basic included packaging.",
    image: "/packaging/brown-corrugated.webp",
    price: 0,
    priceLabel: "Included",
  },
  {
    value: "aqua",
    label: "Aqua keepsake box",
    description: "Premium aqua gift box upgrade.",
    image: "/packaging/aqua-keepsake.webp",
    price: 99,
    priceLabel: "+ ₹99",
  },
  {
    value: "black",
    label: "Black V-box",
    description: "Luxury black gift box upgrade.",
    image: "/packaging/black-v-box.webp",
    price: 149,
    priceLabel: "+ ₹149",
  },
] as const

type PackagingValue = (typeof packagingOptions)[number]["value"]

const heroSlides = [
  {
    accent: "traditional",
    desktopImage: "/hero/desktop/traditional-festivities.webp",
    mobileImage: "/hero/mobile/traditional-festivities.webp",
    productImage: "/products/webp/2000/neel-pushp-urli.webp",
    alt: "Warm golden-hour flowers creating an intimate festive atmosphere",
    category: "Chic chaka-chic festivities",
    headline: "Celebrate light and memory.",
    label: "Heroine — Neel Pushp Urli",
    cta: "Celebrate with blooms",
    secondaryCta: "View the festive favourite",
    description:
      "Ceremonial brass Urlis, hand-poured florals and warm gold details for gatherings that become memory.",
    panelCopy: "Clean gold finishes and hand-poured blooms for festive rituals.",
    productId: 20,
    target: "#urli",
  },
  {
    accent: "botanical",
    desktopImage: "/hero/desktop/botanical-worlds.webp",
    mobileImage: "/hero/mobile/botanical-worlds.webp",
    productImage:
      "/products/webp/2000/lemongrass-succulent-bowl-front.webp",
    alt: "Sculptural succulent leaves illuminated by warm side-light",
    category: "In my element",
    headline: "Bring gardens indoors, one bloom at a time.",
    label: "Evergreen Reverie — Succulent Bowl",
    cta: "Gift this garden",
    secondaryCta: "Meet the succulent bowl",
    description:
      "Sculpted succulent bowls, natural textures and hand-finished wax gardens for quiet corners and thoughtful gifts.",
    panelCopy: "Wax gardens shaped by hand and inspired by living forms.",
    productId: 4,
    target: "#botanicals",
  },
  {
    accent: "edible",
    desktopImage: "/hero/desktop/sweet-illusions.webp",
    mobileImage: "/hero/mobile/sweet-illusions.webp",
    productImage:
      "/products/webp/2000/jalebi-ki-badi-behen-imarti-bowl.webp",
    alt: "Layered orange Imarti wax candle over an ivory base in warm editorial light",
    category: "Zero sugar",
    headline: "Sweet illusions, sculpted in wax.",
    label: "Jalebi Ki Badi Behen — Imarti Bowl",
    cta: "Explore sweet illusions",
    secondaryCta: "See the layered Imarti",
    description:
      "Playful candle bowls that borrow the colour, abundance and delight of a table laid with something sweet.",
    panelCopy: "Dessert-like detail, entirely sculpted and poured in wax.",
    productId: 105,
    target: "#sweet-illusions",
  },
  {
    accent: "halloween",
    desktopImage: "/hero/desktop/halloween-rituals.webp",
    mobileImage: "/hero/mobile/halloween-rituals.webp",
    productImage:
      "/products/webp/2000/pastel-skull-jack-o-lantern-and-witch-hat-front.webp",
    alt: "Ivory candles glowing over autumn leaves in a moody Halloween setting",
    category: "Resting witch face",
    headline: "Light the night with handmade rituals.",
    label: "Pastel Skull, Jack-o’-Lantern and Witch Hat",
    cta: "Light the night",
    secondaryCta: "View the trio",
    description:
      "Darkly playful candle bowls, moody light and hand-sculpted details for festive tables after sunset.",
    panelCopy: "Small-batch mischief for haunted tables and midnight hosts.",
    productId: 1,
    target: "#halloween",
  },
]

const promoMessages = [
  "Complimentary delivery on orders over ₹1,200",
  "Soy wax + beeswax blend · toxin-free fragrances · smoke-free burn",
  "Gift wrap, handwritten message card and black-and-white sticker · ₹49",
]

const pinDirectory: Record<string, { city: string state: string }> = {
  "110001": { city: "New Delhi", state: "Delhi" },
  "400001": { city: "Mumbai", state: "Maharashtra" },
  "411001": { city: "Pune", state: "Maharashtra" },
  "560001": { city: "Bengaluru", state: "Karnataka" },
  "700001": { city: "Kolkata", state: "West Bengal" },
}

const indianStateAliases: Record<string, string> = {
  ap: "andhrapradesh",
  ar: "arunachalpradesh",
  as: "assam",
  br: "bihar",
  cg: "chhattisgarh",
  ch: "chandigarh",
  dl: "delhi",
  ga: "goa",
  gj: "gujarat",
  hr: "haryana",
  hp: "himachalpradesh",
  jh: "jharkhand",
  jk: "jammuandkashmir",
  ka: "karnataka",
  kl: "kerala",
  la: "ladakh",
  mh: "maharashtra",
  ml: "meghalaya",
  mn: "manipur",
  mp: "madhyapradesh",
  mz: "mizoram",
  nl: "nagaland",
  od: "odisha",
  or: "odisha",
  pb: "punjab",
  py: "puducherry",
  rj: "rajasthan",
  sk: "sikkim",
  tn: "tamilnadu",
  tr: "tripura",
  ts: "telangana",
  uk: "uttarakhand",
  up: "uttarpradesh",
  ut: "uttarakhand",
  wb: "westbengal",
}

const normalizePlace = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")

const normalizeState = (value: string) => {
  const normalized = normalizePlace(value)
  return indianStateAliases[normalized] ?? normalized
}

async function resolveIndianPin(pin: string) {
  if (pinDirectory[pin]) return pinDirectory[pin]
  const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
  if (!response.ok) return null
  const [result] = await response.json()
  const postOffice = result?.PostOffice?.[0]
  if (!postOffice) return null
  return {
    city: postOffice.District as string,
    state: postOffice.State as string,
  }
}

async function validatePin(pin: string, cityInput: string, stateInput: string) {
  if (!/^\d{6}$/.test(pin)) {
    return { valid: false, error: "PIN must be 6 digits" }
  }

  try {
    const location = await resolveIndianPin(pin)
    if (!location) {
      return { valid: false, error: "Invalid PIN code" }
    }

    if (
      normalizePlace(location.city) !== normalizePlace(cityInput) ||
      normalizeState(location.state) !== normalizeState(stateInput)
    ) {
      return {
        valid: false,
        error: `City/State do not match PIN. This PIN matches ${location.city}, ${location.state}.`,
      }
    }

    return { valid: true, city: location.city, state: location.state }
  } catch {
    return { valid: false, error: "Lookup failed, please try again" }
  }
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Melt Culture home">
      <img alt="" className="logo-glyph" src="/assets/3efae.svg" />
      <span className="logo-culture">CULTURE</span>
      <small>HAND POURED • ARTFULLY MADE</small>
    </a>
  )
}

function Icon({
  name,
  size = 20,
}: {
  name:
    | "menu"
    | "bag"
    | "arrow"
    | "close"
    | "chat"
    | "check"
    | "lock"
    | "grid"
    | "list"
    | "play"
    | "pause"
    | "previous"
    | "next"
  size?: number
}) {
  const paths = {
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    bag: <path d="M6 8h12l1 12H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chat: (
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    lock: <path d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12v10H6V10Z" />,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    pause: <path d="M9 7v10M15 7v10" />,
    previous: <path d="m14 7-5 5 5 5" />,
    next: <path d="m10 7 5 5-5 5" />,
    grid: (
      <>
        <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />
      </>
    ),
    list: <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />,
  }
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function PackagingChoices({
  selected,
  onChange,
  name,
  className = "",
}: {
  selected: PackagingValue
  onChange: (value: PackagingValue) => void
  name: string
  className?: string
}) {
  return (
    <fieldset className={className}>
      <legend>Choose packaging</legend>
      {packagingOptions.map((option) => (
        <label className="radio-choice packaging-choice" key={option.value}>
          <input
            checked={selected === option.value}
            name={name}
            onChange={() => onChange(option.value)}
            type="radio"
          />
          <img
            alt=""
            className="packaging-choice-image"
            loading="lazy"
            src={option.image}
          />
          <span className="packaging-choice-copy">
            <strong>{option.label}</strong>
            <small>{option.description}</small>
          </span>
          <b>{option.priceLabel}</b>
        </label>
      ))}
    </fieldset>
  )
}

function ProductCard({
  product,
  onAdd,
  onOpen,
}: {
  product: Product
  onAdd: (product: Product) => void
  onOpen: (product: Product) => void
}) {
  const media = product.mediaGallery?.length
    ? product.mediaGallery
    : [product.image]
  const [mediaIndex, setMediaIndex] = useState(0)
  const activeCardWebp = responsiveProductImage(media[mediaIndex])
  const ctas = productCardCtas(product)

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <a
          aria-label={`View full details for ${product.name}`}
          href={`#product-${product.id}`}
          onClick={(event) => {
            event.preventDefault()
            onOpen(product)
          }}
        >
          <picture className="product-card-picture">
            {activeCardWebp && (
              <source
                sizes="(min-width: 1440px) 22vw, (min-width: 1025px) 30vw, (min-width: 769px) 50vw, 100vw"
                srcSet={`${activeCardWebp.small} 480w, ${activeCardWebp.large} 960w, ${activeCardWebp.xlarge} 2000w`}
                type="image/webp"
              />
            )}
            <img
              alt={`${product.name}, view ${mediaIndex + 1} of ${media.length}`}
              className={
                product.imageFit === "contain"
                  ? "contain-product-image"
                  : undefined
              }
              decoding="async"
              loading="lazy"
              src={media[mediaIndex]}
            />
          </picture>
          {media[mediaIndex] ===
            "/products/lilac-rosette-bowl-top.jpg" && (
            <img
              alt=""
              aria-hidden="true"
              className="wick-overlay"
              src="/products/lilac-rosette-bowl-wick.svg"
            />
          )}
        </a>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        {media.length > 1 && (
          <div
            aria-label={`${product.name} image gallery controls`}
            className="card-gallery-controls"
          >
            <button
              aria-label={`Show previous image of ${product.name}`}
              onClick={() =>
                setMediaIndex(
                  (index) => (index - 1 + media.length) % media.length,
                )
              }
              type="button"
            >
              ←
            </button>
            <span aria-live="polite">
              {mediaIndex + 1}/{media.length}
            </span>
            <button
              aria-label={`Show next image of ${product.name}`}
              onClick={() =>
                setMediaIndex((index) => (index + 1) % media.length)
              }
              type="button"
            >
              →
            </button>
          </div>
        )}
      </div>
      <div className="product-info">
        <p>{product.category}</p>
        <div>
          <h3>
            <a
              href={`#product-${product.id}`}
              onClick={(event) => {
                event.preventDefault()
                onOpen(product)
              }}
            >
              {product.name}
            </a>
          </h3>
          <strong>{money(product.price)}</strong>
        </div>
        <span>{productDescription(product)}</span>
        {product.dimensions && (
          <small className="product-size">
            L {product.dimensions.length} × B {product.dimensions.breadth} × H{" "}
            {product.dimensions.height} cm
          </small>
        )}
        <div className="product-actions">
          <button
            aria-label={`${ctas.primary}: ${product.name}`}
            className="card-action add-action"
            onClick={() => onAdd(product)}
          >
            {ctas.primary}
          </button>
          <button
            aria-label={`${ctas.secondary}: ${product.name}`}
            className="card-action details-action"
            onClick={() => onOpen(product)}
          >
            {ctas.secondary}
          </button>
        </div>
      </div>
    </article>
  )
}

function ProductGrid({
  collection,
  onAdd,
  onOpen,
  initialCount = 6,
}: {
  collection: Product[]
  onAdd: (product: Product) => void
  onOpen: (product: Product) => void
  initialCount?: number
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showAll, setShowAll] = useState(false)
  const hasMore = collection.length > initialCount
  const visibleProducts = showAll
    ? collection
    : collection.slice(0, initialCount)

  return (
    <>
      <div className="collection-view-toolbar">
        <div aria-label="Choose product view" role="group">
          <button
            aria-label="Show products in a grid"
            aria-pressed={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
            type="button"
          >
            <Icon name="grid" size={18} />
          </button>
          <button
            aria-label="Show products in a list"
            aria-pressed={viewMode === "list"}
            onClick={() => setViewMode("list")}
            type="button"
          >
            <Icon name="list" size={18} />
          </button>
        </div>
        {hasMore && (
          <button
            aria-expanded={showAll}
            className="view-all-button"
            onClick={() => setShowAll((visible) => !visible)}
            type="button"
          >
            {showAll ? "View less" : `View all ${collection.length}`}{" "}
            <span>→</span>
          </button>
        )}
      </div>
      <div
        className={`product-grid collection-grid ${
          viewMode === "list" ? "list-view" : ""
        }`}
      >
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            onAdd={onAdd}
            onOpen={onOpen}
            product={product}
          />
        ))}
      </div>
    </>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bagOpen, setBagOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [giftWrap, setGiftWrap] = useState(true)
  const [packaging, setPackaging] = useState<PackagingValue>("kraft")
  const [message, setMessage] = useState(
    "For your new corner of the world. Make it yours!",
  )
  const [cart, setCart] = useState<Product[]>([products[0]])
  const [notice, setNotice] = useState("")
  const [supportSent, setSupportSent] = useState(false)
  const [supportSending, setSupportSending] = useState(false)
  const [supportError, setSupportError] = useState("")
  const [inquirySent, setInquirySent] = useState(false)
  const [inquirySending, setInquirySending] = useState(false)
  const [inquiryError, setInquiryError] = useState("")
  const [promoIndex, setPromoIndex] = useState(0)
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroAutoplayEnabled, setHeroAutoplayEnabled] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [heroInteracting, setHeroInteracting] = useState(false)
  const [urliViewMode, setUrliViewMode] = useState<"grid" | "list">("grid")
  const [seasonalUrliIndex, setSeasonalUrliIndex] = useState(0)
  const [seasonalCarouselPaused, setSeasonalCarouselPaused] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [moodboardOpen, setMoodboardOpen] = useState(
    window.location.hash === "#brand-moodboard",
  )
  const [checkoutAddress, setCheckoutAddress] = useState({
    pin: "",
    city: "",
    state: "",
  })
  const [pinValidated, setPinValidated] = useState(false)
  const [pinError, setPinError] = useState("")
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentOrderId, setPaymentOrderId] = useState("")
  const [confirmedOrderReference, setConfirmedOrderReference] = useState("")
  const [validatedDelivery, setValidatedDelivery] =
    useState<DeliveryDetails | null>(null)
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)

  useEffect(() => {
    const syncMoodboardFromHash = () =>
      setMoodboardOpen(window.location.hash === "#brand-moodboard")
    window.addEventListener("hashchange", syncMoodboardFromHash)
    return () =>
      window.removeEventListener("hashchange", syncMoodboardFromHash)
  }, [])

  useEffect(() => {
    document.title =
      moodboardOpen
        ? "Melt Culture | Brand Moodboard"
        : "Melt Culture | Hand-Poured Artisan Candle Gifts in India"
    const description =
      "Shop artisan handmade candle gifts, hand-poured in India with a soy wax and beeswax blend, toxin-free fragrances, and a smoke-free burn."
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (!meta) {
      meta = document.createElement("meta")
      meta.name = "description"
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [moodboardOpen])
  const pdpCloseRef = useRef<HTMLButtonElement>(null)
  const pdpDialogRef = useRef<HTMLElement>(null)
  const pdpReturnFocusRef = useRef<HTMLElement | null>(null)

  const selectedPackaging =
    packagingOptions.find((option) => option.value === packaging) ??
    packagingOptions[0]
  const packagePrice = selectedPackaging.price
  const subtotal = useMemo(
    () => cart.reduce((sum, product) => sum + product.price, 0),
    [cart],
  )
  const hasLargeItem = cart.some(
    (product) =>
      product.category === "Urli collection" ||
      product.tag?.toLowerCase().startsWith("set of"),
  )
  const usesLargeDelivery = hasLargeItem || cart.length >= 2
  const deliveryFee = cart.length ? (usesLargeDelivery ? 169 : 89) : 0
  const deliveryDiscount = subtotal >= 1200 ? deliveryFee : 0
  const amountUntilFreeDelivery = Math.max(1200 - subtotal, 0)
  const deliveryLabel = usesLargeDelivery
    ? "Urli & large-item delivery"
    : "Standard delivery"
  const total =
    subtotal +
    (giftWrap ? 49 : 0) +
    packagePrice +
    deliveryFee -
    deliveryDiscount
  const cartGroups = useMemo(
    () =>
      cart.reduce<Array<{ product: Product quantity: number }>>(
        (groups, product) => {
          const existing = groups.find(
            (group) => group.product.id === product.id,
          )
          if (existing) existing.quantity += 1
          else groups.push({ product, quantity: 1 })
          return groups
        },
        [],
      ),
    [cart],
  )
  const activeProductImage = selectedProduct
    ? (selectedProduct.mediaGallery?.[activeMediaIndex] ??
      selectedProduct.image)
    : ""
  const activeProductWebp = responsiveProductImage(activeProductImage)
  const editorialMediaClass = selectedProduct
    ? selectedProduct.category === "Urli collection"
      ? "urli-editorial"
      : selectedProduct.category === "Halloween special"
        ? "halloween-editorial"
        : /botanical|succulent|floral/i.test(selectedProduct.category)
          ? "botanical-editorial"
          : "heritage-editorial"
    : ""

  useEffect(() => {
    document.body.style.overflow =
      bagOpen || supportOpen || checkout || selectedProduct ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [bagOpen, supportOpen, checkout, selectedProduct])

  useEffect(() => {
    const timer = window.setInterval(
      () => setPromoIndex((index) => (index + 1) % promoMessages.length),
      4200,
    )
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )
    const syncMotionPreference = () => {
      if (reducedMotion.matches) setHeroAutoplayEnabled(false)
    }
    reducedMotion.addEventListener("change", syncMotionPreference)
    return () =>
      reducedMotion.removeEventListener("change", syncMotionPreference)
  }, [])

  useEffect(() => {
    if (!heroAutoplayEnabled || heroInteracting) return
    const timer = window.setInterval(
      () => setHeroIndex((index) => (index + 1) % heroSlides.length),
      4800,
    )
    return () => window.clearInterval(timer)
  }, [heroAutoplayEnabled, heroInteracting])

  useEffect(() => {
    if (
      seasonalCarouselPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return
    const timer = window.setInterval(
      () =>
        setSeasonalUrliIndex(
          (index) => (index + 1) % seasonalUrliSlides.length,
        ),
      4800,
    )
    return () => window.clearInterval(timer)
  }, [seasonalCarouselPaused])

  useEffect(() => {
    const syncProductFromHash = () => {
      const match = window.location.hash.match(/^#product-(\d+)$/)
      setSelectedProduct(
        match
          ? (allProducts.find((product) => product.id === Number(match[1])) ??
              null)
          : null,
      )
    }
    syncProductFromHash()
    window.addEventListener("hashchange", syncProductFromHash)
    return () => window.removeEventListener("hashchange", syncProductFromHash)
  }, [])

  useEffect(() => {
    if (selectedProduct) {
      setActiveMediaIndex(0)
      pdpCloseRef.current?.focus()
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedProduct) closeProduct()
        else if (checkout) setCheckout(false)
        else if (bagOpen) setBagOpen(false)
        else if (supportOpen) setSupportOpen(false)
        return
      }

      if (selectedProduct && event.key === "Tab") {
        const focusable = Array.from(
          pdpDialogRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => element.offsetParent !== null)
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }

      const target = event.target as HTMLElement
      const isFormControl = /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      const mediaCount = selectedProduct?.mediaGallery?.length ?? 0
      if (!isFormControl && mediaCount > 1 && event.key === "ArrowLeft") {
        event.preventDefault()
        setActiveMediaIndex(
          (index) => (index - 1 + mediaCount) % mediaCount,
        )
      }
      if (!isFormControl && mediaCount > 1 && event.key === "ArrowRight") {
        event.preventDefault()
        setActiveMediaIndex((index) => (index + 1) % mediaCount)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [selectedProduct, checkout, bagOpen, supportOpen])

  const addToBag = (product: Product) => {
    setCart((items) => [...items, product])
    setNotice(`${product.name} added to your gift bag.`)
    window.setTimeout(() => setNotice(""), 2600)
  }

  const openProduct = (product: Product) => {
    pdpReturnFocusRef.current = document.activeElement as HTMLElement
    setSelectedProduct(product)
    window.location.hash = `product-${product.id}`
  }

  const closeProduct = () => {
    setSelectedProduct(null)
    if (window.location.hash.startsWith("#product-")) {
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search,
      )
    }
    window.requestAnimationFrame(() => pdpReturnFocusRef.current?.focus())
  }

  const changeQuantity = (product: Product, delta: number) => {
    setCart((items) => {
      if (delta > 0) return [...items, product]
      const index = items.findIndex((item) => item.id === product.id)
      return index < 0
        ? items
        : items.filter((_, itemIndex) => itemIndex !== index)
    })
  }

  const submitSupport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (supportSending) return

    const endpoint =
      import.meta.env.VITE_WHATSAPP_SUPPORT_ENDPOINT ?? "/api/inquiry"

    setSupportError("")
    setSupportSending(true)
    const form = event.currentTarget
    const fields = new FormData(form)

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          email: fields.get("email"),
          mobile: fields.get("mobile"),
          orderId: fields.get("orderId"),
          message: fields.get("message"),
          source: "melt-culture-storefront",
        }),
      })
      if (!response.ok) throw new Error("Support request failed")
      setSupportSent(true)
      form.reset()
    } catch {
      setSupportError(
        "We could not send your WhatsApp request. Please check your connection and try again.",
      )
    } finally {
      setSupportSending(false)
    }
  }

  const submitBulkInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inquirySending) return

    const endpoint =
      import.meta.env.VITE_WHATSAPP_SUPPORT_ENDPOINT ?? "/api/inquiry"

    setInquiryError("")
    setInquirySending(true)
    const form = event.currentTarget
    const fields = new FormData(form)

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          company: fields.get("company"),
          email: fields.get("email"),
          mobile: fields.get("mobile"),
          occasion: fields.get("occasion"),
          quantity: fields.get("quantity"),
          timeline: fields.get("timeline"),
          budget: fields.get("budget"),
          message: fields.get("message"),
          source: "melt-culture-bulk-gifting",
        }),
      })
      if (!response.ok) throw new Error("Bulk gifting request failed")
      setInquirySent(true)
      form.reset()
    } catch {
      setInquiryError(
        "We could not send your gifting enquiry. Please check your connection and try again.",
      )
    } finally {
      setInquirySending(false)
    }
  }

  const completeOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (paymentLoading) return

    const fields = new FormData(event.currentTarget)
    const pinValidation = await validatePin(
      checkoutAddress.pin,
      checkoutAddress.city,
      checkoutAddress.state,
    )
    if (!pinValidation.valid) {
      setPinValidated(false)
      setPinError(pinValidation.error ?? "Invalid PIN code")
      return
    }

    const delivery: DeliveryDetails = {
      email: String(fields.get("email") ?? ""),
      mobile: String(fields.get("mobile") ?? ""),
      fullName: String(fields.get("fullName") ?? ""),
      address: String(fields.get("address") ?? ""),
      pin: checkoutAddress.pin,
      city: pinValidation.city ?? checkoutAddress.city,
      state: pinValidation.state ?? checkoutAddress.state,
    }
    setValidatedDelivery(delivery)
    setCheckoutAddress({
      pin: delivery.pin,
      city: delivery.city,
      state: delivery.state,
    })
    setPinValidated(true)
    setPinError("")
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID
    const orderEndpoint =
      import.meta.env.VITE_RAZORPAY_ORDER_ENDPOINT ?? "/api/razorpay-order"
    const verifyEndpoint =
      import.meta.env.VITE_RAZORPAY_VERIFY_ENDPOINT ?? "/api/razorpay-verify"
    if (!key) {
      setPinError(
        "Secure payment needs a Razorpay public key before checkout can open. Your order has not been placed.",
      )
      return
    }

    setPaymentLoading(true)
    try {
      if (!(window as any).Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script")
          script.src = "https://checkout.razorpay.com/v1/checkout.js"
          script.onload = () => resolve()
          script.onerror = () => reject(new Error("Razorpay failed to load"))
          document.head.appendChild(script)
        })
      }
      const response = await fetch(orderEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          items: cartGroups.map(({ product, quantity }) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
          })),
          packaging,
          giftWrap,
          message,
          delivery,
          shipping: {
            fee: deliveryFee,
            discount: deliveryDiscount,
            tier: usesLargeDelivery ? "large" : "standard",
          },
        }),
      })
      if (!response.ok) throw new Error("Could not create payment order")
      const order = await response.json()
      if (!order.id || !order.orderToken || !order.reference) {
        throw new Error("Payment order response was incomplete")
      }
      setPaymentOrderId(order.id)
      setConfirmedOrderReference(order.reference)
      const razorpay = new (window as any).Razorpay({
        key,
        amount: order.amount,
        currency: "INR",
        name: "Melt Culture",
        description: "Gift-ready candles",
        order_id: order.id,
        prefill: {
          name: delivery.fullName,
          email: delivery.email,
          contact: delivery.mobile,
        },
        handler: async (payment: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          setPaymentLoading(true)
          setPinError("")
          try {
            const verification = await fetch(verifyEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderToken: order.orderToken,
                razorpayOrderId: payment.razorpay_order_id,
                razorpayPaymentId: payment.razorpay_payment_id,
                razorpaySignature: payment.razorpay_signature,
              }),
            })
            const result = await verification.json()
            if (!verification.ok || !result.verified) {
              throw new Error("Payment verification failed")
            }
            setConfirmedOrderReference(result.reference ?? order.reference)
            setConfirmed(true)
          } catch {
            setPinError(
              "Payment was received but verification is pending. Please contact support before trying again.",
            )
          } finally {
            setPaymentLoading(false)
          }
        },
        modal: {
          ondismiss: () => setPaymentLoading(false),
        },
        theme: { color: "#1C1C1C" },
      })
      razorpay.on(
        "payment.failed",
        (failure: { error?: { description?: string } }) => {
          setPinError(
            failure.error?.description ??
              "Payment was not completed. No order has been placed.",
          )
        },
      )
      razorpay.open()
    } catch {
      setPinError("Secure payment could not start. Please try again.")
    } finally {
      setPaymentLoading(false)
    }
  }

  if (moodboardOpen) {
    return (
      <Suspense
        fallback={
          <div
            aria-label="Loading brand moodboard"
            className="route-skeleton"
            role="status"
          />
        }
      >
        <BrandMoodboard
          onClose={() => {
            window.history.pushState(
              null,
              "",
              window.location.pathname + window.location.search,
            )
            setMoodboardOpen(false)
            window.scrollTo({ top: 0 })
          }}
        />
      </Suspense>
    )
  }

  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div
        aria-label="Current store offer"
        className="announcement"
        role="region"
      >
        <span key={promoMessages[promoIndex]}>{promoMessages[promoIndex]}</span>
      </div>
      <header className="site-header">
        <button
          aria-expanded={menuOpen}
          aria-label="Open navigation"
          className="icon-button mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <Logo />
        <nav
          aria-label="Main navigation"
          className={menuOpen ? "nav open" : "nav"}
        >
          <a href="#urli" onClick={() => setMenuOpen(false)}>
            Urli
          </a>
          <a href="#halloween" onClick={() => setMenuOpen(false)}>
            Halloween
          </a>
          <a
            aria-label="Terrariums, florals and succulent candles"
            href="#botanicals"
            onClick={() => setMenuOpen(false)}
          >
            Botanicals
          </a>
          <a href="#sweet-illusions" onClick={() => setMenuOpen(false)}>
            Sweet illusions
          </a>
          <a href="#seasonal" onClick={() => setMenuOpen(false)}>
            Seasonal
          </a>
          <a href="#gifting" onClick={() => setMenuOpen(false)}>
            Gifting
          </a>
          <a href="#story" onClick={() => setMenuOpen(false)}>
            Our story
          </a>
        </nav>
        <button
          aria-label={`Open gift bag with ${cart.length} items`}
          className="bag-button"
          onClick={() => setBagOpen(true)}
        >
          <Icon name="bag" />
          <span>{cart.length}</span>
        </button>
      </header>

      <main id="main">
        <section
          className={`hero hero-${heroSlides[heroIndex].accent}`}
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <div
              className="hero-dynamic-copy"
              key={heroSlides[heroIndex].category}
            >
              <p className="eyebrow">{heroSlides[heroIndex].category}</p>
              <h1 id="hero-title">{heroSlides[heroIndex].headline}</h1>
              <p className="hero-lede">
                {heroSlides[heroIndex].description}
              </p>
              <div className="button-row">
                <a
                  className="button primary"
                  href={heroSlides[heroIndex].target}
                >
                  {heroSlides[heroIndex].cta} <Icon name="arrow" />
                </a>
                <a
                  className="button secondary"
                  href={`#product-${heroSlides[heroIndex].productId}`}
                >
                  {heroSlides[heroIndex].secondaryCta}
                </a>
              </div>
            </div>
            <div className="hero-trust" aria-label="Shopping benefits">
              <span>
                <Icon name="check" size={16} /> Soy + beeswax blend
              </span>
              <span>
                <Icon name="check" size={16} /> Toxin-free fragrance
              </span>
              <span>
                <Icon name="check" size={16} /> Smoke-free burn
              </span>
            </div>
            <p className="hero-care-note">
              Cat-friendly, pet-friendly, and baby-friendly candlelight for the
              people—and paws—you love.
            </p>
          </div>
          <div
            aria-label="Featured Melt Culture products"
            aria-roledescription="carousel"
            className="hero-visual"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setHeroInteracting(false)
              }
            }}
            onFocus={() => setHeroInteracting(true)}
            onMouseEnter={() => setHeroInteracting(true)}
            onMouseLeave={() => setHeroInteracting(false)}
            role="region"
          >
            <div
              aria-live={
                !heroAutoplayEnabled || heroInteracting ? "polite" : "off"
              }
              className="hero-slides"
            >
              {heroSlides.map((slide, index) => (
                <div
                  aria-hidden={heroIndex !== index}
                  className={`hero-slide ${
                    heroIndex === index ? "active" : ""
                  }`}
                  key={slide.desktopImage}
                >
                  <picture className="hero-picture">
                    <source
                      media="(min-width: 1025px)"
                      srcSet={slide.desktopImage}
                      type="image/webp"
                    />
                    <img
                      alt={slide.alt}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      loading={index === 0 ? "eager" : "lazy"}
                      src={slide.mobileImage}
                    />
                  </picture>
                  <img
                    alt={`${slide.label}, original Melt Culture product photograph`}
                    className="hero-product-spotlight"
                    decoding="async"
                    loading={index === 0 ? "eager" : "lazy"}
                    src={slide.productImage}
                  />
                </div>
              ))}
            </div>
            <div className="hero-carousel-panel">
              <div className="hero-slide-copy">
                <small>{heroSlides[heroIndex].category}</small>
                <strong>{heroSlides[heroIndex].label}</strong>
                <span>
                  {heroSlides[heroIndex].panelCopy}
                </span>
                <button
                  className="hero-product-link"
                  onClick={() => {
                    const featuredProduct = allProducts.find(
                      (product) =>
                        product.id === heroSlides[heroIndex].productId,
                    )
                    if (featuredProduct) openProduct(featuredProduct)
                  }}
                  type="button"
                >
                  View this piece
                </button>
              </div>
              <div className="hero-carousel-nav">
                <span className="slide-number">
                  0{heroIndex + 1} <i /> 0{heroSlides.length}
                </span>
                <button
                  aria-label="Show previous carousel slide"
                  onClick={() =>
                    setHeroIndex(
                      (heroIndex - 1 + heroSlides.length) % heroSlides.length,
                    )
                  }
                >
                  <Icon name="previous" size={18} />
                </button>
                <button
                  aria-label={
                    heroAutoplayEnabled ? "Pause carousel" : "Play carousel"
                  }
                  className="hero-playback-toggle"
                  onClick={() =>
                    setHeroAutoplayEnabled((enabled) => !enabled)
                  }
                >
                  <Icon
                    name={heroAutoplayEnabled ? "pause" : "play"}
                    size={17}
                  />
                  <span>{heroAutoplayEnabled ? "Pause" : "Play"}</span>
                </button>
                <button
                  aria-label="Show next carousel slide"
                  onClick={() =>
                    setHeroIndex((heroIndex + 1) % heroSlides.length)
                  }
                >
                  <Icon name="next" size={18} />
                </button>
              </div>
              <div
                aria-label="Choose a featured product"
                className="hero-gallery-tabs"
                role="group"
              >
                {heroSlides.map((slide, index) => (
                  <button
                    aria-label={`Show ${slide.label}`}
                    aria-pressed={heroIndex === index}
                    key={slide.label}
                    onClick={() => {
                      setHeroIndex(index)
                      setHeroAutoplayEnabled(false)
                    }}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="occasion-strip" aria-label="Shop by gifting theme">
          <p>Choose a ritual to gift</p>
          <div>
            <a href="#urli">Diwali hosting</a>
            <a href="#halloween">Halloween season</a>
            <a href="#botanicals">Botanical gifting</a>
            <a href="#sweet-illusions">Edible-looking candles</a>
            <a href="#events">Shaadi season</a>
            <a href="#events">Winter gifting</a>
            <a href="#events">Baby showers</a>
            <a href="#events">Corporate events</a>
          </div>
        </section>

        <section className="urli-section section" id="urli">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Chic chaka-chic</p>
              <h2>Ceremony, shaped by hand.</h2>
            </div>
            <p>
              Artisan handmade floral Urli candles, hand-poured in a soy wax and
              beeswax blend for Diwali gifting, weddings, festive hampers, and
              homes that love a little ceremony.
            </p>
          </div>
          <div className="collection-view-toolbar">
            <div aria-label="Choose Urli product view" role="group">
              <button
                aria-label="Show Urlis in a grid"
                aria-pressed={urliViewMode === "grid"}
                onClick={() => setUrliViewMode("grid")}
                type="button"
              >
                <Icon name="grid" size={18} />
              </button>
              <button
                aria-label="Show Urlis in a list"
                aria-pressed={urliViewMode === "list"}
                onClick={() => setUrliViewMode("list")}
                type="button"
              >
                <Icon name="list" size={18} />
              </button>
            </div>
            <span className="collection-count">05 festive designs</span>
          </div>
          <div
            className={`urli-grid ${
              urliViewMode === "list" ? "list-view" : ""
            }`}
          >
            {[...urliProducts]
              .sort((first, second) => first.price - second.price)
              .map((urli, index) => (
                <article className="urli-card" key={urli.name}>
                  <button
                    aria-label={`View details for ${urli.name}`}
                    className="urli-image"
                    onClick={() => openProduct(urli)}
                  >
                    <picture className="urli-card-picture">
                      {responsiveProductImage(urli.image) && (
                        <source
                          sizes="(min-width: 1025px) 25vw, (min-width: 769px) 50vw, 100vw"
                          srcSet={`${responsiveProductImage(urli.image)?.small} 480w, ${responsiveProductImage(urli.image)?.large} 960w, ${responsiveProductImage(urli.image)?.xlarge} 2000w`}
                          type="image/webp"
                        />
                      )}
                      <img
                        alt={`${urli.name} floral candle in a brass Urli`}
                        decoding="async"
                        loading="lazy"
                        src={urli.image}
                      />
                    </picture>
                    {urli.tag && (
                      <span className="urli-stock-tag">{urli.tag}</span>
                    )}
                    <span className="urli-index">0{index + 1}</span>
                  </button>
                  <div className="urli-info">
                    <div>
                      <h3>{urli.name}</h3>
                      <p>{productDescription(urli)}</p>
                    </div>
                    <strong>{money(urli.price)}</strong>
                  </div>
                  <div className="urli-actions">
                    <button
                      aria-label={`Add ${urli.name} to a festive hamper`}
                      className="add-action"
                      onClick={() => addToBag(urli)}
                    >
                      Add to hamper
                    </button>
                    <button
                      aria-label={`View ${urli.name} ritual piece`}
                      className="details-action"
                      onClick={() => openProduct(urli)}
                    >
                      View ritual piece
                    </button>
                  </div>
                </article>
              ))}
          </div>
          <div className="urli-tier-heading">
            <div>
              <p className="eyebrow">Boss energy</p>
              <h3>Fuller blooms for luminous gatherings.</h3>
            </div>
            <p>
              Large-format floral candles designed for centre tables, wedding
              gifting, festive hosting, and rooms that deserve a statement.
            </p>
          </div>
          <div
            className={`urli-grid grand-urli-grid ${
              urliViewMode === "list" ? "list-view" : ""
            }`}
          >
            {[...grandUrliProducts]
              .sort((first, second) => first.price - second.price)
              .map((urli, index) => (
                <article className="urli-card" key={urli.name}>
                  <button
                    aria-label={`View details for ${urli.name}`}
                    className="urli-image"
                    onClick={() => openProduct(urli)}
                  >
                    <picture className="urli-card-picture">
                      {responsiveProductImage(urli.image) && (
                        <source
                          sizes="(min-width: 1025px) 25vw, (min-width: 769px) 50vw, 100vw"
                          srcSet={`${responsiveProductImage(urli.image)?.small} 480w, ${responsiveProductImage(urli.image)?.large} 960w, ${responsiveProductImage(urli.image)?.xlarge} 2000w`}
                          type="image/webp"
                        />
                      )}
                      <img
                        alt={`${urli.name} large floral candle bowl`}
                        decoding="async"
                        loading="lazy"
                        src={urli.image}
                      />
                    </picture>
                    {urli.tag && (
                      <span className="urli-stock-tag">{urli.tag}</span>
                    )}
                    <span className="urli-index">0{index + 1}</span>
                  </button>
                  <div className="urli-info">
                    <div>
                      <h3>{urli.name}</h3>
                      <p>{productDescription(urli)}</p>
                    </div>
                    <strong>{money(urli.price)}</strong>
                  </div>
                  <div className="urli-actions">
                    <button
                      aria-label={`Add ${urli.name} to a festive hamper`}
                      className="add-action"
                      onClick={() => addToBag(urli)}
                    >
                      Add to hamper
                    </button>
                    <button
                      aria-label={`View ${urli.name} ritual piece`}
                      className="details-action"
                      onClick={() => openProduct(urli)}
                    >
                      View ritual piece
                    </button>
                  </div>
                </article>
              ))}
          </div>
          <div
            aria-label="Grand Urli gift packaging options"
            className="urli-packaging-highlight"
          >
            <strong>Ready to arrive beautifully.</strong>
            <span>Brown corrugated box · Included</span>
            <span>Aqua keepsake box · + ₹99</span>
            <span>Black V-box · + ₹149</span>
            <span>Gift wrap + message card + black-and-white sticker · ₹49</span>
          </div>
        </section>

        <section
          className="section product-section botanical-section"
          id="botanicals"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">In my element · Sculpted by hand</p>
              <h2>Small gardens. Lasting memories.</h2>
            </div>
            <p>
              Sculpted succulent candles and miniature wax terrariums made with
              our soy wax and beeswax blend. Toxin-free, smoke-free artisan
              candle gifts for plant lovers, housewarmings, birthdays, babies,
              cats, pets, and calm corners.
            </p>
          </div>
          <ProductGrid
            collection={succulentProducts}
            onAdd={addToBag}
            onOpen={openProduct}
          />
          <div className="botanical-edit" id="floral-edit">
            <div className="botanical-edit-heading">
              <div>
                <p className="eyebrow">Soft launch</p>
                <h3>Blooms that stay in season.</h3>
              </div>
              <p>
                Rose, echeveria, and petal details sculpted in wax, styled with
                the same soft linen, natural textures, and restrained botanical
                accents as our miniature gardens.
              </p>
            </div>
            <ProductGrid
              collection={floralProducts}
              onAdd={addToBag}
              onOpen={openProduct}
            />
          </div>
        </section>

        <section
          className="section product-section dessert-section"
          id="sweet-illusions"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Zero sugar · Entirely sculpted wax</p>
              <h2>Sweet illusions, poured by hand.</h2>
            </div>
            <p>
              Eight familiar treats reimagined as candlelight, from layered
              berry and chocolate bowls to biscuit cups and a gift-ready wax
              dessert box. The Imarti bowl keeps its orange-over-ivory pour
              clearly visible, with no kaju katli element.
            </p>
          </div>
          <ProductGrid
            collection={dessertProducts}
            initialCount={dessertProducts.length}
            onAdd={addToBag}
            onOpen={openProduct}
          />
        </section>

        <section className="seasonal" id="seasonal">
          <div
            aria-label="Seasonal Urli collection"
            aria-roledescription="carousel"
            className="seasonal-image"
          >
            {seasonalUrliSlides.map((slide, index) => (
              <picture
                aria-hidden={seasonalUrliIndex !== index}
                className={`seasonal-slide ${
                  seasonalUrliIndex === index ? "active" : ""
                }`}
                key={slide.name}
              >
                {responsiveProductImage(slide.image) && (
                  <source
                    sizes="(min-width: 769px) 55vw, 100vw"
                    srcSet={`${responsiveProductImage(slide.image)?.small} 480w, ${responsiveProductImage(slide.image)?.large} 960w, ${responsiveProductImage(slide.image)?.xlarge} 2000w`}
                    type="image/webp"
                  />
                )}
                <img
                  alt={`${slide.name} floral candle styled for a festive table`}
                  decoding="async"
                  loading="lazy"
                  src={slide.image}
                />
              </picture>
            ))}
            <span>Small batch · Limited time</span>
            <div className="seasonal-carousel-panel">
              <div>
                <small>Urli collection</small>
                <strong>{seasonalUrliSlides[seasonalUrliIndex].name}</strong>
              </div>
              <div className="seasonal-carousel-nav">
                <span>
                  0{seasonalUrliIndex + 1} / 0{seasonalUrliSlides.length}
                </span>
                <button
                  aria-label="Show previous seasonal Urli"
                  onClick={() => {
                    setSeasonalCarouselPaused(true)
                    setSeasonalUrliIndex(
                      (seasonalUrliIndex - 1 + seasonalUrliSlides.length) %
                        seasonalUrliSlides.length,
                    )
                  }}
                >
                  ←
                </button>
                <button
                  aria-label={
                    seasonalCarouselPaused
                      ? "Play seasonal Urli carousel"
                      : "Pause seasonal Urli carousel"
                  }
                  onClick={() => setSeasonalCarouselPaused((paused) => !paused)}
                >
                  {seasonalCarouselPaused ? "Play" : "Pause"}
                </button>
                <button
                  aria-label="Show next seasonal Urli"
                  onClick={() => {
                    setSeasonalCarouselPaused(true)
                    setSeasonalUrliIndex(
                      (seasonalUrliIndex + 1) % seasonalUrliSlides.length,
                    )
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="seasonal-copy">
            <p className="eyebrow">Main character, always</p>
            <h2>A season held in soft gold.</h2>
            <p>
              Our festive edit layers marigold warmth, sculptural wax, and
              after-dark fragrance. Made for Diwali tables, wedding favours, and
              winter evenings that stretch a little longer.
            </p>
            <div className="drop-list">
              <div>
                <span>Oct</span>
                <p>
                  <strong>Diwali Edit</strong>
                  <small>Amber light & marigold notes</small>
                </p>
              </div>
              <div>
                <span>Nov</span>
                <p>
                  <strong>Shaadi Season</strong>
                  <small>Personalised favours for joyful gatherings</small>
                </p>
              </div>
              <div>
                <span>Dec</span>
                <p>
                  <strong>Winter Table</strong>
                  <small>Spiced pours for slower evenings</small>
                </p>
              </div>
            </div>
            <div className="seasonal-actions">
              <a className="button primary" href="#urli">
                Pour joy into your space <Icon name="arrow" />
              </a>
              <a className="button secondary dark" href="#halloween">
                Halloween special <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="section product-section halloween-section"
          id="halloween"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Witch&apos;s brew</p>
              <h2>Mischief, shaped in wax.</h2>
            </div>
            <p>
              Darkly playful, hand-poured Halloween candle gifts with toxin-free
              fragrance and a smoke-free burn—for haunted tables, midnight
              hosts, and homes that like their glow with a little mischief.
            </p>
          </div>
          <ProductGrid
            collection={halloweenProducts}
            onAdd={addToBag}
            onOpen={openProduct}
          />
        </section>

        <section className="gifting section" id="gifting">
          <div className="gifting-copy">
            <p className="eyebrow">The art of giving</p>
            <h2>First the candle. Then, the little details.</h2>
            <p>
              Make the unboxing feel as meaningful as the gift itself. Choose a
              wrap, add a handwritten note and black-and-white Melt Culture
              sticker, then select the box that fits the moment.
            </p>
            <ol className="ritual-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Choose their glow</strong>
                  <p>Pick a piece that feels like them.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Add your words</strong>
                  <p>We handwrite your message on a keepsake card.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Dress the gift</strong>
                  <p>
                    Choose included brown corrugated or upgrade to aqua or
                    black.
                  </p>
                </div>
              </li>
            </ol>
            <div className="future-gifting">
              <p>Gifting at scale</p>
              <strong>From baby showers to boardrooms.</strong>
              <span>
                Thoughtful candle gifting for shaadi season, winter
                celebrations, baby showers, private events, and corporate
                gatherings.
              </span>
              <a
                className="button secondary dark"
                href="#events"
              >
                Start a bulk enquiry <Icon name="arrow" />
              </a>
            </div>
          </div>
          <div className="packaging-card">
            <div className="box-visuals" aria-label="Three packaging choices">
              {packagingOptions.map((option) => (
                <img
                  alt={`${option.label} presentation`}
                  key={option.value}
                  loading="lazy"
                  src={option.image}
                />
              ))}
            </div>
            <div className="packaging-caption">
              <p>Brown corrugated box</p>
              <span>Included</span>
              <small>Basic included packaging.</small>
              <i />
              <p>Aqua keepsake box</p>
              <span>+ ₹99</span>
              <small>Premium aqua gift box upgrade.</small>
              <i />
              <p>Black V-box</p>
              <span>+ ₹149</span>
              <small>Luxury black gift box upgrade.</small>
              <i />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="bulk-gifting-title"
          className="bulk-gifting section"
          id="events"
        >
          <div className="bulk-gifting-copy">
            <p className="eyebrow">Bulk · Corporate · Events</p>
            <h2 id="bulk-gifting-title">A considered gift, multiplied.</h2>
            <p>
              Planning festive hampers, wedding favours, client gifts, or an
              event table? Tell us the scale and the story. We’ll help curate
              candles, packaging, message cards, and delivery around your
              occasion.
            </p>
            <div className="bulk-benefits" aria-label="Bulk gifting services">
              <span>
                <Icon name="check" size={16} /> Small-batch curation
              </span>
              <span>
                <Icon name="check" size={16} /> Custom message cards
              </span>
              <span>
                <Icon name="check" size={16} /> Packaging guidance
              </span>
              <span>
                <Icon name="check" size={16} /> Multi-address planning
              </span>
            </div>
            <p className="bulk-response-note">
              Share your brief below. Our gifting team will reply on WhatsApp
              or email with availability and next steps.
            </p>
          </div>
          <div className="bulk-form-card">
            {!inquirySent ? (
              <>
                <div className="bulk-form-heading">
                  <span>Private enquiry</span>
                  <h3>Plan your gifting moment.</h3>
                </div>
                <form className="bulk-form" onSubmit={submitBulkInquiry}>
                  <label>
                    Your name
                    <input
                      autoComplete="name"
                      name="name"
                      placeholder="Full name"
                      required
                    />
                  </label>
                  <label>
                    Company or event
                    <input
                      autoComplete="organization"
                      name="company"
                      placeholder="Optional"
                    />
                  </label>
                  <label>
                    Work email
                    <input
                      autoComplete="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                      type="email"
                    />
                  </label>
                  <label>
                    WhatsApp number
                    <input
                      autoComplete="tel"
                      inputMode="numeric"
                      name="mobile"
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      required
                      type="tel"
                    />
                  </label>
                  <label>
                    Occasion
                    <select defaultValue="" name="occasion" required>
                      <option disabled value="">
                        Select an occasion
                      </option>
                      <option>Corporate gifting</option>
                      <option>Wedding or celebration</option>
                      <option>Festive hampers</option>
                      <option>Baby shower</option>
                      <option>Private event</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    Approximate quantity
                    <input
                      min={10}
                      name="quantity"
                      placeholder="e.g. 50"
                      required
                      type="number"
                    />
                  </label>
                  <label>
                    Needed by
                    <input name="timeline" required type="date" />
                  </label>
                  <label>
                    Budget per gift
                    <select defaultValue="" name="budget" required>
                      <option disabled value="">
                        Choose a range
                      </option>
                      <option>Under ₹500</option>
                      <option>₹500–₹999</option>
                      <option>₹1,000–₹1,999</option>
                      <option>₹2,000 and above</option>
                      <option>Need guidance</option>
                    </select>
                  </label>
                  <label className="wide">
                    Tell us about the brief
                    <textarea
                      name="message"
                      placeholder="Products you like, delivery cities, personalisation, or anything we should know"
                      required
                      rows={4}
                    />
                  </label>
                  {inquiryError && (
                    <p className="form-error wide" role="alert">
                      {inquiryError}
                    </p>
                  )}
                  <button
                    className="button primary full wide"
                    disabled={inquirySending}
                    type="submit"
                  >
                    {inquirySending ? "Sending enquiry…" : "Send gifting brief"}{" "}
                    <Icon name="arrow" />
                  </button>
                  <small className="bulk-privacy wide">
                    Your details are used only to respond to this enquiry.
                  </small>
                </form>
              </>
            ) : (
              <div
                aria-live="polite"
                className="bulk-confirmation"
                role="status"
              >
                <span className="confirmation-icon">
                  <Icon name="check" size={36} />
                </span>
                <p className="eyebrow">Brief received</p>
                <h3>We’ll help shape the details.</h3>
                <p>
                  Our gifting team will review your occasion, quantity, and
                  timeline, then reply using the contact details you shared.
                </p>
                <button
                  className="button secondary"
                  onClick={() => setInquirySent(false)}
                  type="button"
                >
                  Send another enquiry
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="community" id="story">
          <div className="community-quote">
            <p className="eyebrow">Our story</p>
            <h2>
              Made by hand,
              <br />
              meant for gathering.
            </h2>
          </div>
          <div className="community-copy">
            <p>
              Melt Culture began at flea-market tables: curious hands, honest
              conversations, and candles people couldn’t resist picking up. We
              still hand-pour every artisan candle in small batches, using a soy
              wax and beeswax blend and toxin-free fragrances.
            </p>
            <blockquote>
              “Every flame begins a ritual; every gift carries it forward.”
            </blockquote>
            <a className="text-link light" href="#urli">
              Meet the collection
            </a>
          </div>
        </section>

        <section className="trust section" aria-labelledby="trust-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Good to know</p>
              <h2 id="trust-title">Joy, with no guesswork.</h2>
            </div>
          </div>
          <div className="trust-grid">
            <article>
              <span>01</span>
              <h3>Candle care, made simple</h3>
              <p>
                Our considered soy-beeswax blend and toxin-free fragrances are
                designed for a clean, smoke-free burn. Always trim the wick and
                never leave a flame unattended.
              </p>
              <a href="#footer">Read care guide</a>
            </article>
            <article>
              <span>02</span>
              <h3>Transparent delivery</h3>
              <p>
                Delivery typically takes 5–7 business days. Free standard
                shipping on orders above ₹1,200.
              </p>
              <a href="#footer">Shipping & returns</a>
            </article>
            <article>
              <span>03</span>
              <h3>Payments, protected</h3>
              <p>
                UPI, cards and netbanking are securely processed by Razorpay. We
                never store card data.
              </p>
              <a href="#footer">Payment security</a>
            </article>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="footer-brand">
          <Logo />
          <p>
            Artisan handmade candle gifts, hand-poured in India with a soy wax
            and beeswax blend, toxin-free fragrances, and sculptural detail.
          </p>
          <button className="support-link" onClick={() => setSupportOpen(true)}>
            <Icon name="chat" /> WhatsApp support request
          </button>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <a href="#urli">Urli collection</a>
            <a href="#halloween">Halloween special</a>
            <a href="#botanicals">Terrariums & floral candles</a>
            <a href="#sweet-illusions">Sweet illusions</a>
            <a href="#gifting">Gifting</a>
            <a href="#events">Bulk & corporate orders</a>
            <a href="#seasonal">Limited season</a>
          </div>
          <div>
            <strong>Help</strong>
            <a href="#trust-title">Candle care</a>
            <a href="#trust-title">Shipping & returns</a>
            <a href="#footer">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="#footer">Privacy</a>
            <a href="#footer">Terms</a>
            <a href="#brand-moodboard">Brand moodboard</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Melt Culture</span>
          <span>
            <Icon name="lock" size={15} /> Secure checkout by Razorpay
          </span>
        </div>
      </footer>

      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}

      {selectedProduct && (
        <div className="pdp-overlay" role="presentation">
          <section
            aria-label={`${selectedProduct.name} product details`}
            aria-modal="true"
            className="pdp"
            ref={pdpDialogRef}
            role="dialog"
          >
            <button
              aria-label="Back to product collection"
              className="pdp-back"
              onClick={closeProduct}
              type="button"
            >
              ← Back to collection
            </button>
            <button
              aria-label="Close product details"
              className="icon-button pdp-close"
              onClick={closeProduct}
              ref={pdpCloseRef}
            >
              <Icon name="close" />
            </button>
            <div className="pdp-media">
              <div
                className={`pdp-media-main ${editorialMediaClass} ${
                  selectedProduct.category === "Halloween special"
                    ? "halloween-media"
                    : ""
                }`}
              >
                <picture className="pdp-hero-picture">
                  {activeProductWebp && (
                    <source
                      sizes="(min-width: 1025px) 54vw, 100vw"
                      srcSet={`${activeProductWebp.small} 480w, ${activeProductWebp.large} 960w, ${activeProductWebp.xlarge} 2000w`}
                      type="image/webp"
                    />
                  )}
                  <img
                    alt={`${selectedProduct.name}, ${selectedProduct.category}, hand-poured by Melt Culture`}
                    className={
                      selectedProduct.imageFit === "contain"
                        ? "contain-product-image"
                        : undefined
                    }
                    decoding="async"
                    loading="lazy"
                    sizes="(min-width: 1025px) 54vw, 100vw"
                    src={activeProductImage}
                  />
                </picture>
                <div aria-hidden="true" className="pdp-editorial-props">
                  <span className="editorial-petal petal-one" />
                  <span className="editorial-petal petal-two" />
                  <span className="editorial-jasmine" />
                  <span className="editorial-cinnamon cinnamon-one" />
                  <span className="editorial-cinnamon cinnamon-two" />
                </div>
                {selectedProduct.mediaGallery?.[activeMediaIndex] ===
                  "/products/lilac-rosette-bowl-top.jpg" && (
                  <img
                    alt=""
                    aria-hidden="true"
                    className="wick-overlay"
                    src="/products/lilac-rosette-bowl-wick.svg"
                  />
                )}
                <span>{selectedProduct.category}</span>
              </div>
              {(selectedProduct.mediaGallery?.length ?? 0) > 1 && (
                <div
                  aria-label={`${selectedProduct.name} media gallery`}
                  className="pdp-thumbnails"
                >
                  {selectedProduct.mediaGallery?.map((image, index) => (
                    <button
                      aria-label={`Show ${selectedProduct.name} gallery image ${index + 1}`}
                      aria-pressed={activeMediaIndex === index}
                      key={image}
                      onClick={() => setActiveMediaIndex(index)}
                    >
                      <img
                        alt={`${selectedProduct.name} view ${index + 1}`}
                        decoding="async"
                        loading="lazy"
                        src={responsiveProductImage(image)?.small ?? image}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="pdp-content">
              <p className="eyebrow">Artisan handmade · Hand-poured in India</p>
              <h2>{selectedProduct.name}</h2>
              <strong className="pdp-price">
                {money(selectedProduct.price)}
              </strong>
              <p className="pdp-story">{productDescription(selectedProduct)}</p>
              <div className="pdp-purchase-panel">
                <label className="choice pdp-gift">
                  <input
                    checked={giftWrap}
                    onChange={(event) => setGiftWrap(event.target.checked)}
                    type="checkbox"
                  />
                  <span>
                    <strong>Make it a gift · ₹49</strong>
                    <small>
                      Gift wrap, handwritten message card, and black-and-white
                      sticker
                    </small>
                  </span>
                </label>
                <PackagingChoices
                  className="pdp-packaging"
                  name="pdp-packaging"
                  onChange={setPackaging}
                  selected={packaging}
                />
                <button
                  className="button primary full"
                  onClick={() => {
                    addToBag(selectedProduct)
                    closeProduct()
                    setBagOpen(true)
                  }}
                >
                  Add to gift bag ·{" "}
                  {money(
                    selectedProduct.price + packagePrice + (giftWrap ? 49 : 0),
                  )}
                </button>
                <div
                  className="pdp-assurances"
                  aria-label="Product assurances"
                >
                  <span>
                    <Icon name="check" size={15} /> Soy + beeswax blend
                  </span>
                  <span>
                    <Icon name="check" size={15} /> Toxin-free fragrance
                  </span>
                  <span>
                    <Icon name="check" size={15} /> Smoke-free burn
                  </span>
                  <span>
                    <Icon name="check" size={15} /> Delivery in 5–7 business
                    days
                  </span>
                </div>
              </div>
              <p className="pdp-description">
                {selectedProduct.category === "Urli collection"
                  ? "A ceremonial brass Urli, hand-poured in a small batch and finished bloom by bloom. Rooted in the Indian tradition of welcoming light, each piece is made for festive tables, wedding rituals, and gifts that carry memory forward."
                  : "An artisan candle hand-poured in small batches with our soy wax and beeswax blend. Every sculptural detail is finished by hand, giving each piece its own character and making every gift genuinely one of a kind."}
              </p>
              {selectedProduct.dimensions && (
                <dl className="pdp-specs" aria-label="Product dimensions">
                  <div>
                    <dt>Length</dt>
                    <dd>{selectedProduct.dimensions.length} cm</dd>
                  </div>
                  <div>
                    <dt>Breadth</dt>
                    <dd>{selectedProduct.dimensions.breadth} cm</dd>
                  </div>
                  <div>
                    <dt>Height</dt>
                    <dd>{selectedProduct.dimensions.height} cm</dd>
                  </div>
                </dl>
              )}
              <div
                aria-label="Current Melt Culture offers"
                className="pdp-offer-reminder"
                role="note"
              >
                <strong>Current gifting offers</strong>
                <span>Complimentary delivery on orders over ₹1,200</span>
                <span>
                  Spend ₹2,000 and enjoy 5% off plus a complimentary gift box
                </span>
                <span>
                  Gift wrap, handwritten message card, and black-and-white
                  sticker · ₹49
                </span>
              </div>
              <section
                className="related-products"
                aria-labelledby="related-title"
              >
                <div className="related-heading">
                  <p className="eyebrow">Complete the gift</p>
                  <h3 id="related-title">You might also like</h3>
                </div>
                <div className="related-grid">
                  {selectedProduct.relatedIds.map((relatedId) => {
                    const related = allProducts.find(
                      (product) => product.id === relatedId,
                    )
                    if (!related) return null
                    return (
                      <article className="related-card" key={related.id}>
                        <button
                          aria-label={`View ${related.name}`}
                          className="related-image"
                          onClick={() => openProduct(related)}
                        >
                          <img
                            alt={`${related.name} candle`}
                            className={
                              related.imageFit === "contain"
                                ? "contain-product-image light-product-image"
                                : related.category === "Halloween special"
                                  ? "contain-product-image"
                                : undefined
                            }
                            loading="lazy"
                            src={
                              responsiveProductImage(related.image)?.small ??
                              related.image
                            }
                          />
                        </button>
                        <div className="related-info">
                          <div>
                            <h4>{related.name}</h4>
                            <strong>{money(related.price)}</strong>
                          </div>
                          <div className="related-actions">
                            <button onClick={() => addToBag(related)}>
                              Add
                            </button>
                            <button onClick={() => openProduct(related)}>
                              Details
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            </div>
          </section>
        </div>
      )}

      {bagOpen && (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={() => setBagOpen(false)}
        >
          <aside
            aria-label="Your gift bag"
            className="drawer"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">Almost there</p>
                <h2>Your gift bag.</h2>
              </div>
              <button
                aria-label="Close gift bag"
                className="icon-button"
                onClick={() => setBagOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="bag-items">
              {cartGroups.map(({ product, quantity }) => (
                <article className="bag-item" key={product.id}>
                  <img
                    alt={`${product.name} candle`}
                    loading="lazy"
                    src={
                      responsiveProductImage(product.image)?.small ??
                      product.image
                    }
                  />
                  <div>
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                    <strong>{money(product.price * quantity)}</strong>
                    <div
                      className="quantity-control"
                      aria-label={`Quantity for ${product.name}`}
                    >
                      <button
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => changeQuantity(product, -1)}
                      >
                        −
                      </button>
                      <span aria-live="polite">{quantity}</span>
                      <button
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => changeQuantity(product, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() =>
                        setCart((items) =>
                          items.filter((item) => item.id !== product.id),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="personalise">
              <h3>Turn it into a gift.</h3>
              <label className="choice">
                <input
                  checked={giftWrap}
                  onChange={(event) => setGiftWrap(event.target.checked)}
                  type="checkbox"
                />
                <span>
                  <strong>Gift-ready wrap set</strong>
                  <small>
                    Soft-touch wrap, ribbon, message card + black-and-white
                    sticker
                  </small>
                </span>
                <b>₹49</b>
              </label>
              {giftWrap && (
                <label className="message-field">
                  Handwritten message card
                  <textarea
                    maxLength={120}
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                  />
                  <small>{message.length}/120 characters</small>
                </label>
              )}
              <PackagingChoices
                name="packaging"
                onChange={setPackaging}
                selected={packaging}
              />
            </div>
            <div className="summary">
              <p>
                <span>Merchandise</span>
                <strong>{money(subtotal)}</strong>
              </p>
              <p>
                <span>Gift-ready wrap set</span>
                <strong>{giftWrap ? "₹49" : "₹0"}</strong>
              </p>
              <p>
                <span>Packaging · {selectedPackaging.label}</span>
                <strong>{money(packagePrice)}</strong>
              </p>
              <p>
                <span>{deliveryLabel}</span>
                <strong>{money(deliveryFee)}</strong>
              </p>
              {deliveryDiscount > 0 && (
                <p className="delivery-discount">
                  <span>Complimentary delivery discount</span>
                  <strong>−{money(deliveryDiscount)}</strong>
                </p>
              )}
              <div className="shipping-guidance">
                <span>{deliveryLabel} · 5–7 business days</span>
                <span>Calculated from your cart size</span>
                <strong>
                  {deliveryDiscount > 0
                    ? "You’ve unlocked complimentary delivery"
                    : `Add ${money(amountUntilFreeDelivery)} more for complimentary delivery`}
                </strong>
              </div>
              <p className="summary-total">
                <span>Order total</span>
                <strong>{money(total)}</strong>
              </p>
            </div>
            <button
              className="button primary full"
              disabled={!cart.length}
              onClick={() => {
                setBagOpen(false)
                setCheckout(true)
              }}
            >
              Continue as guest <Icon name="arrow" />
            </button>
            <p className="fine-print">
              <Icon name="lock" size={14} /> Secure payment powered by Razorpay
            </p>
          </aside>
        </div>
      )}

      {checkout && (
        <div className="overlay checkout-overlay" role="presentation">
          <section aria-label="Checkout" className="checkout-modal">
            {!confirmed ? (
              <>
                <div className="drawer-header">
                  <div>
                    <p className="eyebrow">Complete the ritual</p>
                    <h2>
                      From our hands.
                      <br />
                      To their home.
                    </h2>
                  </div>
                  <button
                    aria-label="Close checkout"
                    className="icon-button"
                    onClick={() => setCheckout(false)}
                  >
                    <Icon name="close" />
                  </button>
                </div>
                <form className="checkout-form" onSubmit={completeOrder}>
                  <input
                    name="orderId"
                    type="hidden"
                    value={paymentOrderId}
                  />
                  <input
                    name="customer"
                    type="hidden"
                    value={validatedDelivery?.fullName ?? ""}
                  />
                  <input name="amount" type="hidden" value={total} />
                  <div className="form-grid">
                    <label>
                      Email address
                      <input
                        name="email"
                        required
                        type="email"
                        placeholder="you@example.com"
                      />
                    </label>
                    <label>
                      Mobile number
                      <input
                        name="mobile"
                        required
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                      />
                    </label>
                    <label>
                      Full name
                      <input name="fullName" required placeholder="Your name" />
                    </label>
                    <label>
                      PIN code
                      <input
                        aria-describedby={pinError ? "pin-error" : undefined}
                        aria-invalid={Boolean(pinError)}
                        required
                        inputMode="numeric"
                        maxLength={6}
                        onBlur={async () => {
                          if (checkoutAddress.pin.length !== 6) return
                          try {
                            const location = await resolveIndianPin(
                              checkoutAddress.pin,
                            )
                            if (!location) {
                              setPinValidated(false)
                              setPinError("We could not verify this PIN code.")
                              return
                            }
                            setCheckoutAddress((address) => ({
                              ...address,
                              city: location.city,
                              state: location.state,
                            }))
                            setPinValidated(true)
                            setPinError("")
                          } catch {
                            setPinValidated(false)
                            setPinError(
                              "PIN verification is temporarily unavailable.",
                            )
                          }
                        }}
                        onChange={(event) => {
                          const pin = event.target.value.replace(/\D/g, "")
                          const location = pinDirectory[pin]
                          setCheckoutAddress((address) => ({
                            ...address,
                            pin,
                            city: location?.city ?? address.city,
                            state: location?.state ?? address.state,
                          }))
                          setPinValidated(false)
                          setPinError("")
                        }}
                        pattern="[0-9]{6}"
                        placeholder="6-digit PIN"
                        value={checkoutAddress.pin}
                      />
                    </label>
                    <label className="wide">
                      Delivery address
                      <textarea
                        name="address"
                        required
                        placeholder="Flat, building, street and landmark"
                      />
                    </label>
                    <label>
                      City
                      <input
                        required
                        onChange={(event) => {
                          setPinValidated(false)
                          setCheckoutAddress((address) => ({
                            ...address,
                            city: event.target.value,
                          }))
                        }}
                        placeholder="City"
                        value={checkoutAddress.city}
                      />
                    </label>
                    <label>
                      State
                      <input
                        required
                        onChange={(event) => {
                          setPinValidated(false)
                          setCheckoutAddress((address) => ({
                            ...address,
                            state: event.target.value,
                          }))
                        }}
                        placeholder="State"
                        value={checkoutAddress.state}
                      />
                    </label>
                  </div>
                  {pinError && (
                    <p className="form-error" id="pin-error" role="alert">
                      {pinError}
                    </p>
                  )}
                  {pinValidated && !pinError && (
                    <p className="delivery-estimate" role="status">
                      Delivering to {checkoutAddress.city} {checkoutAddress.pin}{" "}
                      · Estimated in 5–7 business days
                    </p>
                  )}
                  <div
                    aria-label="Delivery charge summary"
                    className="checkout-delivery-summary"
                  >
                    <p>
                      <span>{deliveryLabel}</span>
                      <strong>{money(deliveryFee)}</strong>
                    </p>
                    {deliveryDiscount > 0 && (
                      <p className="delivery-discount">
                        <span>Complimentary delivery discount</span>
                        <strong>−{money(deliveryDiscount)}</strong>
                      </p>
                    )}
                    <small>{deliveryLabel} · 5–7 business days</small>
                    <small>Calculated from your cart size</small>
                    <b>
                      {deliveryDiscount > 0
                        ? "You’ve unlocked complimentary delivery"
                        : `Add ${money(amountUntilFreeDelivery)} more for complimentary delivery`}
                    </b>
                  </div>
                  <div className="checkout-summary">
                    <span className="checkout-summary-copy">
                      <b>
                        {cart.length} item{cart.length !== 1 ? "s" : ""}
                      </b>
                      <small>{selectedPackaging.label}</small>
                      <small>
                        {giftWrap
                          ? "Gift wrap, handwritten card + sticker · ₹49"
                          : "Gift wrap not selected"}
                      </small>
                    </span>
                    <strong>{money(total)}</strong>
                  </div>
                  <button
                    className="button primary full razorpay-button"
                    disabled={paymentLoading}
                    type="submit"
                  >
                    {paymentLoading
                      ? "Starting secure payment…"
                      : "Pay securely with Razorpay"}{" "}
                    <Icon name="lock" />
                  </button>
                  <p className="fine-print">
                    Secure checkout activates Razorpay in the published
                    environment.
                  </p>
                </form>
              </>
            ) : (
              <div className="confirmation" role="status">
                <span className="confirmation-icon">
                  <Icon name="check" size={36} />
                </span>
                <p className="eyebrow">Order confirmed</p>
                <h2>Your ritual is on its way.</h2>
                <p>
                  We’ve saved your gifting choices and sent a confirmation to
                  your email. Your order reference is{" "}
                  <strong>{confirmedOrderReference}</strong>.
                </p>
                <div
                  className="confirmation-summary"
                  aria-label="Confirmed order summary"
                >
                  {cartGroups.map(({ product, quantity }) => (
                    <p key={product.id}>
                      <span>
                        {product.name} × {quantity}
                      </span>
                      <strong>{money(product.price * quantity)}</strong>
                    </p>
                  ))}
                  <p>
                    <span>Packaging</span>
                    <strong>{selectedPackaging.label}</strong>
                  </p>
                  <p>
                    <span>Gift-ready wrap set</span>
                    <strong>
                      {giftWrap ? "Included · ₹49" : "Not selected"}
                    </strong>
                  </p>
                  <p>
                    <span>Message card</span>
                    <strong>{giftWrap ? message : "Not selected"}</strong>
                  </p>
                  <p>
                    <span>Black-and-white sticker</span>
                    <strong>{giftWrap ? "Included" : "Not selected"}</strong>
                  </p>
                  <p>
                    <span>{deliveryLabel}</span>
                    <strong>{money(deliveryFee)}</strong>
                  </p>
                  {deliveryDiscount > 0 && (
                    <p className="delivery-discount">
                      <span>Complimentary delivery discount</span>
                      <strong>−{money(deliveryDiscount)}</strong>
                    </p>
                  )}
                  {validatedDelivery && (
                    <>
                      <p>
                        <span>Deliver to</span>
                        <strong>{validatedDelivery.fullName}</strong>
                      </p>
                      <p>
                        <span>Delivery address</span>
                        <strong>
                          {validatedDelivery.address}, {validatedDelivery.city},{" "}
                          {validatedDelivery.state} {validatedDelivery.pin}
                        </strong>
                      </p>
                      <p>
                        <span>Contact</span>
                        <strong>
                          {validatedDelivery.mobile} · {validatedDelivery.email}
                        </strong>
                      </p>
                    </>
                  )}
                  <p className="summary-total">
                    <span>Total</span>
                    <strong>{money(total)}</strong>
                  </p>
                </div>
                <button
                  className="button primary"
                  onClick={() => {
                    setCheckout(false)
                    setConfirmed(false)
                    setPaymentOrderId("")
                    setConfirmedOrderReference("")
                    setValidatedDelivery(null)
                    setCart([])
                  }}
                >
                  Keep exploring
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {supportOpen && (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={() => setSupportOpen(false)}
        >
          <section
            aria-label="WhatsApp support request"
            className="support-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close support form"
              className="icon-button modal-close"
              onClick={() => setSupportOpen(false)}
            >
              <Icon name="close" />
            </button>
            {!supportSent ? (
              <>
                <p className="eyebrow">WhatsApp connect</p>
                <h2>Tell us how we can help.</h2>
                <p>
                  Share a few details and our gifting team will reply on
                  WhatsApp. Your number stays private.
                </p>
                <form className="support-form" onSubmit={submitSupport}>
                  <label>
                    Name
                    <input name="name" required />
                  </label>
                  <label>
                    Email
                    <input name="email" required type="email" />
                  </label>
                  <label>
                    Mobile
                    <input
                      inputMode="numeric"
                      name="mobile"
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                    />
                  </label>
                  <label>
                    Order ID <small>(optional)</small>
                    <input name="orderId" />
                  </label>
                  <label>
                    Message
                    <textarea name="message" required rows={4} />
                  </label>
                  {supportError && (
                    <p className="form-error" role="alert">
                      {supportError}
                    </p>
                  )}
                  <button
                    className="button primary full"
                    disabled={supportSending}
                    type="submit"
                  >
                    {supportSending
                      ? "Sending request…"
                      : "Send support request"}{" "}
                    <Icon name="arrow" />
                  </button>
                </form>
              </>
            ) : (
              <div aria-live="polite" className="confirmation" role="status">
                <span className="confirmation-icon">
                  <Icon name="check" size={36} />
                </span>
                <h2>Request received.</h2>
                <p>
                  Your request was delivered. Our team will reply to the mobile
                  number you provided.
                </p>
                <button
                  className="button primary"
                  onClick={() => {
                    setSupportOpen(false)
                    setSupportSent(false)
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
