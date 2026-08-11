# HALL Homepage Dashboard — Setup Notes

## What already works

- Today's date and refresh time update automatically.
- The next wine-club date, open-window count, and upcoming-date count come from the existing published Important Dates Google Sheet.
- The Wine Club Dates card opens the published GitHub Pages dashboard.
- The layout adjusts for desktop, tablet, and mobile widths.

## Links still needed

Collect and verify the official destination for each of these cards:

1. Wine Club Wines
2. Daily Checklists landing page or Microsoft Forms page
3. Shopify
4. Salesforce
5. SOPs & Training

Do not send or place passwords, PINs, recovery codes, customer records, employee records, or other confidential information in the links file.

## How to add a link

Open `script.js` and find `quickLinks` near the beginning. Each card looks like this:

```js
{
  name: "Daily Checklists",
  description: "Open the Microsoft Forms checklist for your assigned area.",
  url: "",
},
```

Paste the verified address between the quotation marks after `url:`:

```js
url: "https://example.com/verified-address",
```

Do not change the surrounding punctuation. A blank URL makes the card non-clickable and shows `Link needed`.

## Recommended GitHub location

Upload the complete `hall-home-dashboard` folder into the existing GitHub repository. The resulting Pages address will be:

`https://ivelazquez-art.github.io/hall-wine-club-dashboard/hall-home-dashboard/`

The folder must contain `index.html`, `styles.css`, and `script.js` directly inside it.
