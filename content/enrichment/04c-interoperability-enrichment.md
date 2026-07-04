# Core Chapter C — Enrichment Pack: Interoperability and Data Standards

> **How to use this pack.** The base chapter (`04c-interoperability-and-data-standards.md`) already covers the concepts cleanly — interfaces, HL7 v2, LOINC, SNOMED CT, UCUM, why coded data matters, failure modes, and the CP's role. This pack does not repeat that. It goes *deeper* and *wider*: it adds concrete examples from the CP domains the base under-served (transfusion, coagulation, flow, POCT, molecular, hematology morphology), gives you fully sequenced operational scenarios, sharpens the spoken language for a phone screen, and de-jargons the four standards so you can say them out loud without sounding like you swallowed a textbook. Read it standalone; it assumes you already know the base.
>
> The through-line stays the same: **you are the clinician who guarantees the meaning survives the trip — you are not the engineer who builds the pipe.**

---

## 1. Gap read — what the base chapter under-served

Honest audit of where the base is thin, generic, or leaning on the same few examples:

- **Almost everything is chemistry and micro.** The recurring examples are potassium, creatinine, glucose, troponin, and blood-culture organisms. Those are safe, but a *broad* CP role spans transfusion, coagulation, flow cytometry, POCT, molecular, and hematology morphology — and interoperability in those areas has its own distinctive failure modes (ISBT 128 blood labels, PT/INR reagent-lot dependence, flow list-mode files, glucometer docking) that never appear. This is the single biggest gap.

- **Transfusion medicine interoperability is completely absent** — and it is arguably the *highest-stakes* interface in the building. Blood Bank has its own middleware (the transfusion/BBIS module), its own barcoding standard (ISBT 128), electronic crossmatch logic, and a two-way interface to the EHR that governs who can transfuse what. A broad CP will be asked about this. The base gives you nothing to say.

- **POCT connectivity gets no coverage.** Point-of-care is a core-lab-management headache precisely *because* of its interoperability (POCT1-A2 standard, data-management middleware, operator lockout, docking stations that only sync when a glucometer is physically re-cradled). This is a very interviewable "core lab management + informatics" intersection and it's missing.

- **The management framing is real but stays high-altitude.** The base says "interface build is often the critical-path task" and "watch the held-results queue," which is correct but generic. It doesn't give you the *texture* a lab leader actually lives in: vendor test scripts, a documented validation matrix, a go-live command center, parallel testing, mock messages, back-out plans. Adding that texture is what makes you sound like you have done this, not read about it.

- **A few jargon terms are used without a plain-English landing.** "Subsumption query," "poly-hierarchical," "auto-verification," "reflex," and "unsolicited result" appear but aren't always translated for a non-lab phone listener (e.g., an HR-adjacent screener or a clinician-heavy panel). The Plain-English quartet below fixes the worst offenders.

---

## 2. More real-world examples (new, named, across the CP domains)

Eight-plus concrete examples the base does *not* use. Each names a specific bench, analyte, instrument class, or standard, and each has a real interoperability angle.

**1. Transfusion — ISBT 128 blood product labels.**
Every unit of blood carries an ISBT 128 barcode encoding donation number, product code (e.g., "leukoreduced apheresis platelets"), ABO/Rh, and expiration. When you scan a unit at issue and again at the bedside, the transfusion middleware checks it against the crossmatch and the patient's armband. If a newly integrated site still uses the older Codabar labels, or its BBIS maps the ISBT product code wrong, you can get a unit that scans as the wrong product — a wrong-blood-in-tube-class event living entirely in a mapping table.

**2. Transfusion — electronic crossmatch eligibility.**
The rule "this patient is eligible for electronic (computer) crossmatch" depends on the LIS knowing the antibody screen is negative *and* there are two concordant historical ABO/Rh types on record. If the interface that carries prior blood-bank history from an acquired hospital doesn't bring the historical type across, the system silently forces a full serologic crossmatch on everyone — slower, more tech time, and a real TAT hit in a trauma. The pipe "works"; the eligibility logic just lost its inputs.

