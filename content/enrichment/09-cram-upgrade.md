# Cram Upgrade — High-Yield Recall

This is the tighter, chapter-indexed companion to the base cram sheet (`09-rapid-review-cram.md`). The base sheet gives you the 20 concepts, the 20 talking points, the strongest phrases, and the two timed cram paths — keep those. **This file adds what that one doesn't have: a per-chapter recall spine.** When you can only think in terms of "what were the five things about blood bank?" or "what's the one line on POCT?", this is the page you want.

**How the two fit together.** The base sheet is organized by *idea* (autoverification, LOINC, delta checks). This one is organized by *chapter* (A through J), so recall is anchored to the map of the whole role. Use the base sheet's timed paths for the hour before the call; use *this* sheet earlier, to make sure every domain has a handful of things loaded and nothing is a blank.

**A word on the chapters.** The corpus spans a broad CP role, so I've grouped it into ten working chapters (A–J) that mirror how a phone screen actually walks through the job — orientation first, then the two stated needs (core lab management, informatics), then the systems/integration layer, then the subspecialty benches as they touch the core lab, and finally delivery. If your base chapters are numbered differently, the letters still map cleanly by topic. Nothing here claims insider Lahey/BILH knowledge; anything institution-specific is flagged as **role-based inference**.

**The chapter map:**

| | Chapter | What it covers |
|---|---|---|
| **A** | Executive orientation & the read of the role | What the job is, what's being tested, strong vs. weak |
| **B** | Core laboratory management | TAT, QC/QA, staffing, downtime, vendors, inventory |
| **C** | Informatics fundamentals & result flow | Autoverification, the result pipeline, middleware, analytics |
| **D** | Information systems & standards | LIS, interfaces, HL7/FHIR, LOINC/SNOMED/UCUM, downtime |
| **E** | Integration, harmonization & governance | Multi-site consolidation, change control, standardization |
| **F** | Hematology & coagulation | CBC, morphology review, PT/PTT, mixing studies, heparin monitoring |
| **G** | Chemistry, toxicology & POCT | Interferences, critical values, tox pitfalls, POCT oversight |
| **H** | Transfusion medicine & apheresis | Type & screen, antibodies, product management, MTP, apheresis |
| **I** | Microbiology, molecular & flow cytometry | Gram stain/culture flow, molecular result reporting, flow gating |
| **J** | Communication, interview delivery & closing | How to sound, structure answers, questions to ask them |

---

## 1. One-page high-yield

Read this out loud once. It is the whole role compressed to something you can hold in working memory.

**The role.** A *broad* clinical pathologist in the Division of Laboratory Medicine at Lahey Hospital & Medical Center, part of Beth Israel Lahey Health (BILH). Broad means the whole CP menu — chemistry/tox/immunology, hematology/coagulation, POCT, flow cytometry, blood banking/apheresis, molecular, and microbiology/virology/parasitology — with **clinical informatics as the connective tissue underneath all of it.** Two needs are stated explicitly and should lead your prep: **core laboratory management** and **informatics.** The systems context most people miss: BILH is still consolidating, its growth will **increase lab demand and require integration with other hospital labs**, which reframes almost every technical question as also an integration question.

**What they're testing (six things, often unnamed):** clinical grounding (do you still see the patient at the end of the tube?), operational judgment (analyzer dies mid-shift — what do you do, in what order?), management temperament (decisive but humble; never throws the techs under the bus), informatics literacy (reason about how information flows and where it breaks — not code), communication (it's a phone screen, so *how you sound* is half the grade), and systems/integration thinking (can you knit multiple labs into one without breaking care?). The meta-test behind all six: *"Would I be relieved to have this person in the room when something goes wrong?"*

**The through-lines to thread through every answer.** Patient safety is the north star — visible, never preached; every answer quietly ends at a patient. TAT, uptime, and error rate are the vital signs of the core lab. The result pipeline (analyzer → middleware → LIS autoverification → chart) is the spine of informatics, and every handoff is a place it breaks. Standardization and harmonization are the defining challenge of a growing system — a result must mean the same thing at every site. Standards (HL7/FHIR, LOINC, SNOMED CT, UCUM) are the grammar that makes that possible. Quality systems (QC, PT/EQA, validation, CAP/CLIA) are non-negotiable infrastructure, baked in, not bolted on. The technologists are your team and your sensors — you succeed through them. Governance beats heroics: propose the guardrail, not just the fix. And right-size everything — the impressive answer is usually the practical one (a well-written rule, a clear SOP, a phone call to the ordering physician), and over-engineering is a competence tell in the wrong direction.

