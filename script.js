/*
 * ====================================================================
 * HOMEPAGE CONTENT — EDIT LINKS AND TASKS IN THIS OBJECT ONLY
 * Never place passwords or other credentials in this file.
 * ====================================================================
 */
const HOME_DATA = {
  // Convenience PIN only. GitHub Pages source is public; never rely on this
  // to protect passwords, customer information, or confidential records.
  staffPin: "0401",
  importantDatesCsv:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-F6DOU-RLv9fmvvG48Hutf_g5bdoOY4NMJ4Um55DJrJB9Rog4cPEzAZfmfazQNHUhhG9l3rbyD77i/pub?gid=0&single=true&output=csv",

  /*
   * Paste the real destination between quotation marks after url.
   * Leave url blank until the link is verified. Blank links appear as
   * “Link needed” and cannot be clicked.
   */
  quickLinkGroups: ["Wine Club Information", "Checklists & SOPs", "Employee System Links"],
  quickLinks: [
    {
      name: "Wine Club Wines",
      description: "Current allocations, selling notes, and technical sheets.",
      url: "https://ivelazquez-art.github.io/hall-wine-club-dashboard/current-club-wines/",
      group: "Wine Club Information",
    },
    {
      name: "Wine Club Important Dates",
      description: "Current customization windows, batches, and deadlines.",
      url: "https://ivelazquez-art.github.io/hall-wine-club-dashboard/",
      group: "Wine Club Information",
    },
    {
      name: "Daily Checklists",
      description: "Open the Microsoft Forms checklist for your assigned area.",
      url: "https://ivelazquez-art.github.io/hall-wine-club-dashboard/checklists-dashboard/",
      group: "Checklists & SOPs",
    },
    {
      name: "SOPs & Training",
      description: "Find current procedures, training, and support resources.",
      url: "https://sites.google.com/view/hall-vcsh/sops",
      group: "Checklists & SOPs",
    },
    {
      name: "Relay Radios",
      description: "Open the Relay dashboard for radio communication and device support.",
      url: "https://dash.relaypro.com/overview",
      group: "Employee System Links",
    },
    {
      name: "Passwords",
      description: "Restricted Google document. Sign in with the Hospitality account to open it.",
      url: "https://docs.google.com/document/d/1rTcusVYtHq4FZlj5iljDfbH8Jd2ABK29flAUttA-fKY/edit?usp=drive_link",
      group: "Employee System Links",
    },
    {
      name: "Shopify",
      description: "Access online-store tools and order information.",
      url: "https://admin.shopify.com/store/wcynxa-wc",
      group: "Employee System Links",
    },
    {
      name: "Salesforce",
      description:
        "Access the HALL customer database for key facts, past V360 reservations, and MA communications.",
      url: "https://hallwines.lightning.force.com/lightning/page/home",
      group: "Employee System Links",
    },
    {
      name: "ShipCompliant",
      description: "Open ShipCompliant for approved shipping and compliance workflows.",
      url: "https://portal.shipcompliant.com",
      group: "Employee System Links",
    },
    {
      name: "Flip Host Display",
      description: "Open the live host display for seating and guest flow.",
      url: "https://flip-pos-host.fly.dev/ZMWXDE",
      group: "Employee System Links",
    },
  ],

  fallbackDates: [
    { section: "Pick-Up", label: "Pick-Up Window", start: "2026-07-21", end: "2026-08-23", date: "" },
    { section: "Pick-Up", label: "Pick-Up Batch", start: "", end: "", date: "2026-08-25" },
    { section: "HALL Shipping", label: "Primary Colors Customization", start: "2026-07-20", end: "2026-08-14", date: "" },
    { section: "HALL Shipping", label: "Primary Colors Batch", start: "", end: "", date: "2026-08-17" },
    { section: "HALL Shipping", label: "Collection Customization", start: "2026-07-22", end: "2026-08-17", date: "" },
    { section: "HALL Shipping", label: "Collection Batch", start: "", end: "", date: "2026-08-19" },
    { section: "Other Brands", label: "WALT / BACA / Michel Foch Customization", start: "2026-07-27", end: "2026-08-21", date: "" },
    { section: "Other Brands", label: "WALT / BACA / Michel Foch Batch", start: "", end: "", date: "2026-08-25" },
    { section: "On-Hold Deadline", label: "On Hold End Date", start: "", end: "", date: "2026-09-15" },
  ],

  bunnyMessages: [
    "Myriah says to finish the checklists—or the answer to ‘Can I clock out?’ is ‘Not yet.’",
    "Verla says to make sure every wine is promoted correctly. The bottles are counting on you.",
    "Jeff asks: Are the courtyard chairs pushed in? Even the chairs should finish the shift neatly.",
    "Isaac is asking: Are the walkies powered on? A silent radio is a very expensive paperweight.",
    "If you clear the cookies, don’t clear the saved passwords too. Bunny Foo Foo remembers the difference.",
    "Don’t click on phishy links. Real rabbits prefer carrots, not bait.",
    "Welcome in! Check the next important date, then hop into the tool you need.",
    "A calm shift starts with the right information. You’ve got this.",
    "Before troubleshooting, peek at System Health—it may save you a few hops.",
    "Tech sheet first, confident recommendation second. Bunny-approved.",
    "Tiny reminder: never share passwords on the employee site. Keep those carrots secure.",
    "If the printer works on the first try, compliment it quietly. We don’t want to startle it.",
    "Hydrate between tastings. Cabernet knowledge runs better with water.",
    "When in doubt, check the checklist. When still in doubt, ask a human—not the printer.",
    "A two-minute check now prevents a twenty-minute mystery later. Bunny math.",
  ],
};

