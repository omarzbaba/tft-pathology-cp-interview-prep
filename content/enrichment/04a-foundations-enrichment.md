# Core Chapter A — Enrichment Pack: Foundations of Pathology Informatics

> **How to use this pack.** This sits beside the base chapter, not on top of it. The base chapter already defines the field, the four groupings, PIER, the clinical-informatics boundary, the data-richness argument, the physician-ownership case, the quality/efficiency chain, and standardized coding — and it does that well. This pack does three things the base chapter does less of: (1) it spreads examples **out of chemistry** and into blood bank, coagulation, flow, micro, molecular, and POCT; (2) it puts more weight on the **management and leadership realities** — vendors, downtime, committees, leading without title authority; and (3) it **de-jargons** the concepts so you can say them naturally on a phone call. Mine the spoken snippets out loud; that's what a phone interview rewards.
>
> **Framing reminder:** nothing here is Lahey/BILH insider fact. Where I connect a concept to the role I label it a **role-based interpretation** or **practical expectation**. Numbers I'm not certain of are flagged as estimates, not quoted as hard data.

---

## Gap read — what the base chapter under-served

Honest audit of where the base chapter, strong as it is, leaves room:

- **Example gravity is stuck in chemistry.** Potassium, troponin, lipase, creatinine, sodium, HbA1c carry almost every illustration. The role is *broad* CP — blood bank/apheresis, coagulation, flow cytometry, microbiology/virology/parasitology, and molecular barely appear as concrete informatics examples. An interviewer probing breadth will notice if every story is a chemistry story. This pack deliberately rebalances toward the under-represented benches.
- **Leadership without title authority is named as a role need but never modeled.** The base chapter establishes *that* the pathologist is the domain authority; it doesn't show *how* you actually move a change through an LIS analyst who reports elsewhere, a vendor on a support contract, a nursing unit that owns the POCT operators, and an enterprise informatics team that owns the EHR. That "influence across boundaries you don't control" muscle is exactly what a broad CP + informatics seat lives on.
- **Thin on the failure/downtime reality.** The chapter has one interface-failure vignette (lipase). It's light on the messy operational truths: LIS downtime procedures, middleware silently dropping to manual, interface backlogs after an upgrade, alert fatigue, mapping drift over years. "What can go wrong" is where you sound like someone who's actually run a lab.
- **Vendor and build-vs-configure realities are absent.** Real informatics work is often *negotiating with a vendor*, deciding whether to build a rule in middleware vs. the LIS vs. the EHR, and managing change control across a shared system. None of that texture is in the base chapter, and it's very interview-relevant for a management-flavored role.
- **Some load-bearing jargon is never translated for a lay listener.** RACI, ORU segments, FHIR `Observation` resources, "delta check," "autoverification" — the base chapter uses these correctly but assumes the reader already speaks lab-IT. A phone interviewer may be a generalist administrator or a clinician from another division. The Plain-English quartet below fixes that.

---

## More real-world examples — beyond the chemistry bench

Concrete, named examples across the CP domains the base chapter under-uses. Each is an *informatics behavior*, not just a lab fact.

1. **Blood bank — the ABO/Rh interface guard.** When a type-and-screen crosses from the LIS to the blood bank module and the EHR, the historical ABO must be compared against the current result before any product is allocated. If a patient's current forward type comes back as A but history says O, the system must *hard-stop* electronic release and force a second determination on a new draw. That two-sample rule is an informatics rule with a life-or-death payload — a mismatched unit is a hemolytic transfusion reaction. This is the single most consequential autoverification *exclusion* in the building: blood bank results are exactly where you do **not** let convenience override the guardrail.

2. **Coagulation — the heparin-specimen sanity rule.** A PTT that comes back wildly prolonged (say >150 seconds) on a patient with no anticoagulation history is very often a line draw contaminated with heparin, not a real coagulopathy. A well-built middleware rule holds that result, prompts a redraw from a clean peripheral stick, and prevents a spurious "critical PTT" from triggering a fresh frozen plasma order at 2 a.m. The rule encodes pre-analytic clinical knowledge the analyzer doesn't have.