**Strong vs. weak, in one breath.** Strong is concrete, patient-anchored, generous to staff, decisive-but-humble, and right-sized. Weak is abstract, buzzword-heavy, blame-shifting, either paralyzed or arrogant, and over-engineered. You are not trying to know the most — you are trying to sound like the colleague they'd trust with the core lab and be glad to have when things get hard. Specific nouns, warm voice, a pause after strong sentences, and every answer ends at a patient.

**The single most useful sentence to have ready:** *"This is a broad CP role; the stated needs are core lab management and informatics; the near-term opportunity is integrating labs as BILH grows; and my through-line is patient safety."* Say a version of that back to them and you sound like you understood the job.

---

## 2. Top 5 points per chapter

Exactly five high-yield points per chapter — the things you'd want live in memory before that chapter comes up.

### A — Executive orientation & the read of the role
1. **Broad, not narrow-informatics.** This is a working CP who owns/co-owns the core lab *and* is the credible informatics voice — not a rules-tuner in a back room. Name the breadth; it shows you read the posting.
2. **The two stated needs are your lead.** Core lab management and informatics are explicitly called out — position them as where you're strongest and most want to contribute.
3. **Integration is the differentiator.** BILH growth → more demand → integrating multiple hospital labs (harmonizing menus, ranges, codes, result flow). This is the theme most likely to make you *memorable* rather than merely competent.
4. **The role-based self-description they want to hear:** "a dependable, broadly competent CP who can own the core lab and be the informatics voice in the room, sitting between the bench, IT/EHR, and the clinicians." You're not expected to be the world expert in every subspecialty — you're expected to be operationally sound everywhere and know when to pull in a subspecialist.
5. **The meta-test governs everything:** would they be *relieved* to have you in the room when something breaks? Calm, sequenced, patient-first, team-protective — that's the signal.

### B — Core laboratory management
1. **TAT is a patient-care number, not a dashboard stat.** Measured collection-to-result. A slow line at 2 a.m. is a clinical problem — a delayed stat troponin or lactate changes what happens to the patient in front of the ED physician.
2. **QC catches a drifting analyzer before it produces a wrong patient result.** Westgard multirules keep you from over-reacting to noise while still stopping on a real shift (e.g., a 2-2s or 4-1s flags a systematic drift; a 1-3s flags gross random error). **The non-negotiable: a real QC failure holds patient results until you understand why.**
3. **Downtime is a rehearsed plan, not a surprise.** Every lab needs downtime procedures — paper requisitions, manual result reporting, a backup analyzer or sister-site reroute — because the LIS *will* go down. The order when an analyzer dies: protect the sickest patients first (reroute stats), communicate delays early, then fix and document.
4. **You scale on systems, not heroics.** Clear SOPs, defined roles, change control, competency assessment, and rules that catch the error — not one brilliant person firefighting. Reagent lot-to-lot verification, calibration verification, and instrument maintenance are the unglamorous backbone.
5. **Staffing and vendors are real operational levers.** Technologist competency, night-shift coverage, cross-training, reagent inventory and lot management, service contracts, and TAT-under-volume are where management actually lives. Protect your team in your language — they're your sensors and they notice drift first.

### C — Informatics fundamentals & result flow
1. **The result pipeline is the spine:** analyzer → middleware → LIS autoverification → the EHR chart. Every handoff is a failure point. If you can narrate this cleanly, you sound like a real informaticist.
2. **Autoverification = speed the clean, hold the dangerous.** Auto-release in-range results that pass all rules; hold anything with a failed delta check, a critical value, an absurd/impossible value, or an interference flag (hemolysis, icterus, lipemia) for human review. You get the speed of the 90% without letting a dangerous result slip out unreviewed.
3. **Middleware is where the rules actually live.** Delta checks, autoverification logic, QC rules, and reflex logic sit in the middleware layer between analyzers and the LIS — it's the tunable layer, and it's where you go to fix or refine result handling.
4. **Delta checks catch specimen mix-ups.** A result that differs too much from the same patient's prior value (potassium 4.0 → 6.8, or a hemoglobin that halves overnight) flags a probable mislabel or wrong-patient draw *before* it hits the chart. It's a patient-identity safety net disguised as a numeric rule.
5. **Analytics and dashboards make the invisible visible.** TAT distributions, autoverification rates, QC trends, critical-value callback compliance, and error rates are how you manage a core lab you can't watch by eye — and how you prove integration didn't quietly degrade care.

