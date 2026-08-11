/*
 * ====================================================================
 * CURRENT WINE CONTENT — UPDATE WINES AND LINKS IN THIS OBJECT ONLY
 * Leave techSheet blank until a link has been verified.
 * Never place passwords or customer information in this file.
 * ====================================================================
 */
const WINE_DATA = {
  // Paste the published Google Sheet CSV address here after the sheet is ready.
  // When blank, the saved program list below is used as a dependable backup.
  publishedCsv:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp5R-BrvIol830Y7c7NhRCxjJ639rU1PSeQ9TkgIXfP3l9P04fWvEC4F4Ibe3AUGJQYJFoL8sRArcQ/pub?gid=1527653735&single=true&output=csv",
  brands: ["All", "HALL", "WALT", "BACA", "Michel Foch"],
  programs: [
    {
      name: "Primary Colors",
      brand: "HALL",
      accent: "hall",
      allocations: [
        {
          tier: "2-Bottle Club",
          wines: [
            { quantity: 1, name: "2023 Kathryn Hall Cabernet Sauvignon", techSheet: "https://drive.google.com/file/d/1fbvZyLvztRKyrPoLjlpi5AzUbyhEyLIl/view?usp=drive_link" },
            { quantity: 1, name: "2023 Craig’s Cabernet Sauvignon", techSheet: "https://drive.google.com/file/d/1v2u-ZUTVYRvj1X_KJ0DFNLCTaQicMGqn/view?usp=drive_link" },
          ],
        },
        { tier: "4-Bottle Club", wines: [{ quantity: 2, name: "2023 Kathryn Hall Cabernet Sauvignon" }, { quantity: 2, name: "2023 Craig’s Cabernet Sauvignon" }] },
        { tier: "6-Bottle Club", wines: [{ quantity: 3, name: "2023 Kathryn Hall Cabernet Sauvignon" }, { quantity: 3, name: "2023 Craig’s Cabernet Sauvignon" }] },
      ],
      memberBottles: { Anniversary: "2021 1873 Cabernet Sauvignon", Milestone: "2019 Jack’s Cabernet Sauvignon", Referral: "2021 1873 Cabernet Sauvignon" },
    },
    {
      name: "Collection",
      brand: "HALL",
      accent: "hall",
      allocations: [
        { tier: "2-Bottle Club", wines: [{ quantity: 1, name: "2023 Kathryn Hall Cabernet Sauvignon" }, { quantity: 1, name: "2023 Stags Leap Cabernet Sauvignon" }] },
        { tier: "4-Bottle Club", wines: [{ quantity: 2, name: "2023 Kathryn Hall Cabernet Sauvignon" }, { quantity: 2, name: "2023 Stags Leap Cabernet Sauvignon" }] },
        { tier: "6-Bottle Club", wines: [{ quantity: 3, name: "2023 Kathryn Hall Cabernet Sauvignon" }, { quantity: 3, name: "2023 Stags Leap Cabernet Sauvignon" }] },
      ],
      memberBottles: { Anniversary: "2019 Jack’s Cabernet Sauvignon", Milestone: "2019 Jack’s Cabernet Sauvignon", Referral: "2021 1873 Cabernet Sauvignon" },
    },
    {
      name: "Vintner’s Circle",
      brand: "WALT",
      accent: "walt",
      allocations: [
        { tier: "2-Bottle Club", wines: [{ quantity: 1, name: "2024 Bob’s Ranch Pinot Noir" }, { quantity: 1, name: "2024 Rosella’s Pinot Noir" }] },
        { tier: "4-Bottle Club", wines: [{ quantity: 2, name: "2024 Bob’s Ranch Pinot Noir" }, { quantity: 2, name: "2024 Rosella’s Pinot Noir" }] },
        { tier: "6-Bottle Club", wines: [{ quantity: 3, name: "2024 Bob’s Ranch Pinot Noir" }, { quantity: 3, name: "2024 Rosella’s Pinot Noir" }] },
        { tier: "Case Club", wines: [{ quantity: 6, name: "2024 Bob’s Ranch Pinot Noir" }, { quantity: 6, name: "2024 Rosella’s Pinot Noir" }] },
      ],
      memberBottles: { Anniversary: "2022 Clos Pepe Pinot Noir", Milestone: "2022 Clos Pepe Pinot Noir", Referral: "2022 Clos Pepe Pinot Noir" },
    },
    {
      name: "Appellation",
      brand: "WALT",
      accent: "walt",
      allocations: [
        { tier: "2-Bottle Club", wines: [{ quantity: 1, name: "2024 Bob’s Ranch Pinot Noir" }, { quantity: 1, name: "2023 Sonoma Coast Chardonnay" }] },
        { tier: "4-Bottle Club", wines: [{ quantity: 2, name: "2024 Bob’s Ranch Pinot Noir" }, { quantity: 2, name: "2023 Sonoma Coast Chardonnay" }] },
        { tier: "6-Bottle Club", wines: [{ quantity: 3, name: "2024 Bob’s Ranch Pinot Noir" }, { quantity: 3, name: "2023 Sonoma Coast Chardonnay" }] },
      ],
      memberBottles: { Anniversary: "2022 Clos Pepe Pinot Noir", Milestone: "2022 Clos Pepe Pinot Noir", Referral: "2022 Clos Pepe Pinot Noir" },
    },
    {
      name: "BACA",
      brand: "BACA",
      accent: "baca",
      allocations: [
        { tier: "2-Bottle Club", wines: [{ quantity: 1, name: "2024 Cat’s Cradle Rockpile Zinfandel" }, { quantity: 1, name: "2020 Marbles Pōcai Zinfandel" }] },
        { tier: "4-Bottle Club", wines: [{ quantity: 2, name: "2024 Cat’s Cradle Rockpile Zinfandel" }, { quantity: 2, name: "2020 Marbles Pōcai Zinfandel" }] },
        { tier: "6-Bottle Club", wines: [{ quantity: 3, name: "2024 Cat’s Cradle Rockpile Zinfandel" }, { quantity: 3, name: "2020 Marbles Pōcai Zinfandel" }] },
      ],
      memberBottles: { Anniversary: "2021 Somersault", Milestone: "2021 Somersault", Referral: "2021 Somersault" },
    },
    {
      name: "Michel Foch",
      brand: "Michel Foch",
      accent: "foch",
      allocations: [
        { tier: "2-Bottle Club", wines: [{ quantity: 1, name: "Michel Foch Multi-Vintage Brut" }, { quantity: 1, name: "2015 Michel Foch Blanc de Blancs" }] },
        { tier: "4-Bottle Club", wines: [{ quantity: 2, name: "Michel Foch Multi-Vintage Brut" }, { quantity: 2, name: "2015 Michel Foch Blanc de Blancs" }] },
        { tier: "6-Bottle Club", wines: [{ quantity: 3, name: "Michel Foch Multi-Vintage Brut" }, { quantity: 3, name: "2015 Michel Foch Blanc de Blancs" }] },
      ],
      memberBottles: { Anniversary: "Multi-Vintage Rosé", Milestone: "Multi-Vintage Rosé", Referral: "Multi-Vintage Rosé" },
    },
  ],
  rules: [
    { label: "Anniversary Bottle", text: "Available for $1 when the member reaches their annual membership start date." },
    { label: "Milestone Bottle", text: "Upgraded $1 bottle for a member’s 5th, 10th, or 15th anniversary." },
    { label: "Referral Bottle", text: "The referring and referred members receive a $1 bottle. The referred member receives theirs with the second allocation." },
    { label: "Same-Day Join", text: "Members who join on the same day are not eligible to refer one another." },
  ],
};

