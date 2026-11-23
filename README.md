# AYAAN.MA · Bismillah Rasam — Royal Digital Invitation

A luxurious, fully interactive Islamic digital invitation for the Bismillah Rasam
ceremony of **AYAAN.MA** — Saturday, **28 November 2026**, **5:30 PM onwards**, at **Our Home**.

## Files (single folder, individual files)

```
index.html   → structure & content
style.css    → royal emerald & gold design, animations, responsive layout
script.js    → opening doors, particles, countdown, RSVP, sharing, ambience
README.md    → this guide
```

No build step, no dependencies. Open `index.html` in any browser, or host it
anywhere (GitHub Pages, Netlify, Vercel, shared hosting) and share the link on WhatsApp.

## Family Configuration (important)

Everything the family needs to change lives at the **top of `script.js`** in the
`CONFIG` object:

| Setting | What to do |
|---|---|
| `whatsappNumber` | Currently set to `"919385881725"` (+91 93858 81725). Use international format **without `+` or spaces**. If left `""`, the RSVP button copies the message to the guest's clipboard instead. |
| `mapsUrl` | Currently set to the family's Google Maps pin (`https://maps.app.goo.gl/8Mt25F4oQihy2YRa8`). **Get Directions** and the map card open this link — on phones it launches the Google Maps app with navigation. |
| `homeAddress` | Optional text-address fallback, used only if `mapsUrl` is empty. |
| `mapsEmbedUrl` | Optional. In Google Maps → Share → *Embed a map*, copy the `src` URL of the iframe and paste it here to show a live map inside the golden frame. |
| `audioSrc` | Optional. Path to a soft audio file (e.g. `"assets/audio.mp3"`). If left empty, a gentle built-in ambient tone is used — no file required. |
| `eventDate` | Already set to `2026-11-28T17:30:00` (venue local time). Change only if needed. |

## Features

- **Royal opening** — Bismillah calligraphy, two 3D doors swinging open with golden
  light, then the invitation reveal and an *Open Invitation* button.
- **Live countdown** to the ceremony.
- **Golden particles**, hanging lanterns, crescent & stars, Islamic geometric
  lattice, floral corner ornaments, arch-framed details.
- **WhatsApp RSVP** — guest name, number of guests, attending / not attending;
  generates a pre-filled WhatsApp message.
- **Share invitation** button (native share sheet on mobile, WhatsApp on desktop).
- **Background ambience** with a mute/unmute control (bottom-right ♪ button).
- Fully responsive, mobile-first; respects `prefers-reduced-motion`;
  animations pause when the tab is hidden for performance.

## Notes

- Fonts load from Google Fonts (Marcellus, Cormorant Garamond, Amiri, Great Vibes).
  The site still works offline with graceful serif fallbacks.
- Audio starts only after a guest taps the ♪ button (browser autoplay rules).