### D — Information systems & standards
1. **LIS + interfaces + EHR is the plumbing.** The LIS runs the lab; HL7 interfaces carry orders in and results out to the EHR. When an interface breaks, results drop, duplicate, or misroute — silently. Interface monitoring is patient safety.
2. **HL7 v2 / FHIR is the messaging grammar.** You don't memorize segments; you know *why* it exists and *what breaks without it* — orders and results that don't cross systems cleanly. FHIR is the modern, resource-based successor increasingly relevant to integration and analytics.
3. **LOINC is "what was measured"; SNOMED CT is "what it is."** LOINC makes glucose-from-Lab-A and glucose-from-Lab-B the same observation when data flows between systems; SNOMED CT codes diagnoses, findings, and specimens. Bad LOINC mapping is exactly how results stop reconciling and trending across sites — treat mapping as a patient-safety task, not an IT chore.
4. **UCUM stops units from becoming silent, dangerous ambiguity.** mg/dL vs. mmol/L, or ng/mL vs. µg/L, must never be guessed across systems. Unified units are unglamorous and load-bearing.
5. **Change control governs every switch you flip.** No change to a rule, reference range, interface, or SOP goes live without validation, documentation, and a rollback plan. And you *never* change what a result means without telling the people who act on it.

### E — Integration, harmonization & governance
1. **Merging labs is mostly change management with a technical core.** The technical part (shared codes, harmonized ranges, interfaced or unified LIS) is real, but the risk is breaking something clinicians rely on. Stage it, validate each step, keep clinical stakeholders looped in.
2. **Harmonization is where patient safety lives when you integrate.** If two BILH sites report different reference ranges for the same analyte, a patient moving between them gets misread. Harmonize where methods are truly comparable — verify with data first (transference/comparison studies) — and where they're genuinely different, make it *visible* so nobody's misled.
3. **Harmonize the whole meaning, not just the number:** reference ranges, critical-value thresholds, test codes and names, units (UCUM), reflex rules, and result comments. A result means something only in the context of all of these.
4. **Governance beats plumbing.** Someone has to *own* the harmonization decisions — a standing structure (a harmonization/utilization committee, a defined change-control body) that decides how tests are aligned across sites. Position yourself as someone who'd genuinely enjoy owning that.
5. **The cardinal integration sin is silently changing what a result means.** The whole discipline of integration is refusing to flip a switch that alters a clinician's interpretation without telling them. Say that plainly and you sound senior.

### F — Hematology & coagulation
1. **The CBC pipeline mirrors the whole informatics story:** analyzer flags (blasts?, platelet clumps?, nucleated RBCs?) trigger a hold and a manual smear review — a clean example of autoverification-plus-human-review in a specific bench. Pseudothrombocytopenia from EDTA-induced platelet clumping is the classic "believe the flag, redraw in citrate" teaching case.
2. **Critical values in heme are closed-loop, not screen-flags.** A hemoglobin of 4, a platelet count of 8, or a new blast population is recognized, called to a licensed provider, read back, and documented — the same closed-loop discipline as any critical value.
3. **PT/INR monitors warfarin and the extrinsic pathway; PTT monitors heparin and the intrinsic pathway.** Know which drug goes with which test cold — it's a common quick-fire and getting it backwards is costly.
4. **A prolonged clotting time → mixing study to split "factor deficiency" from "inhibitor."** If it corrects, think factor deficiency (replace); if it doesn't, think inhibitor (e.g., a lupus anticoagulant or a factor inhibitor). This is the reasoning they want to hear, not just the definition.
5. **Preanalytic errors dominate coagulation.** Underfilled citrate tubes, clotted specimens, and high hematocrit skewing the anticoagulant ratio produce spurious results — the coag bench is a standing reminder that most lab errors are preanalytic, and that autoverification must respect specimen integrity flags.

