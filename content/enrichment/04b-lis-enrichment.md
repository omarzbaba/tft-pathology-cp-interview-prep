# Enrichment Pack — Core Chapter B: The LIS and Laboratory Systems

> **How to use this pack.** This sits alongside the base chapter (`04b-lis-and-laboratory-systems.md`). The base chapter already covers the LIS lifecycle, the total testing process, accessioning/PPID, the test dictionary and reference ranges, interfaces/middleware/autoverification, downtime, troubleshooting, and safe improvements. This pack does **not** repeat that. It goes deeper where the base was thin: more named, concrete examples across every CP domain; fully sequenced operational scenarios; extra spoken snippets; failure cases with the lesson attached; a couple of improvement plays framed as a pitch; and plain-English translations of the most jargon-heavy ideas. Use the base chapter to *learn* the material and this pack to *sound specific and grounded* on the call.

---

## Gap read — what the base chapter under-served

Honest audit of where the base is strong but leaves the learner exposed:

- **Blood bank / transfusion medicine is under-examples.** The base names WBIT once, but the LIS side of transfusion — the BBIS (blood bank information system), electronic crossmatch logic, the "two-sample rule" for ABO, and why the blood bank module is often deliberately walled off from autoverification — is barely touched. For a broad CP role this is a glaring gap, because the blood bank is where an LIS error kills fastest.
- **Microbiology and molecular are treated as afterthoughts.** Micro has a genuinely different LIS relationship (susceptibility rules/antibiogram, organism-drug suppression, culture workflow states, MALDI-TOF and rapid-molecular result handling) and the base never gets concrete about it. Molecular gets one "mis-mapped result" mention with no texture (variant nomenclature, qualitative vs. quantitative, "not reportable" logic).
- **The examples skew chemistry/heme and stay slightly generic.** Good examples exist (potassium, delta check 8→14) but they repeat across subtopics. The learner needs a *wider inventory* of crisp, nameable failures — a specific analyte, a specific bench, a specific misconfiguration — so any interview probe lands on a ready example.
- **Management realism is framed but rarely quantified or costed.** The base says "TAT," "staffing efficiency," "capital vs. configuration" — all correct — but almost never attaches a number, a metric, or a resourcing tradeoff a director would actually recognize (e.g., what a realistic auto-release rate looks like, what a "hard stop" costs in alert fatigue, who sits at a change-control meeting).
- **Leadership *without title authority* is named as a value but not modeled.** The base tells the learner to "partner with informatics." It doesn't show what that looks like when you have no direct reports and need the LIS analyst, the bench supervisor, and an EHR/Beaker team you don't control to prioritize your fix. That influence-without-authority muscle is exactly what a new CP needs and is worth a few concrete moves.

---

## More real-world examples

Concrete, named, and spread across domains — each is a specific bench/analyte/system failure a CP can actually talk about. None duplicate the base chapter's list.

1. **Transfusion — the electronic crossmatch and the two-sample rule (blood bank).** The BBIS will only permit an *electronic (computer) crossmatch* if the patient has a current type-and-screen with a negative antibody screen **and** a historical or second-draw ABO on record, with no history of clinically significant antibodies. A common LIS-governance decision: require two independently drawn ABO determinations before releasing group-specific (non-O) red cells, so the system blocks release of A-positive units to a patient with only a single A typing. This is a rule that lives in the blood bank software, is owned clinically by the CP, and is deliberately *not* subject to autoverification.

2. **Micro — antibiogram suppression and cascade reporting (susceptibility).** The micro LIS/expert-rules layer suppresses reporting of an antibiotic the organism is intrinsically resistant to (e.g., not reporting a cephalosporin as "susceptible" for an *Enterococcus*), and *cascades* — only showing a broad-spectrum agent if the first-line agent tests resistant. A misconfigured cascade rule that reports a redundant broad agent up front drives inappropriate prescribing. This is a place where CP/ID stewardship judgment is encoded directly into result routing.

3. **Coagulation — the anticoagulant tube ratio and specimen integrity (coag bench).** A short-draw light-blue (sodium citrate) tube gives a falsely prolonged PT/INR and PTT because the citrate-to-plasma ratio is off. The LIS/preanalytic rule rejects an under-filled coag tube, and a separate rule flags hematocrit >55% (polycythemia) as needing an adjusted citrate volume. A lab that lets short-draw coags through will occasionally hold up a real anticoagulation decision on a bad number.

