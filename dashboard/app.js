/* =========================================================================
   Interview Command Center — app logic
   ========================================================================= */
(function () {
  "use strict";
  const D = window.__DATA__ || {};
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const stripTags = (h) => String(h || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();

  /* ---- storage (graceful if blocked) ---- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("tft." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("tft." + k, JSON.stringify(v)); } catch (e) {} },
  };
  const state = {
    theme: store.get("theme", null),
    progress: store.get("progress", {}),
    bookmarks: store.get("bookmarks", {}),
    chapterFilter: "All",
    projectFilter: "All",
    interviewFilter: "All",
  };

  /* ---- icons ---- */
  const I = {
    home: 'M3 11l9-8 9 8M5 9v11a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9',
    role: 'M3 21h18M6 21V7l6-4 6 4v14M10 9h.01M14 9h.01M10 13h.01M14 13h.01M10 17h.01M14 17h.01',
    map: 'M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3zM9 3v15M15 6v15',
    book: 'M4 5a2 2 0 012-2h12v18H6a2 2 0 01-2-2V5zM8 3v18',
    projects: 'M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4',
    chat: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
    phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
    bolt: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    quiz: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
    quote: 'M3 21c3-2 4-5 4-9V5H3v6h3M14 21c3-2 4-5 4-9V5h-4v6h3',
    scale: 'M12 3v18M6 8l-4 7h8L6 8zM18 8l-4 7h8l-4-7zM3 21h18M8 5h8',
    star: 'M12 2l3 6.5 7 .9-5 4.9 1.3 7L12 18l-6.3 3.3L7 14.3 2 9.4l7-.9L12 2z',
    starF: 'M12 2l3 6.5 7 .9-5 4.9 1.3 7L12 18l-6.3 3.3L7 14.3 2 9.4l7-.9L12 2z',
    sun: 'M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
    moon: 'M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z',
    search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
    menu: 'M3 12h18M3 6h18M3 18h18',
    chev: 'M9 18l6-6-6-6',
    arrowL: 'M19 12H5M12 19l-7-7 7-7',
    spark: 'M12 3l1.9 5.6L19 10l-5.1 1.4L12 17l-1.9-5.6L5 10l5.1-1.4L12 3z',
    grad: 'M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5',
    doc: 'M14 3v5h5M14 3l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7z',
  };
  const svg = (name, w = 18) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="${name === "starF" ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${I[name] || ""}"/></svg>`;

  /* ---- theme ---- */
  function applyTheme() {
    let t = state.theme;
    if (!t) t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    state.theme = cur === "dark" ? "light" : "dark";
    store.set("theme", state.theme);
    applyTheme();
    const btn = $("#themeBtn"); if (btn) btn.innerHTML = svg(document.documentElement.getAttribute("data-theme") === "dark" ? "sun" : "moon");
  }

  /* ---- progress ---- */
  const trackableIds = () => {
    const ids = [];
    (D.chapters || []).forEach((c) => c.subtopics.forEach((s) => { if (s.templated) ids.push(s.id); }));
    (D.interview || []).forEach((q) => ids.push(q.id));
    return ids;
  };
  function progressPct() {
    const ids = trackableIds();
    if (!ids.length) return 0;
    const known = ids.filter((id) => state.progress[id] === "known").length;
    return Math.round((known / ids.length) * 100);
  }
  function setProgress(id, val) {
    if (state.progress[id] === val) delete state.progress[id]; else state.progress[id] = val;
    store.set("progress", state.progress);
    const pf = $("#pfill"), pl = $("#plabel");
    if (pf) pf.style.width = progressPct() + "%";
    if (pl) pl.textContent = progressPct() + "%";
  }
  function toggleBookmark(id) {
    if (state.bookmarks[id]) delete state.bookmarks[id]; else state.bookmarks[id] = 1;
    store.set("bookmarks", state.bookmarks);
  }

  /* ---- field helpers ---- */
  const fh = (fields, key) => (fields && fields[key] && fields[key].html) || "";
  const ft = (fields, key) => stripTags(fh(fields, key));

  /* =======================================================================
     ACCESS GATE
     ======================================================================= */
  function renderGate() {
    const app = $("#app");
    app.removeAttribute("aria-busy");
    app.innerHTML = `
      <div class="gate">
        <div class="gate-card">
          <div class="gate-mark">Ψ</div>
          <h1>Interview Command Center</h1>
          <p>A private study system for the Clinical Pathologist role at Lahey / Beth&nbsp;Israel&nbsp;Lahey&nbsp;Health.<br>Enter the access code to continue.</p>
          <form class="gate-form" id="gateForm" autocomplete="off">
            <input id="gateInput" type="text" inputmode="text" maxlength="24" placeholder="access code" aria-label="Access code" autofocus>
            <button type="submit" class="enter">Enter</button>
          </form>
          <div class="err" id="gateErr" role="alert"></div>
          <div class="welcome">Welcome, <b>Tala</b> — this was built for you. Study well.</div>
        </div>
      </div>`;
    const form = $("#gateForm"), input = $("#gateInput"), err = $("#gateErr");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = (input.value || "").trim().toLowerCase();
      if (val === "tft") {
        store.set("access", 1);
        input.value = "";
        renderApp();
      } else {
        err.textContent = "That code isn't right — try again.";
        input.select();
      }
    });
    setTimeout(() => input && input.focus(), 60);
  }

  /* =======================================================================
     APP SHELL
     ======================================================================= */
  const NAV = [
    { group: "Study" },
    { r: "", t: "Home", i: "home" },
    { r: "role", t: "Role Lens", i: "role" },
    { r: "map", t: "Field Map", i: "map" },
    { r: "chapters", t: "Chapters", i: "book", badge: () => (D.chapters || []).length },
    { r: "projects", t: "Project Bank", i: "projects", badge: () => (D.projects || []).length },
    { group: "Rehearse" },
    { r: "interview", t: "Interview Bank", i: "chat", badge: () => (D.interview || []).length },
    { r: "phone", t: "Phone Screen Mode", i: "phone" },
    { r: "selftest", t: "Self-Test", i: "quiz" },
    { group: "Reference" },
    { r: "rapid", t: "Rapid Review", i: "bolt" },
    { r: "cram", t: "Cram Upgrade", i: "spark" },
    { r: "saynotthat", t: "Say This / Not That", i: "scale" },
    { r: "scripts", t: "Speaking Scripts", i: "quote" },
    { r: "glossary", t: "Glossary", i: "list", badge: () => (D.glossary || []).length },
    { r: "spotlight", t: "Spotlight", i: "star" },
  ];

  function shellHTML() {
    const navItems = NAV.map((n) => {
      if (n.group) return `<div class="nav-label">${esc(n.group)}</div>`;
      const b = n.badge ? `<span class="badge">${n.badge()}</span>` : "";
      return `<a href="#/${n.r}" data-route="${n.r}">${svg(n.i)}<span>${esc(n.t)}</span>${b}</a>`;
    }).join("");
    return `
      <div class="scrim" id="scrim"></div>
      <div class="shell">
        <aside class="sidebar" id="sidebar">
          <div class="brand">
            <div class="mark">Ψ</div>
            <div class="t">TFT · CP Prep<small>Command Center</small></div>
          </div>
          <nav class="nav">${navItems}</nav>
          <div class="side-foot">
            <div class="progress-mini"><span>Familiarity</span><span id="plabel">${progressPct()}%</span></div>
            <div class="pbar"><span id="pfill" style="width:${progressPct()}%"></span></div>
          </div>
        </aside>
        <div class="main">
          <header class="topbar">
            <button class="icon-btn hamburger" id="menuBtn" aria-label="Menu">${svg("menu")}</button>
            <div class="search">
              ${svg("search")}
              <input id="searchInput" type="search" placeholder="Search chapters, projects, questions, terms…" aria-label="Search" autocomplete="off">
              <kbd>/</kbd>
              <div class="search-results" id="searchResults" hidden></div>
            </div>
            <div class="topbar-actions">
              <button class="icon-btn" id="themeBtn" aria-label="Toggle theme">${svg(document.documentElement.getAttribute("data-theme") === "dark" ? "sun" : "moon")}</button>
            </div>
          </header>
          <div id="main"></div>
        </div>
      </div>`;
  }

  function renderApp() {
    const app = $("#app");
    app.removeAttribute("aria-busy");
    app.innerHTML = shellHTML();
    wireShell();
    route();
  }

  function wireShell() {
    $("#themeBtn").addEventListener("click", toggleTheme);
    const sidebar = $("#sidebar"), scrim = $("#scrim");
    $("#menuBtn").addEventListener("click", () => { sidebar.classList.toggle("open"); scrim.classList.toggle("on"); });
    scrim.addEventListener("click", () => { sidebar.classList.remove("open"); scrim.classList.remove("on"); });
    $("#sidebar").addEventListener("click", (e) => { if (e.target.closest("a")) { sidebar.classList.remove("open"); scrim.classList.remove("on"); } });
    const si = $("#searchInput");
    si.addEventListener("input", onSearch);
    si.addEventListener("focus", onSearch);
    document.addEventListener("click", (e) => { if (!e.target.closest(".search")) $("#searchResults").hidden = true; });
  }

  /* =======================================================================
     ROUTER
     ======================================================================= */
  function parseHash() {
    const h = (location.hash || "").replace(/^#\/?/, "");
    const [route, ...rest] = h.split("/");
    return { route: route || "", param: rest.join("/") };
  }
  function route() {
    const { route, param } = parseHash();
    const main = $("#main");
    if (!main) return;
    let html = "";
    switch (route) {
      case "": html = viewHome(); break;
      case "role": html = viewDoc(D.role, "Role Lens", "The employer-specific reading of the job — what it likely means and what to emphasize."); break;
      case "map": html = viewFieldMap(); break;
      case "chapters": html = viewChapters(); break;
      case "chapter": html = viewChapter(param); break;
      case "projects": html = viewProjects(); break;
      case "project": html = viewProject(param); break;
      case "interview": html = viewInterview(); break;
      case "phone": html = viewPhoneShell(); break;
      case "selftest": html = viewSelfTest(); break;
      case "rapid": html = viewRapid(); break;
      case "cram": html = viewDoc(D.cramUpgrade, "Cram Upgrade", "High-yield recall: top-5 per chapter, most-likely-asked, most-impressive."); break;
      case "saynotthat": html = viewDoc(D.sayNotThat, "Say This, Not That", "A language library — phrasing that sounds practical and collaborative, and phrases to avoid."); break;
      case "scripts": html = viewDoc(D.scripts, "Speaking Scripts", "Polished, natural-cadence scripts for the openers and the set-piece questions."); break;
      case "glossary": html = viewGlossary(); break;
      case "spotlight": html = viewDoc(D.spotlight, "Dashboard Spotlight", "The strongest sections to feature and study first."); break;
      case "orientation": html = viewDoc(D.orientation, "Executive Orientation", "What the job is, what the interview tests, and how to sound strong."); break;
      default: html = viewHome();
    }
    main.innerHTML = `<div class="view${["chapters", "projects", "interview", "glossary"].includes(route) ? " wide" : ""}">${html}</div>`;
    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("data-route") === route));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (route === "chapter") wireChapter();
    if (route === "interview") wireInterview();
    if (route === "phone") startPhone();
    if (route === "selftest") wireSelfTest();
    if (route === "map") wireFieldMap();
  }
  window.addEventListener("hashchange", route);

  /* =======================================================================
     HOME
     ======================================================================= */
  function viewHome() {
    const c = D.meta.counts;
    const quicks = [
      { r: "phone", i: "phone", h: "Phone Screen Mode", p: "Sequential rehearsal with timer & confidence tracking", cls: "" },
      { r: "cram", i: "spark", h: "60-Minute Cram", p: "High-yield recall path for the hour before the call", cls: "navy" },
      { r: "chapters", i: "book", h: "Browse Chapters", p: `${c.chapters} chapters · ${c.subtopics} teaching topics`, cls: "" },
      { r: "projects", i: "projects", h: "Project Bank", p: `${c.projects} adaptable project stories`, cls: "navy" },
      { r: "role", i: "role", h: "Lahey / BILH Priorities", p: "Core lab management, informatics & integration", cls: "" },
    ];
    const themes = [
      "Broad CP competence — comfortable across the whole menu, not siloed in one bench.",
      "Core lab management realism — staffing, TAT, QC, vendors, and calm under disruption.",
      "Informatics fluency — LIS, middleware, interfaces, autoverification, standards.",
      "Multi-site integration — harmonizing menus and ranges as BILH grows.",
      "Patient-safety instinct — every answer lands back on the patient at the end of the tube.",
      "Leadership through influence — moving techs, IT, and clinicians without title authority.",
    ];
    return `
      <section class="hero">
        <div class="eyebrow">${svg("grad", 14)} Interview Command Center</div>
        <h1>Clinical Pathology, Core Lab Management &amp; Pathology Informatics.</h1>
        <p class="lede">A serious, private study system for the Clinical Pathologist phone interview at Lahey Hospital &amp; Medical Center / Beth Israel Lahey Health — built to make you sound clinically grounded, operationally sharp, and genuinely hireable.</p>
        <div class="stat-row">
          <div class="stat"><b>${c.chapters}</b><span>Core chapters</span></div>
          <div class="stat"><b>${c.subtopics}</b><span>Teaching topics</span></div>
          <div class="stat"><b>${c.projects}</b><span>Project stories</span></div>
          <div class="stat"><b>${c.interview}</b><span>Interview Q&amp;A</span></div>
          <div class="stat"><b>${c.glossary}</b><span>Glossary terms</span></div>
        </div>
      </section>

      <div class="quick-grid">
        ${quicks.map((q) => `<a class="quick ${q.cls}" href="#/${q.r}"><div class="qi">${svg(q.i, 20)}</div><h3>${esc(q.h)}</h3><p>${esc(q.p)}</p></a>`).join("")}
      </div>

      <div class="home-cols">
        <div class="panel">
          <h3>What this interview is really testing</h3>
          <p class="muted" style="margin-bottom:1rem">A broad-CP phone screen is less about esoteric recall and more about whether you'd be a safe, competent, pleasant colleague who can help run and connect a growing lab system. The six themes below run through almost every good answer.</p>
          <ol style="margin:0;padding-left:1.1em;display:flex;flex-direction:column;gap:.5rem">
            ${themes.map((t) => `<li>${esc(t)}</li>`).join("")}
          </ol>
          <div class="btn-row" style="margin-top:1.3rem">
            <a class="btn primary" href="#/orientation">${svg("doc", 16)} Read the full orientation</a>
            <a class="btn" href="#/role">Lahey role lens ${svg("chev", 15)}</a>
          </div>
        </div>
        <div class="panel">
          <h3>Your study state</h3>
          <div style="display:flex;align-items:baseline;gap:.5rem;margin:.4rem 0 1rem">
            <span style="font-family:var(--font-display);font-size:2.6rem;line-height:1;color:var(--accent)">${progressPct()}%</span>
            <span class="muted">topics marked known</span>
          </div>
          <div class="pbar" style="margin-bottom:1.2rem"><span style="width:${progressPct()}%"></span></div>
          <p class="muted" style="font-size:.84rem">As you study chapters and interview questions, mark them <b>Known</b> or <b>Review</b>. Your familiarity meter updates here and in the sidebar. Progress is saved on this device only.</p>
          <div class="btn-row" style="margin-top:1rem">
            <a class="btn" href="#/chapters">Start with chapters</a>
            <a class="btn" href="#/interview">Drill questions</a>
          </div>
        </div>
      </div>

      <div class="callout claret" style="margin-top:2rem">
        <b>How to use this well:</b> Orient (Home → Role Lens) → learn (Chapters, deepest on Core Lab Management &amp; Integration) → stock stories (Project Bank) → rehearse (Interview Bank &amp; Phone Screen) → sharpen the last hour (Cram, Say-This/Not-That, Scripts). Everything institution-specific is a <em>role-based interpretation</em>, never claimed as inside knowledge.
      </div>`;
  }

  /* =======================================================================
     FIELD MAP
     ======================================================================= */
  function viewFieldMap() {
    const fm = D.fieldMap;
    const gColor = { fundamentals: "accent", systems: "systems", workflow: "workflow", governance: "governance" };
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("map", 14)} Field Map</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">The shape of pathology informatics</h2>
        <p class="sub">Four canonical groupings, and the practical lab categories that live inside them. Hover a grouping to see which categories belong to it; click a category to jump to its chapter.</p>
      </div>
      <div class="fm-groupings">
        ${fm.groupings.map((g) => `
          <div class="fm-group" data-g="${g.key}">
            <h3>${esc(g.name)}</h3>
            <p>${esc(g.blurb)}</p>
            <ul>${g.examples.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>
      <h3 style="font-family:var(--font-display);font-size:var(--step-1);margin-bottom:.8rem">Practical categories — and what a CP does there</h3>
      <div class="fm-cats">
        ${fm.categories.map((cat) => `
          <a class="fm-cat" href="#/chapter/${cat.chapter}" data-groups="${cat.groupings.join(" ")}">
            <div class="fc-name">${esc(cat.name)}<span class="fc-dots">${cat.groupings.map((g) => `<i class="${g}"></i>`).join("")}</span></div>
            <div class="fc-does">${esc(cat.does)}</div>
          </a>`).join("")}
      </div>
      <div class="callout" style="margin-top:2rem"><b>Say it in one breath:</b> “Pathology informatics is how lab data gets created, coded, moved, and governed so the right result reaches the right clinician safely — it spans the data itself, the systems that carry it, the workflow around it, and the governance that keeps it trustworthy.”</div>
      ${D.fieldMapDoc && D.fieldMapDoc.html ? `<details style="margin-top:1.6rem"><summary class="btn" style="display:inline-flex">Open the full field-map chapter</summary><div class="prose" style="margin-top:1rem">${D.fieldMapDoc.html}</div></details>` : ""}`;
  }
  function wireFieldMap() {
    const groups = document.querySelectorAll(".fm-group");
    const cats = document.querySelectorAll(".fm-cat");
    groups.forEach((g) => {
      g.addEventListener("mouseenter", () => {
        const key = g.getAttribute("data-g");
        cats.forEach((c) => c.classList.toggle("dim", !c.getAttribute("data-groups").split(" ").includes(key)));
        groups.forEach((o) => o.classList.toggle("dim", o !== g));
      });
      g.addEventListener("mouseleave", () => { cats.forEach((c) => c.classList.remove("dim")); groups.forEach((o) => o.classList.remove("dim")); });
    });
  }

  /* =======================================================================
     CHAPTERS
     ======================================================================= */
  const CHAPTER_FILTERS = ["All", "Basics", "Advanced", "Interview", "Management", "Informatics", "Lahey-specific"];
  function viewChapters() {
    const f = state.chapterFilter;
    const list = (D.chapters || []).filter((c) => f === "All" || c.tags.includes(f) || (f === "Basics" && c.subtopics.some((s) => s.difficulty === "basic")));
    const chips = CHAPTER_FILTERS.map((x) => `<button class="chip ${x === f ? "on" : ""}" data-action="chfilter" data-v="${x}">${esc(x)}</button>`).join("");
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("book", 14)} Chapters Library</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">Ten core chapters</h2>
        <p class="sub">The teaching spine. Each subtopic layers a plain-English take, a deeper explanation, real examples, interview wording, and pitfalls — reveal only what you need. Deepest on Core Lab Management (E) and Integration (J), the two the role names.</p>
      </div>
      <div class="chips">${chips}</div>
      <div class="chapter-grid">
        ${list.map((c) => {
          const total = c.subtopics.filter((s) => s.templated).length;
          const known = c.subtopics.filter((s) => s.templated && state.progress[s.id] === "known").length;
          const pct = total ? Math.round((known / total) * 100) : 0;
          return `<a class="ch-card" href="#/chapter/${c.id}">
            <div class="ch-top">
              <div class="ch-letter">${esc(c.letter)}</div>
              <div><h3>${esc(c.title)}</h3></div>
            </div>
            <div class="ch-meta">${c.tags.map((t) => `<span class="tag ${t === "Lahey-specific" ? "claret" : ""}">${esc(t)}</span>`).join("")}</div>
            <div class="ch-foot"><span>${total} topics</span><span class="ch-prog"><span style="width:${pct}%"></span></span></div>
          </a>`;
        }).join("")}
      </div>`;
  }

  const LAYERS = [
    { key: "essentials", label: "Essentials", fields: [["plain", "Plain-language explanation"], ["whyMatters", "Why it matters"], ["canonical", "Canonical summary"]] },
    { key: "deeper", label: "Deeper", fields: [["advanced", "Advanced explanation"], ["relCP", "Clinical pathology"], ["relMgmt", "Core lab management"], ["relInf", "Pathology informatics"]] },
    { key: "examples", label: "Examples", fields: [["examples", "Real-world examples"], ["scenario", "Scenario"]] },
    { key: "interview", label: "Interview", fields: [["talkingPoint", "Talking point"], ["strongAnswer", "Strong sample answer", "answer"], ["shortAnswer", "Short version", "answer"], ["followUps", "Likely follow-ups"]] },
    { key: "pitfalls", label: "Pitfalls & phrasing", fields: [["pitfalls", "Common pitfalls", "pitfall"], ["sayNotThat", "Say this, not that"], ["lahey", "Lahey/BILH relevance"], ["relatedProjects", "Related projects"]] },
  ];
  function viewChapter(id) {
    const c = (D.chapters || []).find((x) => x.id === id);
    if (!c) return `<div class="empty">Chapter not found. <a href="#/chapters">Back to chapters</a></div>`;
    const subs = c.subtopics.map((s, idx) => {
      if (!s.templated) return s.overviewHtml ? `<div class="subtopic"><button class="st-head" data-st="${idx}"><span class="st-n">${String(idx + 1).padStart(2, "0")}</span><span class="st-title">${esc(s.title)}</span><span class="caret">${svg("chev", 16)}</span></button><div class="st-body" hidden><div class="prose">${s.overviewHtml}</div></div></div>` : "";
      const avail = LAYERS.map((L) => ({ ...L, fields: L.fields.filter((fd) => fh(s.fields, fd[0])) })).filter((L) => L.fields.length);
      const tabs = avail.map((L, li) => `<button class="layer-tab ${li === 0 ? "on" : ""}" data-layer="${L.key}">${esc(L.label)}</button>`).join("");
      const panels = avail.map((L, li) => `<div class="layer-panel" data-panel="${L.key}" ${li === 0 ? "" : "hidden"}>${L.fields.map((fd) => {
        const cls = fd[2] === "answer" ? "answer-box" : fd[2] === "pitfall" ? "pitfall-box" : "";
        return `<div class="field-block"><span class="fl">${esc(fd[1])}</span><div class="${cls}">${fh(s.fields, fd[0])}</div></div>`;
      }).join("")}</div>`).join("");
      const diff = s.difficulty ? `<span class="tag ${s.difficulty}">${esc(s.difficulty)}</span>` : "";
      const known = state.progress[s.id] === "known";
      return `<div class="subtopic" id="${s.id}">
        <button class="st-head" data-st="${idx}">
          <span class="st-n">${c.letter}${idx + 1}</span>
          <span class="st-title">${esc(s.title)}</span>
          <span class="st-badges">${diff}</span>
          <span class="caret">${svg("chev", 16)}</span>
        </button>
        <div class="st-body" hidden>
          <div class="layers">${tabs}</div>
          ${panels}
          <div class="btn-row" style="margin-top:1rem;border-top:1px solid var(--line);padding-top:1rem">
            <button class="btn ${known ? "primary" : ""}" data-action="mark" data-id="${s.id}" data-v="known">${known ? "✓ Known" : "Mark known"}</button>
            <button class="btn" data-action="mark" data-id="${s.id}" data-v="review">Needs review</button>
            <button class="star ${state.bookmarks[s.id] ? "on" : ""}" data-action="bookmark" data-id="${s.id}" aria-label="Bookmark">${svg(state.bookmarks[s.id] ? "starF" : "star", 18)}</button>
          </div>
        </div>
      </div>`;
    }).join("");
    return `
      <button class="back-btn" onclick="location.hash='#/chapters'">${svg("arrowL", 16)} All chapters</button>
      <div class="detail-head">
        <div class="ch-letter" style="width:58px;height:58px;font-size:1.9rem">${esc(c.letter)}</div>
        <div>
          <h1 class="display" style="font-size:var(--step-3)">${esc(c.title)}</h1>
          <div class="ch-meta" style="margin-top:.5rem">${c.tags.map((t) => `<span class="tag ${t === "Lahey-specific" ? "claret" : ""}">${esc(t)}</span>`).join("")}</div>
        </div>
      </div>
      ${c.introHtml ? `<div class="prose" style="margin-bottom:1.6rem">${c.introHtml}</div>` : ""}
      ${subs}
      ${c.enrichmentHtml ? `<button class="enrich-toggle" data-action="enrich">${svg("spark", 16)} Open the enrichment pack — more examples, scenarios &amp; management depth</button><div class="prose" id="enrichBody" hidden style="margin-top:1.4rem;padding-top:1.4rem;border-top:1px solid var(--line)">${c.enrichmentHtml}</div>` : ""}`;
  }
  function wireChapter() {
    const main = $("#main");
    main.querySelectorAll(".st-head").forEach((h) => h.addEventListener("click", () => {
      const st = h.closest(".subtopic");
      const body = st.querySelector(".st-body");
      const open = st.classList.toggle("open");
      body.hidden = !open;
    }));
    main.querySelectorAll(".layer-tab").forEach((t) => t.addEventListener("click", () => {
      const wrap = t.closest(".st-body");
      wrap.querySelectorAll(".layer-tab").forEach((x) => x.classList.toggle("on", x === t));
      wrap.querySelectorAll(".layer-panel").forEach((p) => p.hidden = p.getAttribute("data-panel") !== t.getAttribute("data-layer"));
    }));
  }

  /* =======================================================================
     PROJECTS
     ======================================================================= */
  function projectTags() {
    const set = new Set();
    (D.projects || []).forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...[...set].sort()];
  }
  function viewProjects() {
    const f = state.projectFilter;
    const list = (D.projects || []).filter((p) => f === "All" || p.tags.includes(f));
    const chips = projectTags().map((x) => `<button class="chip ${x === f ? "on" : ""}" data-action="pjfilter" data-v="${esc(x)}">${esc(x)}<span class="c">${x === "All" ? (D.projects || []).length : (D.projects || []).filter((p) => p.tags.includes(x)).length}</span></button>`).join("");
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("projects", 14)} Project Bank</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">${(D.projects || []).length} adaptable project stories</h2>
        <p class="sub">Not a résumé — archetypes to reshape around what you've actually done. Each has a 30-second and 2-minute version, honest limitations, likely follow-ups, and an “if I didn't lead it” framing.</p>
      </div>
      <div class="chips">${chips}</div>
      <div class="grid-2">
        ${list.map((p) => {
          const desc = ft(p.fields, "problem") || ft(p.fields, "ptitle");
          return `<a class="proj-card" href="#/project/${p.id}">
            ${p.isNew ? '<span class="new-pill">New</span>' : ""}
            <span class="pn">Project ${p.num}</span>
            <h3>${esc(p.name)}</h3>
            <p class="pdesc">${esc(desc.slice(0, 150))}${desc.length > 150 ? "…" : ""}</p>
            <div class="ptags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          </a>`;
        }).join("")}
      </div>`;
  }
  function viewProject(id) {
    const p = (D.projects || []).find((x) => x.id === id);
    if (!p) return `<div class="empty">Project not found. <a href="#/projects">Back to projects</a></div>`;
    const F = p.fields;
    const block = (key, label, cls) => fh(F, key) ? `<div class="field-block"><span class="fl">${esc(label)}</span><div class="${cls || ""}">${fh(F, key)}</div></div>` : "";
    return `
      <button class="back-btn" onclick="location.hash='#/projects'">${svg("arrowL", 16)} Project Bank</button>
      <div class="detail-head" style="align-items:center">
        <div>
          <span class="pn muted" style="font-family:var(--font-mono)">Project ${p.num}${p.isNew ? " · New archetype" : ""}</span>
          <h1 class="display" style="font-size:var(--step-2);margin-top:.3rem">${esc(p.name)}</h1>
          <div class="ch-meta" style="margin-top:.5rem">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </div>

      <div class="card pad" style="margin-bottom:1.4rem">
        <div class="btn-row" style="justify-content:space-between">
          <strong>Elevator versions</strong>
          <div class="seg" id="pjseg"><button class="on" data-v="30">30-second</button><button data-v="2">2-minute</button></div>
        </div>
        <div id="pj30" style="margin-top:1rem">${fh(F, "desc30") || "<em class='muted'>—</em>"}</div>
        <div id="pj2" hidden style="margin-top:1rem">${fh(F, "desc2") || "<em class='muted'>—</em>"}</div>
      </div>

      ${block("ptitle", "Project title")}
      ${block("setting", "Setting")}
      ${block("problem", "Problem")}
      ${block("whyMattered", "Why it mattered")}
      ${block("stakeholders", "Stakeholders")}
      ${block("intervention", "Intervention")}
      ${block("metrics", "Metrics")}
      ${block("results", "Results", "answer-box")}
      ${block("limitations", "Possible limitations", "pitfall-box")}
      ${block("phrasing", "Interview-friendly phrasing", "answer-box claret")}
      ${block("competency", "Competency demonstrated")}
      ${block("adapt", "If you didn't directly lead it")}
      ${block("juniorSenior", "Junior vs senior framing")}
      ${block("followUps", "Likely interviewer follow-ups")}
      ${block("notToSay", "What not to say", "pitfall-box")}`;
  }

  /* =======================================================================
     INTERVIEW
     ======================================================================= */
  function interviewCategories() {
    const set = new Set();
    (D.interview || []).forEach((q) => set.add(q.category));
    return ["All", ...[...set]];
  }
  function viewInterview() {
    const f = state.interviewFilter;
    const list = (D.interview || []).filter((q) => f === "All" || q.category === f);
    const chips = interviewCategories().map((x) => `<button class="chip ${x === f ? "on" : ""}" data-action="ivfilter" data-v="${esc(x)}">${esc(x)}</button>`).join("");
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("chat", 14)} Interview Bank</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">${(D.interview || []).length} questions, decoded</h2>
        <p class="sub">Each question opens to reveal what they're <em>really</em> asking, the ingredients of a strong answer, a model answer, red flags, and short/long versions.</p>
      </div>
      <div class="chips">${chips}</div>
      ${list.map((q) => ivCard(q)).join("")}`;
  }
  function ivCard(q) {
    const F = q.fields;
    const model = fh(F, "model");
    const known = state.progress[q.id] === "known";
    return `<div class="iv-card" id="${q.id}">
      <button class="iv-q" data-ivq>
        <span class="qmark">Q</span>
        <span class="qt">${esc(q.question)}<span class="qcat" style="display:block;margin-top:3px">${esc(q.category)}</span></span>
        <span class="caret">${svg("chev", 16)}</span>
      </button>
      <div class="iv-body" hidden>
        ${fh(F, "reallyAsking") ? `<div class="subtle-head ask">${svg("search", 13)} What they're really asking</div><div>${fh(F, "reallyAsking")}</div>` : ""}
        ${fh(F, "ingredients") ? `<div class="subtle-head ingredients">${svg("spark", 13)} A strong answer includes</div><div>${fh(F, "ingredients")}</div>` : ""}
        ${model ? `<div class="subtle-head model">${svg("chat", 13)} Model answer</div><div class="answer-box">${model}</div>` : ""}
        ${fh(F, "redFlags") ? `<div class="subtle-head flags">⚑ Red flags</div><div class="pitfall-box">${fh(F, "redFlags")}</div>` : ""}
        <div class="layers" style="margin-top:1rem">
          ${fh(F, "concise") ? `<button class="layer-tab on" data-ivlayer="concise">Concise</button>` : ""}
          ${fh(F, "expanded") ? `<button class="layer-tab ${fh(F, "concise") ? "" : "on"}" data-ivlayer="expanded">Expanded</button>` : ""}
        </div>
        ${fh(F, "concise") ? `<div class="layer-panel" data-ivpanel="concise"><div class="answer-box claret">${fh(F, "concise")}</div></div>` : ""}
        ${fh(F, "expanded") ? `<div class="layer-panel" data-ivpanel="expanded" ${fh(F, "concise") ? "hidden" : ""}>${fh(F, "expanded")}</div>` : ""}
        <div class="btn-row" style="margin-top:1rem;border-top:1px solid var(--line);padding-top:1rem">
          <button class="btn ${known ? "primary" : ""}" data-action="mark" data-id="${q.id}" data-v="known">${known ? "✓ Known" : "Mark known"}</button>
          <button class="btn" data-action="mark" data-id="${q.id}" data-v="review">Needs review</button>
          <button class="star ${state.bookmarks[q.id] ? "on" : ""}" data-action="bookmark" data-id="${q.id}" aria-label="Bookmark">${svg(state.bookmarks[q.id] ? "starF" : "star", 18)}</button>
        </div>
      </div>
    </div>`;
  }
  function wireInterview() {
    const main = $("#main");
    main.querySelectorAll("[data-ivq]").forEach((b) => b.addEventListener("click", () => {
      const card = b.closest(".iv-card"), body = card.querySelector(".iv-body");
      const open = card.classList.toggle("open");
      body.hidden = !open;
    }));
    main.querySelectorAll("[data-ivlayer]").forEach((t) => t.addEventListener("click", () => {
      const wrap = t.closest(".iv-body");
      wrap.querySelectorAll("[data-ivlayer]").forEach((x) => x.classList.toggle("on", x === t));
      wrap.querySelectorAll("[data-ivpanel]").forEach((p) => p.hidden = p.getAttribute("data-ivpanel") !== t.getAttribute("data-ivlayer"));
    }));
  }

  /* =======================================================================
     PHONE SCREEN MODE
     ======================================================================= */
  let phone = { list: [], idx: 0, revealed: false, timer: 0, tick: null };
  function phoneSet() {
    const byCat = {};
    (D.interview || []).forEach((q) => { (byCat[q.category] = byCat[q.category] || []).push(q); });
    const order = ["Self-Introduction", "Motivation", "Lahey / BILH Role Fit", "CP Operations", "Lab Management", "Pathology Informatics", "Quality", "Workflow", "Teamwork", "Leadership"];
    const cats = Object.keys(byCat).sort((a, b) => {
      const ia = order.findIndex((o) => a.toLowerCase().includes(o.toLowerCase().split(" ")[0]));
      const ib = order.findIndex((o) => b.toLowerCase().includes(o.toLowerCase().split(" ")[0]));
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    const out = [];
    cats.forEach((c) => byCat[c].slice(0, 2).forEach((q) => out.push(q)));
    return out.slice(0, 18);
  }
  function viewPhoneShell() {
    return `
      <div class="phone-wrap">
        <div class="section-head" style="text-align:center">
          <div class="eyebrow" style="justify-content:center">${svg("phone", 14)} Phone Screen Mode</div>
          <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">High-yield rehearsal</h2>
          <p class="sub" style="margin:0 auto">Answer each aloud before you reveal. Rate your confidence and move on. ~18 of the most likely questions, in interview order.</p>
        </div>
        <div id="phoneStage"></div>
      </div>`;
  }
  function startPhone() {
    phone.list = phoneSet(); phone.idx = 0; phone.revealed = false; phone.timer = 0;
    if (phone.tick) clearInterval(phone.tick);
    renderPhone();
  }
  function fmtTime(s) { const m = Math.floor(s / 60), ss = s % 60; return `${m}:${String(ss).padStart(2, "0")}`; }
  function renderPhone() {
    const stage = $("#phoneStage"); if (!stage) return;
    const q = phone.list[phone.idx];
    if (!q) { stage.innerHTML = `<div class="empty">No questions available.</div>`; return; }
    const F = q.fields;
    const ans = fh(F, "concise") || fh(F, "model") || fh(F, "shortAnswer") || "";
    const more = fh(F, "expanded") || fh(F, "model") || "";
    const conf = state.progress["phone-" + q.id];
    stage.innerHTML = `
      <div class="phone-hud">
        <span class="tag claret">${esc(q.category)}</span>
        <div style="display:flex;align-items:center;gap:1rem">
          <span class="timer" id="phTimer">${fmtTime(phone.timer)}</span>
          <button class="btn" data-action="phTimer">${phone.tick ? "Pause" : "Start"} timer</button>
        </div>
      </div>
      <div class="phone-card">
        <div class="pq">${esc(q.question)}</div>
        ${phone.revealed ? `
          <div class="subtle-head model">${svg("chat", 13)} Concise answer</div>
          <div class="pa answer-box">${ans || "<em class='muted'>—</em>"}</div>
          ${more && more !== ans ? `<details style="margin-top:1rem"><summary class="btn" style="display:inline-flex">Expand for nuance</summary><div class="prose" style="margin-top:.8rem">${more}</div></details>` : ""}
          <div class="confidence">
            <button class="conf-btn low ${conf === "low" ? "on" : ""}" data-action="phConf" data-v="low">Shaky</button>
            <button class="conf-btn mid ${conf === "mid" ? "on" : ""}" data-action="phConf" data-v="mid">Getting there</button>
            <button class="conf-btn high ${conf === "high" ? "on" : ""}" data-action="phConf" data-v="high">Solid</button>
          </div>
        ` : `
          <p class="muted" style="flex:1">Say your answer out loud, then reveal.</p>
          <button class="btn primary" data-action="phReveal" style="align-self:flex-start">Reveal answer</button>
        `}
      </div>
      <div class="phone-nav">
        <button class="btn" data-action="phPrev" ${phone.idx === 0 ? "disabled" : ""}>${svg("arrowL", 15)} Prev</button>
        <div class="dots">${phone.list.map((_, i) => `<i class="${i < phone.idx ? "done" : ""} ${i === phone.idx ? "cur" : ""}"></i>`).join("")}</div>
        <button class="btn primary" data-action="phNext">${phone.idx === phone.list.length - 1 ? "Finish" : "Next"} ${svg("chev", 15)}</button>
      </div>
      <p class="muted" style="text-align:center;margin-top:1rem;font-size:.8rem">Question ${phone.idx + 1} of ${phone.list.length}</p>`;
  }
  function phoneAction(action, v) {
    const q = phone.list[phone.idx];
    if (action === "phReveal") { phone.revealed = true; renderPhone(); }
    else if (action === "phNext") { if (phone.idx < phone.list.length - 1) { phone.idx++; phone.revealed = false; renderPhone(); } else { location.hash = "#/interview"; } }
    else if (action === "phPrev") { if (phone.idx > 0) { phone.idx--; phone.revealed = false; renderPhone(); } }
    else if (action === "phConf") { state.progress["phone-" + q.id] = v; store.set("progress", state.progress); renderPhone(); }
    else if (action === "phTimer") {
      if (phone.tick) { clearInterval(phone.tick); phone.tick = null; }
      else { phone.tick = setInterval(() => { phone.timer++; const t = $("#phTimer"); if (t) t.textContent = fmtTime(phone.timer); }, 1000); }
      renderPhone();
    }
  }

  /* =======================================================================
     RAPID REVIEW
     ======================================================================= */
  function viewRapid() {
    const rr = D.rapidReview || { sections: [] };
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("bolt", 14)} Rapid Review</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">Cram &amp; recall</h2>
        <p class="sub">The page you open in the parking lot. Highest-yield concepts, quotable phrases, and timed cram paths.</p>
      </div>
      ${rr.introHtml ? `<div class="callout claret" style="margin-bottom:1.6rem">${stripTags(rr.introHtml).slice(0, 320)}…</div>` : ""}
      <div style="display:flex;flex-direction:column;gap:1rem">
        ${(rr.sections || []).map((s, i) => `
          <div class="card">
            <button class="st-head" data-rr="${i}" style="width:100%;text-align:left;background:none;border:none;padding:1.1rem 1.4rem;display:flex;align-items:center;gap:1rem;color:inherit">
              <span class="st-title" style="flex:1;font-family:var(--font-display);font-size:var(--step-1)">${esc(s.title)}</span>
              <span class="caret">${svg("chev", 16)}</span>
            </button>
            <div class="st-body prose" hidden style="padding:0 1.4rem 1.4rem">${s.html}</div>
          </div>`).join("")}
      </div>
      <div class="callout" style="margin-top:1.6rem"><b>Want more?</b> The <a href="#/cram">Cram Upgrade</a> adds top-5-per-chapter, “if you only remember three things,” and most-impressive markers.</div>`;
  }

  /* =======================================================================
     GLOSSARY
     ======================================================================= */
  function viewGlossary() {
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("list", 14)} Glossary</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">${(D.glossary || []).length} essential terms</h2>
        <p class="sub">Crisp definitions built to be <em>spoken from</em>, each with one concrete lab example. Filter with the search box below.</p>
      </div>
      <div class="search" style="max-width:420px;margin-bottom:1.4rem">
        ${svg("search")}
        <input id="glossFilter" type="search" placeholder="Filter terms…" aria-label="Filter glossary" autocomplete="off">
      </div>
      <div class="gloss-list" id="glossList">
        ${(D.glossary || []).map((g) => `<div class="gloss-card" data-term="${esc(g.term.toLowerCase())} ${esc(stripTags(g.definition).toLowerCase())}">
          <div class="gt">${esc(g.term)}</div>
          <div class="gd">${g.definition}</div>
          ${g.example ? `<div class="ge">${g.example}</div>` : ""}
        </div>`).join("")}
      </div>`;
  }

  /* =======================================================================
     SELF-TEST (flashcards)
     ======================================================================= */
  let flash = { idx: 0, flipped: false };
  function viewSelfTest() {
    const cards = (D.selfTest && D.selfTest.cards) || [];
    const others = (D.selfTest && D.selfTest.otherSets) || [];
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("quiz", 14)} Self-Test</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">Active recall</h2>
        <p class="sub">Cover, answer aloud, then flip. ${cards.length} flashcards, plus oral-exam and “explain it simply” prompt sets below.</p>
      </div>
      <div class="flash-wrap" id="flashWrap"></div>
      <div style="display:flex;flex-direction:column;gap:1rem;margin-top:2.4rem">
        ${others.map((o, i) => `<div class="card">
          <button class="st-head" data-rr2="${i}" style="width:100%;text-align:left;background:none;border:none;padding:1.1rem 1.4rem;display:flex;align-items:center;gap:1rem;color:inherit">
            <span class="st-title" style="flex:1;font-family:var(--font-display);font-size:var(--step-1)">${esc(o.title)}</span>
            <span class="caret">${svg("chev", 16)}</span>
          </button>
          <div class="st-body prose" hidden style="padding:0 1.4rem 1.4rem">${o.html}</div>
        </div>`).join("")}
      </div>`;
  }
  function renderFlash() {
    const wrap = $("#flashWrap"); if (!wrap) return;
    const cards = (D.selfTest && D.selfTest.cards) || [];
    if (!cards.length) { wrap.innerHTML = `<div class="empty">No flashcards available.</div>`; return; }
    const c = cards[flash.idx];
    wrap.innerHTML = `
      <div class="flash ${flash.flipped ? "flipped" : ""}" data-action="flip">
        <div class="flash-inner">
          <div class="flash-face flash-front"><div class="tagline">Flashcard ${flash.idx + 1} / ${cards.length} · tap to flip</div><div class="fq">${esc(c.q)}</div></div>
          <div class="flash-face flash-back"><div class="tagline">Answer</div><div class="fa">${c.a}</div></div>
        </div>
      </div>
      <div class="phone-nav">
        <button class="btn" data-action="flPrev" ${flash.idx === 0 ? "disabled" : ""}>${svg("arrowL", 15)} Prev</button>
        <div class="dots">${cards.map((_, i) => `<i class="${i === flash.idx ? "cur" : ""}"></i>`).join("")}</div>
        <button class="btn primary" data-action="flNext" ${flash.idx === cards.length - 1 ? "disabled" : ""}>Next ${svg("chev", 15)}</button>
      </div>`;
  }
  function wireSelfTest() { flash = { idx: 0, flipped: false }; renderFlash(); }

  /* =======================================================================
     DOC VIEW (rendered markdown with optional TOC)
     ======================================================================= */
  function viewDoc(doc, title, sub) {
    if (!doc || !doc.html) return `<div class="empty">Content unavailable.</div>`;
    const toc = (doc.toc || []).length > 3 ? `<nav class="toc">${doc.toc.map((t) => `<a href="#${t.id}">${esc(t.title)}</a>`).join("")}</nav>` : "";
    return `
      <div class="section-head">
        <div class="eyebrow">${svg("doc", 14)} ${esc(title)}</div>
        <h2 style="font-family:var(--font-display);font-size:var(--step-2);margin-top:.4rem">${esc(doc.title || title)}</h2>
        ${sub ? `<p class="sub">${esc(sub)}</p>` : ""}
      </div>
      <div class="doc-layout ${toc ? "with-toc" : ""}">
        ${toc}
        <article class="prose">${doc.html}</article>
      </div>`;
  }

  /* =======================================================================
     SEARCH
     ======================================================================= */
  let searchIndex = null;
  function buildIndex() {
    const idx = [];
    (D.chapters || []).forEach((c) => {
      idx.push({ type: "Chapter", label: c.title, sub: `${c.subtopics.length} topics`, route: `#/chapter/${c.id}`, text: (c.title + " " + c.tags.join(" ")).toLowerCase() });
      c.subtopics.forEach((s) => {
        const txt = (s.title + " " + Object.values(s.fields || {}).map((f) => stripTags(f.html)).join(" ")).toLowerCase();
        idx.push({ type: "Topic", label: s.title, sub: c.title, route: `#/chapter/${c.id}`, text: txt });
      });
    });
    (D.projects || []).forEach((p) => idx.push({ type: "Project", label: p.name, sub: p.tags.join(" · "), route: `#/project/${p.id}`, text: (p.name + " " + Object.values(p.fields || {}).map((f) => stripTags(f.html)).join(" ")).toLowerCase() }));
    (D.interview || []).forEach((q) => idx.push({ type: "Question", label: q.question, sub: q.category, route: `#/interview`, hash: q.id, text: (q.question + " " + ft(q.fields, "reallyAsking") + " " + ft(q.fields, "model")).toLowerCase() }));
    (D.glossary || []).forEach((g) => idx.push({ type: "Term", label: g.term, sub: stripTags(g.definition).slice(0, 60), route: `#/glossary`, text: (g.term + " " + stripTags(g.definition)).toLowerCase() }));
    (D.plainEnglish || []).forEach((p) => idx.push({ type: "Plain English", label: p.term, sub: "Plain-English explanation", route: `#/glossary`, text: (p.term + " " + stripTags(p.plain)).toLowerCase() }));
    return idx;
  }
  function onSearch() {
    const q = ($("#searchInput").value || "").trim().toLowerCase();
    const box = $("#searchResults");
    if (q.length < 2) { box.hidden = true; return; }
    if (!searchIndex) searchIndex = buildIndex();
    const hits = searchIndex.filter((e) => e.text.includes(q)).slice(0, 40);
    if (!hits.length) { box.hidden = false; box.innerHTML = `<div class="none">No matches for “${esc(q)}”.</div>`; return; }
    const groups = {};
    hits.forEach((h) => { (groups[h.type] = groups[h.type] || []).push(h); });
    const order = ["Chapter", "Topic", "Question", "Project", "Term", "Plain English"];
    box.hidden = false;
    box.innerHTML = order.filter((g) => groups[g]).map((g) => `
      <div class="sr-group">${esc(g)}</div>
      ${groups[g].slice(0, 6).map((h) => `<a href="${h.route}" data-hash="${h.hash || ""}"><span>${hl(h.label, q)}</span><small>${esc(h.sub)}</small></a>`).join("")}
    `).join("");
  }
  function hl(text, q) {
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
  }

  /* =======================================================================
     GLOBAL EVENT DELEGATION
     ======================================================================= */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-action]");
    // search result navigation → jump to hash anchor if present
    const sr = e.target.closest(".search-results a");
    if (sr) {
      const hash = sr.getAttribute("data-hash");
      $("#searchResults").hidden = true; $("#searchInput").value = "";
      if (hash) { setTimeout(() => { const el = document.getElementById(hash); if (el) { const b = el.querySelector("[data-ivq],.st-head"); if (b && !el.classList.contains("open")) b.click(); el.scrollIntoView({ behavior: "smooth", block: "center" }); } }, 120); }
      return;
    }
    if (!a) return;
    const act = a.getAttribute("data-action");
    const v = a.getAttribute("data-v");
    const id = a.getAttribute("data-id");
    if (act === "chfilter") { state.chapterFilter = v; $("#main").innerHTML = `<div class="view wide">${viewChapters()}</div>`; }
    else if (act === "pjfilter") { state.projectFilter = v; $("#main").innerHTML = `<div class="view wide">${viewProjects()}</div>`; }
    else if (act === "ivfilter") { state.interviewFilter = v; $("#main").innerHTML = `<div class="view wide">${viewInterview()}</div>`; wireInterview(); }
    else if (act === "mark") { setProgress(id, v); a.closest(".btn-row").querySelectorAll('[data-action="mark"]').forEach((b) => { const bv = b.getAttribute("data-v"); const on = state.progress[id] === bv; b.classList.toggle("primary", on && bv === "known"); if (bv === "known") b.textContent = on ? "✓ Known" : "Mark known"; }); }
    else if (act === "bookmark") { toggleBookmark(id); a.classList.toggle("on"); a.innerHTML = svg(state.bookmarks[id] ? "starF" : "star", 18); }
    else if (act === "enrich") { const b = $("#enrichBody"); b.hidden = !b.hidden; a.style.display = b.hidden ? "" : "none"; }
    else if (act === "phReveal" || act === "phNext" || act === "phPrev" || act === "phConf" || act === "phTimer") phoneAction(act, v);
    else if (act === "flip") { flash.flipped = !flash.flipped; $(".flash").classList.toggle("flipped", flash.flipped); }
    else if (act === "flNext") { const cards = D.selfTest.cards; if (flash.idx < cards.length - 1) { flash.idx++; flash.flipped = false; renderFlash(); } }
    else if (act === "flPrev") { if (flash.idx > 0) { flash.idx--; flash.flipped = false; renderFlash(); } }
  });
  // project 30/2 toggle, rapid/self accordions, glossary filter (delegated separately)
  document.addEventListener("click", (e) => {
    const seg = e.target.closest("#pjseg button");
    if (seg) { const v = seg.getAttribute("data-v"); seg.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === seg)); $("#pj30").hidden = v !== "30"; $("#pj2").hidden = v !== "2"; return; }
    const rr = e.target.closest("[data-rr]"); if (rr) { const b = rr.nextElementSibling; b.hidden = !b.hidden; rr.querySelector(".caret").style.transform = b.hidden ? "" : "rotate(90deg)"; return; }
    const rr2 = e.target.closest("[data-rr2]"); if (rr2) { const b = rr2.nextElementSibling; b.hidden = !b.hidden; rr2.querySelector(".caret").style.transform = b.hidden ? "" : "rotate(90deg)"; return; }
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "glossFilter") {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll("#glossList .gloss-card").forEach((c) => { c.style.display = c.getAttribute("data-term").includes(q) ? "" : "none"; });
    }
  });
  // keyboard: "/" focus search, Esc close
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") { const si = $("#searchInput"); if (si) { e.preventDefault(); si.focus(); } }
    if (e.key === "Escape") { const box = $("#searchResults"); if (box) box.hidden = true; }
    if (parseHash().route === "phone") { if (e.key === "ArrowRight") phoneAction("phNext"); if (e.key === "ArrowLeft") phoneAction("phPrev"); if (e.key === " " && !phone.revealed) { e.preventDefault(); phoneAction("phReveal"); } }
  });

  /* =======================================================================
     BOOT
     ======================================================================= */
  applyTheme();
  if (store.get("access", 0)) renderApp(); else renderGate();
})();