const DAY_MS = 24 * 60 * 60 * 1000;
const INACTIVITY_LIMIT_MS = 2 * 60 * 60 * 1000;
let inactivityTimer;

function unlockHomepage() {
  document.body.classList.remove("is-locked");
  document.querySelector("#pin-lock").setAttribute("hidden", "");
  scheduleInactivityLock();
}

function lockHomepage() {
  window.clearTimeout(inactivityTimer);
  document.body.classList.add("is-locked");
  document.querySelector("#pin-lock").removeAttribute("hidden");
  const input = document.querySelector("#pin-input");
  input.value = "";
  document.querySelector("#pin-error").textContent = "The dashboard locked after two hours of inactivity.";
  input.focus();
}

function scheduleInactivityLock() {
  window.clearTimeout(inactivityTimer);
  inactivityTimer = window.setTimeout(lockHomepage, INACTIVITY_LIMIT_MS);
}

function initializePinLock() {
  const form = document.querySelector("#pin-form");
  const input = document.querySelector("#pin-input");
  const error = document.querySelector("#pin-error");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === HOME_DATA.staffPin) {
      unlockHomepage();
      return;
    }
    error.textContent = "That PIN is not correct. Please try again.";
    input.value = "";
    input.focus();
    form.classList.remove("pin-shake");
    void form.offsetWidth;
    form.classList.add("pin-shake");
  });
  ["pointerdown", "keydown", "touchstart", "scroll"].forEach((eventName) => {
    document.addEventListener(eventName, () => {
      if (!document.body.classList.contains("is-locked")) scheduleInactivityLock();
    }, { passive: true });
  });
  input.focus();
}

function localDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function todayAtNoon() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
}

function daysBetween(from, to) {
  return Math.round((to - from) / DAY_MS);
}

function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(date);
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const next = csvText[index + 1];

    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function parseDateRecords(csvText) {
  const [headers, ...rows] = parseCsv(csvText);
  if (!headers) throw new Error("Date sheet is empty.");
  const keys = headers.map((header) => header.toLowerCase());
  const required = ["section", "label", "start", "end", "date"];
  if (!required.every((key) => keys.includes(key))) {
    throw new Error("Date sheet columns do not match.");
  }

  return rows
    .map((row) => Object.fromEntries(keys.map((key, index) => [key, row[index] || ""])))
    .filter((record) => record.section && record.label);
}

function getStatus(record, today) {
  const start = localDate(record.start || record.date);
  const end = localDate(record.end || record.date);
  if (today < start) return "upcoming";
  if (today > end) return "closed";
  return "open";
}

function getDateCandidates(records) {
  const candidates = [];
  records.forEach((record) => {
    if (record.date) {
      candidates.push({
        date: localDate(record.date),
        label: record.label,
        section: record.section,
      });
    } else {
      candidates.push(
        {
          date: localDate(record.start),
          label: `${record.label} Opens`,
          section: record.section,
        },
        {
          date: localDate(record.end),
          label: `${record.label} Closes`,
          section: record.section,
        },
      );
    }
  });
  return candidates;
}

function renderPriority(records, today) {
  const priority = document.querySelector("#priority");
  const next = getDateCandidates(records)
    .filter((candidate) => candidate.date >= today)
    .sort((a, b) => a.date - b.date)[0];

  if (!next) {
    priority.innerHTML = `
      <div>
        <p class="priority-label">Wine Club Priority</p>
        <h2 id="priority-title">Current schedule complete</h2>
        <p class="priority-meta">The listed campaign dates have passed.</p>
      </div>
    `;
    document.querySelector("#next-date-summary").textContent = "Schedule complete";
    return;
  }

  const days = daysBetween(today, next.date);
  const countdownLabel = days === 0 ? "Today" : days === 1 ? "Day away" : "Days away";
  priority.innerHTML = `
    <div>
      <p class="priority-label">Next Important Date</p>
      <h2 id="priority-title">${next.label}</h2>
      <p class="priority-meta">${next.section} &nbsp;•&nbsp; ${formatDate(next.date)}</p>
    </div>
    <div class="priority-countdown" aria-label="${days === 0 ? "Today" : `${days} days away`}">
      <strong>${days === 0 ? "Now" : days}</strong>
      <span>${countdownLabel}</span>
    </div>
  `;
  document.querySelector("#next-date-summary").textContent = `${next.label} — ${formatDate(
    next.date,
    { year: undefined },
  )}`;
}