**3. Coagulation — PT/INR and reagent-lot-dependent reference behavior.**
An INR is only comparable across sites if the ISI (reagent sensitivity) and instrument are accounted for. When you consolidate coag onto a shared reporting layer, a raw PT in seconds does *not* travel meaningfully — the INR does, but only if each analyzer's reagent configuration is right. A middleware auto-verification rule that releases a wildly prolonged PT without a delta check or a "did the tube underfill" flag is an interoperability-plus-clinical-rules failure. Underfilled blue-top tubes give falsely prolonged results that look real.

**4. Hematology — the CBC "flag" that isn't a number.**
A Sysmex or Beckman Coulter analyzer emits not just numeric results but *suspect flags* ("blasts?", "atypical lymphs?", "platelet clump?") in dedicated OBX segments. If the interface maps the numeric WBC but drops or mis-maps the morphology flag, the auto-verification/reflex-to-smear-review logic never fires and a leukemic smear posts clean. The dangerous data here is qualitative, and qualitative fields are exactly what naive mappings truncate.

**5. Flow cytometry — the result vs. the list-mode file.**
Flow generates two very different data objects: the interpretive report (which travels as a normal result/report) and the raw FCS list-mode file (millions of events, gated analysis) that stays in the flow analysis software. Interoperability here is mostly about the *report* reaching the EHR and the *specimen/patient identity* staying linked to the FCS file — not about streaming raw events into the LIS. Knowing that boundary is a nice informatics-literacy signal.

**6. POCT — glucometer docking and delayed posting.**
Bedside glucose meters often batch-store results and only transmit when the meter is physically returned to its docking cradle. So a 02:00 critical glucose can post to the chart at 06:00 when the nurse re-docks the meter. That is not an interface being "down" — it is the *connectivity model* of the device. If you don't understand it, you misdiagnose a "late result" complaint as an interface outage. The POCT1-A2 standard and a POC data manager (e.g., a middleware layer) are how you shrink that lag and enforce operator competency lockout.

**7. Molecular — quantitative viral loads and the log-scale trap.**
An HIV or hepatitis viral load reported as copies/mL vs. IU/mL vs. log10 is a units-and-standard nightmare across labs. A patient's HBV DNA "dropping" may be an assay/unit change, not a treatment response. This is a UCUM-plus-LOINC problem with genuine clinical stakes, and it belongs in the molecular conversation the base skips.

**8. Microbiology / AST — susceptibility interpretation vs. raw MIC.**
An antimicrobial susceptibility result carries both a raw MIC and an interpretation (S/I/R) that depends on the current CLSI breakpoint. When breakpoints change, or when two BILH sites run different interpretive rules, the *same* MIC can post as "S" at one site and "R" at another. The interface faithfully carried the MIC; the interpretive layer diverged. Consistent breakpoint/rules configuration across sites is an interoperability-of-meaning problem, not a transport one.

**9. Anatomic-adjacent / structured synoptic reporting.**
CAP electronic Cancer Checklists (eCC) and synoptic reports encode tumor staging elements as discrete, coded data items so cancer registries and downstream systems can consume them. When a synoptic report degrades into free-text narrative during an interface hop, the registry feed silently loses the structured elements even though the human-readable report looks complete.

**10. Send-outs — the reference lab result that arrives as a PDF image.**
A specialized send-out (e.g., a rare genetic panel) sometimes returns as a scanned/embedded PDF rather than discrete OBX results. It's readable on the chart but *not computable* — you can't trend it, alert on it, or feed it to analytics. Choosing when to invest in a discrete-result interface vs. accept a PDF is a real management/informatics trade-off.

---

## 3. Operational scenarios

