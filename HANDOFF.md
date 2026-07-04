# HANDOFF — TFT Clinical Pathology Interview-Prep Project

_Last updated: 2026-07-04. This document lets a fresh session (or a new person) pick up exactly where things stand. Read it top to bottom before doing anything._

---

## 1. TL;DR — where things stand

- **Content curation is COMPLETE.** 44 markdown files: 25 base corpus + 19 enrichment. All non-empty, all high quality.
- **Repo exists and is private, on GitHub:** https://github.com/omarzbaba/tft-pathology-cp-interview-prep
- **The base corpus is committed and pushed.** The enrichment layer + this handoff are committed and pushed as of the latest commit (see `git log`).
- **What "didn't work" last time:** the second (enrichment) workflow actually **succeeded** — all 19 files generated — but its *completion signal was delayed* and the automated finishing steps (commit/push, index update) didn't run in that session. No content was lost. This handoff exists so the next session can continue cleanly.
- **The natural next phase is building the study DASHBOARD** from this corpus. That has **not** been started (by design — the original brief said "you are not building a website yet").
- **Two small human-input items are open:** (a) share access with Tala, (b) confirm the copyright name.

---

## 2. What this project is

A physician is preparing for a **phone interview for a Clinical Pathologist position** in the Division of Laboratory Medicine at **Lahey Hospital & Medical Center / Beth Israel Lahey Health (BILH)**, Boston area. The role is a **broad clinical pathologist** job (not narrow informatics), with explicitly stated current needs in **core laboratory management** and **informatics**, inside a **growing health system** that anticipates **integration with other hospital labs**.

The goal was to build a rich, study-ready content corpus (done) that can **later be turned into a premium interview-prep/learning dashboard** (next phase). The material is shared with a colleague, **Tala**, and the README opens by welcoming her by name.

---

## 3. Repository facts

- **URL:** https://github.com/omarzbaba/tft-pathology-cp-interview-prep
- **Owner / account:** `omarzbaba` (git identity: `omarzbaba`, `68678794+omarzbaba@users.noreply.github.com`)
- **Visibility:** PRIVATE (intentionally). A private-repo link 404s for anyone not invited — see §7 for sharing with Tala.
- **Default branch:** `main`
- **Local path:** `/Users/omarbaba/Library/CloudStorage/OneDrive-Personal/TFT Informatics education interview prep` (note: this is inside OneDrive; the `.gitignore` already excludes OneDrive conflict copies and OS junk).
- **License:** `LICENSE` — © 2026 **Omar Baba (TFT)**, All Rights Reserved (proprietary; personal study + Tala permitted, redistribution/commercial use not).

### Layout
```
README.md                     # welcomes Tala; overview; how-to-use; links; copyright
LICENSE                       # All Rights Reserved, © Omar Baba (TFT)
HANDOFF.md                    # this file
.gitignore
content/
  00-index.md                 # master table of contents (now includes enrichment)
  01..03                      # exec orientation, role interpretation, field map
  04a..04j                    # 10 core chapters (full teaching template per subtopic)
  05-project-bank-part-1/2    # 20 base project archetypes
  06-interview-bank-part-1/2/3# 44 interview questions
  07 speaking scripts, 08 plain-english, 09 rapid-review,
  10 glossary, 11 self-test, 12 metadata-tagging-schema
  enrichment/
    00-enrichment-index.md
    00-audit-gap-analysis.md
    04a..04j *-enrichment.md   # per-chapter depth packs
    05-project-deepening-part-1/2.md
    05-project-bank-part-3-new-archetypes.md   # projects 21–30
    06-interview-sharpening-part-1/2.md
    07-say-this-not-that-library.md
    08-plain-english-master.md
    09-cram-upgrade.md
    10-dashboard-spotlight.md
```

---

## 4. What's DONE

- [x] Full base corpus (Sections 1–12 of the original brief): exec orientation, Lahey/BILH role interpretation, pathology informatics field map, 10 core chapters, 20-project bank, 44-question interview bank, 11 speaking scripts, plain-English explanations, rapid-review/cram, glossary, self-test prompts, dashboard metadata schema.
- [x] Enrichment pass: audit/gap-analysis; per-chapter enrichment packs (more examples across all CP domains, management-depth blocks in 04e/04f, plain-English quartets, rapid-recall); project deepening (junior/senior framing, "if I didn't lead it," follow-ups, what-not-to-say) + 10 new archetypes (now 30 total); interview sharpening (conversational, concise + nuanced); say-this/not-that master library; plain-English master; cram upgrade; dashboard spotlight.
- [x] Repo created (private), base corpus committed + pushed.
- [x] Enrichment layer + index/README updates + this handoff committed + pushed.

---

## 5. What REMAINS

### A. Two quick human-input items (need the user)
1. **Share with Tala.** The repo is private, so she needs to be added as a read-only collaborator (she needs a free GitHub account). Once you have her GitHub username:
   ```
   gh api -X PUT repos/omarzbaba/tft-pathology-cp-interview-prep/collaborators/<TALA_USERNAME> -f permission=pull
   ```
   She then accepts the emailed invite. _Alternative:_ if frictionless access matters more than privacy, make the repo public (`gh repo edit omarzbaba/tft-pathology-cp-interview-prep --visibility public --accept-visibility-change-consequences`) — the All-Rights-Reserved LICENSE still legally reserves rights; public only makes it viewable.
2. **Confirm the copyright name.** Currently **"Omar Baba"** (inferred from the `omarzbaba` account). It appears in `LICENSE`, `README.md`, and commit messages. If the legal name differs, update those and re-commit.

### B. The main next phase — BUILD THE DASHBOARD
Not started yet. This is the real work for the next session. See §6 for detailed guidance.