4. **Chemistry — the eGFR calculation and the 2021 race-free refit (calculated result).** eGFR is a *calculated* resultable derived from creatinine, and the calculation logic lives in the LIS/middleware. When the field moved to the race-free CKD-EPI 2021 equation, every LIS had to update the formula and remove the race modifier — a pure configuration change with real clinical consequences if one site updates and another doesn't. Great example of "the number is right but the formula behind it is a governed decision."

5. **Hematology — the critical-flag hierarchy and the "no diff on a critical WBC" hold (heme bench).** A WBC of 150,000 should trigger a hold-for-manual-review reflex *and* a critical-value callback, and the LIS must not auto-release the automated differential on a specimen where the analyzer flagged blasts/variant lymphocytes. A misconfiguration that lets an automated diff auto-release on a flagged leukemic sample is a classic silent postanalytic failure.

6. **POCT — the connectivity gap between a glucometer and the LIS (point of care).** Bedside glucose meters and iSTAT devices connect through a POCT data-management middleware (e.g., a connectivity manager) that pushes results to the LIS/EHR and enforces operator lockout for lapsed competency or missed QC. A frequent real failure: a nursing-unit glucometer's results stop crossing to the EHR because an operator ID wasn't in the middleware, so the result exists on the device but never files — invisible until someone asks where the glucose went.

7. **Immunology / serology — the reflex algorithm that stalls mid-cascade (send-out and reflex logic).** An HIV screen that is reactive should reflex to a confirmatory differentiation assay, and a hepatitis panel or ANA-to-ENA cascade should chain automatically. A reflex rule that fires the screen but fails to auto-order the confirmatory step leaves a reactive result sitting without resolution — a postanalytic gap that looks fine on the analyzer but strands the patient.

8. **Anatomic/molecular interface — the result that must *not* autofile (molecular and AP).** A quantitative BCR-ABL1 result reported on the international scale, or an oncology NGS variant report, should route as a structured/interpreted result that does **not** silently autofile like a chemistry value; the LIS should hold it for interpretive sign-out and deliver it as a report, not a bare number. A mapping that dumps a molecular Ct value or a raw variant string into a numeric EHR field without the interpretation is both wrong and dangerous.

9. **Reference-lab send-out — the unmapped result code that files as text (interface).** A send-out esoteric assay comes back from the reference lab with a new result code the interface engine hasn't mapped, so instead of filing as a discrete, trendable value it lands as an unstructured comment — uncoded, un-LOINC'd, invisible to flowsheets and to any downstream decision support. Silent, common, and exactly the kind of interface rot a monitoring dashboard catches.

10. **Chemistry — the reagent-lot shift that autoverification happily released (QC/lot).** A new immunoassay reagent lot introduces a subtle calibration bias; because each individual result still falls inside the reference range, autoverification releases them all — the shift is only visible in a moving-average (patient-based QC) trend or a lot-to-lot comparison, not in any single value. The lesson: autoverification checks a result against limits, not against the *population's* drift.

---

## Operational scenarios

Each is **Situation → What you'd do (sequenced, patient-first) → How you'd say it in the interview.**

### Scenario 1 — Wrong blood in tube surfaces at the blood bank

**Situation.** The blood bank flags that a patient's current ABO type (group O) doesn't match the historical type on file (group A). The BBIS blocked release because the two ABO determinations disagree. There's an active crossmatch request for this patient.

**What you'd do (sequenced, patient-first).**
1. **Protect the patient first.** No group-specific units go out; if red cells are urgently needed, the safe fallback is group O — the system's block is doing its job, so I reinforce it, I don't override it.
2. **Treat this as a possible WBIT event, not a lab clerical error.** Quarantine the current specimen and results, and notify the collecting unit that a redraw is required — a mismatch like this is a mislabeled or wrong-patient draw until proven otherwise.
3. **Redraw with strict PPID** (second independent draw, ideally different phlebotomist) to establish a clean, verified ABO — this is the two-sample rule doing real work.
4. **Look back and localize.** Was the specimen mislabeled at collection, or was the historical record itself wrong? Check the accession, the collection scan, and whether another patient drawn nearby has a mirror-image discrepancy.
5. **Report and prevent.** File the event through patient-safety reporting, and if the root cause is a collection-workflow gap (e.g., PPID being bypassed on a busy unit), that's a process fix, not just a one-off correction.

