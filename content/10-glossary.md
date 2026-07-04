# Glossary

A working glossary for the phone interview. It is built to be *spoken from*, not just read: each entry gives you a crisp, defensible one-sentence definition and one concrete lab example you can drop into an answer. When an interviewer asks "what do you mean by autoverification?" or "how would you use LOINC?", you want a clean sentence plus a real-world hook — that combination is what makes you sound like someone who has stood in a lab, not someone who memorized a textbook.

**How to use it.** Skim it whole once for coverage, then drill the terms you are shakiest on. The examples are deliberately specific (a troponin, a potassium, a heparin drip) because specifics are what land on a phone call. Terms are grouped into three sections — **Informatics & Data Standards**, **Operations & Quality**, and **Clinical Pathology Domains** — and alphabetized within each. A short cross-reference cluster at the end ties the acronyms together the way they actually connect in a lab.

A note on scope: definitions here are the canonical, widely-accepted meanings from pathology informatics and laboratory management (LIS vendors, HL7/LOINC/SNOMED bodies, CAP/CLIA, CLSI, Westgard). Nothing here is Lahey/BILH-specific — where the interview turns to how a concept applies at Lahey, treat that as a *role-based interpretation*, not an institutional fact.

---

## Section 1 — Informatics & Data Standards

| Term | Definition | Practical example |
|------|------------|-------------------|
| **API (Application Programming Interface)** | A defined contract that lets one software system request data or actions from another in a structured, predictable way. | A dashboard calls the LIS's reporting API every hour to pull the day's turnaround-time data instead of a tech exporting a spreadsheet by hand. |
| **Autoverification** | Rule-based logic that releases results to the chart without human review when they pass predefined checks (range, delta, QC, instrument flags). | A normal CBC with no flags, an in-range delta, and passing QC auto-releases in seconds; an abnormal or flagged result is held for a technologist to review. |
| **CDS (Clinical Decision Support)** | Software logic that delivers the right information to the right person at the right point in the workflow to improve a decision. | An order-entry rule that fires "a ferritin was resulted 3 days ago — reorder?" when a clinician re-orders it, reducing duplicate testing. |
| **Data dictionary** | The authoritative catalog defining every data element in a system — its name, format, allowed values, units, and meaning. | Before a merge, two labs compare data dictionaries and discover one codes "positive" as `POS` and the other as `P`, a mismatch that would break a feed if uncaught. |
| **Delta check** | An automated comparison of a patient's current result to their prior result, flagging a change too large to be biologically plausible. | A hemoglobin that jumps from 8.0 to 14.0 g/dL in six hours triggers a delta check that usually means a mislabeled specimen, not real recovery. |
| **Downtime** | Any period when a critical system (LIS, interface, analyzer, EHR) is unavailable, planned or unplanned, requiring backup procedures. | During an LIS upgrade, the lab runs paper requisitions and manual result callbacks under a rehearsed downtime protocol, then back-enters results on recovery. |
| **FHIR (Fast Healthcare Interoperability Resources)** | A modern HL7 standard that models healthcare data as web-friendly "resources" exchanged over REST APIs, easier to build on than legacy HL7 v2. | A patient-portal app uses a FHIR `Observation` resource to display lab results, pulling structured data rather than parsing a v2 pipe-delimited message. |
| **HL7 (Health Level Seven)** | The dominant family of messaging standards for exchanging clinical and administrative data between health IT systems; "HL7 v2" is the workhorse in labs. | When a chemistry analyzer finishes a potassium, the LIS packages it as an HL7 ORU result message and sends it to the EHR so it lands in the patient's chart. |
| **Interface** | A configured connection that moves data between two systems, translating formats and codes so each side understands the other. | The bidirectional interface between the LIS and an analyzer downloads the test order to the instrument and uploads the result back automatically. |
| **Interface engine** | Middleware that centrally routes, translates, and monitors many interfaces at once, so systems connect through one hub instead of point-to-point spaghetti. | Instead of ten separate analyzer-to-EHR links, all messages flow through the interface engine (e.g., a Rhapsody/Mirth-style hub) where mapping and logging live in one place. |
| **Interoperability** | The ability of different systems to exchange data *and* correctly interpret its meaning — not just move bytes, but preserve intent. | Two labs are "connected" (data flows) but not truly interoperable until a "glucose" from each maps to the same LOINC code with the same UCUM units. |
| **LIS (Laboratory Information System)** | The core software that manages the lab's testing lifecycle: order receipt, specimen tracking, result generation, verification, and reporting. | A phlebotomy order enters the LIS, which assigns an accession number, tracks the tube through the analyzer, and releases the verified result to the EHR. |
| **LOINC (Logical Observation Identifiers Names and Codes)** | A universal coding system that gives every lab test and observation a standard identifier, so "the same test" means the same thing across institutions. | Mapping in-house "SODIUM" to LOINC `2951-2` lets a serum sodium from Lahey and one from another BILH hospital aggregate cleanly in a shared data warehouse. |
| **Middleware** | Software sitting between analyzers and the LIS that adds intelligence — autoverification rules, QC management, reflex logic, instrument routing — before results reach the LIS. | Chemistry middleware runs Westgard rules and delta checks on every result, auto-releasing the clean ones and holding the rest, offloading logic the LIS handles poorly. |
| **Reflex testing** | Automatic follow-up testing triggered by an initial result meeting defined criteria, without a new clinician order. | A positive hepatitis C antibody reflexes to an HCV RNA confirmation; a TSH outside range reflexes to a free T4 — both driven by pre-agreed rules. |
| **SNOMED CT (Systematized Nomenclature of Medicine — Clinical Terms)** | A comprehensive clinical terminology for encoding diagnoses, findings, organisms, and procedures in a computable, hierarchical way. | A micro result codes the isolate as *Escherichia coli* using its SNOMED CT concept, so downstream analytics can group all Gram-negative bacteremia consistently. |
| **Structured data** | Data captured in discrete, coded, machine-readable fields rather than free text, so systems can filter, trend, and compute on it. | A result entered as a numeric value with a LOINC code and UCUM unit is structured; the same finding buried in a free-text comment is not, and won't trend. |
| **UCUM (Unified Code for Units of Measure)** | A standard machine-readable notation for units of measure, removing ambiguity in how quantities are expressed between systems. | Encoding creatinine units as `mg/dL` in UCUM (not the ambiguous free-text "mg%") ensures the receiving system scales and displays the value correctly. |
| **Whole slide imaging (WSI)** | Scanning a glass slide into a high-resolution digital image that can be viewed, shared, and analyzed on a screen — the foundation of digital pathology. | A frozen section scanned to WSI is reviewed remotely by a subspecialist at another BILH site, avoiding a courier trip and a delayed diagnosis. |