let activeBrand = "All";
let currentPrograms = WINE_DATA.programs;

function allWines(program) {
  return [
    ...program.allocations.flatMap((allocation) => allocation.wines),
    ...Object.values(program.memberBottles).map((name) => ({ name })),
  ];
}

function programMatches(program) {
  const brandMatches = activeBrand === "All" || program.brand === activeBrand;
  return brandMatches;
}

function allocationMarkup(allocation) {
  return `
    <article class="allocation">
      <h3>${allocation.tier}</h3>
      <ul>
        ${allocation.wines.map((wine) => `
          <li>
            <span class="quantity">${wine.quantity}×</span>
            <span class="wine-name">${wine.name}</span>
            ${wine.techSheet ? `<a href="${wine.techSheet}" target="_blank" rel="noopener noreferrer" aria-label="Open tech sheet for ${wine.name}">Tech sheet ↗</a>` : ""}
          </li>
        `).join("")}
      </ul>
    </article>
  `;
}

function programMarkup(program, index) {
  return `
    <details class="club-card accent-${program.accent}" ${index === 0 ? "open" : ""}>
      <summary>
        <span class="brand-mark">${program.brand}</span>
        <span class="club-title">${program.name}</span>
        <span class="club-meta">${program.allocations.length} tiers</span>
        <span class="chevron" aria-hidden="true"></span>
      </summary>
      <div class="club-body">
        <div class="allocation-grid">${program.allocations.map(allocationMarkup).join("")}</div>
        <section class="member-bottles" aria-label="${program.name} member bottles">
          <h3>Member Bottles</h3>
          <div class="member-grid">
            ${Object.entries(program.memberBottles).map(([label, wine]) => `
              <div><span>${label}</span><strong>${wine}</strong></div>
            `).join("")}
          </div>
        </section>
      </div>
    </details>
  `;
}