**How you'd say it in the interview.**
"That mismatch is the blood bank system doing exactly what it should — it blocked release because two ABO determinations disagree, which is the two-sample rule protecting the patient. My first move isn't to diagnose, it's to make sure no group-specific blood goes out and to treat this as a possible wrong-blood-in-tube event. I'd quarantine, require a fresh PPID redraw, and then look back to see whether it was a collection error or a bad historical record. And if the root cause is PPID getting skipped on a busy floor, the real fix is upstream in the collection workflow, not just correcting this one record."

### Scenario 2 — A new reagent lot silently biases a chemistry result

**Situation.** A tech mentions the TSH values "feel a little high" this week. QC is passing. Nothing has thrown a flag. A new reagent lot went into use four days ago.

**What you'd do (sequenced, patient-first).**
1. **Take the soft signal seriously.** "Feels high" from an experienced tech is data — a systematic shift where every individual value is still in-range is the exact failure autoverification cannot see, so I don't wait for an alarm that won't come.
2. **Contain proportionally.** I don't shut down TSH, but I do pull autoverification into a closer-review mode for that analyte while I check, so I'm not releasing a biased population at scale.
3. **Localize with the right tool.** Look at the moving-average / patient-based QC trend and do a lot-to-lot comparison against the prior lot and against split-sample or proficiency material — the drift shows up in the population, not in one result.
4. **Confirm root cause via change history.** The lot change four days ago lines up with the onset; that's the prime suspect, and calibration verification on the new lot confirms or clears it.
5. **Remediate, look back, communicate.** Recalibrate or reject the lot, decide whether any released results need a corrected-result look-back, and tell the ordering clinicians if a clinically meaningful number of results shifted.
6. **Prevent recurrence.** Tighten lot-to-lot verification at changeover and consider a patient-based QC rule that would have flagged this earlier.

**How you'd say it in the interview.**
"This is the classic blind spot of autoverification — it checks each result against limits, not against whether the whole population has drifted. So when a good tech says the TSHs feel high and QC is passing, I believe the tech, because a lot-related bias where every value is still in-range is invisible to the rules. I'd look at the moving-average trend and do a lot-to-lot comparison, line it up against the reagent-lot change as the prime suspect, and if it's real, recalibrate, decide on a look-back, and tighten lot-verification at changeover so it can't slip through again."

### Scenario 3 — An interface silently stops filing send-out results

**Situation.** An oncologist complains that a send-out molecular result they were promised "isn't in the chart," but the reference lab confirms it was reported back days ago. It turns out several esoteric send-outs from the past week are missing from the EHR.

**What you'd do (sequenced, patient-first).**
1. **Characterize the blast radius immediately.** One result or many? Which reference lab, which test codes, since when? If it's "everything from this feed since a date," it's an interface problem, not a one-off — and there may be results no one has noticed are missing.
2. **Contain by finding the stranded results.** Pull the reference-lab feed / interface queue and identify every result that came back but didn't file — the danger is the results nobody has asked about yet.
3. **Localize to the layer.** Result present at the reference lab, present in the interface engine, but not in the EHR points to a mapping or acknowledgment failure — often a new or changed result code the engine dropped or filed as unstructured text.
4. **Get results to clinicians now, fix the pipe next.** Manually deliver the identified missing results so no patient is waiting, then fix the mapping and reprocess the queue.
5. **Look back and reconcile.** Verify each stranded result now files correctly and that nothing double-files on reprocessing.
6. **Prevent recurrence.** This is the case for interface monitoring — a dashboard that alarms on queue backlog or unmapped codes would have caught it in hours instead of a week, before an oncologist had to notice.

**How you'd say it in the interview.**
"My first question is whether this is one result or a whole feed, because that changes everything. If several send-outs since a certain date are missing, that's a silent interface failure — the result came back from the reference lab but an unmapped code made it drop or file as free text. The urgent part is the results nobody has complained about yet, so I'd pull the queue, find every stranded result, get them to clinicians manually, then fix the mapping and reconcile. And I'd use it to make the case for interface monitoring, because the fact that an oncologist caught this before we did is the actual problem."

---

## How to discuss it in an interview

Short, natural, first-person snippets — how a thoughtful CP actually talks.

**On why the blood bank system is different:**
"I think of the blood bank information system as the one place I deliberately *don't* want automation making the call. Everywhere else I'm expanding autoverification; in transfusion I want hard rules — the two-sample ABO rule, the electronic crossmatch only firing when the antibody screen is negative and there's no antibody history. The whole design philosophy is 'the system should stop me if the identity isn't rock-solid,' because this is where an information error becomes an ABO-incompatible transfusion."