### G — Chemistry, toxicology & POCT
1. **The three big interferences are hemolysis, icterus, and lipemia (HIL).** Hemolysis falsely raises potassium (and LDH, AST); lipemia and icterus interfere spectrophotometrically. Analyzers flag HIL, and autoverification should hold on it — a hemolyzed potassium of 6.5 that isn't real can trigger a dangerous, unnecessary intervention.
2. **Chemistry critical values are the front line of the callback process:** a glucose of 30, a potassium of 7, a calcium of 15, a sodium of 118. Recognized → called → read back → documented. This is where TAT and critical-value discipline meet the sickest patients.
3. **Toxicology has classic traps:** immunoassay screens cross-react (false positives) and miss drugs outside the panel (false negatives), which is why confirmatory testing (LC-MS/MS) exists. Know the difference between a screen and a confirmation, and that a positive screen is a lead, not a verdict.
4. **POCT is clinically valuable and the hardest thing to govern.** Bedside glucose, blood gas, iSTAT, urine hCG — fast and useful, but the QC, operator competency, connectivity, and lot control are dispersed across nursing units, not the lab bench. A growing system multiplies this challenge across sites.
5. **POCT oversight is a systems job:** connectivity so results reach the chart and are captured for QC, operator competency tracking, lot verification, and correlation with the central lab. In a multi-site BILH, standardizing POCT policy and devices across sites is exactly the kind of integration work this role implies.

### H — Transfusion medicine & apheresis
1. **Type & screen is the gateway:** ABO/Rh typing plus an antibody screen. A positive screen → antibody identification → antigen-negative, crossmatch-compatible units. The whole discipline is about not giving a patient blood their plasma will attack.
2. **The blood bank is the highest-stakes patient-identity bench in the lab.** A mistransfusion from a specimen mislabel or a wristband mismatch is a potentially fatal error — which is why the two-specimen rule, electronic patient ID, and rigorous specimen acceptance exist. Delta-check thinking (a blood type that changed) is patient-safety gold here.
3. **Massive transfusion protocol (MTP) is operational judgment under pressure:** a rehearsed, ratio-driven (roughly 1:1:1 RBC:plasma:platelets) release process with a coordinator, so a bleeding trauma patient gets product fast without the bench improvising. It's a systems-and-communication showcase.
4. **Inventory and product management is real lab management:** short shelf life (platelets ~5–7 days), O-negative and AB-plasma as scarce universal products, wastage vs. stockout tradeoffs, and emergency-release procedures. A growing multi-site system has to coordinate inventory and transfer across sites.
5. **Apheresis touches both therapy and collection:** therapeutic plasma exchange (e.g., TTP), red-cell exchange (sickle cell), and cytapheresis — a place where the CP is genuinely clinical, consulting on indications and managing the procedure's risks.

### I — Microbiology, molecular & flow cytometry
1. **Micro runs on a different clock:** Gram stain (minutes, and a genuine STAT/critical result for something like a positive blood-culture Gram stain), then culture and susceptibility over days. Rapid molecular panels (respiratory, GI, blood-culture ID/resistance) are compressing that timeline and reshaping workflow and reporting.
2. **Antimicrobial stewardship is where micro meets clinical impact:** reporting susceptibilities in a way that guides good prescribing, selective/cascade reporting, and antibiogram maintenance. The lab shapes prescribing behavior through *how* it reports, not just *what* it finds.
3. **Molecular result reporting is subtle and high-stakes:** qualitative vs. quantitative (a viral load trend vs. a detected/not-detected), the meaning of "detected below the limit of quantification," and the LOINC/units discipline that keeps a viral load trending correctly across systems and sites. Contamination control and result interpretation are the two big themes.
4. **Flow cytometry is pattern recognition on a gated population:** immunophenotyping for leukemia/lymphoma, where the answer lives in how you gate and which antigens co-express. You don't need to run panels in the interview — you need to know what flow *answers* and that its results are interpretive, not push-button.
5. **These subspecialties touch the core lab and informatics constantly:** they generate high-complexity results that must map to LOINC, flow cleanly into the EHR, and be interpreted correctly — and as BILH integrates, harmonizing how these results are coded and reported across sites is the same integration problem in a specialized costume.

### J — Communication, interview delivery & closing
1. **On a phone screen, how you sound is half the grade.** Clear, warm, concise, structured. Specific nouns beat abstractions; a pause after a strong sentence lets it land.
2. **Have a spine for operational answers:** **stabilize → understand → fix → harden.** Stabilize the patient impact, understand the root cause, fix the immediate problem, harden the system so it can't recur. This one structure carries most "what would you do when X breaks" questions.
3. **Own failures with the guardrail you added.** A real mistake, described with the systemic fix, sounds far stronger than "I can't think of a failure." Blame the system, not the person — and never the techs.
4. **Right-size out loud.** Reach for the simplest reliable fix (a well-written rule, a clear SOP, a phone call) and reserve complexity for when it's earned. Naming that judgment *is* the senior signal.
5. **Ask them good questions.** Two or three thoughtful ones about their integration roadmap and core-lab priorities signal that you're already thinking like a colleague — and asking well is itself a strong hiring signal.