---

## Section 2 — Operations & Quality

| Term | Definition | Practical example |
|------|------------|-------------------|
| **CAP (College of American Pathologists)** | The main deemed accrediting body for clinical labs in the U.S., whose inspection checklists set the standard for lab quality and compliance. | A CAP inspector reviews QC records, competency files, and validation studies during a biennial inspection; gaps become citations the lab must correct. |
| **Change control** | A disciplined process for reviewing, approving, documenting, and communicating any change to a validated system, process, or instrument before it goes live. | A middleware autoverification rule change goes through change control — reviewed, tested in a validation environment, approved, and logged — before touching live results. |
| **CLIA (Clinical Laboratory Improvement Amendments)** | The U.S. federal regulations governing lab testing quality, personnel, and proficiency, categorizing tests by complexity (waived, moderate, high). | A high-complexity molecular assay carries CLIA personnel and QC requirements that a CLIA-waived glucose meter does not, shaping who can run each and how. |
| **Competency assessment** | Ongoing verification that testing personnel can correctly perform their duties, using six defined CLIA elements (e.g., direct observation, blind samples, problem-solving). | Twice in the first year and annually after, each tech's competency is documented across the six elements for every test system they run. |
| **Harmonization** | Aligning methods, reference intervals, units, and result reporting across instruments or sites so a result means the same thing regardless of where it was produced. | Two BILH labs harmonize their creatinine reporting so a clinician moving between sites doesn't see an artifactual "change" in a patient's eGFR. |
| **IQCP (Individualized Quality Control Plan)** | A CLIA-permitted, risk-based QC approach that lets a lab tailor QC frequency to a test's real-world risk after a documented risk assessment. | A blood gas analyzer with robust internal checks runs an IQCP justifying reduced external QC frequency, backed by a risk assessment and ongoing monitoring. |
| **KPI (Key Performance Indicator)** | A quantified metric that tracks whether a process is meeting its operational or quality goal, ideally trended over time. | The lab tracks "percent of stat troponins resulted within 60 minutes" as a KPI on a dashboard, with a target line and monthly trend. |
| **Lean** | A process-improvement methodology focused on eliminating waste (waiting, motion, overprocessing, defects) to improve flow and value. | A Lean review of specimen receiving removes redundant re-labeling steps, cutting the time a tube waits before it reaches the analyzer. |
| **Levey-Jennings chart** | A control chart plotting QC results against the mean and standard-deviation limits over time, making shifts and trends visible at a glance. | A tech notices the last five potassium controls drifting upward on the Levey-Jennings chart — a trend signaling a developing calibration or reagent issue. |
| **PDSA (Plan-Do-Study-Act)** | An iterative improvement cycle: plan a small change, do it on a small scale, study the result, then act to adopt, adjust, or abandon. | To cut mislabeled specimens, the lab runs a PDSA on one unit with barcode scanning, studies the error rate, then scales what worked. |
| **Proficiency testing (PT)** | External blind samples sent to the lab periodically; the lab tests them like patient samples and its results are graded against peers to verify accuracy. | CAP sends unknown chemistry samples; the lab reports its values, and a failed PT challenge triggers a mandatory investigation and corrective action. |
| **QA (Quality Assurance)** | The broad, proactive system of policies and monitoring that ensures the whole testing process reliably produces trustworthy results. | A QA program reviews turnaround times, PT performance, error logs, and corrective actions monthly to catch systemic problems before they harm patients. |
| **QC (Quality Control)** | Running known-value control materials to confirm that a test system is performing correctly *right now*, before patient results are released. | Each shift runs low/normal/high controls on the chemistry analyzer; if a control fails, patient testing halts until the cause is fixed and QC passes. |
| **Root cause analysis (RCA)** | A structured investigation that traces a problem past its symptom to the underlying systemic cause, so the fix prevents recurrence. | After a critical value wasn't called, an RCA (using tools like "5 Whys" or a fishbone) finds the callback list was outdated — a process fix, not blame. |
| **Six Sigma** | A data-driven methodology aimed at reducing variation and defects, often using the DMAIC framework (Define, Measure, Analyze, Improve, Control). | A Six Sigma project measures specimen-rejection defects, analyzes causes, and drives the hemolysis rate down to a defined, sustained target. |
| **TAT (Turnaround Time)** | The elapsed time across a defined span of the testing process — commonly order-to-result or collection-to-result — a core operational metric. | The stat troponin TAT (collection-to-result) is tracked against a 60-minute target because delays directly affect ED chest-pain decisions. |
| **Utilization management** | Guiding test ordering toward appropriate use — reducing redundant, low-value, or ill-timed tests while ensuring needed tests get done. | Utilization management adds a "once-per-admission" rule on HbA1c and a duplicate-order alert, cutting waste without blocking clinically valid orders. |
| **Validation** | Comprehensive evidence, gathered before go-live, that a *new* or *modified/laboratory-developed* test or system performs as intended for its intended use. | Before offering a new molecular assay, the lab validates accuracy, precision, reportable range, reference interval, and analytic sensitivity/specificity. |
| **Verification** | Confirming that an *FDA-cleared/approved, unmodified* method performs as the manufacturer claims in the lab's own hands — a lighter lift than full validation. | Bringing on an FDA-cleared troponin assay, the lab verifies precision, accuracy, and reportable range against the package insert before going live. |
| **Westgard rules** | A set of statistical QC rules (e.g., 1-3s, 2-2s, R-4s) that decide whether to accept or reject a run based on control-result patterns, balancing error detection against false rejection. | Middleware applies Westgard multirules: a single control beyond 3 SD (1-3s) rejects the run, while a 2-2s violation flags a systematic shift. |