Each is written as **Situation → What you'd do (sequenced, patient-first) → How you'd say it in the interview.**

### Scenario A — Blood bank interface during an acquired-hospital integration

**Situation.** BILH is bringing a community hospital's blood bank onto the shared transfusion system. Two weeks before go-live, testing shows that historical ABO/Rh types from the old system aren't crossing the interface, so every patient looks like a first-time type — which disables electronic crossmatch and forces full serologic crossmatch on everyone. In a trauma, that's minutes that matter.

**What you'd do (sequenced, patient-first):**
1. **Protect patients first:** confirm the *safe* fallback is intact — full serologic crossmatch is slower but not unsafe, so no patient is at risk of a mismatched unit; the risk is TAT and tech workload, not wrong blood. Say that explicitly so the team doesn't panic-ship a fix.
2. **Freeze the go-live decision** until historical type transfer is fixed and revalidated — don't go live with a known blood-bank regression.
3. **Write the acceptance test with transfusion service and IT:** a patient with two concordant historical types must trigger electronic-crossmatch eligibility; a patient with a positive antibody screen must *not*; an ABO discrepancy must block, not warn.
4. **Validate against real edge cases:** prior antibody, prior reaction, Rh-negative female of childbearing potential, unresolved discrepancy — not just a clean type-and-screen.
5. **Set the back-out plan and command-center coverage** for go-live weekend, with transfusion medicine reachable.

**How you'd say it:**
> "Before I'd sign off on a blood bank go-live, I'd want to prove the safety-critical logic with real edge cases — electronic crossmatch eligibility, ABO discrepancy blocking, prior-antibody handling — not a happy-path type-and-screen. In this case the fallback was safe, just slow, so I'd reassure the team we weren't risking a mismatched unit, then hold go-live until historical types transferred correctly and we'd revalidated. Blood bank is the one interface where I'd rather delay than discover a gap live."

### Scenario B — POCT glucose "posting late" complaint from a nursing unit

**Situation.** A nurse manager escalates that critical glucose values are "showing up hours late" on the ICU flowsheet, and she suspects the lab interface is broken. Patient-safety tone in the message.

**What you'd do (sequenced, patient-first):**
1. **Treat it as a possible safety issue until proven otherwise:** confirm whether any *acted-upon* care was delayed, and whether critical values were phoned per policy regardless of when they posted.
2. **Distinguish connectivity model from interface outage:** check whether the affected meters are docking-transmit devices. If results only sync on re-cradling, a "late post" is the device design, not a downed interface.
3. **Pull the POC data manager logs:** confirm the meter captured the value at the bedside time and transmitted at dock time — proving the *result* was correct and available at the bedside, just delayed to the chart.
4. **Fix the operational root cause:** reinforce immediate docking / add more docking stations / consider real-time-transmitting devices; reinforce that critical POC values are called, not silently trusted to post.
5. **Close the loop with the unit** in plain language so trust is restored, and log it so recurring lag becomes a metric, not an anecdote.

**How you'd say it:**
> "My first move is to make sure no care was actually delayed and that critical values were still being called per policy. Then I'd separate two things people conflate: an interface being down versus a device that only transmits when it's re-docked. A lot of glucometer 'late posting' is the docking model, not an outage — the result was right and available at the bedside, it just reached the chart when the meter got re-cradled. So the fix is operational: more docking stations or real-time devices, plus reinforcing that critical POC values get phoned. I'd rather fix the workflow than chase a phantom interface bug."

### Scenario C — A corrected microbiology susceptibility that changes management

**Situation.** A urine culture posted *E. coli*, susceptible to ciprofloxacin. Twelve hours later, tech review catches that the susceptibility was read off the wrong panel; the organism is actually *cipro-resistant*. A corrected result must go out, and a clinician may already have prescribed cipro.