---

## 3. If you only remember three things

The absolute floor per chapter. If a chapter's five points blur under pressure, these three are the ones that must survive.

### A — Executive orientation
1. Broad CP role; **stated needs are core lab management and informatics.**
2. **Integration as BILH grows** is the differentiating theme — thread it.
3. Everything ends at: *would they be relieved to have me in the room when it breaks?*

### B — Core laboratory management
1. **TAT is a patient-care number**, not a throughput stat.
2. **A QC failure holds patient results** until you understand why.
3. **You scale on systems, not heroics** — SOPs, change control, rehearsed downtime.

### C — Informatics fundamentals & result flow
1. The pipeline: **analyzer → middleware → LIS autoverification → chart**, and every handoff can break.
2. **Autoverification speeds the clean and holds the dangerous** (delta fail, critical, absurd, interference).
3. **Delta checks catch specimen mix-ups** before they reach a chart.

### D — Information systems & standards
1. **LOINC = what was measured; SNOMED CT = what it is; UCUM = the units.**
2. **HL7/FHIR is the messaging grammar** — when it breaks, results drop, duplicate, or misroute.
3. **Change control on every switch**, and never change what a result *means* silently.

### E — Integration, harmonization & governance
1. **Merging labs is mostly change management** with a technical core.
2. **Harmonization is where patient safety lives** — a result must mean the same thing at every site.
3. **Integration needs governance, not just plumbing** — someone owns the decisions.