**On the limits of autoverification, said plainly:**
"The thing I keep front of mind is that autoverification checks a result against limits — it doesn't check whether the whole population has drifted. So a reagent-lot bias where every value is still technically in-range sails right through. That's why I still care about patient-based QC and about listening when an experienced tech says a set of results 'feels off.' The automation is fast and safe for the routine stuff, but it has a specific blind spot and I know where it is."

**On leading a fix when you don't own the people who have to do it:**
"Most of the systems fixes I care about need an LIS analyst, a bench supervisor, and sometimes an EHR team I don't manage. So I lead with the clinical stakes and a tight problem statement — 'here's the patient-safety issue, here's exactly the rule or mapping, here's the blast radius' — because that reframes it from 'the pathologist wants a change' to 'here's a prioritized safety fix with a clear scope.' I've found being the person who brings the precise diagnosis and the validation plan, not just the complaint, is what gets informatics to move."

**On micro being its own world:**
"Microbiology's relationship to the LIS is genuinely different from chemistry. It's not one number in, one number out — there's a culture workflow with states, susceptibility rules, antibiogram suppression and cascade reporting, and a stewardship layer baked into how results get shown. So when I talk about owning the clinical logic of the LIS, in micro that means owning which drugs get reported and in what order, which is really antimicrobial stewardship encoded in software."

---

## What can go wrong

Concrete missteps with the lesson attached.

### Failure 1 — Over-trusting autoverification because "QC was passing"

**The misstep.** A lab expands autoverification aggressively and treats "QC passed" as sufficient proof that released results are correct. A reagent-lot calibration shift biases an entire analyte's results upward; because each value still falls inside the reference interval and daily QC is within limits, autoverification releases a week of subtly wrong results before anyone notices. The bias only ever lived in the *population trend*, which no single-result rule was watching.

**The lesson.** Autoverification validates each result against limits; it is structurally blind to systematic drift where individual values stay in-range. Passing QC is necessary but not sufficient. Pair autoverification with patient-based QC / moving averages and a disciplined lot-to-lot verification at changeover, and take experienced techs' "this feels off" seriously as a real signal, not a nuisance. Speed at scale is exactly what makes a silent autoverification error dangerous — it releases wrong results faster than a human ever could.

### Failure 2 — Harmonizing reference ranges by copying instead of validating

**The misstep.** During a multi-site integration, a team "harmonizes" a chemistry reference range by copying Site A's interval onto Site B to make the flags match — without checking that the two sites run the assay on the same platform and method. The ranges now agree, which *looks* like success, but Site B's analyzer has a different bias, so its results are now being flagged against an interval that was never validated for its method. Clinicians see consistent-looking normals that are quietly wrong at one site.

**The lesson.** "Same normal at every site" is the goal only when the methods actually justify a common interval. A reference range is method- and instrument-specific; harmonization means *validating* whether a shared interval is defensible, documenting where it legitimately cannot be, and only then aligning — not cosmetically matching numbers to stop the flags from disagreeing. Cosmetic harmonization trades an obvious inconsistency for a hidden inaccuracy, which is worse. And whichever way it lands, clinicians have to be told before go-live.

---

## How I would improve this

Two improvement plays, each as **Problem → Change → Expected win → How I'd de-risk it.**

### Play 1 — An interface-health monitoring dashboard

**Problem.** Interfaces fail silently. Today the lab often learns that results stopped filing when a clinician complains — which means the detection latency is measured in days and the first sign is a patient-care near-miss (like the stranded send-outs above). There's no standing view of queue depth, unacknowledged messages, or unmapped result codes.

**Change.** Stand up a monitoring dashboard on the interface engine that surfaces, in near-real-time: message queue backlog by feed, unacknowledged/errored HL7 messages, and any result code arriving without a mapping (so it would file as free text). Route a threshold alert to the informatics on-call and the lab supervisor.

**Expected win.** Detection latency drops from days to hours; stranded results get caught before clinicians do. It converts a recurring silent-failure class into a monitored, bounded operational risk — and it pays off more with every new site and interface BILH integration adds.

**How I'd de-risk it.** I'd scope it as a *read-only monitor* first — it observes, it doesn't touch message flow, so it can't itself break an interface. Pilot on the one or two highest-risk feeds (reference-lab send-outs, the EHR result interface) before going broad, tune thresholds to avoid alert fatigue, and keep me as the clinical owner of *which* failures are patient-safety-relevant while informatics owns the technical build.

