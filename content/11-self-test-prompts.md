# Self-Test Prompts

This section is your active-recall engine. Reading the core chapters builds recognition; these prompts build *retrieval* — the thing you actually need under the pressure of a live phone screen. Use them the way a resident uses board questions: cover the answer, say your response out loud, then compare.

**How to use this file well:**

- **Talk, don't type.** This is a phone interview. Answer aloud, in full sentences, at conversational pace. If you can only answer in your head, you can't answer on the phone.
- **Time yourself loosely.** Flashcards should be a 20–40 second spoken answer. Mini oral-exam prompts should be 60–120 seconds. If you run past two minutes, you're lecturing, not conversing.
- **Chase the "why it matters."** Almost every good answer to a Lahey/BILH question loops back to one of five anchors: patient care, lab quality, operational reliability, communication, and systems thinking. If your answer doesn't touch at least one, tighten it.
- **Label your inferences.** Where an answer depends on assumptions about Lahey/BILH specifically, say "my role-based interpretation would be…" — that phrasing is honest and it's exactly how a thoughtful CP talks.
- **Study buddy note (Tala):** the "what a good answer hits" bullets double as a grading rubric. Quiz each other and score against those bullets rather than against a memorized script.

The five sets, in order:

1. **Flashcard Prompts** — fast Q/A recall (25 pairs)
2. **Mini Oral Exam Prompts** — examiner-style open questions with grading notes (12)
3. **"Explain It Simply" Prompts** — practice translating for non-lab audiences (12)
4. **"Give a Management Example" Prompts** — operational storytelling (12)
5. **"Turn Theory Into Practice" Prompts** — bridge canonical concept to concrete action (12)

---

## Set 1 — Flashcard Prompts

*Fast recall. Cover the answer, say it aloud, then check. Each answer is deliberately one to three lines — enough to be correct and quotable, short enough to memorize.*

**Q1. What are the four canonical groupings of pathology informatics knowledge?**
A. Information fundamentals (data, coding, representation); information systems (LIS/EHR/middleware/instruments); workflow and process (how work moves through the lab); and governance and management (people, policy, oversight, projects). Everything in the field slots into one of these four.

**Q2. What is PIER, and why does it exist?**
A. Pathology Informatics Essentials for Residents — a consensus curriculum defining the informatics competencies every pathology trainee should have. It exists so informatics is treated as a core clinical skill, not an optional extra, and it gives you shared vocabulary with any US-trained pathologist.

**Q3. What does LOINC standardize, and what does it *not*?**
A. LOINC standardizes the *identity of the observation* — the question the test asks (e.g., "serum potassium, mass concentration"). It does not standardize the *answer/result value*; that's SNOMED CT's job for coded results, and UCUM's job for units.

**Q4. What does SNOMED CT standardize in the lab?**
A. Clinical *meaning* — diagnoses, findings, specimen types, organisms, and coded result values (e.g., "Staphylococcus aureus," "specimen: cerebrospinal fluid"). It's the "what does this mean clinically" vocabulary, complementary to LOINC's "what was measured."

**Q5. What is UCUM and why should a CP care?**
A. Unified Code for Units of Measure — a standard, machine-parseable way to represent units (mg/dL, mmol/L, 10*9/L). CPs care because a numerically correct result attached to the wrong or ambiguous unit is a patient-safety event, especially across interfaced systems.

**Q6. In one sentence, what does HL7 do?**
A. HL7 is the messaging framework that lets lab systems, the EHR, instruments, and middleware exchange orders and results in a shared structure — the "grammar" that moves data between systems.

**Q7. HL7 v2 vs. FHIR — the practical difference?**
A. HL7 v2 is the entrenched, pipe-delimited messaging standard that runs most existing lab interfaces (ORM orders, ORU results). FHIR is the modern, web/API-based standard using discrete resources — better for apps, dashboards, and modern integrations. Most real labs run v2 today and adopt FHIR incrementally.

**Q8. What is middleware in the lab, and give one thing it does?**
A. Software that sits between analyzers and the LIS. It can autoverify results against rules, manage instrument QC, handle reflex logic, and buffer/route data — offloading decision logic from both the instrument and the LIS.