**What you'd do (sequenced, patient-first):**
1. **Clinical communication first, before the mechanics:** the ordering team is called directly — a resistant organism reported as susceptible is an active patient-safety issue, and you don't wait for the interface to carry the correction.
2. **Issue the correction correctly:** ensure the corrected result (OBX status C) actually *displays as a correction* in the EHR and visibly supersedes the prior S — not as a second, conflicting susceptibility sitting next to the old one.
3. **Verify the interface handled the correction semantics**, because "corrected result posts as an additional final" is a classic silent failure; if it did that here, that's a second problem to fix.
4. **Look-back:** any other patients on this run/panel affected? Any already treated on the wrong result?
5. **Systematize:** if the correction didn't propagate cleanly, that's a change-control and validation gap — corrections belong in every interface validation test set precisely because they're rare and dangerous.

**How you'd say it:**
> "The first action isn't technical — it's picking up the phone, because a resistant bug reported as susceptible can be actively harming a patient right now. Then I make sure the correction actually displays *as a correction* and replaces the old value, not as a second susceptibility sitting next to it, which is a failure mode I specifically test for. Then a look-back for anyone else affected. Corrections are low-frequency and high-consequence, so I insist they're part of every interface validation set, not an afterthought."

---

## 4. How to discuss it in an interview

Natural, first-person spoken snippets. Say these out loud; they should sound like a colleague, not a slide.

**On sounding practical rather than academic:**
> "The way I'd put it plainly — HL7 is the delivery truck, LOINC is the label that says what's in the box, UCUM is the label that says how much, and SNOMED is the label that says what it means. My job isn't driving the truck. It's making sure every box is labeled right before it leaves, because a mislabeled box that still arrives on time is the one that hurts someone."

**On transfusion, to show breadth beyond chemistry:**
> "The interface I'd watch most closely isn't chemistry — it's blood bank. That's where a mapping error can become a wrong unit, and where an interface losing a patient's historical blood type quietly forces slower crossmatching on everyone. So when people ask about interoperability, I want them to hear that I'm thinking about the highest-stakes interfaces, not just the high-volume ones."

**On POCT, to show core-lab-management awareness:**
> "Point-of-care is a great example of interoperability being an operations problem, not just an IT one. A lot of 'the glucose posted late' complaints are really about the device only transmitting when it's docked. Understanding the connectivity model saves you from chasing an interface bug that doesn't exist — and points you at the real fix, which is usually workflow and hardware placement plus a data manager that enforces operator competency."

**On staying in your lane without ceding it:**
> "I'm careful not to overclaim. I don't build interfaces and I wouldn't pretend to. But I'm the person who writes down what 'correct' means for the clinician, proves it before go-live, and refuses to let a change ship without lab sign-off. Engineers own the how; I own the what and the is-this-safe."

---

## 5. What can go wrong

Concrete failure cases — the misstep, then the lesson.

**Failure 1 — Validating the happy path only, and missing the correction/edge cases.**
*Misstep:* A team validates a new LIS-to-EHR interface by sending a handful of normal chemistry results, confirming they post, and going live. Corrections, criticals, abnormal flags, morphology flags, and blood-bank discrepancies were never in the test set. Three weeks later a corrected troponin posts as a second conflicting value and a clinician acts on the wrong one.
*Lesson:* A validation set that only proves normals proves almost nothing. The dangerous data is the *unusual* data — corrections, criticals, qualitative flags, and blocking conditions. Design the test set around what's rare and consequential, not what's common and benign. "It posted" is not "it's correct."

**Failure 2 — Treating a units/standard change as a clinical trend.**
*Misstep:* An acquired lab's HBV DNA assay reports in IU/mL; the legacy system reported log10 copies/mL. During integration nobody normalizes the units in the interface, so a patient's viral load appears to plummet by orders of magnitude overnight. A clinician reads it as a dramatic treatment response and de-escalates monitoring.
*Lesson:* When a value changes implausibly across a system boundary, suspect the *encoding* before the *biology*. Units and assay-standard mismatches produce plausible-looking numbers that pass every automated flag — the classic silent, no-alarm error. UCUM-coded units and explicit assay/standard awareness at the mapping stage are the guardrail, and a human number-check by someone clinical is the backstop a machine won't provide.

