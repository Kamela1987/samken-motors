# SamKen Motors — site update package

## How to install
1. In your repo, replace `index.html`, `styles.css`, `script.js` with these versions.
2. Copy `sitemap.xml`, `robots.txt`, `404.html` to the repo root.
3. Copy `images/og-image.png` into your `images/` folder.
4. **Delete `vehicles.js`** — the vehicle listings are now static HTML inside
   `index.html` (better for Google). The photo sliders still work; their code
   moved into `script.js`.
5. Commit and push. GitHub Actions deploys automatically (workflow unchanged).

## Before you push — 4 TODOs to check
- [ ] `index.html` head: confirm the Facebook URL (`facebook.com/samkenmotors`) is your real page.
- [ ] `index.html` JSON-LD block: replace the geo coordinates with your exact
      Google Maps pin, and add a street address if you want one public.
- [ ] `index.html` head: analytics snippets are commented out — pick one,
      sign up, uncomment, fill in your ID. Or leave disabled.
- [ ] Update your README: the "HOW TO ADD A VEHICLE" instructions in vehicles.js
      no longer apply. To add a vehicle now, copy an existing card block in
      `index.html` and edit name/price/details/photos.

## What changed (punch-list points)
- 3  Facebook is now a direct link (was "search on Facebook")
- 5  Schema.org AutoDealer JSON-LD added
- 6  Vehicles rendered as static HTML; vehicles.js retired
- 7  Proper 1200x630 OG share image + og:url + canonical + image dimensions
- 8  sitemap.xml + robots.txt added; branded 404.html added
- 9  Analytics placeholder (your choice, uncomment to enable)
- 10 Template remnant classes renamed (steps/step-card, icon-namibia etc.), dead CSS removed
- 11 WhatsApp numbers centralized in script.js (WHATSAPP constants)
- 12 fonts.gstatic.com preconnect added
- 13 Inline styles in contact form moved to styles.css
- 14 About badge now links to Google Maps directions; invalid CSS rule fixed