---

## 6. How to build the dashboard (next-session guidance)

**Intent:** turn this corpus into a premium, navigable, study/interview-prep dashboard the learner (and Tala) can use. The original brief explicitly deferred this ("you are not building a website yet") — now is the time.

**Ingestion spec already exists:** `content/12-metadata-tagging-schema.md` defines the record schema (id, title, type, chapter, subtopic, difficulty, audience relevance, Lahey relevance, tags, summary, short answer, long answer, examples, follow-up questions, pitfalls) and a controlled vocabulary/tag taxonomy. Use it. The `content/enrichment/10-dashboard-spotlight.md` file says which sections to feature first and suggests filter tags and a "night before" bundle.

**Suggested approach:**
- **Content source:** parse the markdown in `content/` (base + `enrichment/`) into structured records per the Section 12 schema. Consider a lightweight build step that reads the markdown headings/fields into JSON the UI consumes.
- **Tech:** a self-contained static site is ideal (shareable, no backend, no PHI). React/Vite or even a single-page static build. Keep it deployable to GitHub Pages or shippable as a folder. (Note: GitHub Pages on a *private* repo needs a paid plan; a static build the user opens locally or hosts elsewhere avoids that.)
- **Design:** follow the user's ECC web rules — **avoid a generic template look**, intentional hierarchy, real typography, tasteful depth. Do NOT default to dark mode. Editorial/clean-luxury directions fit a premium study tool. Respect the web performance and accessibility rules.
- **Core features to prioritize** (from the spotlight file):
  - Chapter navigation (base + matching enrichment pack side by side).
  - **Drill mode** for the interview bank: question → reveal sharpened answer → toggle concise/nuanced.
  - **Filter/search** by tag, difficulty, use-case label, and CP domain (blood-bank, micro, POCT, coag, flow, molecular…).
  - **Cram mode** (20/60-min timed paths) and a **"night before"** bundle (say-this/not-that + cram one-pager + top sharpened answers + intro scripts).
  - Project bank browser (30 archetypes) with 30-sec / 2-min toggles and junior/senior framing.
- **Guardrails to preserve:** don't fabricate Lahey/BILH facts; keep all "likely/role-based interpretation" labels intact; no PHI; keep it private/shareable-with-Tala.

**Ready-to-paste starter prompt for the next session:**
> "Read `HANDOFF.md` and `content/12-metadata-tagging-schema.md` and `content/enrichment/10-dashboard-spotlight.md`. The content corpus in `content/` is complete. Build a self-contained, premium static dashboard from it: chapter navigation, interview drill mode (concise/nuanced toggle), tag/difficulty/domain filtering, cram mode, and a 'night before' bundle. Follow my ECC web design/performance/a11y rules, avoid a template look, don't default to dark mode. Ingest the markdown per the Section 12 schema. Don't fabricate any Lahey facts. Commit and push to the existing private repo when a working first version is ready."

---

## 7. Environment & tooling notes (for whoever continues)

- **GitHub CLI:** `gh` v2.92, authenticated as `omarzbaba` with scopes `gist, read:org, repo, workflow`. Can create/push private repos and manage collaborators.
- **git:** identity already set globally (`omarzbaba`). Attribution/co-author trailers are disabled per the user's global rules — do not add `Co-Authored-By` lines to commits.
- **Platform:** macOS (darwin), zsh. Repo lives under OneDrive — expect occasional sync latency; commit deliberately.
- **Model/harness:** sessions here run with **ultracode ON** (use the Workflow tool for substantive multi-file generation; it fans out agents and is how both content passes were produced). Two workflow scripts from prior passes are saved and resumable if ever needed:
  - Base corpus: run id `wf_3584c643-e37`
  - Enrichment: run id `wf_b160256b-b0f` (script path under the session's `workflows/scripts/`; resume with `Workflow({scriptPath, resumeFromRunId})` — completed agents return cached).
- **Note on the earlier hiccup:** a background workflow's completion notification can lag; if a session looks "stuck," check the files on disk (`ls content/enrichment/`) and `git status` before assuming failure. Last time, 19/19 files were already written when the session appeared idle.

---

## 8. Knowledge philosophy & style guardrails (keep these if extending content)

- **No fabrication of Lahey/BILH institution-only facts.** Any role-specific claim is framed as "likely / role-based interpretation / practical expectation." Don't invent exact regulatory numbers.
- **Broad CP role.** Weight core lab management, informatics, and multi-site integration, but keep credible breadth across chemistry/tox, heme/coag, POCT, flow, blood bank/apheresis, molecular, and micro.
- **Practical over academic.** Constant concrete examples; plain language first, jargon held in reserve. Make the learner sound like a thoughtful future colleague — collaborative, patient-safety-anchored, humble-but-decisive. Avoid buzzwords and inflated wording.
- **Frameworks used:** pathology informatics four groupings (information fundamentals / information systems / workflow & process / governance & management), PIER, practical lab management, digital pathology validation logic, and the standards HL7/FHIR, LOINC, SNOMED CT, UCUM.

---

## 9. Decisions already made (so they aren't re-litigated)

- Enrichment was added as an **additive layer** (`content/enrichment/`), not a destructive rewrite of the base chapters — better for the eventual dashboard (deep-dives become their own filterable cards) and lower-risk.
- Repo is **private** with an **All-Rights-Reserved** license (proprietary personal study material, not open source).
- File naming/layout as in §3; the metadata schema in `content/12-...` is the dashboard ingestion contract.
- Copyright holder rendered as **"Omar Baba (TFT)"** pending user confirmation.

---

_End of handoff. If you're the next session: do §5A only if the user asks, and treat §6 (the dashboard) as the primary objective._
