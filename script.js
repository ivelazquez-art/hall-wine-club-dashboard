/*
 * ================================================================
 * DASHBOARD CONTENT — UPDATE LABELS AND DATES IN THIS OBJECT ONLY
 * Use YYYY-MM-DD dates. The page treats dates as local calendar days.
 * For a one-day deadline or batch, use "date".
 * For a date range, use "start" and "end".
 * ================================================================
 */
const DASHBOARD_DATA = {
  /*
   * OPTIONAL GOOGLE SHEETS CONNECTION
   * Leave this blank to use the dates below.
   * To manage dates from a published Google Sheet, paste its CSV URL here.
   * Required column headers: section,label,start,end,date
   * A row uses either start + end OR date. See WEBSITE-GUIDE.md.
   */
  googleSheetCsvUrl:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-F6DOU-RLv9fmvvG48Hutf_g5bdoOY4NMJ4Um55DJrJB9Rog4cPEzAZfmfazQNHUhhG9l3rbyD77i/pub?gid=0&single=true&output=csv",
  title: "Wine Club Important Dates",
  intro:
    "A quick view of Q3 customization windows, batches, pick-up timing, and the on-hold deadline.",
  footerNote: "Statuses refresh automatically each day.",
  sections: [
    {
      title: "Pick-Up",
      items: [
        {
          label: "Pick-Up Window",
          start: "2026-07-21",
          end: "2026-08-23",
        },
        {
          label: "Pick-Up Batch",
          date: "2026-08-25",
        },
      ],
    },
    {
      title: "HALL Shipping",
      items: [
        {
          label: "Primary Colors Customization",
          start: "2026-07-20",
          end: "2026-08-14",
        },
        {
          label: "Primary Colors Batch",
          date: "2026-08-17",
        },
        {
          label: "Collection Customization",
          start: "2026-07-22",
          end: "2026-08-17",
        },
        {
          label: "Collection Batch",
          date: "2026-08-19",
        },
      ],
    },
    {
      title: "Other Brands",
      items: [
        {
          label: "WALT / BACA / Michel Foch Customization",
          start: "2026-07-27",
          end: "2026-08-21",
        },
        {
          label: "WALT / BACA / Michel Foch Batch",
          date: "2026-08-25",
        },
      ],
    },
    {
      title: "On-Hold Deadline",
      items: [
        {
          label: "On Hold End Date",
          date: "2026-09-15",
        },
      ],
    },
  ],
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function parseLocalDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

function daysBetween(from, to) {
  return Math.round((startOfLocalDay(to) - startOfLocalDay(from)) / DAY_IN_MS);
}

function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(date);
}