**Q9. Define autoverification in one line.**
A. Rules-based automatic release of results that meet all predefined acceptance criteria (within range, QC passing, no delta flag, no interference flags) without human review — freeing techs to focus on the exceptions.

**Q10. What is a delta check?**
A. A rule that flags a result differing from the patient's prior result by more than a set threshold, prompting review for possible specimen mislabeling, mix-up, or a real clinical change.

**Q11. What's the difference between analytic and post-analytic error, with an example of each?**
A. Analytic error happens during measurement (a miscalibrated analyzer). Post-analytic error happens after — in reporting, transmission, or interpretation (a correct result mapped to the wrong LOINC code or transcribed to the wrong patient). Most modern lab errors are pre- and post-analytic, not analytic.

**Q12. Name the three phases of total testing process where most errors occur.**
A. Pre-analytic (ordering, collection, labeling, transport) and post-analytic (reporting, interpretation, action) dominate; the analytic phase is now the most controlled. The lion's share of patient-facing error lives outside the instrument.

**Q13. What is POCT and what's the core informatics challenge with it?**
A. Point-of-care testing — testing at or near the patient (glucose meters, blood gas, iSTAT). The core informatics challenge is connectivity and data capture: getting device results into the LIS/EHR with operator ID, QC status, and patient ID intact, under lab oversight.

**Q14. What regulatory bodies govern a US clinical lab like Lahey's?**
A. CLIA (federal baseline), CAP (accreditation via deemed status), and often The Joint Commission at the hospital level; the FDA governs test/device clearance; state health departments add their own requirements. CAP inspection is the day-to-day operational reality.

**Q15. What's the difference between validation and verification?**
A. Validation establishes performance for a test you're developing or modifying (an LDT), proving it does what you claim. Verification confirms that an FDA-cleared test performs as the manufacturer states in *your* hands and setting. Both must be documented before patient reporting.

**Q16. What are the classic analytic performance characteristics you establish before going live?**
A. Accuracy, precision, analytic sensitivity (limit of detection), analytic specificity/interferences, reportable range (linearity), and the reference interval — plus carryover and stability where relevant.

**Q17. What is a reference interval and why can't you just borrow one?**
A. The range of results expected in a defined healthy population. You can't blindly borrow it because it depends on your method, instrument, and local population; at minimum you verify transferability before adopting a published interval.

**Q18. In digital pathology, what is a whole slide image (WSI)?**
A. A high-resolution digital scan of an entire glass slide, viewable and navigable like a virtual microscope — the foundational data object for digital pathology, remote sign-out, and image analysis/AI.

**Q19. What's the headline requirement from the CAP guideline on WSI validation for diagnosis?**
A. Validate the whole digital workflow (scanner, software, displays) for its intended clinical use, using a sample of at least 60 cases, comparing digital to glass-slide diagnosis with a washout period between reads, and revalidate when you materially change the system.

**Q20. What is an interface "mapping," and why is it a patient-safety artifact?**
A. The lookup that ties one system's codes to another's — e.g., an analyzer's internal test code to the LIS test to the correct LOINC and result units. A wrong mapping silently sends correct numbers to the wrong test or unit, so mappings are validated, documented, and change-controlled like any patient-safety control.

**Q21. Define turnaround time (TAT) and name the two variants that matter operationally.**
A. TAT is the elapsed time across a defined span of the testing process. The two that matter: *therapeutic* (collection-to-result, what clinicians feel) and *laboratory/analytic* (receipt-to-result, what the lab controls). Confusing them is how labs "hit target" while clinicians still complain.

**Q22. What is a critical (panic) value and what's the informatics wrinkle?**
A. A result so far outside range it signals immediate patient risk and requires read-back notification to a caregiver. The informatics wrinkle: reliable flagging, routing, documentation of the call, and closed-loop confirmation — increasingly automated but always auditable.

**Q23. What is the LIS-to-EHR relationship in a hospital like Lahey?**
A. The LIS is the lab's system of record for specimens, testing, and QC; the EHR is the clinician-facing system of record. Orders flow EHR→LIS, results flow LIS→EHR, and the interface between them is a top source of both efficiency and error.