function renderPrograms() {
  const matches = currentPrograms.filter(programMatches);
  document.querySelector("#club-list").innerHTML = matches.length
    ? matches.map(programMarkup).join("")
    : `<div class="empty-state"><strong>No matching wines found.</strong><span>Try a different wine, club, or brand.</span></div>`;
  document.querySelector("#result-status").textContent = `${matches.length} of ${currentPrograms.length} programs shown`;
}

function renderFilters() {
  document.querySelector("#brand-filters").innerHTML = WINE_DATA.brands.map((brand) => `
    <button type="button" class="filter-button${brand === activeBrand ? " active" : ""}" data-brand="${brand}" aria-pressed="${brand === activeBrand}">${brand}</button>
  `).join("");
}

function renderRules() {
  document.querySelector("#rule-grid").innerHTML = WINE_DATA.rules.map((rule, index) => `
    <article><span>${String(index + 1).padStart(2, "0")}</span><h3>${rule.label}</h3><p>${rule.text}</p></article>
  `).join("");
}

document.querySelector("#brand-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-brand]");
  if (!button) return;
  activeBrand = button.dataset.brand;
  renderFilters();
  renderPrograms();
});

document.querySelector("#expand-all").addEventListener("click", () => {
  document.querySelectorAll(".club-card").forEach((card) => { card.open = true; });
});

document.querySelector("#collapse-all").addEventListener("click", () => {
  document.querySelectorAll(".club-card").forEach((card) => { card.open = false; });
});

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { row.push(value.trim()); value = ""; }
    else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = []; value = "";
    } else value += character;
  }
  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function programsFromCsv(text) {
  const [headers, ...rows] = parseCsv(text);
  const keys = headers.map((header) => header.toLowerCase());
  const records = rows.map((row) => Object.fromEntries(keys.map((key, index) => [key, row[index] || ""])));
  const programs = new Map();
  records.forEach((record) => {
    if (!record.program || !record.brand) return;
    if (!programs.has(record.program)) {
      programs.set(record.program, {
        name: record.program,
        brand: record.brand,
        accent: record.brand === "WALT" ? "walt" : record.brand === "BACA" ? "baca" : record.brand === "Michel Foch" ? "foch" : "hall",
        order: Number(record.program_order) || 999,
        allocations: [],
        memberBottles: {},
      });
    }
    const program = programs.get(record.program);
    if (record.row_type.toLowerCase() === "member") {
      if (record.member_type && record.member_wine) program.memberBottles[record.member_type] = record.member_wine;
      return;
    }
    if (!record.tier || !record.wine) return;
    let allocation = program.allocations.find((item) => item.tier === record.tier);
    if (!allocation) {
      allocation = { tier: record.tier, order: Number(record.tier_order) || 999, wines: [] };
      program.allocations.push(allocation);
    }
    allocation.wines.push({ quantity: Number(record.quantity) || 1, name: record.wine, techSheet: record.tech_sheet || "" });
  });
  return [...programs.values()]
    .sort((a, b) => a.order - b.order)
    .map((program) => ({ ...program, allocations: program.allocations.sort((a, b) => a.order - b.order) }));
}

async function initializeDashboard() {
  if (WINE_DATA.publishedCsv) {
    try {
      const response = await fetch(WINE_DATA.publishedCsv, { cache: "no-store" });
      if (!response.ok) throw new Error(`Wine sheet request failed (${response.status}).`);
      const sheetPrograms = programsFromCsv(await response.text());
      if (sheetPrograms.length) currentPrograms = sheetPrograms;
    } catch (error) {
      console.warn("Using the saved wine list because the published Sheet could not load.", error);
    }
  }
  renderFilters();
  renderPrograms();
  renderRules();
}

initializeDashboard();