**Failure 3 (bonus) — Assuming "HL7-compliant" means "interoperable."**
*Misstep:* A vendor certifies its instrument interface as "HL7 v2 compliant," and the lab assumes plug-and-play. Go-live reveals the vendor puts the specimen source in a segment the LIS doesn't read, so every micro result posts without a source.
*Lesson:* HL7 v2's optionality means compliant systems still need custom mapping. "Compliant" describes grammar, not agreement on meaning. Budget mapping and validation time even when both sides claim the standard.

---

## 6. How I would improve this

Two improvement plays, each framed as you'd pitch it: **problem → change → expected win → how I'd de-risk it.**

### Play 1 — A standing interface validation library and change-control gate

**Problem.** Interface validation quality varies build-to-build and person-to-person, and LIS/EHR point-releases sometimes ship without lab awareness — the recurring root cause of silent failures. Each go-live reinvents its test cases from scratch, and corrections/criticals get under-tested.

**Change.** Build a reusable **validation test library** per domain — chemistry, coag, heme, micro/AST, blood bank, molecular, POCT — that always includes the dangerous cases (corrections, criticals, abnormal and morphology flags, ABO discrepancies, unmapped/unsolicited results, units edge cases). Pair it with a **change-control gate**: no LIS/EHR change touching lab interfaces ships without lab sign-off against the relevant test set.

**Expected win.** Fewer silent post-go-live failures, faster and more consistent validations, and a documented audit trail that satisfies inspectors (CAP/Joint Commission care about interface validation and change control). It also shortens future integrations because the test cases are already written.

**How I'd de-risk it.** Start with the two highest-stakes domains (blood bank and critical-value handling), pilot on the next scheduled go-live, and keep the gate lightweight — a checklist and a named clinical sign-off, not a bureaucratic committee that engineers route around. Measure it: track post-go-live interface incidents before and after.

### Play 2 — A cross-site "meaning map" for the top clinical tests

**Problem.** As BILH integrates labs, the same test carries different local codes, sometimes different units, and sometimes different interpretive rules (e.g., AST breakpoints) across sites. System-wide analytics, stewardship, and trending silently misfire when meaning diverges — and no one owns reconciling it.

**Change.** For the top clinical tests by volume and risk, maintain a shared reference table mapping each site's local code → LOINC → UCUM unit → (where relevant) SNOMED result concept and the agreed interpretive rule. Make it the single source of truth for any cross-site feed, and review it when a site changes an assay or a breakpoint.

**Expected win.** Trustworthy system-wide dashboards (stewardship, utilization, surveillance), safe cross-site trending, and a faster on-ramp for each new integrated lab because there's a defined target to map to instead of a blank page. It directly serves BILH's stated integration and growth agenda.

**How I'd de-risk it.** Scope it — start with maybe the top clinically significant tests, not the entire catalog, so it's finishable and maintainable. Assign clinical ownership (a pathologist reviews clinically significant mappings) and pair it with IT ownership of the technical build, so it doesn't rot. Version it and tie updates to the change-control gate from Play 1 so the two reinforce each other. *(Role-based interpretation of how these standards would be operationalized; I'd right-size scope to what the team can actually maintain.)*

---

## 7. Plain-English quartet

For the most jargon-heavy concepts, four calibrated versions each: **Elevator** (one sentence), **Practical** (one paragraph), **Interview-safe** (how to say it on the call), **Avoid-too-technical** (for a non-lab listener).

### HL7 v2 (ORM / ORU)