**Q24. What is a "reflex test" and where does the logic usually live?**
A. A follow-on test triggered automatically by an initial result (e.g., positive hepatitis screen reflexing to confirmation). The logic can live in the LIS or middleware, and it must be defined, validated, and visible so clinicians and auditors understand what was auto-ordered and why.

**Q25. What does "closing the loop" mean in lab quality, in one line?**
A. Making sure a result doesn't just get produced but actually reaches the right person, is acknowledged, and drives action — the difference between "we reported it" and "the patient was cared for."

---

## Set 2 — Mini Oral Exam Prompts

*Open prompts posed the way a lab director or interviewer would pose them on a phone screen. Answer aloud for 60–120 seconds. The "what a good answer hits" note is your rubric — hit most of those points and you've given a strong answer.*

**O1. "Walk me through how you'd think about improving turnaround time in the core chemistry lab."**
*What a good answer hits:* Defines TAT precisely (which span, therapeutic vs. analytic) before optimizing; measures before acting; maps the whole path — order, collection, transport, receipt, load, analyze, verify, report; distinguishes pre-analytic bottlenecks (often the biggest) from analytic; names concrete levers (autoverification rules, staggered STAT lanes, middleware auto-release, collection scheduling); ties it back to clinician experience and patient care, not just a dashboard number; mentions monitoring the change so you don't trade TAT for error.

**O2. "You're told a new analyzer is being brought online. What has to happen before it reports a patient result?"**
*What a good answer hits:* Method verification (accuracy, precision, reportable range, reference-interval transfer, carryover); interface build and mapping validation (test codes, units/UCUM, LOINC, result flags) with test messages checked end-to-end into the EHR; QC setup and acceptable ranges; autoverification rules defined and tested; staff training and competency; documentation for CAP/CLIA; a go-live plan with a rollback. Bonus: parallel testing and sign-off before old method retires.

**O3. "Tell me how you'd approach standardizing testing across two hospital labs that are being integrated."**
*What a good answer hits:* Frames it as harmonization, not just "pick one system"; inventories both test menus, methods, reference intervals, units, and codes; identifies where methods differ enough that a single reference interval isn't safe; standardizes LOINC/SNOMED/UCUM mapping and result comparability; addresses the human/governance layer — shared SOPs, harmonized critical values, unified QC; sequences it in phases with risk assessment; explicitly flags patient-safety risk of same-name-different-meaning tests. This maps directly to the stated BILH integration need — good place to say "role-based interpretation."

**O4. "A clinician calls to say a potassium result 'must be wrong.' Walk me through your reasoning."**
*What a good answer hits:* Doesn't dismiss or blindly defend; thinks across the total testing process — pre-analytic (hemolysis, wrong tube, delay, IV contamination), analytic (QC status, delta check, instrument flag), post-analytic (right patient? right units? interface mapping?); checks the actual specimen and prior results; communicates clearly and closes the loop with the clinician; treats it as a possible signal of a systemic issue, not a one-off. Shows clinical grounding plus systems thinking.

**O5. "How do you think about the relationship between the LIS and the EHR?"**
*What a good answer hits:* LIS = lab's system of record; EHR = clinician-facing; orders down, results up; the interface is both the efficiency engine and the top error source; mappings and units must be validated and change-controlled; governance is shared, not siloed; the CP is accountable for what the clinician actually sees, even though the EHR isn't "the lab's system." Systems thinking and ownership are the signal here.

**O6. "Describe how you'd set up autoverification responsibly."**
*What a good answer hits:* Autoverification is rules releasing normal, low-risk results so humans focus on exceptions; the rules must encode QC status, analytic range, delta checks, interference/flag logic, and reasonable value limits; you validate the rule set against real data before trusting it; you monitor the auto-release rate and audit released results; you keep a clear boundary for what always requires human eyes (criticals, new patients, certain assays). Emphasize that it's a safety system, not just a throughput trick.

**O7. "What makes a lab dashboard actually useful versus just decorative?"**
*What a good answer hits:* Tied to decisions and accountable owners, not vanity metrics; correct denominators and definitions (which TAT?); shows trend and variation, not just a single number; surfaces exceptions and drives action; data is trustworthy and defined once; avoids overload — a few metrics that change behavior beat twenty that don't. Connect to operational reliability and management, and note that a dashboard nobody acts on is waste.