3. **Flow cytometry — discrete result vs. PDF-in-a-can.** A leukemia/lymphoma flow panel produces an interpretive report plus discrete antigen-expression data. If informatics files it only as a scanned PDF, the immunophenotype is invisible to any downstream query — you can't trend a patient's aberrant CD5+ B-cell population across three encounters, and you can't pull a cohort for a QA review. Structuring at least the key result fields (and coding the diagnosis) turns flow from an unsearchable attachment into computable data. This is the flow analog of the chapter's send-out-PDF example, and it matters because flow volume is growing.

4. **Microbiology — the positive blood culture rapid-notification chain.** A Gram stain on a positive blood culture bottle is a critical value with a clock on it. The informatics pathway has to route "Gram-positive cocci in clusters" to the covering clinician *and* increasingly to an antimicrobial stewardship pharmacist, with closed-loop documentation of who was told when. If rapid molecular ID (e.g., a multiplex BCID panel) fires, the organism + resistance markers (mecA, vanA) need to flow as discrete, coded results so stewardship logic can act — not buried in free text.

5. **Microbiology — the antibiogram that builds itself.** Because organism + drug + interpretation are stored as coded triples, the annual (or now often real-time) antibiogram assembles from the LIS automatically, with de-duplication rules (first isolate per patient per period) applied in software. Get the de-duplication logic wrong and you over- or under-state resistance — an informatics error that misdirects empiric therapy across the whole hospital.

6. **Virology/serology — the reflex cascade with a fork.** An HIV screen that's reactive must reflex to a confirmatory differentiation assay, and a positive there may reflex again to a viral load. Each hand-off is a coded, validated reflex rule; a break anywhere leaves a reactive screen without a confirmation, which is both a patient-safety gap and a reportable-disease compliance gap. (Hepatitis C Ab → HCV RNA, in the base chapter, is the simpler one-step version of this.)

7. **Parasitology / send-out — the malaria smear and the results-integrity problem.** A thick-and-thin smear read as "*Plasmodium falciparum*, 4% parasitemia" is a critical result that must reach the clinician fast and file as discrete, trendable data (parasitemia percentage drives treatment decisions and monitoring). If it lands as free text, you can't trend the percentage across the treatment course. Send-out parasitology results returning as faxes/PDFs are a classic "trapped data" failure.

8. **POCT — the glucose meter operator lockout.** Bedside glucose meters must only transmit results tied to a *certified* operator ID and the *correct* patient via barcode. The informatics control is the connectivity middleware (e.g., a POCT data manager) that blocks an expired-competency operator from resulting and quarantines results with a patient-ID mismatch. Without it you get untracked, unbillable, potentially mis-attributed glucoses — and a CAP finding.

9. **POCT — the iSTAT / blood gas result that never reconciles.** A cartridge-based blood gas run at the bedside has to reconcile its result into the LIS/EHR under the right encounter. A common failure is the device caching results offline (dead-zone Wi-Fi) and dumping them later against a stale patient context. The informatics fix is store-and-forward logic plus a reconciliation queue a human clears — an example of designing for the network *not* being there.

10. **Molecular — the variant that needs structure, not prose.** An NGS solid-tumor panel might report an *EGFR* exon 19 deletion with a variant allele fraction. If that's narrative-only, no downstream system can flag the patient for a matched therapy or pull them into a molecular tumor board cohort. Structuring the gene, variant, and VAF (and coding to a variant nomenclature) is what makes precision-oncology workflows possible. (The base chapter names NGS volume; this is the concrete downstream stake.)

11. **Chemistry/endocrine — the calculated result nobody validated.** eGFR, LDL (calculated), free-testosterone indices, and corrected calcium are *derived* results computed by a formula in the LIS or middleware. When a creatinine method changes or a new eGFR equation is adopted (e.g., dropping the race coefficient), every calculated downstream result silently changes unless someone re-validates the calculation. A calculation is an informatics artifact that has to be version-controlled like any other rule.

12. **Hematology — the CBC delta that catches a mix-up.** An MCV is one of the most stable analytes a patient has; it barely moves day to day. A delta check on MCV (not just hemoglobin) is a superb mislabel detector — if today's MCV is 78 and yesterday's was 95, it's almost certainly a different patient's tube. Building the delta on the *right, stable* analyte is a clinical-judgment call encoded in informatics.