### Play 2 — A validated autoverification expansion with an explicit "always-hold" list

**Problem.** Techs spend a large share of their time manually verifying routine, normal chemistry and hematology results that a well-designed rule set could safely auto-release, which slows stat TAT and pulls skilled staff away from the complex cases that actually need human eyes. But an undisciplined expansion is a real safety risk.

**Change.** Expand autoverification on defined routine analytes, with the clinical logic explicitly owned by me: within validated acceptable limits, QC passing, no delta-check or instrument-interference flag — and a hard, written **always-hold** list that never auto-releases (critical values, large delta checks, interference/flag conditions, first-time results for select assays, and anything in the blood bank domain).

**Expected win.** A realistic target is lifting routine chemistry/heme auto-release meaningfully (many mature core labs sit in the roughly 60–90% auto-release range for routine work) — faster stat TAT and technologist time redirected to complex results, with the safety envelope explicitly preserved.

**How I'd de-risk it.** Validate the rule set against a curated bank of known cases (including cases that *should* be held) before go-live; run it under change control with a documented rollback plan; communicate to the bench and to clinicians; and monitor auto-release rate *and* error/exception rate after go-live so a rise in throughput isn't hiding a rise in escaped errors. The always-hold list is the safety backbone — I'd rather auto-release a bit less and keep criticals and blood bank firmly in human hands.

---

## Plain-English quartet

Four versions of each of the most jargon-heavy concepts in this chapter.

### 1. Autoverification

- **Elevator.** Autoverification is the lab's autopilot: it automatically releases clean, normal results and pulls anything unusual aside for a human to check.
- **Practical.** Autoverification is a rule set that lets routine results — inside acceptable limits, with QC passing and no delta or instrument flags — go straight to the chart without a technologist touching each one, while anything that fails the rules is held for manual review. It's one of the biggest levers for turnaround time and staffing, but because it acts at scale it's really a clinical safety system: the rules have to be validated before go-live, revalidated over time, governed under change control, and clinically owned, with a firm list of things (criticals, big delta checks, interference flags, blood bank) that always stay in human hands.
- **Interview-safe.** "I treat autoverification as a clinical safety system that happens to be automated. It's a huge efficiency win, but only if the rules are validated, criticals and interference flags always stay held, and the whole thing lives under change control with monitoring afterward."
- **Avoid-too-technical (for a non-lab listener).** "The lab has an autopilot that sends normal results straight through and flags the odd ones for a person. Like any autopilot, it's great for the routine work but you have to test it carefully and keep a human watching the exceptions."

### 2. Interface / HL7 / interface engine

- **Elevator.** An interface is the wire and the shared language that lets two systems — say the EHR and the LIS — send each other orders and results.
- **Practical.** Most lab systems talk to each other over HL7 messages routed through an interface engine that maps and transforms them. The important operational truth is that interfaces fail *silently*: a changed code, an unmapped result, or a backed-up queue can stop results flowing or file them in the wrong place without throwing an obvious error — which is why you monitor them instead of assuming they'll alarm.
- **Interview-safe.** "My mental model for interfaces is that they fail quietly — a mapping change or an unrecognized result code can stop results flowing without an alarm. So I never treat them as set-and-forget; I care about interface monitoring, especially as we add sites and connections."
- **Avoid-too-technical (for a non-lab listener).** "The systems pass information back and forth automatically. When that hand-off breaks it usually breaks silently — nothing beeps — so results just quietly stop arriving until someone notices. That's why we watch those connections instead of waiting for an alert."

### 3. Reference interval (reference range) harmonization

- **Elevator.** A reference range is the "normal" band that makes a lab number meaningful, and harmonization is making that "normal" consistent across sites — but only where the science actually allows it.
- **Practical.** Reference ranges are method- and instrument-specific: a range validated on one analyzer doesn't automatically transfer to another, and pediatric, adult, and pregnancy ranges differ. When you integrate multiple sites, the danger is "same test, different normal at different sites," which confuses clinicians. Harmonization means validating where a common range is defensible, documenting where it legitimately can't be, aligning the codes and units so downstream systems agree — and telling clinicians before anything changes. Cosmetically matching numbers to stop the flags disagreeing is the trap: it hides an inaccuracy instead of fixing an inconsistency.
- **Interview-safe.** "Reference ranges have to be method- and population-specific, so when we integrate sites the real work is validating where a shared normal is defensible, documenting where it can't be, and communicating the change to clinicians before go-live — not just copying one site's numbers onto another to make the flags match."
- **Avoid-too-technical (for a non-lab listener).** "What counts as a 'normal' result depends on the specific machine and the patient's age and sex. When we merge labs, we want a patient to get the same 'normal' wherever they're tested — but we have to prove that's actually valid for each machine first, not just paste the same numbers everywhere."