**O8. "How would you validate a whole slide imaging system for primary diagnosis?"**
*What a good answer hits:* Validate the entire workflow (scanner, software, monitors) for the intended use; follow CAP guidance — sample of at least 60 cases spanning relevant specimen types, intra-observer glass-vs-digital comparison with a washout period, concordance assessed; document scanning failures and edge cases; revalidate on material system change; address display/ergonomics and pathologist training. Bonus: mention this is about *diagnostic equivalence*, and that AI/image-analysis tools bring their own separate validation.

**O9. "A test result went to the wrong patient's chart. How do you respond, and how do you prevent recurrence?"**
*What a good answer hits:* Immediate patient-safety response first (correct the record, notify the care team, assess harm, document); then root-cause across the process — was it specimen labeling, an accessioning error, an interface/mapping defect, a manual entry? Distinguish a one-off human slip from a systemic interface problem; corrective action proportional to cause (retraining vs. re-engineering a workflow vs. fixing a mapping); follow reporting/quality-event processes; verify the fix. Just-culture framing lands well.

**O10. "Where does clinical informatics add the most value in a broad CP role like this one?"**
*What a good answer hits:* Framed practically, not abstractly: reducing pre/post-analytic error, making results correct and actionable in the EHR, enabling autoverification and sensible reflexes, supporting POCT oversight, standardizing data for analytics and integration across a growing system, and translating between lab operations and IT. Ties informatics to patient care and reliability rather than technology for its own sake. Perfect place to connect to BILH's stated core-lab-management and informatics needs.

**O11. "How do you keep point-of-care testing under proper laboratory control when the testing happens away from the lab?"**
*What a good answer hits:* POCT is still the lab's regulatory responsibility; you need operator certification/competency, lockout for expired training or failed QC, device connectivity to capture results with patient and operator ID, QC compliance monitoring, and a POCT coordinator/committee structure. Emphasize the tension — clinical convenience vs. lab-grade quality — and how connectivity/middleware is what makes oversight scalable. Directly relevant to a broad CP role.

**O12. "Tell me how you'd approach a project you don't fully understand yet — say, a request to add a new send-out test with a complex reflex algorithm."**
*What a good answer hits:* Starts with clarifying the clinical need and who's asking; researches existing approaches rather than reinventing; defines the workflow end-to-end (order, specimen, reflex logic, where it runs, how it results, billing); identifies stakeholders — clinicians, IT, reference lab, billing, techs; plans validation and interface mapping; sequences with a pilot and monitoring. Shows humility, structure, and collaboration — exactly the "hireable" signal. Naming the four groupings or a simple project framework here is a plus.

---

## Set 3 — "Explain It Simply" Prompts

*Practice translating lab/informatics concepts for a non-lab audience — a nurse, an administrator, a new resident, an IT analyst. On a phone screen, the ability to explain simply signals mastery and collaboration. Say each aloud in plain language, no jargon, in about 30–60 seconds. A model plain-language version follows each prompt to calibrate — don't memorize it, just match its altitude.*

**S1. Explain LOINC to a hospital IT analyst who has never worked with lab data.**
*Model:* "Every lab has its own local name and code for a test. LOINC is a universal dictionary that says, 'no matter what you call it locally, *this* is a serum potassium.' It lets two different systems agree on what test we're actually talking about, so a result from our lab means the same thing when it lands in another hospital's chart."

**S2. Explain autoverification to a nurse who's worried a computer is 'reading' results.**
*Model:* "The computer isn't interpreting anything creatively. We give it strict rules — the quality control passed, the value is in a safe range, it's not wildly different from the patient's last result. If every rule checks out, it releases the routine result so our techs can spend their attention on the abnormal ones that actually need a human. Anything unusual still stops for a person."

**S3. Explain to an administrator why the interface between the lab system and the EHR matters so much.**
*Model:* "Think of it as the pipe connecting the lab to the chart the doctor reads. When the pipe works, results flow instantly and correctly. But if one connection is mislabeled, the right number can show up under the wrong test — and nobody sees it's wrong. So a lot of our safety work is invisible plumbing: making sure every result lands where it should, labeled correctly."