function renderQuickLinks() {
  let linkNumber = 0;
  document.querySelector("#quick-links").innerHTML = HOME_DATA.quickLinkGroups
    .map((group) => {
      const groupLinks = HOME_DATA.quickLinks.filter((link) => link.group === group);
      const cards = groupLinks.map((link) => {
      linkNumber += 1;
      const enabled = Boolean(link.url);
      const element = enabled ? "a" : "article";
      const attributes = enabled
        ? `href="${link.url}" target="_blank" rel="noopener noreferrer"`
        : `class="quick-link quick-link-disabled"`;
      const classAttribute = enabled ? `class="quick-link"` : "";

      return `
        <${element} ${classAttribute} ${attributes}>
          <div>
            <span class="quick-link-number" aria-hidden="true">${String(linkNumber).padStart(2, "0")}</span>
            <h3>${link.name}</h3>
            <p>${link.description}</p>
          </div>
          <span class="link-action">${enabled ? "Open resource ↗" : "Link needed"}</span>
        </${element}>
      `;
      }).join("");
      return `
        <section class="quick-link-group" aria-labelledby="${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title">
          <h3 class="quick-link-group-title" id="${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title">${group}</h3>
          <div class="quick-link-row quick-link-row-${groupLinks.length}">${cards}</div>
        </section>
      `;
    })
    .join("");
}

function renderDateSummary(records, today) {
  const statuses = records.map((record) => getStatus(record, today));
  document.querySelector("#open-count").textContent = statuses.filter(
    (status) => status === "open",
  ).length;
  document.querySelector("#upcoming-count").textContent = statuses.filter(
    (status) => status === "upcoming",
  ).length;
  renderPriority(records, today);
}

function showBunnyMessage(index) {
  const messageIndex = index % HOME_DATA.bunnyMessages.length;
  document.querySelector("#bunny-message").textContent = HOME_DATA.bunnyMessages[messageIndex];
  return messageIndex;
}

function randomBunnyMessageIndex(previousIndex = -1) {
  if (HOME_DATA.bunnyMessages.length <= 1) return 0;
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * HOME_DATA.bunnyMessages.length);
  } while (nextIndex === previousIndex);
  return nextIndex;
}

function initializeBunny() {
  let messageIndex = showBunnyMessage(randomBunnyMessageIndex());
  const bunny = document.querySelector(".bunny");
  document.querySelector("#bunny-button").addEventListener("click", () => {
    messageIndex = showBunnyMessage(randomBunnyMessageIndex(messageIndex));
    bunny.classList.remove("bunny-hop");
    void bunny.offsetWidth;
    bunny.classList.add("bunny-hop");
  });
  bunny.addEventListener("animationend", () => bunny.classList.remove("bunny-hop"));
}

async function loadShopifyStatus() {
  const badge = document.querySelector("#shopify-status");
  const detail = document.querySelector("#shopify-detail");
  try {
    const response = await fetch("https://www.shopifystatus.com/api/v2/status.json", {
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Shopify status failed (${response.status}).`);
    const result = await response.json();
    const operational = result.status?.indicator === "none";
    badge.textContent = operational ? "Operational" : "Review status";
    badge.className = `health-badge ${operational ? "health-good" : "health-warning"}`;
    detail.textContent = result.status?.description || "Open the official status page.";
    document.querySelector("#health-updated").textContent = "Live check";
  } catch (error) {
    console.warn("Shopify status could not be checked.", error);
    badge.textContent = "View status ↗";
    badge.className = "health-badge health-link";
    detail.textContent = "Open Shopify's official status page.";
  }
}

async function loadHomepage() {
  const today = todayAtNoon();
  document.querySelector("#today").textContent = formatDate(today, { weekday: "long" });
  document.querySelector("#refresh-note").textContent = `Refreshed ${new Intl.DateTimeFormat(
    "en-US",
    { hour: "numeric", minute: "2-digit" },
  ).format(new Date())}`;

  renderQuickLinks();
  initializeBunny();
  loadShopifyStatus();

  try {
    const response = await fetch(HOME_DATA.importantDatesCsv, { cache: "no-store" });
    if (!response.ok) throw new Error(`Date request failed (${response.status}).`);
    const records = parseDateRecords(await response.text());
    renderDateSummary(records, today);
  } catch (error) {
    console.warn("Using the saved schedule because the live Important Dates sheet could not load.", error);
    renderDateSummary(HOME_DATA.fallbackDates, today);
    document.querySelector("#refresh-note").textContent = "Using saved schedule";
  }
}

initializePinLock();
loadHomepage();
