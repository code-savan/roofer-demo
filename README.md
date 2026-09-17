# IronStar Roofing site concept

Static HTML, CSS, and JavaScript. GitHub Pages serves `index.html`.

## Configure for a contractor

- Replace `tel:+14695550187` and `(469) 555-0187` in `index.html` and `app.js` with the contractor's real number.
- Replace `hello@ironstar.demo` in `app.js`. The guided request currently prepares an email in the visitor's mail app. It has no backend and never silently submits personal information. Connect a real endpoint to the last step if the client wants in-page submission.
- Replace the six illustrative project stories and AI-generated photography with the contractor's documented work.
- The five credential images in `assets/badges/` are visual examples. Confirm the exact badges the contractor may display before delivering a client-specific site.
- The estimator uses approximate roof area `home floor area / stories × 1.25` and illustrative per-square-foot ranges of $6–10 for architectural shingles, $10–16 for metal, and $12–20 for tile. Adjust to the contractor's pricing and market before treating it as a lead quote.

## Assets

- `assets/crew-wide.webp` and `assets/crew-close.webp`: generated editorial crew photographs, optimized as WebP.
- `assets/roof-technical.svg`: original roof assembly illustration, hand-authored for this site.
- Badge source images: GAF Master Elite, Owens Corning Preferred, RCAT, and BBB from [this public roofing site repository](https://github.com/dallasbpeters/tandra-peters-consulting); CertainTeed ShingleMaster from [this roofing site repository](https://github.com/FatherWolf/keithsroofing). They were converted to small WebP files for the demo.

## Accessibility and performance

Controls use native buttons and range inputs, keyboard support, visible focus, and reduced-motion handling. The mobile navigation is a focus-contained drawer. Photos below the fold load lazily. No animation library or runtime framework is required.