**S4. Explain turnaround time to a clinician who thinks the lab is 'slow.'**
*Model:* "There are actually two clocks. The one you feel starts when the blood is drawn and ends when you see the result. The one I control starts when the specimen reaches the lab. A lot of delay lives before we ever touch it — collection, transport, labeling. So when we work on speed, we look at the whole journey, not just the part inside the lab, because that's usually where the real time goes."

**S5. Explain a critical value and read-back to a new resident.**
*Model:* "Some results are dangerous enough that we can't just post them and hope someone looks. Those are critical values. We call a caregiver directly, and they read the value back to us so we know it was heard correctly and not mis-scribbled. It's the same 'read it back to me' discipline pilots use — because the cost of a missed one is a patient."

**S6. Explain the difference between validation and verification to a non-lab manager.**
*Model:* "If we build or modify a test ourselves, we have to *validate* it — prove from scratch that it does what we claim. If we buy an FDA-cleared test, we *verify* it — confirm the manufacturer's numbers actually hold up in our hands, with our machine and our patients. Both end in documentation before we report a single patient result. One is 'prove it works,' the other is 'confirm it works here.'"

**S7. Explain what middleware does to someone who only knows the LIS.**
*Model:* "Middleware is a smart layer that sits between the analyzers and the main lab system. It's where a lot of the decision-making lives — checking quality control, auto-releasing normal results, triggering follow-up tests. It lets us put the rules in one flexible place instead of hard-coding them into every instrument or the LIS."

**S8. Explain why units of measure are a safety issue, to an EHR build team.**
*Model:* "A number without the right unit is a trap. Potassium of 4 means healthy in one unit and could mean something very different if the unit's wrong or missing. When results move between systems, we have to guarantee the unit travels correctly and unambiguously with the number — otherwise a correct measurement becomes a wrong result the moment it changes systems."

**S9. Explain digital pathology / whole slide imaging to a hospital executive.**
*Model:* "We're scanning glass slides into high-resolution digital images that a pathologist can navigate on a screen like a virtual microscope. It lets us read cases remotely, get second opinions instantly across sites, and eventually apply image-analysis tools. But before any of that touches patient diagnosis, we validate that reading the screen is as reliable as reading the glass."

**S10. Explain point-of-care testing oversight to a nurse manager on a busy unit.**
*Model:* "When your team runs a glucose or a blood gas at the bedside, that's still a lab test under our license — so the same standards apply. That's why there's operator training, quality-control checks, and device lockouts if something lapses. It's not bureaucracy for its own sake; it's making sure a bedside result is as trustworthy as one from the main lab."

**S11. Explain a delta check to a phlebotomy team.**
*Model:* "The system remembers each patient's last result. If today's is wildly different from yesterday's with no reason, it raises a flag. Often that flag is catching something upstream — a mislabeled tube, two patients' specimens swapped. So a delta check is quietly one of our best defenses against a labeling mix-up, and that starts with you at the draw."

**S12. Explain, to a fellow physician, why you care about informatics as a pathologist.**
*Model:* "Most modern lab errors don't happen inside the analyzer — that part is tightly controlled. They happen in ordering, labeling, and reporting: the data plumbing. Informatics is how I make sure the right test is ordered, the result is correct, and it reaches you in a form you can act on. It's not a hobby separate from clinical work — it *is* how the lab keeps patients safe at scale."

---

## Set 4 — "Give a Management Example" Prompts

*These push you from concept to operational story. On a phone screen, "give me an example" is where candidates either shine or go vague. For each, aim for a concrete, structured mini-narrative: the situation, what you'd do, and why — grounded in real lab operations. Where you don't have a Lahey-specific fact, say "in a lab I'd expect to be structured like this…" or "my approach would be…" A sample answer skeleton follows each to model the shape, not to be recited.*

**M1. Give a management example of handling a recurring QC failure on a chemistry analyzer.**
*Sample shape:* "I'd first separate a QC signal from a QC noise — is it one analyte drifting or the whole panel? I'd check reagent lot, calibration, and maintenance logs, hold affected patient results, and run parallel confirmation if needed. Then I'd look for the pattern: is it a lot change, an environmental issue, a training gap? The fix is proportional to root cause — recalibrate, swap reagent lot, or retrain — and I'd document it and monitor to confirm the trend actually resolves. The management piece is not just fixing today's run, it's preventing the next one."