---

## Section 3 — Clinical Pathology Domains

| Term | Definition | Practical example |
|------|------------|-------------------|
| **Apheresis** | A procedure that separates blood into components to remove or collect a specific part (plasma, platelets, RBCs, WBCs) and return the rest to the patient or donor. | Therapeutic plasma exchange (an apheresis procedure) removes pathogenic antibodies in TTP; the transfusion service coordinates the machine, replacement fluid, and orders. |
| **Blood bank / transfusion service** | The lab section responsible for the safe selection, compatibility testing, and issue of blood products, plus managing inventory and transfusion reactions. | The blood bank performs a type-and-screen and crossmatch before releasing red cells, and investigates any suspected transfusion reaction that follows. |
| **Coagulation reflex** | Rule-driven follow-up coagulation testing prompted by an abnormal initial result, to characterize the abnormality without a fresh order. | A prolonged PTT reflexes to a mixing study to distinguish a factor deficiency (corrects) from an inhibitor such as a lupus anticoagulant (doesn't correct). |
| **Concordance** | The degree to which two methods, readers, or systems agree on the same sample — a core metric when validating a new method against an established one. | Digital pathology validation measures concordance between glass-slide and whole-slide-image diagnoses across a case set to confirm the digital read is equivalent. |
| **Critical value** | A result so far outside the safe range that it signals immediate danger and must be communicated to a responsible caregiver right away, with documentation. | A potassium of 6.9 mmol/L is a critical value: the lab calls the ordering team, reads back the result, and logs the time, name, and readback. |
| **Digital pathology** | The practice of using digitized slides (via WSI) for primary diagnosis, consultation, education, and computational/AI-assisted analysis. | A pathologist signs out a surgical case entirely on-screen from whole-slide images, annotating regions and sharing them instantly for a second opinion. |
| **Flow cytometry** | A technique that measures physical and marker characteristics of individual cells in a fluid stream, key to diagnosing and classifying hematologic malignancies. | Flow cytometry on a bone marrow sample identifies an aberrant B-cell population by its CD marker profile, supporting a diagnosis of B-cell lymphoma/leukemia. |
| **Molecular diagnostics** | Testing that detects nucleic acids (DNA/RNA) to identify pathogens, mutations, or gene rearrangements, spanning infectious disease and oncology. | A molecular respiratory panel identifies influenza A versus RSV from one nasopharyngeal swab; an oncology assay detects a BCR-ABL fusion transcript. |
| **Point-of-care testing (POCT)** | Testing performed near the patient rather than in the central lab, prized for speed but demanding careful oversight of QC, competency, and connectivity. | A bedside glucose meter gives an ICU nurse an immediate value, but the lab still owns its QC, operator competency, and result documentation in the chart. |
| **Send-out / reference lab** | An outside laboratory that performs esoteric or low-volume tests the in-house lab doesn't run; the sending lab manages ordering, shipping, and result reconciliation. | A rare genetic assay is sent out to a reference lab; the LIS tracks it as a pending send-out and files the returned result to the correct patient and provider. |

---

## Quick-Reference: How the Acronyms Connect

The standards are easier to remember as a chain than as a list. A useful mental model for the phone call:

- **A result is generated** on an analyzer, often with **middleware** applying **QC** (Westgard, Levey-Jennings), **delta checks**, and **autoverification** before it ever reaches the **LIS**.
- **The LIS** owns the result and, to share it, wraps it in an **HL7** (or **FHIR**) message that travels through the **interface engine**.
- **For the result to *mean* the same thing everywhere** — true **interoperability**, not just connectivity — the test is coded in **LOINC**, the units in **UCUM**, and any diagnosis/organism in **SNOMED CT**.
- **Quality and regulation** wrap around all of it: **CLIA** sets the floor, **CAP** inspects against it, **PT** checks accuracy externally, and **validation/verification** plus **change control** gate what goes live.
- **Improvement** closes the loop: **KPIs** on a dashboard reveal a problem, **RCA** finds its cause, and **PDSA / Lean / Six Sigma** drive the fix.

If you can walk an interviewer from "an analyzer produces a potassium" to "it lands correctly coded in every BILH hospital's record," using these terms in order, you have demonstrated exactly the blend of clinical, operational, and informatics fluency the role is asking for.

---

## One-Line Definitions for Rapid Recall

For last-minute cramming, the tightest possible version of each term — read down the list the morning of the interview:

- **Autoverification** — rules release clean results without human eyes.
- **Middleware** — smart layer between analyzer and LIS.
- **Interface engine** — central hub routing all system-to-system messages.
- **HL7** — the standard message format labs use to send results.
- **FHIR** — modern, API-friendly HL7.
- **LOINC** — universal code for *what test* this is.
- **SNOMED CT** — universal code for *the clinical finding/organism*.
- **UCUM** — universal code for *the units*.
- **Interoperability** — data moves *and* keeps its meaning.
- **Delta check** — this result vs. the patient's last result.
- **Reflex testing** — one result auto-orders the next.
- **CDS** — right info, right person, right moment.
- **Data dictionary** — the master list of what every field means.
- **Downtime** — system's out; run the backup plan.
- **TAT** — how long the result took.
- **QC** — is the test working *right now*?
- **QA** — is the whole *system* trustworthy?
- **PT** — blind external samples graded against peers.
- **IQCP** — risk-based, right-sized QC plan.
- **Levey-Jennings** — QC control chart over time.
- **Westgard rules** — statistical accept/reject rules for QC.
- **Validation** — prove a *new/modified* test works (full study).
- **Verification** — confirm an *FDA-cleared* test works in your hands (lighter).
- **Change control** — no change to a validated system without review + sign-off.
- **Competency assessment** — proof the tech can do the job, six CLIA elements.
- **CAP** — the inspector.
- **CLIA** — the federal rules.
- **RCA** — find the real cause, not the symptom.
- **PDSA** — plan, do, study, act — small-scale improvement loop.
- **Lean** — kill the waste.
- **Six Sigma** — kill the variation (DMAIC).
- **KPI** — the number you watch.
- **Utilization management** — order the right tests, skip the wasteful ones.
- **Harmonization** — same result means the same thing across sites.
- **Critical value** — dangerous result, call it now, document it.
- **Apheresis** — separate blood, remove/collect a part, return the rest.
- **Flow cytometry** — cell-by-cell marker analysis.
- **Coagulation reflex** — abnormal clotting test auto-orders the workup.
- **POCT** — testing at the bedside, still the lab's responsibility.
- **Send-out** — esoteric test shipped to a reference lab.
- **Blood bank** — safe selection and issue of blood products.
- **Molecular diagnostics** — DNA/RNA testing (infectious + oncology).
- **Digital pathology** — diagnosing from digital slides.
- **Whole slide imaging (WSI)** — the scanned glass slide itself.
- **Concordance** — how well two methods/readers agree.
- **Structured data** — coded fields you can trend, not free text.
- **API** — the contract for one system to ask another for data.
- **LIS** — the lab's core operating system.