### F — Hematology & coagulation
1. **Analyzer flag → hold → manual smear review** (blasts, clumps, NRBCs).
2. **PT/INR ↔ warfarin/extrinsic; PTT ↔ heparin/intrinsic.**
3. **Prolonged clotting → mixing study** to split factor deficiency (corrects) from inhibitor (doesn't).

### G — Chemistry, toxicology & POCT
1. **Hemolysis, icterus, lipemia (HIL)** are the big interferences — hemolysis falsely raises potassium.
2. **Screen ≠ confirmation** in tox; a positive immunoassay is a lead, not a verdict.
3. **POCT is the hardest thing to govern** — QC, competency, connectivity, dispersed across sites.

### H — Transfusion medicine & apheresis
1. **Type & screen → antibody ID → antigen-negative compatible units.**
2. **Blood bank is the highest-stakes patient-identity bench** — mislabels can kill.
3. **MTP is rehearsed, ratio-driven (~1:1:1)** release under pressure.

### I — Microbiology, molecular & flow cytometry
1. **Micro's clock is different:** Gram stain in minutes (a real critical result), culture over days.
2. **Molecular reporting is subtle:** qualitative vs. quantitative, and units/LOINC discipline for trending.
3. **Flow is interpretive pattern recognition** on a gated population — it *answers* leukemia/lymphoma phenotyping.

### J — Communication & delivery
1. **How you sound is half the grade** — warm, concrete, structured.
2. **Stabilize → understand → fix → harden** carries most operational questions.
3. **Right-size, own failures with the guardrail, and ask them good questions.**

---

## 4. Most likely to be asked

Marked by likelihood on a phone screen. **★★★ = expect it; ★★ = very plausible; ★ = possible, be ready.** These are the questions/themes to have a rehearsed, warm, first-30-seconds answer for.

- **★★★ "Tell me about yourself."** — Lead with breadth + the two stated needs + patient-safety through-line. Land it warmly in 60–90 seconds and end forward-looking.
- **★★★ "Why this role / why Lahey / why BILH?"** — Core lab management and informatics as where you're strongest; integration as a growing system as the opportunity you want to help with. Sound tailored, not generic.
- **★★★ "Walk me through what you'd do when an analyzer goes down mid-shift."** — The flagship operational-judgment question. Use **stabilize → understand → fix → harden**: reroute the sickest patients' stats first, communicate TAT delays early, engage the vendor, document, then add the guardrail.
- **★★★ "How do you think about autoverification?"** — Speed the clean, hold the dangerous. Name the four hold triggers (delta fail, critical value, absurd value, interference flag). End at the patient who never gets a dangerous unreviewed result.
- **★★ "How would you approach harmonizing/integrating labs across BILH sites?"** — Change management with a technical core; harmonize where methods are comparable (verify with data), make genuine differences visible, never silently change what a result means, and put a governance structure on it.
- **★★ "Tell me about a time something went wrong / a mistake you made."** — Own it, blame the system not the person, describe the systemic guardrail you added. No-failure answers read as evasive.
- **★★ "What's your experience with / how do you think about lab management?"** — TAT, QC, staffing, downtime, vendors, and the "scale on systems not heroics" stance. Concrete levers, not abstractions.
- **★★ "How comfortable are you with informatics / the LIS?"** — Physician who speaks informatics fluently, reasons about information flow and where it breaks, knows the standards' *purpose*; not a coder, and comfortable saying so.
- **★★ "How do you work with the technologists / with clinicians and IT?"** — Collaborative by default; techs are your sensors; you translate across silos; you win by aligning people. Protect the team in your language.
- **★★ "What's a critical value / how do you handle it?"** — Closed loop: recognized, called to a licensed provider, read back, documented — not a screen flag. Tie it to a real analyte and a real patient decision.
- **★ Quick-fire subspecialty checks** — e.g., "which test monitors heparin?" (PTT), "what does a delta check catch?" (specimen mix-up), "what's a type & screen?" Have crisp one-liners; these test that your clinical instincts still fire.
- **★ "Where do you see yourself / what do you want to grow into?"** — Owning/co-owning the core lab and being the informatics voice; enjoying the governance and integration work.
- **★ "Do you have any questions for us?"** — You *will* get this. Have two or three ready about their integration roadmap, core-lab priorities, and how the informatics/lab/IT relationship is structured today.

---

## 5. Most impressive to mention

The specifics that make an interviewer lean in — marked by impact. **◆◆◆ = leans them in; ◆◆ = clearly strong; ◆ = solid credibility.** Use these deliberately; a few placed well beat a pile name-dropped.

- **◆◆◆ Naming integration as the near-term work of this specific role** — "with a growing system like BILH, the hard part of bringing labs together usually isn't the instruments, it's harmonizing the *meaning* of the data across sites." This shows you read the role at a level most candidates miss.
- **◆◆◆ "I never change what a result *means* without telling the people who act on it."** — One sentence that signals you understand integration, change control, and clinical risk all at once.
- **◆◆◆ Right-sizing out loud:** "the impressive answer is usually the practical one — the well-written rule, the clear SOP, the phone call to the ordering physician." Signals judgment, which is scarcer than knowledge.
- **◆◆◆ "Governance beats heroics — when I fix something, I care most about whether the fix *sticks*, so I add the guardrail that stops it from quietly coming back."** — The fastest way to sound senior.
- **◆◆ "The technologists are the sensors of the operation — I want them escalating early, not waiting for a crisis."** — Shows you lead through the team and won't scapegoat them.
- **◆◆ Treating LOINC mapping (or reference-range harmonization) as a patient-safety task, not an IT chore** — and being able to say *why* (results that won't reconcile or trend across sites). Informatics literacy with a clinical anchor.
- **◆◆ A concrete, specific example dropped naturally** — a real analyzer, a real bench, a real failure (e.g., "a hemolyzed potassium of 6.5 that HIL flagging should have held"). Specificity is the single biggest strong-vs-weak differentiator.
- **◆◆ "A QC failure means we hold patient results until we understand why."** — Quality baked in, not bolted on, stated as a non-negotiable.
- **◆◆ Understanding POCT as the hardest governance problem in a multi-site system** — QC, competency, connectivity, lot control dispersed across nursing units and sites. Few candidates volunteer this, and it's squarely on-role.
- **◆ Knowing the standards' division of labor cold** — LOINC (what was measured) vs. SNOMED CT (what it is) vs. UCUM (units) vs. HL7/FHIR (the messaging) — spoken as tools that make data mean the same thing everywhere, not as trivia.
- **◆ The operational spine, named:** "stabilize, understand, fix, then harden so it can't happen again." Structure signals experience.
- **◆ Comfortable saying "I'd want to learn X" or "I'd bring in a subspecialist here."** — Broad-and-grounded beats overclaiming; the willingness to say it is itself impressive.
- **◆ Asking *them* a sharp question about their integration roadmap** — flips you from candidate to future colleague and often does more than any answer you give.

---

*Use this sheet to make sure no chapter is a blank, then switch to the base cram's timed paths (`09-rapid-review-cram.md`, sections 6–7) for the final hour. The base sheet over-learns the strongest phrases; this sheet guarantees breadth. Together: nothing missing, and the best of it on the tip of your tongue. Calm, specific, and warm carries a phone interview further than exhaustive — and every answer ends at a patient.*