**M2. Give a management example of prioritizing when three departments want informatics help at once.**
*Sample shape:* "I'd triage by patient-safety and operational impact first — a broken result interface beats a nice-to-have dashboard every time. I'd make the criteria explicit so it's not personality-driven: risk, patient impact, effort, and dependency. I'd communicate the reasoning back to each requester so even the ones waiting understand why, and I'd look for quick wins that unblock others. Transparent prioritization keeps trust intact even when I can't say yes to everyone at once."

**M3. Give a management example of onboarding a new send-out test.**
*Sample shape:* "I'd start with the clinical need and volume, confirm the reference lab's method and performance, and map the full workflow: order code, specimen requirements, transport, result return, interpretation, and billing. I'd build and validate the interface mapping — right code, right units, right LOINC — and test it end-to-end before go-live. I'd loop in the ordering clinicians and techs, and monitor the first weeks for mislabeled orders or mapping surprises. The management skill is coordinating clinicians, IT, the reference lab, and billing so nothing falls between the seams."

**M4. Give a management example of improving specimen labeling / reducing pre-analytic errors.**
*Sample shape:* "I'd measure first — what's the actual mislabel and reject rate, and where does it cluster? Often it's a few units or a shift. I'd address the highest-yield cause: barcode scanning at the bedside, positive patient ID at draw, or reject-and-recollect discipline rather than 'fixing' labels. I'd pair the process change with education and feedback data to the units, and track the rate afterward. Pre-analytic error is where most lab harm hides, so this is high-value management work, not housekeeping."

**M5. Give a management example of managing a lab through an LIS upgrade or migration.**
*Sample shape:* "I'd treat it as a project with phases and a rollback plan, not a flip of a switch. Inventory current test builds, interfaces, and rules; validate that they carry over correctly, especially mappings and reference intervals; plan parallel operation and a clear cutover; train staff and prepare a command-center for go-live issues. I'd protect patient safety by defining what 'not safe to go live' looks like in advance. The management value is calm sequencing and communication so the lab never loses the ability to report safely."

**M6. Give a management example of standardizing critical value policies across two labs.**
*Sample shape:* "First I'd compare both labs' critical-value lists, thresholds, and notification workflows — differences are common and dangerous. I'd convene the stakeholders (both medical directors, clinical leaders) to agree on a harmonized list grounded in evidence and local practice, then align the notification and documentation process. I'd validate that both LIS builds flag and route consistently, and educate staff before go-live. The point is one patient shouldn't get a call at one site and silence at another for the same value."

**M7. Give a management example of a POCT compliance problem — say, uncontrolled glucometer use.**
*Sample shape:* "I'd quantify it: how many operators are uncertified, how many QC lapses, which units? Then I'd use the tools the system gives me — connectivity to capture every result, operator lockout for lapsed training or failed QC, and a POCT committee to own the policy. I'd frame it to the units not as policing but as making bedside results as trustworthy as the main lab's. Then monitor compliance as a metric. It's a governance problem as much as a technical one."

**M8. Give a management example of responding to a CAP inspection finding.**
*Sample shape:* "I'd take the finding at face value, avoid defensiveness, and treat it as a gift that surfaces a real gap. I'd do a genuine root-cause analysis rather than a paper fix, put a corrective action in place that addresses the cause, document it, and — importantly — check whether the same gap exists elsewhere in the lab. Then verify the fix holds. Inspectors respond to labs that fix the disease, not the symptom."

**M9. Give a management example of introducing autoverification into a lab that has always verified manually.**
*Sample shape:* "I'd frame it as freeing techs for the exceptions, not replacing them, to get buy-in early. I'd build conservative rules first, validate them against historical data to see what would and wouldn't have released, and start with low-risk, high-volume assays. I'd monitor the auto-release rate and audit released results, widening scope only as trust builds. Change management matters as much as rule logic — techs need to trust the rules before they'll rely on them."

**M10. Give a management example of handling a persistent staffing/throughput mismatch on evening shift.**
*Sample shape:* "I'd look at where the demand and the delay actually are — is it volume, a bottleneck instrument, or a workflow step? Data before assumptions. Then I'd match levers to cause: staggering staff to the true demand curve, autoverification to reduce manual review load, or rebalancing STAT vs. routine lanes. I'd involve the techs who live it, because they usually know the real bottleneck. And I'd measure TAT and error before and after so I know I improved flow without buying speed with mistakes."