function formatItemDate(item) {
  if (item.date) return formatDate(parseLocalDate(item.date));

  const start = parseLocalDate(item.start);
  const end = parseLocalDate(item.end);
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${formatDate(start, { year: undefined })}–${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${formatDate(start, { year: sameYear ? undefined : "numeric" })}–${formatDate(end)}`;
}

function getItemStatus(item, today) {
  const start = parseLocalDate(item.start || item.date);
  const end = parseLocalDate(item.end || item.date);
  const untilStart = daysBetween(today, start);
  const untilEnd = daysBetween(today, end);

  if (untilStart > 0) {
    return {
      key: "upcoming",
      label: "Upcoming",
      detail: untilStart === 1 ? "Tomorrow" : `${untilStart} days away`,
    };
  }

  if (untilEnd < 0) {
    return { key: "closed", label: "Closed", detail: "Date passed" };
  }

  if (item.date) {
    return { key: "open", label: "Open Now", detail: "Today" };
  }

  return {
    key: "open",
    label: "Open Now",
    detail: untilEnd === 0 ? "Ends today" : untilEnd === 1 ? "1 day remaining" : `${untilEnd} days remaining`,
  };
}

function getNextImportantDate(today) {
  const candidates = [];

  DASHBOARD_DATA.sections.forEach((section) => {
    section.items.forEach((item) => {
      if (item.date) {
        candidates.push({
          date: parseLocalDate(item.date),
          label: item.label,
          context: section.title,
        });
        return;
      }

      candidates.push(
        {
          date: parseLocalDate(item.start),
          label: `${item.label} Opens`,
          context: section.title,
        },
        {
          date: parseLocalDate(item.end),
          label: `${item.label} Closes`,
          context: section.title,
        },
      );
    });
  });

  return candidates
    .filter((candidate) => daysBetween(today, candidate.date) >= 0)
    .sort((a, b) => a.date - b.date)[0];
}

function renderNextDate(today) {
  const container = document.querySelector("#next-date");
  const next = getNextImportantDate(today);

  if (!next) {
    container.innerHTML = `
      <div>
        <p class="next-label">Next Important Date</p>
        <h2 id="next-date-title">Q3 schedule complete</h2>
      </div>
      <p class="next-meta">All listed dates have passed.</p>
    `;
    return;
  }

  const days = daysBetween(today, next.date);
  const dayLabel = days === 0 ? "Today" : days === 1 ? "Day Away" : "Days Away";

  container.innerHTML = `
    <div>
      <p class="next-label">Next Important Date</p>
      <h2 id="next-date-title">${next.label}</h2>
    </div>
    <p class="next-meta">${next.context} &nbsp;•&nbsp; ${formatDate(next.date)}</p>
    <div class="next-countdown" aria-label="${days === 0 ? "Today" : `${days} days away`}">
      <strong>${days === 0 ? "Now" : days}</strong>
      <span>${dayLabel}</span>
    </div>
  `;
}

function renderSections(today) {
  const sectionGrid = document.querySelector("#section-grid");

  sectionGrid.innerHTML = DASHBOARD_DATA.sections
    .map(
      (section, sectionIndex) => `
        <section class="date-section" aria-labelledby="section-${sectionIndex}">
          <div class="section-heading">
            <h2 id="section-${sectionIndex}">${section.title}</h2>
            <span class="section-number" aria-hidden="true">0${sectionIndex + 1}</span>
          </div>
          <ul class="date-list">
            ${section.items
              .map((item) => {
                const status = getItemStatus(item, today);
                return `
                  <li class="date-card">
                    <div>
                      <h3>${item.label}</h3>
                      <p class="date-range">${formatItemDate(item)}</p>
                    </div>
                    <div class="status-block">
                      <span class="status status-${status.key}">${status.label}</span>
                      <span class="countdown">${status.detail}</span>
                    </div>
                  </li>
                `;
              })
              .join("")}
          </ul>
        </section>
      `,
    )
    .join("");
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"' && inQuotes && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === "," && !inQuotes) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
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

function sheetRowsToSections(csvText) {
  const [headers, ...rows] = parseCsv(csvText);
  if (!headers) throw new Error("The sheet is empty.");

  const normalizedHeaders = headers.map((header) => header.toLowerCase());
  const requiredHeaders = ["section", "label", "start", "end", "date"];
  if (!requiredHeaders.every((header) => normalizedHeaders.includes(header))) {
    throw new Error("The sheet does not have the required columns.");
  }

  const records = rows
    .map((row) =>
      Object.fromEntries(normalizedHeaders.map((header, index) => [header, row[index] || ""])),
    )
    .filter((record) => record.section && record.label)
    .map((record) => {
      const item = { label: record.label };
      if (record.date) item.date = record.date;
      if (record.start) item.start = record.start;
      if (record.end) item.end = record.end;

      const validSingleDate = item.date && !item.start && !item.end;
      const validRange = !item.date && item.start && item.end;
      if (!validSingleDate && !validRange) {
        throw new Error(`Check the dates for “${record.label}.”`);
      }
      return { section: record.section, item };
    });

  if (!records.length) throw new Error("The sheet has no dashboard rows.");

  const sections = [];
  records.forEach(({ section, item }) => {
    let matchingSection = sections.find((entry) => entry.title === section);
    if (!matchingSection) {
      matchingSection = { title: section, items: [] };
      sections.push(matchingSection);
    }
    matchingSection.items.push(item);
  });
  return sections;
}

async function loadDatesFromGoogleSheets() {
  if (!DASHBOARD_DATA.googleSheetCsvUrl) return;

  try {
    const response = await fetch(DASHBOARD_DATA.googleSheetCsvUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Sheet request failed (${response.status}).`);
    DASHBOARD_DATA.sections = sheetRowsToSections(await response.text());
  } catch (error) {
    console.warn("Using the built-in dashboard dates because the Google Sheet could not load.", error);
  }
}

async function renderDashboard() {
  await loadDatesFromGoogleSheets();
  const today = startOfLocalDay(new Date());

  document.querySelector("#page-title").textContent = DASHBOARD_DATA.title;
  document.querySelector("#intro-copy").textContent = DASHBOARD_DATA.intro;
  document.querySelector("#footer-note").textContent = DASHBOARD_DATA.footerNote;
  document.querySelector("#today").textContent = `Today • ${formatDate(today, {
    weekday: "long",
  })}`;

  renderNextDate(today);
  renderSections(today);
}

renderDashboard();