- **Elevator:** HL7 v2 is the standard message format labs use to send orders and results between systems.
- **Practical:** It's a structured, line-by-line message — an envelope line saying who sent it, a patient line, an order line, and one line per individual result carrying the value, units, reference range, and a status like final or corrected. An ORM is the "please run this" message; an ORU is the "here's the answer" message. It's old and permissive, which is why every interface needs custom mapping, but it still carries the overwhelming majority of lab result traffic.
- **Interview-safe:** "HL7 v2 is basically a structured form letter for lab data — envelope, patient, order, then a line per result. I read it functionally, not as an engineer. What I watch most is the result-status field, because a corrected result that doesn't display as a correction is a patient-safety problem, not a formatting one."
- **Avoid-too-technical:** "It's the common format that lets the lab machine, the lab's computer, and the hospital's chart all pass a result around and have it mean the same thing on each end."

### LOINC

- **Elevator:** LOINC is a universal code for *what a test measures* — the question being asked.
- **Practical:** Every lab has its own internal nicknames for tests, and those nicknames don't travel between systems. LOINC gives each distinct observation one shared code defined by things like the analyte, the specimen type, and whether it's quantitative — so "potassium in serum" means exactly the same thing everywhere. It names the question, never the answer; the value 4.1 doesn't live in LOINC. Mapping to LOINC is a clinical judgment because serum and urine potassium are deliberately different codes.
- **Interview-safe:** "LOINC is the universal name for what was measured. When you integrate labs, it's what lets three sites' local codes for the same test finally mean one thing to the shared chart and to analytics. I treat mapping it as clinical judgment, not data entry — specimen and method genuinely matter."
- **Avoid-too-technical:** "It's a shared label that says exactly which test this is, so a result from one hospital lines up correctly with the same test from another hospital."

### SNOMED CT (and "subsumption / is-a hierarchy")

- **Elevator:** SNOMED CT is a universal code for *what a result means clinically* — the answer, like which organism grew.
- **Practical:** It's a huge organized dictionary of clinical concepts — diseases, organisms, findings, specimen types — where each concept has a stable code and sits in a family tree: *Staph aureus* is a kind of *Staphylococcus* is a kind of *bacterium*. That family structure ("is-a," or subsumption) is the payoff: a surveillance system can ask "show me every gram-positive organism" and automatically pull everything underneath, even when each tech typed the name a little differently. It's how a readable result becomes a countable one.
- **Interview-safe:** "The clean split I use: LOINC codes the question, SNOMED codes the answer. SNOMED's real power is its hierarchy — because the concepts nest, infection control can pull every MRSA case across the system even with inconsistent typing. My job is making sure the coded concept is clinically accurate and at the right level of specificity."
- **Avoid-too-technical:** "It's a shared dictionary for the *meaning* of a result — like the actual organism's name — organized so a computer can group related things together and count them across the whole system."

### UCUM

- **Elevator:** UCUM is a strict, machine-readable spelling standard for units of measure.
- **Practical:** Humans read "mg/dL," "MG/DL," and "mg%" as the same thing; software sees three different strings and can't safely compare or convert them. UCUM gives each unit one exact canonical code so systems can parse, compare, and convert reliably — including between conventional US units and SI units. It matters most where a wrong unit produces a plausible-looking wrong number that no automated flag will catch, which is exactly where the quiet, dangerous errors live.
- **Interview-safe:** "UCUM makes units machine-readable so systems don't have to guess. It's unglamorous, but units are where the silent errors hide — a wrong unit still looks plausible and never trips a flag — so I treat consistent, coded units as a prerequisite before you trust any cross-site trending or decision support."
- **Avoid-too-technical:** "It's a strict way of writing the units — like milligrams per deciliter — so the computer never mixes up two ways of writing the same thing and never accidentally reads a value as ten times too big."

### Auto-verification / reflex logic (bonus — heavily used, rarely explained)