**M11. Give a management example of coordinating with IT/EHR teams on a result-display problem.**
*Sample shape:* "Say a result is technically correct in the LIS but displays confusingly in the EHR — wrong grouping, missing reference interval, or a truncated comment. I'd reproduce it, isolate whether it's a mapping, a build, or a display issue, and speak IT's language while owning the clinical risk. I'd partner rather than throw it over the wall — the lab knows what's clinically wrong, IT knows how the display is built. Fix, validate end-to-end into the chart, and confirm with the clinician who reported it."

**M12. Give a management example of leading change when staff resist a new workflow.**
*Sample shape:* "I'd start by understanding the resistance — usually it's rational: fear of extra work, a past bad rollout, or a genuine flaw they see that I don't. I'd involve them early, pilot small, show the data, and adjust based on their input so it's a shared solution, not an edict. I'd name the 'what's in it for them' honestly. Change sticks when the people doing the work help shape it — imposing it top-down is how good ideas die on the floor."

---

## Set 5 — "Turn Theory Into Practice" Prompts

*These are the highest-value prompts for this role. They take a canonical concept and force you to land it in a concrete, operational action — the exact move that makes you sound "practical, not abstract." For each, state the concept briefly, then pivot fast to what you'd actually do. A sample bridge follows each to model the concept→action move.*

**P1. Turn "the four groupings of informatics" into a practical way you'd scope a new project.**
*Sample bridge:* "The four groupings aren't just a taxonomy — they're a checklist I'd run any project through. Take adding a new molecular test: information fundamentals (what codes, units, LOINC?), information systems (which LIS build, interface, middleware?), workflow and process (how does the specimen and reflex logic actually move?), and governance (who signs off, who's trained, how's it validated?). If I can answer all four, I've scoped it; if a groove is empty, that's where the project will break."

**P2. Turn "most errors are pre- and post-analytic" into a concrete quality priority.**
*Sample bridge:* "Since the analyzer is the most controlled step, I wouldn't pour my quality energy there. I'd put barcode positive-patient-ID at the draw and validated interface mappings at the top of the list, because that's where real patient harm hides. Concretely: I'd audit our specimen reject and mislabel rate and our result-mapping integrity before I'd worry about squeezing another second out of instrument time."

**P3. Turn "LOINC/SNOMED/UCUM standardization" into a concrete integration step for BILH growth.**
*Sample bridge:* "As BILH grows and labs integrate, the theory 'use standard vocabularies' becomes a very concrete task: build and reconcile a shared test dictionary so 'potassium' means the same measurable, same units, same code at every site. Practically, I'd inventory each lab's local codes, map them to LOINC with UCUM units and SNOMED result values, and flag any same-name-different-method tests that can't safely share a reference interval. That mapping *is* the integration work — my role-based interpretation of exactly what this job's 'integration' need means."

**P4. Turn "validation logic" into what you'd actually check before saying yes to a digital pathology rollout.**
*Sample bridge:* "The theory says validate for intended use. In practice, before I'd sign off on WSI for primary diagnosis, I'd want to see: at least 60 cases across the specimen types we sign out, glass-versus-digital concordance with a washout period, documented scanning-failure handling, calibrated diagnostic monitors, and a revalidation trigger for system changes. If someone hands me a scanner and says 'it's validated,' my practical response is 'show me the concordance study and the intended-use statement.'"

**P5. Turn "autoverification is rules-based" into the actual first rule set you'd write.**
*Sample bridge:* "Rules-based is abstract until you write the rules. My starting set for a routine chemistry: release only if QC is in-control for that run, the result is within the analytic measuring range, there's no instrument error/interference flag, the delta check passes against the prior, and the value isn't near a critical threshold. Everything else stops for a human. Then I'd validate that set against a few weeks of historical data to see exactly what it would and wouldn't have released before trusting it live."