---

## Operational scenarios

Each is **Situation → What you'd do (sequenced, patient-first) → How you'd say it in the interview.**

### Scenario 1 — Middleware silently reverts autoverification to manual

**Situation.** A middleware upgrade goes in over a weekend. Monday morning, chemistry techs are manually verifying everything — the autoverification rules didn't reload, and nobody noticed until the release queue was hundreds deep and stat TAT was climbing. No wrong results went out; everything just slowed to a crawl, and the ED is calling.

**What you'd do (sequenced, patient-first).**
1. **Protect patients first:** confirm nothing *incorrect* is releasing — a manual queue is slow, not unsafe, so the immediate risk is delayed criticals. Prioritize stat and critical-value results for manual release right now; put extra tech hands on the queue.
2. **Stabilize the clinical channel:** make sure critical-value calling is still happening manually and documented, since the automated closed-loop path may be part of what broke.
3. **Diagnose, don't guess:** pull the middleware change log and confirm the autoverification ruleset didn't migrate. Decide with the vendor whether to reload rules or roll back the upgrade.
4. **Validate before re-enabling:** don't just flip autoverification back on — run a defined set of known results through to confirm the rules fire correctly, *then* re-enable.
5. **Fix the process, not just the incident:** the real lesson is that go-live had no post-change verification step and no monitoring alert for "autoverification rate suddenly dropped to zero." Add both.

**How you'd say it in the interview.**
> "My first move is always to separate *slow* from *wrong*. A manual queue is slow, not unsafe, so the immediate patient risk is a delayed critical value — I'd get hands on the stat queue and make sure critical calling is still happening while we diagnose. Then I'd pull the change log, work the vendor on reload-versus-rollback, and — this is the part people skip — validate the rules before turning autoverification back on. The durable fix isn't the reload; it's that we had no post-change check and no alert for the autoverification rate cratering. I'd build both so the next upgrade can't fail silently."

### Scenario 2 — Two facilities, two "sodium" codes, one integrating patient

**Situation.** *(Role-based interpretation — a plausible integration scenario, not a Lahey/BILH fact.)* The system is bringing a community hospital's lab onto the shared EHR. Their basic metabolic panel reports the same analytes in the same units, but their sodium maps to a local code the enterprise EHR files as a *separate* analyte. Post-integration, a transferred patient's sodium history splits into two disconnected trend lines, and a delta check won't fire across the seam.

**What you'd do (sequenced, patient-first).**
1. **Name the safety stake up front:** a split trend line means a clinician might miss a real change, and delta checks — a key mislabel/error catch — go blind across the boundary. That's the patient risk, and it frames the urgency.
2. **Reconcile with clinical judgment, not clerically:** map both facilities' sodium (and every shared analyte) to a common LOINC, confirming the specimen type, method, and units actually match before collapsing them — because a "sodium" that's really a different specimen or method shouldn't be merged.
3. **Handle the history:** decide how legacy results re-map so a patient's prior values trend continuously, and document what was changed.
4. **Validate before go-live:** run test patients across the seam and confirm trending and delta checks fire correctly; don't discover this in production.
5. **Govern it:** put the harmonized catalog under change control so a future local addition can't silently re-fragment the data.

**How you'd say it in the interview.**
> "The failure mode people underestimate in a lab integration is *silent* — the units and values look fine, but two sites coded the same test differently, so a patient's sodium history splits into two trends and the delta check goes blind across the seam. The fix is a clinically informed reconciliation to a shared LOINC — and I stress *clinically informed*, because I won't merge two 'sodiums' until I've confirmed the specimen, method, and units really are the same thing. Then validate with test patients before go-live, and put the harmonized catalog under change control so it can't quietly re-fragment. That's exactly the kind of work I'd expect as the system integrates labs, and it's where a pathologist's coding judgment prevents a hazard IT can't see."

### Scenario 3 — A well-meaning enterprise CDS alert misfires on a lab value

