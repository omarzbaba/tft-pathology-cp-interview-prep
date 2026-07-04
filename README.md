# TFT — Clinical Pathology & Pathology Informatics Interview-Prep Corpus

**Prepared for a phone interview for a Clinical Pathologist position in the Division of Laboratory Medicine at Lahey Hospital & Medical Center / Beth Israel Lahey Health (BILH).**

---

## 👋 Welcome, Tala

Tala — this one's for you.

This is a complete, study-ready knowledge base built to make you sound *clinically grounded, operationally sharp, and genuinely hireable* on a clinical pathology phone screen — not just academically correct. Everything here is written to be read straight through, out loud, and under pressure. You don't need any dashboard or app to use it: open a chapter, read the plain-language explanation, rehearse the sample answers, and drill with the interview bank.

Start with **[Executive Orientation](content/01-executive-orientation.md)**, then read the **[Role Interpretation](content/02-lahey-bilh-role-interpretation.md)**, then work through the core chapters. When you're short on time, jump to **[Rapid Review & Cram](content/09-rapid-review-cram.md)**.

You've got this. 💪

---

## 🖥️ The study dashboard (start here)

The corpus is also a **live interactive study app** — an "Interview Command Center" with a home dashboard, the Lahey role lens, an interactive field map, the chapters library with layered topic views (plain-English → deeper → examples → interview → pitfalls), the 30-project bank, the 44-question interview bank, a **Phone Screen Mode** (timed sequential rehearsal with confidence tracking), rapid review, glossary, and flashcards. Global search, tag filters, familiarity progress, and light/dark themes are built in.

- **Open it:** **https://omarzbaba.github.io/tft-pathology-cp-interview-prep/**
- **Access code:** `TFT` (case-insensitive) — you'll enter it once.
- **Offline / local:** the whole app is a single self-contained `index.html` — you can also just open that file in any browser.

> Note on the access code: because the repository is public, the code is a friendly gate, not real security — the content is publicly viewable in the repo. It simply gives a clean, private-feeling entry point.

**Rebuild the app** after editing content: `node dashboard/build.mjs` (regenerates `index.html` from the markdown in `content/`).

---

## What this is

A premium, richly-detailed interview-preparation and learning corpus covering the full breadth of a **broad clinical pathologist role** — chemistry/toxicology/immunology, hematology/coagulation, point-of-care testing, flow cytometry, blood banking/apheresis, molecular, microbiology, and **clinical informatics** — with special weight on the two areas this role names explicitly: **core laboratory management** and **informatics**, plus **multi-hospital integration** in a growing health system.

The material is grounded in canonical frameworks (pathology informatics' four groupings, PIER, practical lab management, digital pathology validation logic, and the interoperability standards HL7, LOINC, SNOMED CT, and UCUM) and is written to stay practical rather than abstract.

## How to use it

1. **Orient** — read `01` and `02` to understand the role and what the interview is really testing.
2. **Map the field** — skim `03` for the mental model of pathology informatics.
3. **Go deep** — work the core chapters `04a`–`04j`. Each important subtopic has a plain-language explanation, an advanced explanation, real lab examples, a **strong sample answer**, a **short version**, likely **follow-ups**, common **pitfalls**, and **"say this, not that"** phrasing.
4. **Stock your stories** — the **[Project Bank](content/05-project-bank-part-1.md)** gives 20 adaptable project archetypes with 30-second and 2-minute versions.
5. **Drill** — the **Interview Bank** (`06`, three parts, 40+ questions) and **[Speaking Scripts](content/07-speaking-scripts.md)** are your rehearsal reps.
6. **Sharpen** — `08` (plain-English one-liners), `09` (cram paths), `10` (glossary), `11` (self-test).
7. **Later** — `12` is a metadata schema if this ever becomes a dashboard.

## Contents

See the **[full index →](content/00-index.md)**

| # | Section |
|---|---------|
| 1 | [Executive Orientation](content/01-executive-orientation.md) |
| 2 | [Lahey/BILH Role Interpretation](content/02-lahey-bilh-role-interpretation.md) |
| 3 | [Pathology Informatics Field Map](content/03-pathology-informatics-field-map.md) |
| 4 | Core Chapters — [A Foundations](content/04a-foundations-of-pathology-informatics.md) · [B LIS & Lab Systems](content/04b-lis-and-laboratory-systems.md) · [C Interoperability & Standards](content/04c-interoperability-and-data-standards.md) · [D Workflow & Operations](content/04d-workflow-operations-process-improvement.md) · [E Core Lab Management](content/04e-core-laboratory-management.md) · [F Quality & Validation](content/04f-quality-validation-regulatory.md) · [G Digital Pathology](content/04g-digital-pathology-wsi.md) · [H Analytics & CDS](content/04h-data-analytics-dashboards-cds.md) · [I Leadership & Change](content/04i-leadership-governance-change-management.md) · [J Multi-Hospital Integration](content/04j-multi-hospital-integration-standardization.md) |
| 5 | Project Bank — [Part 1](content/05-project-bank-part-1.md) · [Part 2](content/05-project-bank-part-2.md) |
| 6 | Interview Bank — [Part 1](content/06-interview-bank-part-1.md) · [Part 2](content/06-interview-bank-part-2.md) · [Part 3](content/06-interview-bank-part-3.md) |
| 7 | [Speaking Scripts](content/07-speaking-scripts.md) |
| 8 | [Plain-English Explanations](content/08-plain-english-explanations.md) |
| 9 | [Rapid Review & Cram](content/09-rapid-review-cram.md) |
| 10 | [Glossary](content/10-glossary.md) |
| 11 | [Self-Test Prompts](content/11-self-test-prompts.md) |
| 12 | [Metadata & Tagging Schema](content/12-metadata-tagging-schema.md) |

## Enrichment layer

On top of the base sections above, an **enrichment layer** (`content/enrichment/`) goes deeper — more worked examples across blood bank, microbiology, coagulation, POCT, molecular, and flow; dialogue-level management realism; sharpened conversational interview answers (concise + nuanced); a **say-this / not-that** master language library; a **plain-English master**; an upgraded **cram** sheet; the project bank expanded to **30 archetypes**; and a **dashboard spotlight**. Start at the **[enrichment index →](content/enrichment/00-enrichment-index.md)**.

## Project status & handoff

Content curation is **complete** (44 markdown files: 25 base + 19 enrichment). The natural next phase is turning this corpus into the study **dashboard** (the `content/12-metadata-tagging-schema.md` file is written as the ingestion spec). See **[HANDOFF.md](HANDOFF.md)** for a full status, environment notes, open questions, and a ready-to-paste starter prompt for the next working session.

## A note on accuracy

This is educational preparation material. It does **not** contain confidential or institution-only facts about Lahey/BILH; anything role-specific is clearly framed as a *likely priority* or *practical expectation*. It is not official guidance from any hospital, the College of American Pathologists, or any regulatory body.

---

© 2026 **Omar Baba (TFT)**. All Rights Reserved. See [LICENSE](LICENSE).
Created for **TFT** and shared with **Tala** for interview preparation.
