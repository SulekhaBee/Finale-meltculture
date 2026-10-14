type BrandMoodboardProps = {
  onClose: () => void
}

const palette = [
  {
    className: "mood-swatch-charcoal",
    hex: "#1C1C1C",
    name: "Charcoal Black",
    use: "Primary text, dark surfaces, structure",
  },
  {
    className: "mood-swatch-ivory",
    hex: "#F9F9F9",
    name: "Warm Ivory",
    use: "Canvas, cards, breathing room",
  },
  {
    className: "mood-swatch-gold",
    hex: "#D4AF37",
    name: "Deep Gold",
    use: "Primary actions, ceremony, emphasis",
  },
  {
    className: "mood-swatch-emerald",
    hex: "#2E6F40",
    name: "Emerald Green",
    use: "Urli and craft highlights",
  },
  {
    className: "mood-swatch-ruby",
    hex: "#9B1C31",
    name: "Ruby Red",
    use: "Ritual and celebratory details",
  },
  {
    className: "mood-swatch-sapphire",
    hex: "#1E3A5F",
    name: "Sapphire Blue",
    use: "Botanical and premium accents",
  },
]

const imageDirections = [
  {
    alt: "Blue floral candle in a ceremonial brass Urli styled with marigolds",
    caption: "Ceremony",
    description: "Brass, flowers, fabric and the anticipation of gathering.",
    fallback: "/products/neel-pushp-urli.jpg",
    webp: "/products/webp/960/neel-pushp-urli.webp",
  },
  {
    alt: "Lilac floral candle in a brass Urli styled for festive gifting",
    caption: "Gifting",
    description: "Objects should feel chosen, wrapped and ready to be remembered.",
    fallback: "/products/lilac-garden-urli.jpg",
    webp: "/products/webp/960/lilac-garden-urli.webp",
  },
  {
    alt: "Hand-poured lemongrass succulent candle on textured ivory fabric",
    caption: "Craft",
    description: "Show the hand-finished detail, material texture and slight variation.",
    fallback: "/products/lemongrass-succulent-bowl-front.jpg",
    webp: "/products/webp/960/lemongrass-succulent-bowl-front.webp",
  },
]

function MoodIcon({ name }: { name: "flame" | "gift" | "leaf" }) {
  const paths = {
    flame: <path d="M12 21c4 0 7-2.7 7-6.5 0-3.2-2.2-5.6-4.7-8.4-.3 2.2-1.4 3.6-2.7 4.8-.2-2.8-1.5-5.3-3.4-7.4.1 3.8-3.2 6.1-3.2 10.8C5 18.2 8 21 12 21Z" />,
    gift: (
      <>
        <path d="M4 10h16v10H4V10Zm8 0v10M3 7h18v3H3V7Z" />
        <path d="M12 7H8.5a2.5 2.5 0 1 1 2.4-3.2L12 7Zm0 0h3.5a2.5 2.5 0 1 0-2.4-3.2L12 7Z" />
      </>
    ),
    leaf: <path d="M20 4C11 4 5 8.8 5 15c0 2.8 2.2 5 5 5 6.2 0 10-7 10-16ZM4 21c2.5-5.5 6.5-9.5 12-12" />,
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  )
}