**Situation.** Enterprise informatics rolls out a sepsis best-practice alert that fires on a lactate above a threshold. Within a week, clinicians are complaining the alert fires on *point-of-care* lactates drawn during CPR and on hemolyzed specimens that falsely elevate lactate — classic alert fatigue, and now they're starting to ignore the real ones.

**What you'd do (sequenced, patient-first).**
1. **Recognize the shared-ownership seam:** the alert *logic* is enterprise's, but the *lactate result and its caveats* are the lab's — this is precisely the LIS↔EHR overlap the base chapter describes. Don't let it ping-pong between teams.
2. **Bring the lab's knowledge to the table:** POCT lactate and central-lab lactate behave differently; hemolysis falsely elevates lactate; timing matters. The lab can specify *which* lactates should feed the rule (e.g., exclude POCT-during-resuscitation, gate on a hemolysis flag).
3. **Co-design the fix:** work with enterprise informatics so the alert consumes only appropriately sourced, flagged-clean lactates — a joint change, validated together.
4. **Measure it:** track alert firing rate and override rate before/after so you can show the fatigue actually dropped.

**How you'd say it in the interview.**
> "This is the textbook overlap case — the alert logic belongs to enterprise informatics, but the lactate result and all its caveats belong to the lab. My job is to stop it from ping-ponging and bring what the lab knows: a point-of-care lactate drawn during a code isn't the same signal as a central-lab lactate, and hemolysis falsely elevates it. So I'd co-design the rule to consume only appropriately sourced, hemolysis-clean lactates, validate it jointly, and then actually measure the override rate to prove the fatigue dropped. Alert fatigue is a patient-safety issue disguised as an annoyance — every ignored alert is a future missed real one."

---

## How to discuss it in an interview

Short, natural spoken snippets — first person, phone-ready.