- **Elevator:** These are the automatic rules that release normal results without a human and trigger follow-up tests when criteria are met.
- **Practical:** Auto-verification lets in-range, QC-passed, flag-free results post automatically so staff focus on the abnormal ones; reflex logic automatically orders a follow-up test when a result meets a rule — a positive hepatitis C antibody reflexing to HCV RNA, or an abnormal CBC reflexing to a manual smear review. These rules live in middleware and are *clinical decisions encoded in software*, which is why a pathologist should own their correctness.
- **Interview-safe:** "Auto-verification is the rule set that releases clean results automatically and holds the abnormal ones for review; reflex logic is the rule set that fires a follow-up test — like a positive HCV antibody reflexing to viral RNA. Those are clinical decisions that happen to live in software, so I want to be the one who validates them before they go live."
- **Avoid-too-technical:** "It's the automatic rules that let normal results go straight through and flag the abnormal ones for a person — and that add a follow-up test on their own when the result calls for it."

---

## 8. Rapid recall

### Top 5 points

1. **Connectivity vs. meaning.** The pipe being *up* doesn't mean the meaning is *right*; the silent semantic errors — wrong label, lost correction, wrong unit — are the dangerous ones, and they raise no alarm.
2. **The four standards, one job each.** HL7 moves it, LOINC names the question, SNOMED names the answer, UCUM pins the units — together with the value, that's a result a computer can trust.
3. **The highest-stakes interfaces aren't the highest-volume.** Blood bank and critical-value handling deserve the most validation attention; a mapping error there can become a wrong unit or an acted-upon wrong result.
4. **Validate the dangerous cases, not the happy path.** Corrections, criticals, qualitative flags, ABO discrepancies, and unit edge cases are what break silently — so they're exactly what a validation set must include.
5. **The CP is translator, validator, and governor — not engineer.** You write what "correct" means, prove it before go-live, and hold the change-control sign-off. Engineers build the pipe; you guarantee the meaning.

### If you only remember three things

1. **"HL7 moves it; LOINC, SNOMED, and UCUM give it meaning — and my job is guaranteeing the meaning survives the trip, not building the pipe."**
2. **"The failures that scare me are silent — a healthy pipe delivering the wrong thing — so I validate corrections and criticals, monitor the unmatched-results queue, and require lab sign-off before any change ships."**
3. **"Blood bank is the interface I'd delay a go-live for; a mapping error there is a wrong-unit risk, not just a data-quality one."**

### Most likely to be asked (markers)

- *"How comfortable are you with HL7 / interfaces?"* → functional reader, not engineer; watch result status and corrections.
- *"What's the difference between LOINC and SNOMED?"* → question vs. answer; give the respiratory-panel or blood-culture example.
- *"You're not an informatics engineer — what would you actually do?"* → translate, validate, govern; the "engineers build the pipe, I guarantee the meaning" line.
- *"Tell me about a time interoperability can go wrong."* → pick a silent failure (lost correction, unit mismatch, unmapped send-out) and give the layered prevention/detection/mitigation/governance response.
- *"How would you approach integrating another hospital's lab?"* → mapping + validation + change control; name blood bank and units as the high-risk zones.

### Most impressive to mention (markers)

- **Naming a transfusion-specific interoperability risk** (ISBT 128 product mapping, electronic-crossmatch eligibility losing historical types) — instantly signals breadth beyond chemistry.
- **The POCT docking/connectivity-model insight** — shows you see interoperability as an operations problem, not just IT, which is the exact core-lab-management + informatics intersection this role wants.
- **"Compliant is not interoperable"** — HL7 v2's optionality means certified systems still need custom mapping; a subtle point that reads as experience.
- **A reusable validation library + change-control gate** as a concrete improvement play — shows managerial, systems-level thinking, not just problem-spotting.
- **The units-vs-biology instinct** ("when a value changes implausibly across a boundary, suspect the encoding before the biology") — the kind of clinically-grounded vigilance an engineer can't provide and a panel remembers.