export default function BrandMoodboard({ onClose }: BrandMoodboardProps) {
  return (
    <div className="brand-moodboard">
      <header className="moodboard-header">
        <a aria-label="Melt Culture brand moodboard" className="moodboard-mark" href="#brand-moodboard">
          <img alt="" src="/assets/3efae.svg" />
          <span>
            <strong>CULTURE</strong>
            <small>Brand moodboard · Design system</small>
          </span>
        </a>
        <button className="moodboard-close" onClick={onClose} type="button">
          Return to storefront
        </button>
      </header>

      <main>
        <section className="moodboard-hero" aria-labelledby="moodboard-title">
          <div>
            <p className="moodboard-kicker">Melt Culture · Visual language 01</p>
            <h1 id="moodboard-title">Objects of light. Rituals of belonging.</h1>
            <p>
              A design system shaped by Indian celebration, hand-poured craft,
              and the quiet emotion of giving something made to be remembered.
            </p>
            <div className="moodboard-principles" aria-label="Brand principles">
              <span>Artisanal</span>
              <span>Ceremonial</span>
              <span>Joyful</span>
            </div>
          </div>
          <picture>
            <source
              srcSet="/products/webp/960/neel-pushp-urli.webp"
              type="image/webp"
            />
            <img
              alt="Neel Pushp floral candle in a brass Urli, styled for an Indian celebration"
              decoding="async"
              src="/products/neel-pushp-urli.jpg"
            />
          </picture>
        </section>

        <section className="moodboard-section moodboard-palette" aria-labelledby="palette-title">
          <div className="moodboard-section-heading">
            <p>01 · Colour</p>
            <h2 id="palette-title">Ivory and charcoal, lit by gold.</h2>
            <span>
              Jewel tones are punctuation, never the whole sentence. Purple and
              orange sit outside the system.
            </span>
          </div>
          <div className="moodboard-swatches">
            {palette.map((color) => (
              <article className="moodboard-swatch" key={color.name}>
                <div className={color.className} />
                <p>
                  <strong>{color.name}</strong>
                  <code>{color.hex}</code>
                </p>
                <span>{color.use}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="moodboard-section moodboard-type" aria-labelledby="type-title">
          <div className="moodboard-section-heading">
            <p>02 · Typography</p>
            <h2 id="type-title">Editorial grace. Everyday clarity.</h2>
            <span>
              Cormorant Garamond carries emotion; Arimo keeps every action and
              detail effortless to read.
            </span>
          </div>
          <div className="moodboard-type-specimens">
            <article className="type-display">
              <span>Display / Cormorant Garamond Semibold</span>
              <p>Tradition, poured anew.</p>
              <small>Hero H1 · fluid 52–92 · compact line height</small>
            </article>
            <article className="type-heading">
              <span>Section / Cormorant Garamond Semibold</span>
              <p>Celebrate light and memory.</p>
              <small>H2 · fluid 38–70 · confident hierarchy</small>
            </article>
            <article className="type-body">
              <span>Body / Arimo Regular</span>
              <p>
                Every piece is poured in a small batch and finished by hand,
                ready to become part of a table, a home and a story.
              </p>
              <small>Body · 16px minimum · generous 1.6 line height</small>
            </article>
          </div>
        </section>

        <section className="moodboard-section moodboard-imagery" aria-labelledby="imagery-title">
          <div className="moodboard-section-heading">
            <p>03 · Image direction</p>
            <h2 id="imagery-title">Photograph the ritual, not only the product.</h2>
            <span>
              Warm directional light, tactile cloth, brass, wood and floral
              traces create a world that feels lived in rather than staged.
            </span>
          </div>
          <div className="moodboard-image-grid">
            {imageDirections.map((image) => (
              <figure key={image.caption}>
                <picture>
                  <source srcSet={image.webp} type="image/webp" />
                  <img
                    alt={image.alt}
                    decoding="async"
                    loading="lazy"
                    src={image.fallback}
                  />
                </picture>
                <figcaption>
                  <strong>{image.caption}</strong>
                  <span>{image.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="moodboard-do-dont">
            <p>
              <strong>Seek</strong>
              Warm light · fabric grain · brass patina · hands and gathering ·
              cultural context
            </p>
            <p>
              <strong>Avoid</strong>
              Generic stock flat lays · clinical white voids · artificial
              gradients · props without meaning
            </p>
          </div>
        </section>

        <section className="moodboard-section moodboard-components" aria-labelledby="components-title">
          <div className="moodboard-section-heading">
            <p>04 · Marks and components</p>
            <h2 id="components-title">Quiet structure. Golden invitations.</h2>
            <span>
              The logo stays charcoal and gold. Icons remain minimal, while
              primary actions always feel warm, clear and unmistakable.
            </span>
          </div>
          <div className="moodboard-component-grid">
            <article className="moodboard-logo-stage">
              <div className="moodboard-logo-lockup">
                <img alt="Melt Culture gold logo glyph" src="/assets/3efae.svg" />
                <strong>CULTURE</strong>
                <small>HAND POURED · ARTFULLY MADE</small>
              </div>
              <p>Gold glyph · charcoal wordmark · generous clear space</p>
            </article>
            <article className="moodboard-controls">
              <p>Primary and secondary actions</p>
              <button className="button primary" type="button">
                Gift a ritual
              </button>
              <button className="moodboard-secondary-button" type="button">
                View the collection
              </button>
              <span>Gold pill · black text · visible focus and hover states</span>
            </article>
            <article className="moodboard-icons">
              <p>Minimal line icons</p>
              <div>
                <span>
                  <MoodIcon name="flame" />
                </span>
                <span>
                  <MoodIcon name="gift" />
                </span>
                <span>
                  <MoodIcon name="leaf" />
                </span>
              </div>
              <small>Use charcoal by default and gold on dark surfaces.</small>
            </article>
          </div>
        </section>

        <section className="moodboard-section moodboard-voice" aria-labelledby="voice-title">
          <div className="moodboard-section-heading">
            <p>05 · Voice and movement</p>
            <h2 id="voice-title">Write toward memory, ritual and joy.</h2>
            <span>
              Language is warm and specific. It should make the act of choosing
              and giving feel meaningful, never transactional.
            </span>
          </div>
          <div className="moodboard-voice-grid">
            <blockquote>“Gift a ritual.”</blockquote>
            <blockquote>“Pour joy into your space.”</blockquote>
            <blockquote>“Celebrate light and memory.”</blockquote>
          </div>
          <div className="moodboard-progress">
            <div>
              <span>Add ₹301 more for complimentary delivery</span>
              <strong>75%</strong>
            </div>
            <div className="moodboard-progress-track">
              <i />
            </div>
            <p>You’ve unlocked complimentary delivery.</p>
          </div>
        </section>

        <section className="moodboard-section moodboard-standards" aria-labelledby="standards-title">
          <div className="moodboard-section-heading">
            <p>06 · Experience standards</p>
            <h2 id="standards-title">Beauty must remain usable.</h2>
            <span>
              Every expression of the brand should hold together from a narrow
              mobile screen to a wide desktop—and remain fast and accessible.
            </span>
          </div>
          <div className="moodboard-standard-grid">
            <article>
              <span>AA</span>
              <h3>High contrast</h3>
              <p>Charcoal on ivory and ivory on charcoal for essential text.</p>
            </article>
            <article>
              <span>KB</span>
              <h3>Keyboard first</h3>
              <p>Visible focus, logical order, labelled controls and modal focus traps.</p>
            </article>
            <article>
              <span>WP</span>
              <h3>Responsive imagery</h3>
              <p>WebP sources, meaningful alt text and lazy loading below the fold.</p>
            </article>
            <article>
              <span>RWD</span>
              <h3>Fluid layouts</h3>
              <p>One system composed intentionally for mobile, tablet and desktop.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="moodboard-footer">
        <p>Melt Culture design system · Hand-poured, artfully made.</p>
        <button onClick={onClose} type="button">
          Return to storefront
        </button>
      </footer>
    </div>
  )
}