### 4. Total testing process (preanalytic / analytic / postanalytic)

- **Elevator.** Every test is a three-leg relay — get the sample (preanalytic), measure it (analytic), report it (postanalytic) — and most mistakes happen in the first and last legs, not the measurement.
- **Practical.** The total testing process is the map good lab people use to locate errors. Preanalytic is everything before the analyzer — ordering, collection, labeling, transport — and it's where most errors live. Analytic is the measurement, which is actually the most reliable step. Postanalytic is verification, flagging, and getting the result to the right clinician. The value of the map is that it stops you fixing the wrong thing: a slow turnaround is usually an accessioning bottleneck, not a slow analyzer.
- **Interview-safe.** "I use the total testing process as my default map. When something's late or wrong my first question is *which phase*, because most errors are preanalytic or postanalytic — collection, labeling, verification, routing — not the analyzer. That keeps me from fixing the wrong thing and keeps the fix cheap."
- **Avoid-too-technical (for a non-lab listener).** "A lab test has three stages: collecting the sample, measuring it, and reporting the answer. The machine part is reliable — most errors are in collecting the sample or getting the answer to the right doctor. So when something goes wrong we look at the beginning and end first."

---

## Rapid recall

### Top 5 points

1. **Autoverification is a clinical safety system, not just an efficiency tool** — it validates each result against limits but is blind to population drift, so it needs validation, change control, patient-based QC alongside it, and a firm always-hold list.
2. **Interfaces fail silently** — a changed or unmapped code can strand results (send-outs, EHR filing) with no alarm; the answer is monitoring, and the win scales with every site BILH adds.
3. **The blood bank system is deliberately un-automated at the identity gate** — two-sample ABO, electronic crossmatch only on a clean antibody screen; this is the one place hard rules beat automation because the failure mode is ABO-incompatible transfusion.
4. **Reference-range harmonization means validating, not copying** — cosmetic matching to make flags agree hides an inaccuracy; validate where a shared range is defensible, document where it can't be, and tell clinicians before go-live.
5. **Troubleshoot with a method and suspect the recent change** — characterize, contain (patient-first), localize by phase and layer, use the change log, fix/validate, look back, prevent recurrence.

### If you only remember three things

1. **Autoverification is safe automation only with a validated always-hold list** (criticals, big deltas, interference flags, blood bank) and monitoring — and it can't see a lot-related drift where every value is still in-range.
2. **Interfaces break quietly; monitoring is the fix** — the fact that a clinician noticed missing results before the lab did is itself the problem.
3. **Owning the clinical validity of LIS content is the CP's irreplaceable job** — reference ranges, critical values, reflex/susceptibility logic, what may not autofile — while informatics owns the build.

### Most likely to be asked

- "What is autoverification, and what would you *always* exclude from it?"
- "How does an HL7 interface break, and how would you know?"
- "Walk me through troubleshooting a result a clinician says looks wrong."
- "How would you harmonize reference ranges across integrating sites — and where can't you?"
- "Why is the blood bank / transfusion side handled differently in the LIS?"
- "Where do most lab errors occur, and how does the LIS fit into the total testing process?"

### Most impressive to mention

- **The autoverification blind spot for population drift** — that it checks a result against limits, not the population against its own trend, so a reagent-lot bias with all-in-range values escapes; hence patient-based QC / moving averages. (Signals real depth.)
- **The two-sample ABO rule and electronic crossmatch logic** as a deliberate *design choice* to keep automation out of the identity gate. (Shows transfusion-safety maturity.)
- **The unmapped send-out result code that files as free text** — uncoded, un-LOINC'd, invisible to flowsheets — as the concrete face of silent interface failure. (Very specific, very real.)
- **"Cosmetic harmonization is worse than the inconsistency it hides"** — validating vs. copying a reference interval across platforms. (Shows you understand integration, the BILH need, at the right depth.)
- **Leadership without title authority** — leading with the clinical stakes, a tight problem statement, and a validation plan to get an informatics/EHR team you don't manage to prioritize a safety fix. (Directly answers "how will you operate here from day one?")
