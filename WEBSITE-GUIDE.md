# HALL Saint Helena Employee Site — Redesign and Maintenance Guide

This guide is designed around one goal: employees should be able to find the correct information quickly during a shift, while managers should be able to update routine content without editing website code.

## What updates automatically

The Important Dates dashboard compares the employee's current local date with every scheduled date whenever the page opens.

- **OPEN NOW** appears during an active date range, including its opening and closing dates.
- **UPCOMING** appears before a date or opening date.
- **CLOSED** appears after the date or closing date.
- Countdown text, including “days away,” “days remaining,” “tomorrow,” and “ends today,” is calculated automatically.
- The **Next Important Date** panel automatically chooses the earliest opening, closing, batch, or deadline that has not passed.

Nobody needs to change a status manually. Dates only need attention when the business publishes a new campaign or quarter.

## Recommended navigation

Use these six pages in this order:

1. **Home** — the shift landing page
2. **Wine Club** — wines, allocations, and important dates
3. **Checklists** — existing Microsoft Forms
4. **Systems** — secure application links and help
5. **SOPs & Training** — searchable operational guidance
6. **Updates** — recent changes and archived announcements

“Quick Links” should become the Home page rather than a separate navigation item. “Q3 Wines” and “Q3 Important Dates” should become sections or subpages under the evergreen name “Wine Club,” so the main navigation does not need to be renamed every quarter.

## Page 1: Home

### Purpose

Answer three questions immediately: What matters today? Where do I need to go? Has anything changed?

### Recommended layout

1. A compact greeting: **Today at HALL Saint Helena**.
2. A red priority panel showing the next wine-club deadline.
3. Four to six task-based quick links. Use consistent cards, not oversized third-party logos.
4. A “Shift Updates” panel with an owner and expiration date for each notice.
5. A small “Need Help?” section linking to the manager-on-duty process and system support.

### Source of truth

Use a Google Sheet named `HALL Employee Portal — Updates`. Recommended columns:

| title | message | priority | start | end | link | owner |
|---|---|---|---|---|---|---|

The future Home embed can show only rows whose start/end dates include today. This prevents old announcements from remaining visible indefinitely.

## Page 2: Wine Club

### Purpose

Combine current wines, allocations, technical sheets, and deadlines without making employees search across pages.

### Recommended layout

1. The Important Dates embed at the top.
2. Brand filters: HALL, WALT, BACA, and Michel Foch.
3. Wine cards organized by club or allocation.
4. A technical-sheet button on each wine card.
5. A “Selling Notes” area limited to three concise points per wine.

### Source of truth

Use two spreadsheet tabs:

- `Important Dates` for the dashboard.
- `Wine Lineup` for bottle and allocation information.

Recommended `Wine Lineup` columns:

| active | brand | collection | club_size | quantity | vintage | wine | tech_sheet_url | selling_note_1 | selling_note_2 | selling_note_3 |
|---|---|---|---|---|---|---|---|---|---|---|

Only rows marked active should appear. At the next quarter, duplicate the previous rows, update the content, and turn the old rows off.

## Connecting Important Dates to Google Sheets

Create a Google Sheet with a tab named `Important Dates` and put these exact headers in row 1:

| section | label | start | end | date |
|---|---|---|---|---|

Use `YYYY-MM-DD` format. A date range uses `start` and `end`; a batch or deadline uses `date`.

Example:

| section | label | start | end | date |
|---|---|---|---|---|
| Pick-Up | Pick-Up Window | 2026-07-21 | 2026-08-23 | |
| Pick-Up | Pick-Up Batch | | | 2026-08-25 |
| HALL Shipping | Primary Colors Customization | 2026-07-20 | 2026-08-14 | |

Then:

1. In Google Sheets, publish only the `Important Dates` tab to the web as CSV.
2. Copy the generated CSV URL.
3. Open `script.js`.
4. At the top, paste the URL between the quotation marks after `googleSheetCsvUrl:`.
5. Save and republish the hosted dashboard.