**On breadth across CP (showing you're not just a chemistry person):**
> "Informatics looks different on every bench, and that's part of why I like it. In chemistry it's autoverification and delta checks; in blood bank it's the ABO history guard that will hard-stop an electronic release; in micro it's coded organism-drug-interpretation triples driving an antibiogram and rapid notification to stewardship; in molecular it's structuring variant data so a patient can actually be matched to a therapy. Same discipline — trustworthy information — but the rules and the stakes are specific to each domain."

**On leading without owning the org chart:**
> "Most of the informatics work I care about crosses boundaries I don't directly control — an LIS analyst who reports to IT, a vendor on a support contract, a nursing unit that owns the glucose-meter operators, an enterprise team that owns the EHR. So I lead by being the person who can clearly define what *correct* looks like and why it matters for a patient, bring the clinical evidence, and make the other team's job easier rather than harder. I've found you get far more done as the credible translator than as the person insisting on authority."

**On sounding operational rather than academic:**
> "I try to keep informatics concrete. If someone asks what I'd improve, I don't reach for a framework — I reach for a specific broken pathway: the send-out flow result that files as an unsearchable PDF, the delta check that's on hemoglobin when it should also be on MCV, the POCT device that dumps cached results against a stale patient context. The theory is only useful because it tells you where to look for the specific thing that's costing a patient time or safety."

---

## What can go wrong

Concrete missteps and the lesson each teaches.

**Failure 1 — Over-automating into a blood bank near-miss.**
A lab, chasing TAT, extends autoverification broadly and — through a poorly scoped rule — lets a repeat ABO type auto-release without enforcing the two-sample historical comparison. A patient whose historical type conflicts with the current draw slips through toward electronic product release before a tech catches it manually.
- **The misstep:** treating autoverification as a universal good and applying it uniformly, without recognizing that *some benches are exclusions by design*. Blood bank, and any result where a discrepancy is catastrophic, is where you deliberately keep a human and a hard-stop in the loop.
- **The lesson:** autoverification is a scalpel, not a firehose. The value is in scoping — knowing exactly which results are safe to release and which must never be. The pathologist's clinical judgment about *what to exclude* is worth more than the engineering that does the releasing.

**Failure 2 — Mapping drift nobody owns.**
Over several years, new assays get onboarded by whoever's available, LOINC codes get assigned inconsistently, a couple of analytes get mapped to "close enough" codes, and a method change silently alters a calculated eGFR. No single incident occurs — but the analytics warehouse slowly fills with mis-aggregated data, a couple of results trend against subtly wrong priors, and it surfaces only when a research pull or a CDS rule produces nonsense.
- **The misstep:** treating mapping as a one-time clerical task at onboarding rather than a governed, clinical, ongoing responsibility with an owner and change control.
- **The lesson:** coding is load-bearing and it *drifts*. It needs an owner (the lab), a review cadence, and version control on calculations and mappings — because the errors are silent and cumulative, invisible until they've already fed a wrong decision. "Quiet when right, catastrophic when wrong, and it decays without maintenance" is the whole argument for pathologist stewardship.

---

## How I would improve this

Two improvement plays, each framed as you'd pitch it: **problem → change → expected win → how you'd de-risk it.**

### Play 1 — A standing autoverification-and-rules review, not a set-and-forget

- **Problem:** in most labs, autoverification rules, delta checks, and calculated-result formulas are built once, validated once, and then never revisited — even as methods change, reference intervals shift, and volumes grow. Rules drift out of alignment with reality, and nobody notices until a rule either fires wrongly or fails to fire.
- **Change:** stand up a lightweight quarterly review — pathologist plus LIS analyst plus a lead tech — that looks at autoverification rate by bench, override/exception rate, delta-check hit rate, and any method or reference-interval changes since last review. Anything that changed a calculation or a mapping gets re-validated on a defined schedule.
- **Expected win:** rules stay aligned with current methods; you catch a drifting delta check or an unrevalidated eGFR *before* it produces a bad result; and you have a documented, defensible cadence for CAP inspectors who increasingly want to see ongoing rule governance, not a one-time validation.
- **How you'd de-risk it:** keep it small and evidence-driven so it doesn't become bureaucratic theater — one hour a quarter, driven by the metrics, with a clear owner. Pilot it on one high-volume bench (chemistry) before extending, so you prove the value before asking other benches for time.

### Play 2 — Rescue trapped result data (PDF/fax → discrete) on the highest-stakes send-outs

- **Problem:** a meaningful slice of clinically important results — send-out molecular, some flow, some parasitology, outside-reference results — arrive as PDFs or faxes and file as unsearchable attachments. They can't be trended, can't feed CDS, can't be pulled for a cohort or a QA review, and are easy to miss in a busy chart.
- **Change:** prioritize the *highest-stakes* trapped results (start with, say, molecular oncology variants and quantitative parasitology like malaria parasitemia) and work with the send-out vendors and interface team to receive them as discrete, coded results — or, where the vendor can't send structured data, build a structured intake step so the key fields become computable.
- **Expected win:** trendable parasitemia across a treatment course; molecular variants that can actually flag a patient for matched therapy or a tumor-board cohort; and fewer results lost in the chart. It's a direct patient-care and continuity-of-care win, and it strengthens the analytics foundation.
- **How you'd de-risk it:** don't boil the ocean — rank send-outs by clinical stakes and volume, do the top few first, and measure lost-to-follow-up or time-to-action before and after so the win is provable. Frame it to the vendor as a shared quality goal, and lean on standards (structured results are increasingly a contractual expectation) rather than a custom one-off.

---

## Plain-English quartet

For the most jargon-heavy concepts in this chapter, four versions each: **Elevator** (one sentence), **Practical** (one paragraph), **Interview-safe** (how to say it live), **Avoid-too-technical** (for a non-lab listener — an administrator, a clinician from another division, a family member).

### Autoverification

- **Elevator:** Software automatically releases the routine, in-range, rule-passing results so technologists only touch the exceptions.
- **Practical:** Autoverification is a validated set of rules — is the value in range, does it pass the delta check, are there no instrument flags, is it not a critical value — that, when all satisfied, lets a result release to the chart without a human clicking "verify." Typically it handles the large majority of routine chemistry and hematology, which frees technologists to spend their judgment on the flagged minority that actually needs it. It's faster *and* more consistent than manual review because the rule is applied identically every time, with a full audit trail.
- **Interview-safe:** "Autoverification is how we let the routine results release themselves under validated rules, so techs focus on the exceptions. It's a rare lever that improves speed and consistency at the same time — and the skill is in scoping it, knowing exactly which results are safe to auto-release and which, like blood bank, must always keep a human in the loop."
- **Avoid-too-technical:** "For the routine, clearly-normal results, the system releases them automatically under strict safety rules, so our staff can spend their time on the unusual ones that actually need a trained eye. It's like cruise control — it handles the easy stretch so the driver can concentrate on the tricky parts."

### Delta check

- **Elevator:** An automatic comparison of a patient's new result against their previous one to catch changes too big to be real.
- **Practical:** A delta check flags when a result changes more than clinically plausible between two draws — the classic use is catching a mislabeled or switched specimen. If a patient's hemoglobin was 8 this morning and 14 this afternoon, that's biologically implausible and probably a different patient's tube. It works best on *stable* analytes (MCV barely moves, so a big MCV delta is a strong mislabel signal), and it's a balance: too sensitive and you drown techs in false flags, too loose and you miss real errors.
- **Interview-safe:** "A delta check compares a patient's new result to their prior one and flags a change too big to be biologically real — it's one of our best catches for a mislabeled specimen. The judgment is picking the right analyte and threshold; I like MCV as a delta target because it's so stable that a big jump almost always means a switched tube, not a real change."
- **Avoid-too-technical:** "The system remembers the patient's last result and flags it if the new one jumps more than a body actually could between draws — which usually means two patients' samples got swapped. It's a safety net that catches labeling mistakes before they reach a doctor."

### Standardized coding (LOINC / SNOMED / UCUM)

- **Elevator:** A shared vocabulary that makes a result from any lab or instrument mean the same thing everywhere.
- **Practical:** Every result needs three things pinned down to be safely shared: *what was measured* (LOINC — e.g., serum fasting glucose, specifically), *in what units* (UCUM — mg/dL vs. mmol/L made explicit), and *what specimen or diagnosis it relates to* (SNOMED CT). Without this, two labs' "sodium" can't be safely combined and a patient's history fragments when they move between facilities. Assigning these codes is a clinical judgment, not a clerical one — you have to understand the assay to code it right — and a mis-map is a silent hazard because the result looks fine while trending against the wrong prior or feeding the wrong alert.
- **Interview-safe:** "Coding is the shared vocabulary that lets a result mean the same thing across instruments, labs, and hospitals — LOINC for what was measured, units made explicit, SNOMED for the specimen or diagnosis. The point I always make is that mapping is a clinical act, not clerical: a mis-mapped analyte is invisible until it feeds a wrong decision, which is exactly why it belongs to the lab, especially when you're integrating sites."
- **Avoid-too-technical:** "It's a common dictionary so that a 'sodium' from one hospital and a 'sodium' from another are recognized as the same test, in the same units, and a patient's history stays connected when they move between facilities. Getting a code wrong is dangerous precisely because nothing looks broken — the number just quietly attaches to the wrong history."

### HL7 v2 vs. FHIR (the interfaces)

- **Elevator:** Both are how systems exchange results — HL7 v2 is the older message format still doing most of the work; FHIR is the modern web-style approach that apps and decision support consume more easily.
- **Practical:** HL7 version 2 is a decades-old, pipe-delimited messaging standard — a result travels as an "ORU" message from instrument to middleware to LIS to EHR, and it still carries the vast majority of live lab results today. FHIR is the newer standard that exposes the same information as web-friendly, queryable resources (an Observation, a DiagnosticReport, a Specimen), which modern apps and enterprise decision-support tools consume much more cleanly. You'll live in both for years — v2 for the plumbing that works, FHIR increasingly for the apps and analytics layered on top.
- **Interview-safe:** "HL7 v2 is the older messaging standard that still moves most of our results — reliable plumbing. FHIR is the modern, web-style version that exposes results as queryable resources, which is where apps and decision support are heading. Practically, I expect to run both for a long time and to be fluent enough in each to specify and validate an interface, even though I'm not the one writing the integration code."
- **Avoid-too-technical:** "These are just the languages our systems use to pass results to each other. One is older but does most of the day-to-day work; the newer one is more web-friendly and easier for modern apps to plug into. We'll use both for the foreseeable future."

### RACI / ownership at the LIS↔EHR seam

- **Elevator:** A simple way of writing down who's responsible for what, so nothing at the lab-to-EHR boundary falls through the cracks.
- **Practical:** At the interface where the lab system hands results to the EHR, two teams meet — the lab owns whether the result is *correct and correctly coded*, and enterprise informatics owns the *platform it displays on*. A RACI split (who's Responsible, Accountable, Consulted, Informed) just makes that explicit so a display bug doesn't bounce between teams for weeks. The load-bearing principle is that the lab stays accountable for result correctness even after the result crosses into a system it doesn't own.
- **Interview-safe:** "At the lab-to-EHR boundary I like to be explicit about who owns what — the lab owns whether the result is correct and correctly coded, enterprise owns the platform it shows up on, and we validate the seam together. Being clear about that up front is how you keep a display problem from ping-ponging between teams while a clinician's stuck looking at a truncated result."
- **Avoid-too-technical:** "It's just agreeing in advance who handles which part when the lab's results show up in the main medical record — so when something looks off, everyone knows whose job it is to fix it instead of pointing at each other."

---

## Rapid recall

### Top 5 points

1. **Informatics is the result pathway, not the result** — and that pathway looks different on every bench (autoverification in chemistry, the ABO history guard in blood bank, coded triples in micro, structured variants in molecular).
2. **Autoverification is a scalpel, and the skill is the exclusions** — knowing what to *never* auto-release (blood bank, anything where a discrepancy is catastrophic) matters more than the automation itself.
3. **Coding is a clinical act that drifts** — LOINC/UCUM/SNOMED mapping is load-bearing, quiet when right, catastrophic when wrong, and it decays without ongoing pathologist-owned governance.
4. **Lead by translation, not title** — the work crosses boundaries you don't control (IT, vendors, nursing, enterprise informatics), so credibility as the person who defines "correct" beats authority.
5. **Every failure mode routes back to a patient** — a slow queue is a delayed critical, a split trend line is a missed change, alert fatigue is a future missed real alert; always land the point on patient safety.

### If you only remember three things

1. **"I own the result pathway, and I know which results must never be automated."** (Breadth + judgment in one line.)
2. **"Mapping is a clinical act, not a clerical one — a mis-map is a silent hazard, which is exactly why it belongs to the lab as we integrate sites."** (The integration-ready sentence.)
3. **"I lead these projects as the translator who defines correct and makes the technical team's job easier — that gets more done than insisting on authority."** (Collaborative, hireable, honest about scope.)

### Most likely to be asked *(markers)*

- **"What is informatics to you / how is it different from just running the LIS?"** — define the pathway, name the four groupings lightly, land on patient care.
- **"Who owns a result-display bug, you or IT?"** — content/coding is lab, platform/rendering is enterprise, validate the seam jointly.
- **"How do you decide what's safe to autoverify?"** — validated rules, clinically scoped exclusions (name blood bank), delta/critical gating, ongoing monitoring.
- **"What breaks first when you integrate two labs' data?"** — code/unit/reference-interval mismatches and split-trend/delta-blind gaps across the seam.
- **"Do you code?"** — honest scope: I specify, validate, and understand standards at PIER level; I partner with engineers to build. Don't overclaim.

### Most impressive to mention *(markers)*

- **The blood-bank exclusion instinct** — spontaneously naming that autoverification must *stop* at the ABO history guard signals real operational judgment, not textbook enthusiasm for automation.
- **MCV as a delta-check target** — a specific, slightly non-obvious choice that shows you actually think about analyte stability, not just "we do delta checks."
- **Mapping drift as a governed, ongoing risk** — recognizing coding decays over years and needs a review cadence separates you from candidates who treat it as one-time setup.
- **The integration seam framed as a patient-safety continuity issue** — "a split sodium trend means a clinician might miss a real change and the delta check goes blind" ties standards work directly to harm, which is exactly the growth-agenda fluency this role wants.
- **Leading without title authority** — naming the vendor/IT/nursing/enterprise boundaries and saying you lead by translation and credibility is a mature, collaborative signal that reads as immediately hireable.
