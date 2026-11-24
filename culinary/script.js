/*
 * Publish the "Culinary Content" Google Sheet as CSV, then paste that URL below.
 * The page will then update automatically whenever the published Sheet changes.
 */
const CULINARY_DATA = {
  publishedCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlThAedjCj9yVSk1en-ADpKgWKxf_7WiZ4s9Bv1YgPHyFabmq9MkbNBHtt4bcjT54yFqmh6M_z7sEz/pub?gid=1108026387&single=true&output=csv",
  sections: [
    "Tour Bites",
    "Cabernet Collector Experience",
    "Platinum Experience",
    "Pizza of the Week",
  ],
  // These clearly labeled sample items make the page useful before the Sheet
  // is published. Once a published CSV is connected, active Sheet rows replace
  // these samples automatically.
  fallbackItems: [
    {
      section: "Tour Bites",
      name: "SAMPLE — Whipped Goat Cheese Crostini",
      subtitle: "Example tour bite; replace with the chef’s approved recipe",
      ingredients: "Baguette crostini\nWhipped goat cheese\nFig preserve\nFresh thyme\nSea salt",
      preparation: "Toast the crostini. Spread with goat cheese. Add a small spoon of fig preserve. Finish with thyme and sea salt.",
      notes: "SAMPLE ONLY — Replace with the approved recipe, allergen note, and wine pairing.",
      active: "Yes",
      order: 1,
      updated: "11/23/2026",
    },
    {
      section: "Tour Bites",
      name: "SAMPLE — Smoked Almond & Fig Bite",
      subtitle: "Second example showing how multiple items appear",
      ingredients: "Dried fig\nSmoked almonds\nSoft cheese\nBalsamic glaze",
      preparation: "Split the fig. Fill with soft cheese and chopped smoked almond. Finish with a small drop of balsamic glaze.",
      notes: "SAMPLE ONLY — Set Active to No when the chef no longer wants this item shown.",
      active: "Yes",
      order: 2,
      updated: "11/23/2026",
    },
    {
      section: "Cabernet Collector Experience",
      name: "SAMPLE — Cabernet Braised Short Rib Tartlet",
      subtitle: "Example Cabernet Collector menu item",
      ingredients: "Savory tart shells\nBraised short rib\nCabernet reduction\nPickled shallot\nMicrogreens",
      preparation: "Warm the tart shells and short rib separately. Fill each shell. Add reduction, shallot, and microgreens immediately before service.",
      notes: "SAMPLE ONLY — Replace with the approved course, plating directions, allergens, and pairing.",
      active: "Yes",
      order: 1,
      updated: "11/23/2026",
    },
    {
      section: "Platinum Experience",
      name: "SAMPLE — Truffled Mushroom Vol-au-Vent",
      subtitle: "Example Platinum Experience menu item",
      ingredients: "Puff pastry shells\nWild mushrooms\nCrème fraîche\nTruffle oil\nChives",
      preparation: "Warm the pastry shells. Spoon in the mushroom mixture. Finish with crème fraîche, truffle oil, and chives.",
      notes: "SAMPLE ONLY — Replace with the chef’s approved recipe and service notes.",
      active: "Yes",
      order: 1,
      updated: "11/23/2026",
    },
    {
      section: "Pizza of the Week",
      name: "SAMPLE — Harvest Garden Pizza",
      subtitle: "Example weekly pizza; replace before service",
      ingredients: "Pizza dough\nRoasted squash\nCaramelized onion\nMozzarella\nSage\nChili honey",
      preparation: "Stretch the dough. Add mozzarella, squash, and onion. Bake according to the kitchen’s approved oven settings. Finish with sage and chili honey.",
      notes: "SAMPLE ONLY — Add the actual availability dates, allergens, and suggested wine pairing.",
      active: "Yes",
      order: 1,
      updated: "11/23/2026",
    },
  ],
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function normalizeHeader(value) {
  return String(value || "").trim().toLowerCase().replaceAll(" ", "_");
}

function csvToItems(text) {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((row) => {
    const record = Object.fromEntries(headers.map((header, index) => [header, String(row[index] || "").trim()]));
    return {
      section: record.section,
      name: record.item_name,
      subtitle: record.subtitle,
      ingredients: record.ingredients,
      preparation: record.preparation,
      notes: record.pairing_notes,
      active: record.active,
      order: Number(record.display_order) || 999,
      updated: record.last_updated,
    };
  }).filter((item) => item.section && item.name && /^(yes|true|1|active)$/i.test(item.active));
}

function splitLines(value) {
  return String(value || "").split(/\r?\n|;/).map((line) => line.trim()).filter(Boolean);
}

function ingredientMarkup(value) {
  const ingredients = splitLines(value);
  if (!ingredients.length) return "<p>Ingredients have not been added yet.</p>";
  return `<ul class="ingredient-list">${ingredients.map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`).join("")}</ul>`;
}

function recipeCard(item, open = false) {
  return `
    <details class="recipe-card" ${open ? "open" : ""}>
      <summary>
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          ${item.subtitle ? `<p class="recipe-subtitle">${escapeHtml(item.subtitle)}</p>` : ""}
        </div>
        <span class="chevron" aria-hidden="true"></span>
      </summary>
      <div class="recipe-body">
        <div class="recipe-panel">
          <span class="content-label">Ingredients</span>
          ${ingredientMarkup(item.ingredients)}
        </div>
        <div class="recipe-panel">
          <span class="content-label">Preparation</span>
          <p>${escapeHtml(item.preparation || "Preparation has not been added yet.").replaceAll("\n", "<br>")}</p>
        </div>
        ${item.notes ? `
          <div class="recipe-panel full">
            <span class="content-label">Pairing &amp; service notes</span>
            <p>${escapeHtml(item.notes).replaceAll("\n", "<br>")}</p>
          </div>` : ""}
      </div>
    </details>`;
}

function sectionId(section) {
  return section.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/(^-|-$)/g, "");
}

function renderNavigation() {
  document.querySelector("#section-nav").innerHTML = CULINARY_DATA.sections
    .map((section) => `<a href="#${sectionId(section)}">${escapeHtml(section)}</a>`)
    .join("");
}

function renderPizzaFeature(items) {
  const pizza = items
    .filter((item) => item.section === "Pizza of the Week")
    .sort((a, b) => a.order - b.order)[0];
  const feature = document.querySelector("#pizza-of-the-week");
  if (!pizza) {
    feature.hidden = true;
    return;
  }

  feature.hidden = false;
  feature.innerHTML = `
    <p class="eyebrow">Pizza of the Week</p>
    <h2>${escapeHtml(pizza.name)}</h2>
    ${pizza.subtitle ? `<p class="featured-subtitle">${escapeHtml(pizza.subtitle)}</p>` : ""}
    <div class="featured-grid">
      <div class="featured-panel"><span class="content-label">Ingredients</span>${ingredientMarkup(pizza.ingredients)}</div>
      <div class="featured-panel"><span class="content-label">Preparation</span><p>${escapeHtml(pizza.preparation || "Preparation has not been added yet.").replaceAll("\n", "<br>")}</p></div>
      <div class="featured-panel"><span class="content-label">Pairing &amp; service notes</span><p>${escapeHtml(pizza.notes || "No additional notes.").replaceAll("\n", "<br>")}</p></div>
    </div>`;
}

function renderSections(items) {
  const container = document.querySelector("#section-list");
  container.innerHTML = CULINARY_DATA.sections.filter((section) => section !== "Pizza of the Week").map((section) => {
    const sectionItems = items
      .filter((item) => item.section === section)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    const label = sectionItems.length === 1 ? "1 active item" : `${sectionItems.length} active items`;
    return `
      <section class="culinary-section" id="${sectionId(section)}">
        <div class="section-heading">
          <h2>${escapeHtml(section)}</h2>
          <span class="section-count">${label}</span>
        </div>
        <div class="recipe-grid">
          ${sectionItems.length
            ? sectionItems.map((item, index) => recipeCard(item, index === 0)).join("")
            : `<div class="empty-state"><strong>No items are currently listed</strong>Please check back after the culinary menu is updated.</div>`}
        </div>
      </section>`;
  }).join("");
}

async function loadItems() {
  let items = CULINARY_DATA.fallbackItems;

  if (CULINARY_DATA.publishedCsv) {
    try {
      const response = await fetch(CULINARY_DATA.publishedCsv, { cache: "no-store" });
      if (!response.ok) throw new Error(`Sheet returned ${response.status}`);
      const sheetItems = csvToItems(await response.text());
      items = sheetItems;
    } catch (error) {
      console.warn("Culinary Sheet could not be loaded.", error);
    }
  }

  renderPizzaFeature(items);
  renderSections(items);
}

renderNavigation();
loadItems();