After this one-time connection, employees with spreadsheet editing permission can maintain dates without touching the code. The embed falls back to the built-in dates if the sheet is temporarily unavailable.

Important: publishing a sheet tab makes that tab accessible through its published link. Only place non-confidential operational dates in this source sheet.

## Page 3: Checklists

### Purpose

Keep the working Microsoft Forms while making it obvious which form applies to each employee.

### Recommended layout

1. Two sections: **Wine Educators** and **Guest Relations**.
2. Consistent cards for each area instead of long rows of identical red buttons.
3. Each card should show the location, shift timing, approximate completion time, and an “Open Checklist” button.
4. Add one “Report a problem with a checklist” link.

### Maintenance

Keep the Microsoft Forms URLs in one restricted master Sheet or document. Do not place credentials in it. Test every form link at the start of each quarter and whenever form ownership changes.

## Page 4: Systems

### Purpose

Provide safe access to work systems without storing credentials.

### Recommended layout

Group applications by job:

- **Sales & Wine Club** — Shopify, Salesforce, ShipCompliant.
- **Hospitality** — reservation and host systems.
- **Food & Beverage** — POS and kitchen displays.
- **Operations** — scheduling, maintenance, and internal tools.

Each card should include the system name, purpose, “Open System” button, and a support/troubleshooting link.

### Security rule

Never publish passwords, PINs, shared credentials, recovery codes, or secret URLs in Google Sites, Google Docs, Sheets, screenshots, or custom embeds. Use the approved company password manager or single sign-on. Rotate any credential previously displayed on the site.

## Page 5: SOPs & Training

### Purpose

Help employees find the current answer rather than browse a folder tree.

### Recommended layout

1. A search prompt and topic filters.
2. Categories: Guest Experience, Wine Service, Safety, Shipping, POS, and Facilities.
3. “Most Used” and “Recently Updated” rows.
4. Each document card shows its owner and last-reviewed date.
5. A “Request a correction” Microsoft Form.

### Source of truth

Use a Sheet with these columns:

| active | category | title | summary | document_url | owner | reviewed_date | review_due |
|---|---|---|---|---|---|---|---|

Store the actual SOPs in a restricted Shared Drive. Link to the original document rather than making copies throughout the site.

## Page 6: Updates

### Purpose

Show what changed and give employees confidence that they are reading current information.

### Recommended content

- Update title and short description.
- Effective date.
- Page or process affected.
- Owner.
- Link to the updated material.
- Automatic archive date.

Do not use this as permanent document storage. It is a change log pointing to the official current content.

## Publishing and embedding the custom dashboard

The dashboard must be reachable through an `https://` web address. A local `file://` address works only on the computer where the files live.

Once hosted:

1. Edit the Google Site.
2. Choose **Insert → Embed**.
3. Paste the dashboard's hosted URL.
4. Insert it and stretch the embed to the full content width.
5. Give it enough height to avoid an inner scrollbar.
6. Preview the Google Site in desktop, tablet, and phone modes.
7. Publish the Google Site.

For the cleanest experience, use one embedded tool per page section. Avoid embedding the entire employee portal inside another portal.

## Quarterly maintenance checklist

1. Copy the prior quarter's Important Dates sheet rows.
2. Enter the new dates in `YYYY-MM-DD` format.
3. Confirm the wine lineup and technical-sheet links.
4. Test all Microsoft Forms.
5. Check system and SOP links.
6. Archive expired announcements.
7. Preview the Google Site on desktop and mobile.
8. Have a second employee confirm the dates before publishing.

## Ownership

Assign one content owner and one backup owner for each source:

- Wine Club dates and wines
- Shift updates
- Checklists
- System links
- SOPs

The website can automate display logic, but people must still own the accuracy of business information. A visible “last reviewed” date is better than pretending content requires no oversight.
