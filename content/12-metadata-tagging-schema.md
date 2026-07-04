# Metadata & Tagging Schema

This section defines a lightweight, implementation-ready metadata model for the corpus. Right now the material reads perfectly well as plain Markdown — you don't need any of this to study. But the moment you (or Tala) want to build a study dashboard, a spaced-repetition drill, a "show me only advanced informatics items" filter, or a searchable question bank, you need every teachable unit to carry consistent, machine-readable tags. This section gives you that schema without changing a single word of the study content itself.

The design goal is **one record per teachable unit** — one core-chapter subtopic, one interview question, one project archetype, one plain-English term, one glossary entry — with a small, disciplined set of fields and a **controlled vocabulary** so that filtering is predictable. Everything here is intentionally minimal: enough structure to power a real dashboard, not so much that maintaining it becomes a second job. That is the same operational instinct a clinical pathologist brings to the lab — the right amount of standardization, no more.

A quick framing that maps this directly to the informatics themes in the rest of the corpus: this section is a small, self-contained exercise in the exact thing the role asks about. A record schema is a **data dictionary**. A controlled vocabulary is a **coded terminology** (the same reason we use LOINC for "what was measured" and SNOMED CT for "what it means"). A tag taxonomy is a **classification hierarchy**. And a dashboard that filters on these fields is **structured, coded data doing work that free text can't**. If the interviewer ever asks "what does good metadata look like," this section *is* the answer.

---

## Table of Contents