**P6. Turn "the LIS-EHR interface is a top error source" into a concrete monitoring practice.**
*Sample bridge:* "Instead of trusting the interface silently, I'd make it observable. Concretely: a periodic reconciliation that samples results in the LIS and confirms they display correctly — right test, units, reference interval — in the EHR; change-control so no mapping changes without validation; and a fast-path for clinicians to report display problems. Theory: interfaces fail quietly. Practice: build a way to hear the quiet failures before a patient does."

**P7. Turn "TAT has two clocks" into a concrete conversation with a frustrated ED.**
*Sample bridge:* "The theory that therapeutic and analytic TAT differ becomes useful in a real conversation. I'd bring the ED the data split into segments — draw-to-receipt, receipt-to-result — and show them where the time actually is. Often it's transport or collection, not the lab bench. Then we jointly fix the real bottleneck instead of the lab defensively 'proving' it's fast. Turning that theory into a shared, data-grounded conversation is how you convert a complaint into a partnership."

**P8. Turn "just culture" into how you'd actually handle a tech's labeling error.**
*Sample bridge:* "Just culture says distinguish human error from reckless behavior. In practice, if a good tech mislabels once under a chaotic workload, I coach and I fix the *system* that let it happen — better scanning, better staffing at the crunch. If someone deliberately bypasses ID checks repeatedly, that's a different conversation. The concrete move is asking 'would another competent person have made the same slip here?' — if yes, I fix the process, not the person."

**P9. Turn "middleware centralizes decision logic" into a concrete reason to use it for reflex testing.**
*Sample bridge:* "The theory is that middleware is a flexible place for rules. The practical payoff: instead of hard-coding a hepatitis reflex into an instrument or wrestling the LIS, I put the reflex logic in middleware where it's visible, editable, and auditable. When the clinical algorithm changes, I update one transparent rule rather than reprogramming an analyzer. That's the concrete case for middleware — maintainability and auditability of the logic clinicians depend on."

**P10. Turn "dashboards must drive decisions" into a single metric you'd put in front of leadership and why.**
*Sample bridge:* "Rather than a wall of metrics, I'd put up something like STAT TAT reliability — the percentage of STAT results meeting target — with its trend and its exceptions, owned by a named person. It's abstract to say 'dashboards should drive action'; it's concrete to pick one number that, when it slips, triggers a specific review and a specific owner. A metric with an owner and a trigger is a management tool; a metric without them is wallpaper."

**P11. Turn "POCT is still under lab license" into a concrete oversight mechanism you'd stand up.**
*Sample bridge:* "The principle is that bedside testing is still my regulatory responsibility. The practical mechanism: connected devices that won't run for an uncertified operator or after a failed QC, automatic capture of every result with operator and patient ID into the LIS, and a POCT coordinator who reviews compliance monthly. Theory: 'the lab is accountable for POCT.' Practice: build the lockouts and the connectivity so accountability is enforced automatically, not by good intentions."

**P12. Turn "systems integration for BILH growth" into the first 90-day priority you'd propose.**
*Sample bridge:* "As a role-based interpretation, if BILH growth means integrating more hospital labs, my first practical priority wouldn't be a flashy new system — it would be harmonizing the data foundation: a reconciled test dictionary, consistent units and codes, and comparable reference intervals across sites, so a result means the same thing everywhere. That unglamorous groundwork is what makes every downstream integration — shared analytics, cross-site sign-out, unified reporting — actually safe. I'd start where the patient-safety risk of *not* standardizing is highest."

---

## Quick Self-Scoring Rubric

After each practice block, score yourself honestly against these five signals. A strong phone-screen answer usually hits at least three:

| Signal | You hit it if your answer… |
|---|---|
| **Clinically grounded** | connected back to a patient, a specimen, or a real clinical consequence |
| **Operationally aware** | named a concrete workflow step, metric, or lab reality — not just theory |
| **Management-capable** | showed a structured, prioritized, communicated approach to people and process |
| **Informatics-literate** | used the right framework/standard (LOINC, HL7, autoverification, validation) correctly and *plainly* |
| **Collaborative / hireable** | involved stakeholders, showed humility, and sounded like someone people want to work with |

**One last habit:** whenever you finish an answer and it felt abstract, force yourself to add one sentence starting with *"Concretely, I'd…"*. That single reflex is the difference between sounding like a textbook and sounding like the pathologist Lahey/BILH wants to hire.
