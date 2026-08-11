/*
 * ====================================================================
 * CHECKLIST CONTENT — EDIT NAMES AND MICROSOFT FORMS LINKS HERE ONLY
 * Never add passwords, employee responses, or customer information.
 * ====================================================================
 */
const CHECKLIST_DATA = {
  departments: [
    {
      name: "Wine Educators",
      accent: "wine",
      checklists: [
        { name: "ML Dining Garden", detail: "Main Lawn service area", url: "https://forms.cloud.microsoft/r/RHi1XgqFZL" },
        { name: "ML North Lawn", detail: "Main Lawn north service area", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5URDBKRzgwSVNST1hMUjdVSTJKUlFLSjRFSC4u" },
        { name: "ML South Lawn", detail: "Main Lawn south service area", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UOEZJOFpYODEyWk9UUlI5OEw2MEdTWDNORC4u" },
        { name: "Tasting Room", detail: "Tasting Room opening and closing", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UNkZTMkM5OTBMTDFIWVRIWjI4WExGSjhJSy4u" },
        { name: "Tours", detail: "Tour preparation and closeout", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UQzhTTTdLQTIxRTBHUVFZOFhJRzlBUE9YWC4u" },
        { name: "The Loft", detail: "Loft service and reset", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UMkpJSlFHN0g5OFY3RElHOTE1UEhHSEdGMS4u" },
        { name: "Founders Cellar", detail: "Founders Cellar service and reset", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UNFgwV1kwN1RWUDNOU1VYR0RXT1RXRE9XWS4u" },
      ],
    },
    {
      name: "Guest Relations",
      accent: "guest",
      checklists: [
        { name: "Downstairs and Anchor", detail: "Downstairs arrival and anchor duties", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UOUFWNEk5SDhEWDY3QUJIQ0kwN1NTNEYyTy4u" },
        { name: "Back Podium & Runner", detail: "Back podium and runner duties", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UQksxNklCVk1OS1JTNU1JSEdISTM1UE5KNi4u" },
        { name: "Front Podium", detail: "Front podium arrival duties", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UODVCUlZUSUtQTUlCME84NTFaMFBQWEM2Si4u" },
        { name: "Bottle Service", detail: "Bottle-service setup and closeout", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UMTFPM1lDTlNFV1lVVUFBUEUwVUJZRDMzUC4u" },
        { name: "Upstairs Podium", detail: "Upstairs podium duties", url: "https://forms.cloud.microsoft/r/uABBZCx7xw" },
      ],
    },
    {
      name: "Backstaff",
      accent: "backstaff",
      checklists: [
        { name: "Backstaff", detail: "Standard backstaff duties", url: "https://forms.cloud.microsoft/r/AEcttT35i7" },
        { name: "Backstaff Anchor", detail: "Backstaff anchor responsibilities", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=G2-6aChpPkS2t7j8nrgRLqHBd38-fthBvXG_KtUmvn5UOVVSUEFXM09HRVhaTEcyWkJFUUk3UlZYVi4u" },
      ],
    },
  ],
};

/*
 * SPECIAL PROJECTS SETUP
 * 1. Publish the projects tab of your Google Sheet as CSV.
 * 2. Paste that CSV address between the quotation marks below.
 * 3. Create a Google Form or Microsoft Form for completion reports and paste
 *    its public form address into COMPLETION_FORM_URL.
 * Expected sheet columns: Project, Owner, Due, Priority, Notes, Status
 */
const SPECIAL_PROJECTS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBnnk_a4wAoav9c9jyM-Zz553pjYxm5CQ5o5b2N7Vk2TcJP8maogqXRqeQcpoQC-BCWFtzQ82oOEmt/pub?gid=1502314827&single=true&output=csv";
const COMPLETION_FORM_URL = "https://forms.cloud.microsoft/r/QzX4wW7Xq0";

const SAMPLE_PROJECTS = [
  { Project: "Add your shared project sheet", Owner: "Manager", Due: "Setup needed", Priority: "Normal", Notes: "Use the included spreadsheet template to begin.", Status: "Not started" },
];

let activeDepartment = "All";

function renderFilters() {
  const names = ["All", ...CHECKLIST_DATA.departments.map((department) => department.name)];
  document.querySelector("#department-filters").innerHTML = names.map((name) => `
    <button type="button" class="department-button${name === activeDepartment ? " active" : ""}" data-department="${name}" aria-pressed="${name === activeDepartment}">${name}</button>
  `).join("");
}

function cardMarkup(checklist, number) {
  return `
    <a class="checklist-card" data-checklist-name="${checklist.name}" href="${checklist.url}" target="_blank" rel="noopener noreferrer">
      <span class="card-number" aria-hidden="true">${String(number).padStart(2, "0")}</span>
      <div>
        <h3>${checklist.name}</h3>
        <p>${checklist.detail}</p>
      </div>
      <span class="card-action">Start checklist <span aria-hidden="true">↗</span></span>
    </a>
  `;
}

function renderDepartments() {
  const visible = CHECKLIST_DATA.departments.filter(
    (department) => activeDepartment === "All" || department.name === activeDepartment,
  );
  document.querySelector("#checklist-sections").innerHTML = visible.map((department) => `
    <section class="department accent-${department.accent}" aria-labelledby="${department.accent}-title">
      <div class="department-heading">
        <div>
          <p class="eyebrow">${department.checklists.length} checklists</p>
          <h2 id="${department.accent}-title">${department.name}</h2>
        </div>
      </div>
      <div class="checklist-grid">${department.checklists.map((checklist, index) => cardMarkup(checklist, index + 1)).join("")}</div>
    </section>
  `).join("");
}

document.querySelector("#department-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-department]");
  if (!button) return;
  activeDepartment = button.dataset.department;
  renderFilters();
  renderDepartments();
});

function parseCSV(text) {
  const rows = [];
  let row = [], value = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"' && text[index + 1] === '"' && quoted) { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { row.push(value); value = ""; }
    else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index += 1;
      row.push(value); if (row.some((cell) => cell.trim())) rows.push(row); row = []; value = "";
    } else value += character;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, (cells[index] || "").trim()])));
}

function renderProjects(projects, isLive) {
  document.querySelector("#project-status").textContent = isLive
    ? `Live from the project sheet • ${projects.length} active project${projects.length === 1 ? "" : "s"}`
    : "Connect the Google Sheet to display live projects here.";
  document.querySelector("#project-grid").innerHTML = projects.map((project) => `
    <article class="project-card">
      <div class="project-topline"><span>${project.Priority || "Normal"} priority</span><strong>${project.Status || "Not started"}</strong></div>
      <h3>${project.Project || "Untitled project"}</h3>
      <p>${project.Notes || "No additional notes."}</p>
      <dl><div><dt>Assigned to</dt><dd>${project.Owner || "Team"}</dd></div><div><dt>Due</dt><dd>${project.Due || "No due date"}</dd></div></dl>
    </article>
  `).join("");
}

async function loadProjects() {
  if (!SPECIAL_PROJECTS_CSV_URL) { renderProjects(SAMPLE_PROJECTS, false); return; }
  try {
    const projects = await loadProjectsWithGoogleVisualization();
    renderProjects(projects, true);
  } catch (error) {
    renderProjects(SAMPLE_PROJECTS, false);
    document.querySelector("#project-status").textContent = "Projects are temporarily unavailable. Please try refreshing.";
  }
}

function loadProjectsWithGoogleVisualization() {
  return new Promise((resolve, reject) => {
    const publishedId = SPECIAL_PROJECTS_CSV_URL.match(/\/d\/e\/([^/]+)/)?.[1];
    const gid = new URL(SPECIAL_PROJECTS_CSV_URL).searchParams.get("gid") || "0";
    if (!publishedId) { reject(new Error("Invalid published Google Sheet URL")); return; }

    const previousGoogle = window.google;
    const previousVisualization = window.google?.visualization;
    const previousQuery = window.google?.visualization?.Query;
    const timer = window.setTimeout(() => {
      script.remove();
      reject(new Error("Google Sheet timed out"));
    }, 12000);
    const script = document.createElement("script");

    window.google = window.google || {};
    window.google.visualization = window.google.visualization || {};
    window.google.visualization.Query = {
      setResponse(response) {
        window.clearTimeout(timer);
        script.remove();
        try {
          if (response.status !== "ok") throw new Error("Google Sheet returned an error");
          const headers = response.table.cols.map((column) => column.label || column.id);
          const projects = response.table.rows.map((row) => Object.fromEntries(
            headers.map((header, index) => [header, row.c[index]?.f ?? row.c[index]?.v ?? ""]),
          )).filter((project) => project.Project && String(project.Status).toLowerCase() !== "complete");
          resolve(projects);
        } catch (error) {
          reject(error);
        } finally {
          if (previousGoogle === undefined) delete window.google;
          else {
            window.google = previousGoogle;
            window.google.visualization = previousVisualization;
            if (previousVisualization) window.google.visualization.Query = previousQuery;
          }
        }
      },
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      script.remove();
      reject(new Error("Published Google Sheet could not be loaded"));
    };
    script.src = `https://docs.google.com/spreadsheets/d/e/${publishedId}/gviz/tq?tqx=out:json&gid=${encodeURIComponent(gid)}&cache=${Date.now()}`;
    document.head.appendChild(script);
  });
}

if (COMPLETION_FORM_URL) {
  const completionButton = document.querySelector("#completion-button");
  completionButton.href = COMPLETION_FORM_URL;
  completionButton.target = "_blank";
  completionButton.rel = "noopener noreferrer";
  completionButton.classList.remove("is-disabled");
  completionButton.removeAttribute("aria-disabled");
}

const gameField = document.querySelector("#game-field");
const bunnyPlayer = document.querySelector("#bunny-player");
const gameButton = document.querySelector("#game-button");
const gameWrap = document.querySelector("#game-wrap");
const gameMessage = document.querySelector("#game-message");
const gameScore = document.querySelector("#game-score");
let gameRunning = false, score = 0, obstacleTimer, scoreTimer, jumping = false;

function jumpBunny() {
  if (!gameRunning || jumping) return;
  jumping = true;
  bunnyPlayer.classList.add("jumping");
  window.setTimeout(() => { bunnyPlayer.classList.remove("jumping"); jumping = false; }, 820);
}

function sendObstacle() {
  if (!gameRunning) return;
  const obstacle = document.createElement("span");
  const isCrate = Math.random() > .56;
  obstacle.className = `vineyard-obstacle ${isCrate ? "crate" : "barrel"}`;
  obstacle.setAttribute("aria-hidden", "true");
  obstacle.style.setProperty("--run-time", `${2.35 - Math.min(score, 40) * .018}s`);
  gameField.appendChild(obstacle);
  const collisionCheck = window.setInterval(() => {
    const obstacleRect = obstacle.getBoundingClientRect();
    const bunnyRect = bunnyPlayer.getBoundingClientRect();
    const horizontalHit = obstacleRect.left < bunnyRect.right - 38 && obstacleRect.right > bunnyRect.left + 38;
    const bunnyFeetTop = bunnyRect.bottom - 52;
    const verticalHit = obstacleRect.bottom > bunnyFeetTop && obstacleRect.top < bunnyRect.bottom - 8;
    if (horizontalHit && verticalHit) {
      window.clearInterval(collisionCheck);
      bunnyPlayer.classList.add("bonked");
      window.setTimeout(() => bunnyPlayer.classList.remove("bonked"), 450);
      gameMessage.textContent = "Bonk! Watch out for the vineyard gear.";
      stopGame(false, true);
    }
  }, 28);
  obstacle.addEventListener("animationend", () => { window.clearInterval(collisionCheck); obstacle.remove(); });
  obstacleTimer = window.setTimeout(sendObstacle, 1050 + Math.random() * 850);
}

function stopGame(paused = false, crashed = false) {
  gameRunning = false; window.clearTimeout(obstacleTimer); window.clearInterval(scoreTimer);
  gameField.querySelectorAll(".vineyard-obstacle").forEach((obstacle) => obstacle.remove());
  gameButton.textContent = "Play again";
  if (paused) gameMessage.textContent = "Game paused.";
  if (crashed) gameMessage.textContent += ` You traveled ${score} rows.`;
}

gameButton.addEventListener("click", (event) => {
  if (gameRunning && event.detail === 0) {
    jumpBunny();
    gameWrap.focus();
    return;
  }
  if (gameRunning) { stopGame(true); return; }
  score = 0; gameScore.textContent = "0"; gameRunning = true;
  gameButton.textContent = "Pause game"; gameMessage.textContent = "Tap or press Space to jump!"; sendObstacle();
  scoreTimer = window.setInterval(() => { score += 1; gameScore.textContent = score; }, 500);
  gameWrap.focus();
});

gameField.addEventListener("pointerdown", jumpBunny);

document.addEventListener("keydown", (event) => {
  if (!gameRunning || ![" ", "ArrowUp"].includes(event.key)) return;
  event.preventDefault();
  event.stopPropagation();
  jumpBunny();
  gameWrap.focus();
}, true);

document.querySelector("#today").textContent = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
}).format(new Date());

renderFilters();
renderDepartments();
loadProjects();