1. [Design principles](#1-design-principles)
2. [Proposed record schema (field dictionary)](#2-proposed-record-schema-field-dictionary)
3. [Controlled vocabularies](#3-controlled-vocabularies)
4. [Starter tag taxonomy](#4-starter-tag-taxonomy)
5. [JSON example record (one real corpus item)](#5-json-example-record-one-real-corpus-item)
6. [Worked example table — 5 corpus items mapped to metadata](#6-worked-example-table--5-corpus-items-mapped-to-metadata)
7. [How a dashboard could filter and search](#7-how-a-dashboard-could-filter-and-search)
8. [Practical notes on maintaining the schema](#8-practical-notes-on-maintaining-the-schema)

---

## 1. Design principles

Five principles drive every choice below. They are the same principles that make a lab data model trustworthy.

1. **One record = one teachable unit.** A record is the smallest thing a learner would want to pull up on its own: a single subtopic, a single interview question, a single project. Not a whole chapter. Granularity is what makes filtering and drilling useful.
2. **Controlled vocabularies for anything you filter on.** Free text is fine for prose fields (`summary`, `long_answer`). But any field a dashboard filters, groups, or counts by — `type`, `difficulty`, `use_case`, `tags` — must draw from a fixed, documented list. This is exactly why coded terminologies beat free text in the LIS: you can't reliably filter on "roughly the same idea spelled five ways."
3. **Stable, human-readable IDs.** IDs encode the source location so a record is traceable back to its Markdown home and never silently collides. They are meaningful to a human skimming a spreadsheet, not opaque UUIDs.
4. **Two boolean-ish relevance axes, kept separate.** `audience_relevance` (who is this most for) and `lahey_relevance` (how tied is this to the specific role) are different questions and must not be collapsed into one field. Keeping orthogonal concepts in separate fields is the same discipline as not overloading a single LIS result field with three meanings.
5. **Optional fields degrade gracefully.** Not every record has follow-up questions or pitfalls (a glossary entry won't). Missing = empty array or `null`, never a fabricated value. A dashboard must render a record cleanly even when half its optional fields are empty.

---

## 2. Proposed record schema (field dictionary)

Each teachable unit is one record (one row in a table, or one object in a JSON array). The table below is the authoritative field dictionary: field name, data type, whether it's required, allowed values or controlled vocabulary, and notes.

| Field | Type | Required | Allowed values / controlled vocabulary | Notes |
|---|---|---|---|---|
| **id** | string | Yes | Pattern: `NN[letter]-<slug>` (e.g., `04c-loinc`, `06p2-q14-management-vs-informatics`, `05-01-tat-dashboard`) | Stable, unique, human-readable. Prefix encodes the source file (chapter/section number + letter). The slug is a short kebab-case identifier for the specific unit. Traceable back to the Markdown source. Never reuse an ID. |
| **title** | string | Yes | Free text, ≤ ~90 chars | The display name of the unit. For a subtopic, its heading (e.g., "LOINC: A Universal Name for What Was Measured"). For an interview question, the question itself, trimmed. |
| **type** | enum | Yes | See [`type` vocabulary](#31-type) | The kind of record. Drives which fields are expected to be populated and how the dashboard renders it. |
| **chapter** | string | Yes | Chapter code: `01`–`03`, `04a`–`04j`, `05`, `06`, `07`–`12` | The source file / section the record lives in. Enables "browse by chapter" and grouping. Matches the file numbering already used in the corpus. |
| **subtopic** | string | No | Free text; e.g., "Subtopic 3", "E7", "Project 1", "Q14" | The within-chapter locator. Mirrors the actual heading label used in the source (chapters use `Subtopic N —` or `E7.` style headings). `null` for chapter-level or standalone records. |
| **difficulty** | enum | Yes | `basic` \| `intermediate` \| `advanced` | Matches the **Difficulty level** field already written into each core subtopic. Assign a best-fit level to non-templated records (glossary terms are usually `basic`; integration governance is usually `advanced`). |
| **audience_relevance** | enum | Yes | See [`audience_relevance` vocabulary](#33-audience_relevance) | Who the unit primarily serves — used to build focused study views (e.g., "everything most useful to a candidate the night before"). |
| **lahey_relevance** | enum | Yes | `high` \| `medium` \| `low` | How tightly the unit ties to *this specific* Lahey/BILH role (core lab management, informatics, multi-hospital integration). High = directly hits a stated role need; low = general background. This is a **role-based interpretation**, not an institutional fact. |
| **use_case** | enum | Yes | See [`use_case` vocabulary](#32-use_case) | Mirrors the **Use case label** field in core subtopics (`concept` / `interview` / `management` / `informatics` / `project` / `rapid review`). Drives the primary "study mode" filters. |
| **tags** | array of strings | Yes | Draw from the [starter tag taxonomy](#4-starter-tag-taxonomy); ≥ 1 tag | The cross-cutting, faceted labels. A record almost always carries several (e.g., an item can be `informatics` **and** `integration` **and** `interview`). This is the workhorse field for search. |
| **summary** | string | Yes | Free text, 1–2 sentences | The one-breath "what is this" line. Powers list views, hover cards, and search snippets. Should stand alone without the full record. |
| **short_answer** | string | No | Free text, ≤ ~60 words | The phone-ready, say-it-out-loud version. Maps to **Short version answer** / "phone-ready line." `null` for pure concept/glossary records that have no "answer." |
| **long_answer** | string | No | Free text / Markdown | The full teaching answer or explanation. Maps to **Strong sample answer** (interview items) or the **Advanced explanation** (concept items). `null` where not applicable. |
| **examples** | array of strings | No | Free text entries | Concrete real-world lab examples and example scenarios. Maps to **Real-world laboratory examples** + **Example scenario**. Empty array if none. |
| **follow_up_questions** | array of strings | No | Free text entries | Likely interviewer follow-ups. Maps to **Potential follow-up questions**. Empty array for records with none (e.g., glossary). |
| **pitfalls** | array of strings | No | Free text entries | Common weak answers / traps to avoid. Maps to **Common pitfalls / weak answers** and pairs naturally with the **"Say this, not that"** phrasing. Empty array if none. |

### Optional companion fields (recommended, not required)

These aren't in the required set but pay for themselves quickly in a real dashboard. Add them when you're ready; leave them out and nothing breaks.

| Field | Type | Allowed values / notes |
|---|---|---|
| **say_this_not_that** | array of objects `{ say, not }` | Structured version of the **"Say this, not that"** field, so a dashboard can render a two-column contrast. |
| **related_projects** | array of strings (IDs or names) | Cross-links to Project Bank archetypes (**Related project archetypes** field). Enables "show me the story I'd tell for this concept." |
| **cp_domain** | array of strings | Which clinical-pathology domains it touches: `chemistry`, `heme-coag`, `POCT`, `flow`, `blood-bank`, `molecular`, `micro`, `informatics`. Lets you build domain-specific review sets. |
| **standards** | array of strings | Interop/regulatory standards referenced: `HL7`, `FHIR`, `LOINC`, `SNOMED-CT`, `UCUM`, `CAP`, `CLIA`, `FDA`. Powers a "standards drill." |
| **est_read_minutes** | integer | Rough time to read/rehearse. Powers "I have 15 minutes" study sessions. |
| **source_path** | string | Repo-relative path to the Markdown file (e.g., `content/04c-interoperability-and-data-standards.md`) for deep-linking. |
| **last_reviewed** | ISO 8601 date | When the learner last drilled this unit — the hook for spaced repetition. |

---

## 3. Controlled vocabularies

Controlled vocabularies are the enforced pick-lists behind the enum fields. Keep each one small and documented; when in doubt, resist adding a new value — vocabulary sprawl is the metadata equivalent of a lab test menu no one can maintain.

### 3.1 `type`

The kind of teachable unit. Chosen to match the actual content shapes in this corpus.

| Value | Meaning | Typical source |
|---|---|---|
| `subtopic` | A full templated teaching unit (plain + advanced explanation, sample answer, follow-ups, pitfalls). | Core chapters `04a`–`04j` |
| `interview_question` | A single interview question with model answer(s). | Interview Bank `06` (parts 1–3) |
| `project` | A reusable project archetype/story (30-second + 2-minute versions). | Project Bank `05` |
| `concept` | A focused concept or field-map entry, lighter than a full subtopic. | Field Map `03`, Foundations `04a` |
| `plain_english` | A plain-language, one-idea explanation of a term. | Plain-English Explanations `08` |
| `glossary` | A short definition entry. | Glossary `10` |
| `script` | A rehearsable spoken passage (self-intro, closing, etc.). | Speaking Scripts `07` |
| `self_test` | A prompt/question the learner answers to test themselves. | Self-Test Prompts `11` |
| `orientation` | High-level framing / how-to-use material. | `01`, `02`, `README` |
| `rapid_review` | A condensed cram card / high-yield summary. | Rapid Review & Cram `09` |

### 3.2 `use_case`

The **Use case label** already stamped on each core subtopic. This is the primary "why am I looking at this" filter. Values are kept identical to the labels in the source so nothing has to be re-mapped.

| Value | Meaning |
|---|---|
| `concept` | Learn/understand the idea. |
| `interview` | Rehearse to say out loud in the interview. |
| `management` | Core-laboratory-management framing and talking points. |
| `informatics` | Pathology-informatics framing and talking points. |
| `project` | A story/archetype to deploy as evidence. |
| `rapid review` | Last-minute, high-yield refresh. |

> Note the deliberate choice to keep `rapid review` with a space (matching the source label). If a dashboard prefers slugs, normalize to `rapid-review` at load time — but keep one canonical form documented so you don't end up filtering on two spellings.

### 3.3 `audience_relevance`

Who the unit is primarily for. The corpus is written for the interviewing physician and shared with Tala, so audience is a real, useful axis.

| Value | Meaning |
|---|---|
| `candidate-core` | Essential for anyone taking this interview — study this. |
| `candidate-stretch` | Advanced/differentiator material to stand out, not strictly required. |
| `reviewer-reference` | Background/reference; supports understanding but you wouldn't recite it. |
| `shared-study` | General study material equally useful to Tala or any learner. |

### 3.4 `difficulty`

Matches the **Difficulty level** field verbatim.

| Value | Meaning |
|---|---|
| `basic` | Foundational; a generalist should know this cold. |
| `intermediate` | Requires connecting concepts; expected of a strong CP candidate. |
| `advanced` | Nuanced, governance-level, or integration-level; a differentiator. |

### 3.5 `lahey_relevance`

How directly the unit maps to *this specific* role's stated needs (core lab management, informatics, and growth-driven multi-hospital integration). Treat this as a **role-based interpretation**, never as an institution-only fact about Lahey/BILH.

| Value | Meaning |
|---|---|
| `high` | Hits a named role need head-on (management, informatics, integration/standardization). |
| `medium` | Supports the role and likely to come up, but not a headline theme. |
| `low` | General CP/informatics background; useful, but not role-specific. |

---

## 4. Starter tag taxonomy

Tags are the **faceted, cross-cutting** labels — a record wears several at once. Where `type`/`use_case`/`difficulty` are single-value enums, `tags` is a multi-value set that captures the several dimensions a unit lives in simultaneously. The starter taxonomy below is grouped so it stays navigable; a record can (and usually should) draw a tag from more than one group.

Keep the taxonomy **flat in storage** (a plain list of strings) but **grouped in documentation** (below) so people know where each tag belongs. That's the same pattern as a well-run lab test catalog: one flat searchable list, organized headings for humans.

### Core theme tags (the requested starter set)

| Tag | Use it when the unit is about… |
|---|---|
| `informatics` | LIS/middleware, interfaces, data standards, analytics, CDS, digital pathology, data governance. |
| `operations` | Day-to-day lab running: TAT, throughput, POCT, staffing awareness, bench workflow, instrumentation. |
| `quality` | QC/QA, validation/verification, proficiency testing, error reduction, patient-safety mechanisms. |
| `management` | Medical-director mindset, SOPs/document control, resource/service balance, working with lab managers. |
| `leadership` | Influence without title, change management, governance, communication, stakeholder alignment. |
| `integration` | Multi-hospital standardization, harmonization, test-menu/reference-range alignment, system growth. |
| `cp-domain` | Any clinical-pathology discipline content (chemistry, heme/coag, blood bank, micro, flow, molecular). |
| `interview` | Framed for rehearsal — has a sample answer, phrasing, or "say this, not that." |
| `rapid-review` | High-yield, condensed, last-minute refresh material. |

### Supporting / sub-facet tags (extend as needed)

These refine the core tags. Add sparingly and only when a filter would actually use them.

- **Under `informatics`:** `lis`, `middleware`, `interfaces`, `hl7`, `fhir`, `loinc`, `snomed-ct`, `ucum`, `autoverification`, `cds`, `dashboards`, `digital-pathology`, `wsi`, `data-governance`.
- **Under `operations`:** `tat`, `throughput`, `poct`, `instrumentation`, `staffing`, `bench-communication`.
- **Under `quality`:** `qc`, `qa`, `validation`, `verification`, `proficiency-testing`, `critical-values`, `error-reduction`.
- **Under `management`:** `medical-director`, `sop-document-control`, `service-vs-quality`, `budget-awareness`.
- **Under `integration`:** `harmonization`, `standardization`, `reference-ranges`, `test-menu`, `health-system-growth`.
- **Under `cp-domain`:** `chemistry`, `toxicology`, `immunology`, `heme-coag`, `blood-bank`, `apheresis`, `micro`, `virology`, `flow-cytometry`, `molecular`.
- **Regulatory / standards (cross-cutting):** `cap`, `clia`, `fda`, `regulatory`.
- **Soft-skill / behavioral (cross-cutting):** `communication`, `teamwork`, `ambiguity`, `collaboration`.

### Tagging rules of thumb

- **Always give at least one core theme tag.** A record with only sub-facet tags is hard to find in a top-level filter.
- **Tag the two or three things it's *most* about, not everything it mentions.** A subtopic that touches TAT while explaining autoverification is primarily `informatics`/`autoverification`, secondarily `operations`/`tat` — don't also tag it `quality`, `management`, and `integration` just because those words appear. Over-tagging destroys signal, the same way flagging every result "abnormal" trains staff to ignore the flag.
- **`interview` tags a rehearsal shape, not a topic.** Add it to anything you'd actually say out loud, regardless of subject.

---

## 5. JSON example record (one real corpus item)

Below is a complete record for a **real item that exists in this corpus**: the LOINC subtopic in Core Chapter C (Interoperability and Data Standards), which in the source file carries **Difficulty level: intermediate** and **Use case label: informatics**. Field values are populated to be faithful to that subtopic's actual content.

```json
{
  "id": "04c-loinc",
  "title": "LOINC: A Universal Name for What Was Measured",
  "type": "subtopic",
  "chapter": "04c",
  "subtopic": "Subtopic 3",
  "difficulty": "intermediate",
  "audience_relevance": "candidate-core",
  "lahey_relevance": "high",
  "use_case": "informatics",
  "tags": ["informatics", "loinc", "interfaces", "integration", "quality", "interview"],
  "summary": "LOINC gives every measurable test a single universal code for 'what was measured,' so the same analyte means the same thing across instruments, labs, and hospitals.",
  "short_answer": "LOINC is the universal name for what a test measured. Two labs can call the same analyte different local names, but if both map to the same LOINC code, downstream systems and other hospitals can trust that a glucose is a glucose. That's what makes cross-system results comparable and safe.",
  "long_answer": "Every lab has local test codes and local names, and they rarely match between systems. LOINC is a standardized terminology that assigns a stable code to the precise thing measured — the analyte, the specimen, the method dimension, the units context — so 'what was measured' is unambiguous no matter whose LIS produced it. In a single-hospital world you can sometimes get by on local codes; in an integrated, growing health system you cannot, because results flow between EHRs, reference labs, registries, and analytics pipelines that have no way to know your local dictionary. A clinical pathologist doesn't build the LOINC mapping table by hand, but owns the clinical correctness of it: confirming that the local test actually corresponds to the LOINC concept, catching a mapping that quietly points a specialized assay at a generic code, and understanding that a wrong map is a silent, systematic error affecting every result — far more dangerous than a one-off mistake.",
  "examples": [
    "A glucose result travels from a hospital analyzer to the system-wide EHR and a diabetes registry; because both ends resolve to the same LOINC code, trending works across sites.",
    "A send-out reference lab returns results under its own codes; correct LOINC mapping is what lets those results file cleanly next to in-house results instead of as orphaned free text.",
    "During multi-hospital integration, two sites both offer 'vitamin D' but one measures 25-OH and one measures 1,25-OH; distinct LOINC codes are what keep them from being wrongly merged."
  ],
  "follow_up_questions": [
    "Who at the lab actually owns validating that a local test maps to the right LOINC code?",
    "What can go wrong if a mapping is incorrect, and how would you catch it?",
    "How does LOINC differ from SNOMED CT, and when do you need each?"
  ],
  "pitfalls": [
    "Claiming you'd 'code all the interfaces yourself' — that overstates the CP role and understates the informatics team.",
    "Treating LOINC as interchangeable with SNOMED CT (one names what was measured, the other names what it means clinically).",
    "Describing a bad mapping as a minor data issue rather than a silent, systematic patient-safety error."
  ],
  "say_this_not_that": [
    { "say": "LOINC is the universal name for what was measured; SNOMED CT is the universal name for what it means.", "not": "LOINC and SNOMED are basically the same coding thing." },
    { "say": "I'd own the clinical correctness of the mapping and partner with informatics on the build.", "not": "I'd handle the interface mapping myself." }
  ],
  "related_projects": ["05-loinc-mapping-cleanup", "05-multisite-result-harmonization"],
  "cp_domain": ["informatics", "chemistry"],
  "standards": ["LOINC", "HL7", "SNOMED-CT", "UCUM"],
  "est_read_minutes": 6,
  "source_path": "content/04c-interoperability-and-data-standards.md",
  "last_reviewed": null
}
```

A few things worth noticing in that record, because they're the whole point of the schema:

- **The enums are all from the vocabularies** — a validator could reject this record if `use_case` were, say, `"info"` instead of `"informatics"`.
- **`tags` mixes a core theme (`informatics`, `integration`, `quality`, `interview`) with a sub-facet (`loinc`, `interfaces`)** — so it shows up both in the broad "informatics" filter and in a precise "LOINC" search.
- **`lahey_relevance: high` is a role-based interpretation**, justified because interoperability across a growing multi-hospital system is a stated need — but it is *not* an institutional fact, and the schema treats it as our judgment call.
- **`last_reviewed: null`** is the seam where spaced repetition plugs in later.

---

## 6. Worked example table — 5 corpus items mapped to metadata

Five real units drawn from across the corpus, each reduced to its core metadata. This is what a spreadsheet export or a dashboard's underlying table would look like (prose fields trimmed to keep the table readable).

| id | title | type | chapter | difficulty | use_case | audience_relevance | lahey_relevance | tags |
|---|---|---|---|---|---|---|---|---|
| `04c-loinc` | LOINC: A Universal Name for What Was Measured | `subtopic` | `04c` | `intermediate` | `informatics` | `candidate-core` | `high` | `informatics`, `loinc`, `integration`, `quality`, `interview` |
| `04e-e7-qc-qa-oversight` | QC and QA Oversight | `subtopic` | `04e` | `intermediate` | `management` | `candidate-core` | `high` | `management`, `quality`, `operations`, `qc`, `qa`, `interview` |
| `04j-result-harmonization` | Harmonizing Results Across Sites | `subtopic` | `04j` | `advanced` | `informatics` | `candidate-stretch` | `high` | `integration`, `informatics`, `standardization`, `reference-ranges`, `interview` |
| `08-autoverification` | Autoverification (plain-English) | `plain_english` | `08` | `basic` | `concept` | `shared-study` | `medium` | `informatics`, `operations`, `autoverification`, `rapid-review` |
| `05-01-tat-dashboard` | TAT Dashboard / Turnaround-Time Improvement Project | `project` | `05` | `intermediate` | `project` | `candidate-core` | `high` | `operations`, `informatics`, `dashboards`, `tat`, `interview` |

Read down the columns and the schema's payoff is visible immediately:

- Filtering `use_case = informatics` surfaces the LOINC subtopic and the harmonization subtopic but not the QC/QA management item — even though all three are `high` Lahey relevance.
- Filtering `type = project` isolates the one story you'd actually *tell* (the TAT dashboard), which is exactly what you want when someone asks "give me an example of a project you drove."
- The one `basic` / `shared-study` item (autoverification plain-English) is the natural thing to hand Tala first, and the natural thing for the candidate to *skip* on a time-crunched final pass — the metadata makes that triage automatic.
- Every row carries `interview` except the plain-English concept, which correctly carries `rapid-review` instead — so a "night-before, say-it-out-loud" view and a "quick-refresh" view pull genuinely different sets.

---

## 7. How a dashboard could filter and search

With every unit carrying this metadata, a study dashboard becomes a set of simple, composable filters over one flat table — no special code per content type. The fields were chosen precisely so the queries a learner actually wants are one-liners.

### Primary filters (single-select or multi-select facets)

- **By study mode** → `use_case`. "Show me only `interview` items" for rehearsal night; "only `rapid review`" for the final hour.
- **By kind** → `type`. "Just the `project` archetypes" when someone asks for a story; "just `interview_question` records" to run a mock interview.
- **By depth** → `difficulty`. Warm up on `basic`, then drill `advanced` differentiators.
- **By chapter** → `chapter`. Classic linear study: work `04a` → `04j` in order.
- **By role fit** → `lahey_relevance = high`. The single most valuable filter the week of the interview: "show me only what's most likely to matter for *this* job."
- **By audience** → `audience_relevance`. Build a "Tala starter set" (`shared-study` + `candidate-core`, `difficulty = basic|intermediate`) in one click.

### Faceted tag search

Because `tags` is a multi-value field drawn from a controlled taxonomy, the dashboard can offer **AND/OR tag facets**:

- `tags contains informatics AND tags contains integration` → everything at the intersection of pathology informatics and multi-hospital integration — the corpus's two most role-relevant themes together. This is the query that builds your strongest, most role-specific talking-point set.
- `tags contains quality OR tags contains qc OR tags contains qa` → a full quality-and-QC review sweep, catching items tagged at either the theme or sub-facet level.
- `tags contains interview AND difficulty = advanced AND lahey_relevance = high` → your "impress them" shortlist: hard, role-relevant, rehearsable.

### Full-text search

- Search runs over the prose fields — `title`, `summary`, `short_answer`, `long_answer`, `examples` — and returns the `summary` as the result snippet (which is exactly why `summary` is required and written to stand alone). Type "reference range" and you get every unit that discusses it, ranked, each with a one-line preview.

### Composed views worth pre-building

Three saved filter combinations cover most of how anyone would actually use this:

| View name | Filter |
|---|---|
| **Night-before rehearsal** | `use_case = interview` **and** `lahey_relevance = high`, sorted by `chapter` |
| **15-minute refresh** | `use_case = rapid review` **or** `type = plain_english`, `est_read_minutes ≤ 3` |
| **Role-fit deep dive** | `tags contains informatics` **or** `tags contains management` **or** `tags contains integration`, `difficulty = intermediate|advanced` |

And once `last_reviewed` is populated, a **spaced-repetition queue** falls out for free: sort ascending by `last_reviewed`, filter to `audience_relevance = candidate-core`, and surface the N units you've gone longest without drilling. No new fields needed — the schema already anticipated it.

### Why this design holds up

Every filter above is a plain equality, membership, or range test over a single field — no joins, no parsing, no special cases per content type. That's the direct dividend of the controlled vocabularies: because `use_case`, `type`, `difficulty`, and the tag list are fixed sets rather than free text, the dashboard never has to guess whether "informatics," "Informatics," and "info" mean the same thing. It's the same reason a lab standardizes on coded results instead of free-text comments — you can only reliably *filter, count, and trend* what you've first agreed to *name consistently*.

---

## 8. Practical notes on maintaining the schema

A schema is only as good as the discipline behind it, and the failure modes here mirror the ones in a real lab data dictionary. A few guardrails keep it healthy:

- **Store it as one file to start.** A single `corpus-metadata.json` (an array of records) or a single `.csv` is more than enough for a corpus this size. Don't reach for a database until you feel the pain of not having one — that's the YAGNI principle applied to your own tooling.
- **Validate against the vocabularies.** A tiny check script (or a JSON Schema definition) that rejects any record whose `type`, `use_case`, `difficulty`, or tags fall outside the documented lists will catch the drift that otherwise creeps in the moment a second person starts tagging. This is your metadata QC.
- **Govern new vocabulary values like you'd govern a new test code.** Adding a tag or a `type` value should be a deliberate decision with a documented meaning — not an ad-hoc string someone typed once. Uncontrolled vocabulary growth is exactly the free-text-creep the whole schema exists to prevent.
- **Keep `id` immutable.** If a unit moves or is rewritten, keep its ID and update the other fields. Stable IDs are what let saved views, cross-links (`related_projects`), and any future review history survive edits.
- **Let optional fields stay empty.** A glossary entry with no `follow_up_questions` is correct, not incomplete. Never backfill an optional field with a placeholder value just to make a row look full — an empty array is honest and renders fine.
- **Treat `lahey_relevance` as judgment, and label it as such.** It encodes a role-based interpretation of where the interview is likely to focus. That's genuinely useful for prioritizing study, but it is not an institutional fact about Lahey/BILH, and the schema keeps that honest by making it an explicit, revisable field rather than baked-in truth.

---

### Section summary

This section turns a well-written study corpus into a **queryable one** without touching the study content itself: one record per teachable unit, a small required field set backed by controlled vocabularies, a faceted tag taxonomy, a real JSON example, a worked mapping table, and a filtering model a dashboard can implement with plain single-field queries. The design deliberately mirrors the informatics principles the role itself cares about — coded terminologies over free text, orthogonal fields kept separate, stable identifiers, and just-enough standardization — so building it is itself a small demonstration of the systems thinking this job is hiring for.
