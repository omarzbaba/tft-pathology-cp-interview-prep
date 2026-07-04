# Core Chapter G — Enrichment Pack: Digital Pathology and Whole Slide Imaging

> **Purpose of this pack.** The base chapter (04g) is already strong: it frames WSI as a system of systems, treats validation as a transferable method-validation skeleton, and — correctly — keeps digital pathology *in proportion* for a CP-broad role. This pack does not rewrite that. It fills the specific gaps: more cross-CP imaging examples (heme, micro, flow, blood bank — not just AP), more concrete operational scenarios, deeper informatics realism (DICOM, cybersecurity, algorithm/AI governance, cross-site standardization), and sharper spoken language. Keep the proportion the base chapter sets: two confident minutes on DP, then pivot back to core lab and informatics.

---

## 1. Gap read — what the base chapter under-served

Honest audit of what's thin or missing, so the additions below are additive rather than repetitive:

- **The cross-CP imaging parallels are named but not worked.** The base says heme smear review, micro plate reading, flow, and blood bank "borrow the same logic," but never shows a concrete example — e.g., a CellaVision digital differential, a WASPLab/Copan plate-reading validation, or remote peripheral-smear review for a blood bank consult. These are the examples that make a CP interviewer nod, because they're *core lab*, not AP. This is the single biggest gap: the chapter is AP-centric in its examples even while arguing DP is CP-transferable.
- **Algorithm / AI governance is mentioned but never operationalized.** "Image analysis reduces variability" and "AI platform" appear, but there's no treatment of how you'd actually *govern* a computational tool: locked vs. adaptive algorithms, drift monitoring, who signs the number, FDA-cleared vs. lab-developed image analysis, and the "the pathologist owns the result, not the algorithm" stance. For an informatics-forward role this is a real hole.
- **Informatics infrastructure is named at a high level but not made concrete.** DICOM appears as "a supplement exists"; cybersecurity/PHI-in-images gets zero treatment; interface-engine mechanics (HL7 order/result matching, barcode identity, VNA/PACS-style storage) are gestured at but not shown. A candidate who can say *how* the image binds to the accession, and *why WSI is a cyber target*, sounds materially more informatics-literate.
- **Cross-site standardization mechanics are asserted, not detailed.** The base repeatedly says "multi-site integration" but doesn't get into the practical friction: two sites with different scanners, different color profiles, different LIS builds, different monitors — and what standardization actually requires (harmonized scan protocols, a shared image-management layer, common QC metrics, one validation framework applied per site). This is exactly the BILH-growth angle and deserves its own concrete treatment.
- **Leadership-without-title and the plain-English translation layer are absent.** There's strong "say this, not that" phrasing, but nothing on influencing a DP decision when you don't own it, and no de-jargoned versions for a non-lab listener (a CFO asking why storage costs keep climbing, a hospitalist asking why a slide "isn't ready yet"). The role explicitly wants leadership without title authority and practical, plain communication.

---

## 2. More real-world examples (cross-domain, concrete, not in the base)

Each names a specific bench/instrument/failure and — where useful — the CP-relevant lesson. These deliberately span heme, micro, flow, blood bank, chemistry-adjacent, and coagulation so the imaging logic reads as *core lab*, not AP trivia.

1. **CellaVision digital differential (hematology).** The heme lab's CellaVision (or Sysmex DI-60) already *is* digital pathology for blood: it images cells on a smear, pre-classifies them (neutrophil, lymph, blast candidate), and the tech/pathologist confirms on screen. The validation logic is identical to WSI — you compare the analyzer's pre-classification against manual microscopy, you don't let it auto-report blasts without human confirmation, and you monitor reclassification rates. *Lesson: I can point to a digital-imaging validation I'd actually touch as a CP, not just a hypothetical AP scanner.*

2. **Automated microbiology plate imaging (WASPLab / Copan, BD Kiestra).** Total lab automation in micro photographs culture plates at set intervals and lets the tech read colonies on a monitor instead of at the bench — including algorithms that flag "no growth" vs. "growth" to triage negatives. Same intended-use discipline: the automated no-growth call is validated against manual reading before you trust it to release negatives, and chromogenic-agar color calls need color-fidelity control just like WSI.

3. **Remote peripheral-smear review for a blood bank / heme consult.** A community site scans (or images via CellaVision) a smear with suspected schistocytes; the on-call hematopathologist reviews remotely to help distinguish TTP-range thrombotic microangiopathy from a benign artifact before anyone pages for plasma exchange. *Lesson: this is the "move expertise, not glass" value in a genuinely CP/transfusion context.*

4. **Flow cytometry as the pure "digital-native interpretation" analogue.** Flow has no glass slide, but the interpretive-validation logic is the same family: you validate gating templates and analysis software versions, you control for reader/analyst variability on the same list-mode file, and a software upgrade can shift where a gate lands — a direct parallel to a WSI viewer upgrade invalidating prior validation. Good place to say "the concordance-and-change-control mindset isn't AP-specific."

5. **Urinalysis digital imaging (iQ200 / UF-series).** Automated urine microscopy images and pre-classifies particles (RBCs, WBCs, casts, crystals). Same story: the instrument's particle classification is validated against manual microscopy, and casts/dysmorphic RBCs are the known "hard cases" you review manually — exactly analogous to cytology being the WSI stress case.

6. **Frozen-section telepathology gone wrong: the focus/z-stack failure.** A remote intraoperative frozen read is degraded because the scanner captured a single focal plane on a slightly thick, folded frozen section, and the diagnostic nuclear detail sits in a plane that wasn't captured. *Lesson: names a concrete WSI failure mode (single-plane vs. z-stack) in the highest-stakes, most time-pressured use — and why frozen telepathology is its own intended use requiring its own validation.*

7. **Color-profile drift across two scanners at two sites.** Site A's scanner renders a hematoxylin blue slightly differently from Site B's after a firmware update; an immunostain that's called on subtle intensity looks borderline on one and clearly positive on the other. *Lesson: color/luminance consistency is a validated, monitored parameter — not cosmetic — and it's a cross-site standardization problem, not an optics curiosity.*

8. **Image-analysis biomarker quantification with a real accountability question (Ki-67 / HER2 / PD-L1).** An image-analysis algorithm scores a proliferation index or a PD-L1 tumor-proportion score. The operational question isn't "does the software work" — it's "who signs that number, how is the algorithm version tracked, and what happens when the vendor pushes an update mid-year." *Lesson: connects image analysis to algorithm governance and change control, which the base never operationalizes.*

9. **The storage-lifecycle miss that hit the budget (informatics/finance).** A program projected storage on H&E-only slides, then a service started z-stacking cytology and immunostains, and the "hot" storage tier filled two quarters early — a five-to-tenfold per-slide size jump nobody modeled. *Lesson: storage is a forever cost that scales with scan strategy, not just slide count; it's a capital-planning and informatics-governance failure, not an IT accident.*

10. **Specimen-identity mismatch: right patient, wrong block.** A scanned image gets bound to the wrong accession because a barcode was hand-keyed during a scanner-to-LIS interface hiccup. *Lesson: image-to-accession binding is a patient-safety control on par with specimen labeling in the core lab — barcode-driven, LIS-integrated identity is non-negotiable, and this is the same wrong-tube/wrong-label risk you already manage in chemistry and blood bank.*

11. **Cybersecurity / ransomware exposure of the image archive.** A WSI archive is petabyte-scale PHI sitting on network storage; a ransomware event that encrypts the image store takes the digital read offline entirely — which is why the downtime plan (fall back to glass, immutable backups, tested restore) is a security control, not just an IT convenience. *Lesson: WSI is a cyber attack surface, which the base doesn't mention at all.*

12. **Coagulation's quieter parallel (photo-optical clot detection).** Coag isn't imaging in the WSI sense, but photo-optical/mechanical clot-detection endpoints and reflex/mixing-study interpretation carry the same "validate the automated call against the manual/reference method, control the algorithm version, monitor drift" discipline — useful when an interviewer probes whether your validation reasoning is genuinely general or just DP-shaped.

---

## 3. Operational scenarios

Each written as **Situation → What you'd do (sequenced, patient-first) → How you'd say it.**

### Scenario A — Two newly integrated sites, two different scanners, one system

**Situation.** BILH-style growth: a community hospital lab joins the network. Both sites want digital review, but they run different-vendor scanners, different LIS builds, and different monitors, and each site validated its own workflow in isolation. Leadership wants "one digital pathology program," and a subspecialist at the flagship is supposed to cover the community site's hard cases.

**What you'd do (sequenced, patient-first).**
1. **Protect the current clinical read first.** Nothing about the integration changes how either site signs out today until the shared pathway is validated — no silent cutover.
2. **Define the shared intended use** for the cross-site pathway specifically (e.g., "flagship subspecialty consult on scanned community-site slides, with glass available on request"), which is a *lower-risk envelope* than either site's primary-diagnosis use and can go live sooner.
3. **Standardize the measurable parameters, not the vendors.** You don't need identical scanners; you need harmonized scan protocols, controlled and monitored color/luminance calibration, common scan-QC metrics (rescan rate, focus pass rate), and diagnostic-grade displays at the reading end. Standardize the *outputs and QC*, tolerate hardware heterogeneity.
4. **Unify identity and interface.** One image-management layer, barcode-driven image-to-accession binding validated end-to-end across both LIS builds, so a community-site accession resolves correctly on the flagship reader's screen.
5. **Validate the cross-site pathway as its own intended use** — the receiving subspecialist reads representative community-site cases digital-vs-glass with a washout — rather than assuming two local validations sum to a network validation.
6. **Stand up shared monitoring before go-live:** cross-site rescan and discordance dashboards, plus a downtime plan that falls back to glass/courier cleanly.

**How you'd say it (spoken snippet).**
> "I'd resist the idea that we need identical scanners at every site — that's expensive and it's the wrong target. What we actually need to standardize is the *outputs and the QC*: harmonized scan protocols, controlled color and luminance, common rescan and focus metrics, and one image-management and identity layer so a community-site accession lands correctly on the flagship pathologist's screen. Then I'd validate the cross-site consult pathway as its own intended use, start it as a lower-risk consult envelope with glass available, and only widen the scope as the data holds. That's the same 'harmonize the process, not the hardware' approach I'd take standardizing chemistry methods or reference intervals across sites."

### Scenario B — A vendor pushes an image-analysis algorithm update mid-year

**Situation.** The lab uses a cleared image-analysis tool to score a biomarker (say, a proliferation index). The vendor announces an automatic software update. Nobody scheduled a revalidation, and the scores drive real clinical decisions.

**What you'd do (sequenced, patient-first).**
1. **Freeze the change from silently reaching clinical use.** Treat the algorithm update exactly like a scanner-firmware or viewer-version change — it can invalidate prior validation, so it goes through change control before it touches a reported result.
2. **Confirm what actually changed.** Locked algorithm vs. an adaptive/continuously-learning one; what the vendor's release notes say; whether the FDA clearance or the lab's validation covers this version.
3. **Run a focused revalidation.** Re-score a representative concordance set old-version-vs-new-version, quantify the shift, and decide whether it's clinically material.
4. **Keep the human accountable.** Reinforce that the pathologist signs the result, not the algorithm; the tool is decision-support within a validated envelope.
5. **Document and monitor drift** going forward — periodic re-checks so a gradual shift doesn't accumulate unnoticed.

**How you'd say it (spoken snippet).**
> "My reflex is that an algorithm update is a change-control event, not an IT convenience — it can invalidate the validation the same way a viewer or firmware upgrade can. So before that update reaches a reported score, I'd want to know whether it's a locked or adaptive model, re-run a concordance set old-versus-new to see if the shift is clinically meaningful, and keep it explicit that the pathologist owns the number and the software is decision-support inside a validated envelope. That's identical to how I'd handle a chemistry analyzer's software update that could move a calibration."

### Scenario C — Turnaround worsened after go-live, and a service wants to blame "the technology"

**Situation.** Three months into a WSI rollout, one surgical service's turnaround has *worsened*, and the loudest pathologist wants to abandon digital. You don't own the AP service, so you can't just order a change — this is leadership without title.

**What you'd do (sequenced, patient-first).**
1. **Make it about data, not opinion.** Pull the actual operational metrics — scanner utilization by hour, rescan rate by specimen type, viewer latency, scan-QC pass rate — before anyone argues.
2. **Locate the real bottleneck.** Typically it's a scanner-capacity crunch at peak hours plus a high rescan rate on one specimen type (focus/thickness), not the concept of digital.
3. **Fix operationally.** Add or reschedule scan capacity, tighten sectioning for the problem specimen, adjust the focus/z-stack strategy, and set a scan-QC standard — separating "the workflow needs tuning" from "the technology failed."
4. **Bring the skeptic along.** Show them the metric that improved, invite them into defining the scan-QC standard, and give the change a defined trial window with a clear "if this doesn't move, we revisit" — so it's a shared decision, not an imposed one.
5. **Report it as a quality-improvement win**, which builds credibility for the next cross-service ask.

**How you'd say it (spoken snippet).**
> "I don't have line authority over that service, so I lead with data and shared ownership. I'd pull scanner utilization, rescan rate by specimen type, and viewer latency and show that the turnaround dip is a peak-hour capacity crunch and a focus problem on one specimen — not the concept of digital. Then I'd fix it operationally, but I'd invite the skeptical pathologist to help define the scan-QC standard and give it a defined trial window. People come along when they help build the fix and see the metric move. That's how I've influenced change without a title before — make the problem legible, make the fix a shared decision."

---

## 4. How to discuss it in an interview (natural spoken snippets)

Short, first-person, phone-ready. These complement (don't duplicate) the base chapter's talking points.

**On the cross-CP relevance — the pivot that proves you're not just an AP tourist:**
> "The thing I like about whole slide imaging is that the exact same reasoning shows up all over the core lab. Our CellaVision differential in heme is digital pathology for blood — you validate the analyzer's pre-classification against manual microscopy and you don't auto-report a blast. Automated plate reading in micro is the same. Flow is the same concordance-and-change-control logic without a slide at all. So when I talk about WSI validation, I'm really talking about a habit I'd use every day in chemistry, heme, and micro — not a niche AP skill."

**On algorithm/AI governance — measured, not breathless:**
> "I'm genuinely interested in computational image analysis, and I'd govern it conservatively. The pathologist signs the result, not the algorithm. I'd track the algorithm version like any other software under change control, revalidate when a vendor pushes an update, know whether it's a locked or an adaptive model, and monitor for drift. The exciting part isn't the AI — it's having the governance discipline so the AI can be trusted. That's an informatics problem, and it's the part I'd own."

**On cost and storage — talking to a non-lab decision-maker:**
> "If a CFO asked me why storage costs keep climbing, I'd be straight: each digital slide is roughly the size of a short video, storage is a recurring cost that never stops, and it scales with how we scan — z-stacking a cytology case can be five to ten times bigger than a routine slide. So I'd want a deliberate storage lifecycle, hot-warm-cold tiers with a retention policy, and I'd model it against the real scan mix, not just slide count. The value has to clear that recurring cost for a specific use — which is exactly why I'd start with high-value consults, not everything at once."

**On the security angle — signals informatics maturity fast:**
> "One thing people forget is that a whole-slide archive is petabytes of PHI on network storage, so it's a real cyber target. If ransomware hits the image store, digital read is just gone. That's why I treat the downtime plan — fall back to glass, immutable backups, a tested restore — as a security control, not an IT afterthought. Business continuity for a digital workflow is patient safety."

**On proportion, in one breath (reinforcing the base chapter's core move):**
> "I can go deep on WSI validation, but for this role I'd be candid that it's one tool in a broad kit. Most of my daily value is core lab and informatics — autoverification, middleware, interface reliability, POCT oversight. I think of WSI mostly as a clean worked example of how I'd validate anything, and as a plausible future project as the system grows and integrates labs."

---

## 5. What can go wrong (failure cases + lessons)

### Failure case 1 — Silent scope creep dressed up as "it works fine"

**The misstep.** A team, six months post-rollout, starts scanning and digitally signing out a specimen type — say, a cytology prep or a thick section — that was never in the validated set, because early results "look fine." No new validation, no change-control note, no system guardrail preventing the out-of-scope routing. A discordance later surfaces on exactly the feature (nuclear detail, a small organism) that the excluded specimen type is known to stress.

**The lesson.** Validation is meaningful only relative to intended use, and "it works fine on the easy ones" is not evidence for the hard ones. New use is a *new validation*, not a quiet extension — and the durable fix is a system guardrail that blocks out-of-scope routing, not a policy memo that relies on memory. This is the same discipline that keeps a POCT glucose meter off a population it was never cleared for. In an interview, naming *silent scope creep* by name and pairing it with "enforce the boundary in the system, not on paper" reads as mature governance.

### Failure case 2 — Trusting the algorithm number without owning the governance

**The misstep.** A lab adopts an image-analysis biomarker score, lets it flow into reports, and treats it as settled. A vendor pushes a mid-year update; nobody revalidates because "it's just a software patch." The scoring shifts subtly, a cluster of borderline cases tips across a treatment threshold, and it's caught late because there was no version tracking and no drift monitoring.

**The lesson.** A computational tool is not a fixed instrument — its behavior can change with a version bump, and an adaptive model can drift even without one. Treat every algorithm update as a change-control event, keep the pathologist accountable for the signed result, track the version, and monitor drift. The failure isn't the AI; it's the *absence of the informatics governance around it*. This is the single most credible thing you can say about AI in pathology to a skeptical panel: enthusiasm for the tool, discipline about the guardrails.

*(A third, quieter failure worth having ready: **selling only the benefits**. Listing DP upsides from a brochure with no failure modes — rescans, throughput dips, storage growth, downtime dependence — tells a panel you've never actually run one. The base chapter's operational realism is the antidote; lead with the honest workflow picture.)*

---

## 6. How I would improve this (improvement plays)

Each framed as **problem → change → expected win → how I'd de-risk it.** Pitch these as things you'd champion, sequenced sensibly behind the core-lab and informatics work.

### Play 1 — A cross-site scan-QC and discordance dashboard as the standardization backbone

- **Problem.** As BILH integrates labs, each site tends to validate and monitor its digital workflow in isolation, so there's no shared, comparable view of scan quality, rescan rates, or discordance signals across sites — which makes "one program" a slogan rather than a reality, and makes drift invisible until it becomes a discordance.
- **Change.** Stand up one shared dashboard with common metrics (rescan rate, focus/scan-QC pass rate, color-calibration status, viewer latency, discordance and amendment signals) reported per site against a common definition, feeding a single monthly review.
- **Expected win.** Cross-site quality becomes legible and comparable; you catch a scanner drifting on color or a site's rescan rate creeping before it harms a case; and you have the operational evidence base to expand intended use safely.
- **How I'd de-risk it.** Start read-only with existing data from one or two sites, agree on metric definitions *before* comparing (so no site feels judged by a moving target), and pilot on the lower-risk consult pathway before touching primary-diagnosis metrics. No workflow changes ride on the dashboard until the definitions are stable.

### Play 2 — A one-page "intended-use + change-control" charter reused for every new technology

- **Problem.** Intended-use scoping and change control are often re-improvised for each project (WSI, a new analyzer, an autoverification rule, an image-analysis tool), so exclusions, revalidation triggers, and guardrails get inconsistently documented — which is exactly where scope creep and un-revalidated updates slip through.
- **Change.** Adopt a short, standard charter template — intended use, explicit exclusions, risk tier, acceptance criteria, revalidation triggers (version/firmware/vendor updates), guardrails, and the monitoring plan — and require it for any new diagnostic technology, DP or not.
- **Expected win.** Governance becomes consistent and auditable across the core lab and DP; accreditation readiness improves; and the WSI validation logic the base chapter teaches gets institutionalized as *the* way the department validates anything.
- **How I'd de-risk it.** Keep it genuinely one page so people use it (a heavy template gets ignored); pilot it on one live project — ideally a lower-stakes one — and refine before mandating; and frame it as codifying good habits people already have, not new bureaucracy. Position it behind, not ahead of, the operational work so it reads as enabling quality rather than adding process.

---

## 7. Plain-English quartet

For the most jargon-heavy concepts in this chapter, four registers each: **Elevator** (one sentence), **Practical** (one paragraph), **Interview-safe** (how to say it on the call), **Avoid-too-technical** (for a non-lab listener — a CFO, a hospitalist, a family member).

### Concept 1 — Whole slide imaging / pyramidal image

- **Elevator.** A scanner turns a glass slide into a huge, zoomable digital image you read on a screen instead of down a microscope.
- **Practical.** WSI captures a glass slide as a very large, multi-resolution digital image — stored in stacked layers so the viewer can render low power instantly and high power on demand — that a pathologist pans and zooms much like moving a slide on a microscope stage. It's not one photo; it's a tiled, gigabyte-scale image with its own metadata (magnification, microns-per-pixel, color profile). Everything else in digital pathology is built downstream of first having that faithful image.
- **Interview-safe.** "Whole slide imaging is the enabling technology — a scanner makes a high-resolution, pyramidal digital image you navigate like a microscope. Digital pathology is the ecosystem around it. I separate them because most of the operational risk isn't in the optics; it's in the storage, the interface, and the workflow."
- **Avoid-too-technical.** "We take a picture of the slide that's detailed enough to zoom in like a microscope, so a specialist can read it on a screen anywhere instead of only at the one microscope where the glass physically is."

### Concept 2 — Intra-observer concordance with a washout period

- **Elevator.** You prove the digital read gives the same answer as the glass read by having the same pathologist read both — with a gap in between so they're not just remembering the case.
- **Practical.** For primary-diagnosis validation the meaningful comparison is intra-observer: the same pathologist reads the case on glass and on the scanner, so you're measuring the *modality* effect and not the difference between two people. A washout — a gap of weeks, plus shuffled case order — separates the two reads so agreement reflects the digital method rather than the pathologist recalling the diagnosis. You pre-decide the concordance target and how you'll judge any disagreements.
- **Interview-safe.** "For primary diagnosis I'd compare digital against the glass diagnosis intra-observer, with a washout so I'm measuring the modality and not the pathologist's memory of the case, and I'd pre-specify the concordance target and how I'd adjudicate discordances by clinical significance."
- **Avoid-too-technical.** "Before we trust the digital version for real diagnoses, the same doctor reads a batch of cases both ways — on glass and on the screen — with enough time in between that they're not just remembering the answer, and we check the two agree."

### Concept 3 — Intended-use scoping and scope creep

- **Elevator.** You write down exactly what the digital system is approved for — and what it's *not* for — so nobody drifts into using it outside what was actually validated.
- **Practical.** Validation only means something relative to a specific intended use: which specimen types, which sites, which users, under what conditions — plus the explicit exclusions, usually the known hard cases like cytology or thick sections unless you validated them. Scope creep is the classic failure: a system quietly used beyond its validated envelope because early results looked fine. The durable defense is to enforce the boundary in the system (guardrails that block out-of-scope routing), not in a policy memo, and to treat any new use as a new validation.
- **Interview-safe.** "Validation is meaningful only relative to intended use, so I'd document the envelope and the exclusions explicitly and build guardrails so we can't drift across the boundary by accident. New use, new validation. It's the same discipline that keeps a POCT device or an autoverification rule inside what it was validated for."
- **Avoid-too-technical.** "We decide up front exactly which kinds of cases the digital system is safe for, and we put controls in place so people can't accidentally start using it on cases it was never tested for."

### Concept 4 — Change control / revalidation on a version change

- **Elevator.** When any part of the system updates — scanner firmware, the viewer, an image-analysis algorithm — you re-check it before trusting it clinically, because an update can quietly invalidate the old validation.
- **Practical.** A WSI system is a chain of software and hardware, and a change to any link — a viewer upgrade, a firmware push, a vendor's algorithm update — can shift behavior enough to break the prior validation. Change control means those updates route through a defined process before they touch a reported result: confirm what changed, run a focused revalidation (e.g., re-score a concordance set old-version-vs-new), and document it. Adaptive algorithms need drift monitoring even without an explicit update.
- **Interview-safe.** "I treat a version change — viewer, firmware, or an algorithm update — as a change-control event, because it can invalidate the validation. Before it reaches a reported result I'd confirm what changed, run a focused revalidation, and document it. Validation is point-in-time, not one-and-done."
- **Avoid-too-technical.** "Every time the software gets an update, we re-test it before we rely on it — because an update can change the results in ways you won't notice unless you check."

### Concept 5 — DICOM / interoperability and image-to-accession identity

- **Elevator.** Standards and a solid interface make sure images can be stored and shared long-term, and — critically — that the right image is tied to the right patient's accession.
- **Practical.** WSI can be stored in vendor-native formats or as a DICOM object (there's a DICOM standard for whole-slide images), and the standards question matters for long-term archival and for sharing across systems that don't share a vendor. The everyday informatics control underneath it is identity: barcode-driven, LIS-integrated binding of the image to the correct accession, so a scanned slide resolves to the right patient on the reader's screen — the digital equivalent of the wrong-tube/wrong-label control you already run in the core lab.
- **Interview-safe.** "On the informatics side I'd care about two things: interoperability — DICOM for whole-slide images matters for archival and cross-system sharing even if many deployments still run vendor-native — and specimen identity, making the image-to-accession binding barcode-driven and LIS-integrated, because the right image on the right accession is a patient-safety control."
- **Avoid-too-technical.** "We use common standards so the images stay usable long-term and can be shared between systems, and we barcode everything so the right slide is always attached to the right patient — same as we do with blood tubes."

---

## 8. Rapid recall

### Top 5 points

1. **WSI is a system of systems** (scanner, image management, viewer, storage, LIS interface) — the risk lives in integration, storage, and workflow, not the optics.
2. **WSI validation = method validation with imaging twists** — intended use, intra-observer digital-vs-glass, washout for reader memory, representative case set, pre-specified concordance and discordance adjudication, post-go-live monitoring. Same skeleton as any analyzer, assay, or POCT device.
3. **Intended-use scoping is the safety discipline** — validation means nothing without a documented envelope and explicit exclusions; guard against silent scope creep with system guardrails, and treat any new use as a new validation.
4. **The digital workflow adds a scan-and-QC step and a storage-and-interface layer** — rescans, throughput dips, gigabyte storage growth, specimen-identity binding, viewer performance, downtime dependence; most of the work is workflow and change management, not the scanner.
5. **Keep it in proportion and stay collaborative** — DP is one tool in a broad informatics-and-operations kit; own the governance/validation/storage/integration, defer to AP on diagnostics, and re-anchor to core lab and informatics.

### If you only remember three things

1. **"Move expertise, not glass"** — that's the value, and it's strongest where the analog bottleneck is subspecialty access or inter-observer variability.
2. **"Validation is meaningful only relative to intended use, and it's point-in-time"** — scope it, monitor it, revalidate on any version change.
3. **"WSI validation is a template for validating anything"** — that's why it belongs in a CP interview; then pivot back to core lab and informatics.

### Most likely to be asked (markers)

- `How would you validate WSI for primary diagnosis?` — walk the skeleton; defer numeric minimums to the current CAP guideline rather than quoting them.
- `What's a washout period and why does it matter?` — controls reader-memory bias so concordance reflects the modality.
- `Is every discordance a validation failure?` — no; classify by clinical significance and root-cause to scan quality vs. reading.
- `What operational metrics would you track?` — rescan rate, scan-QC pass rate, viewer latency, discordance/amendment signals, downtime.
- `Isn't digital pathology really your main interest?` — recalibrate gracefully to "one tool in a broad kit; most daily value is core lab and informatics."
- `How would you standardize across two sites with different scanners?` — harmonize outputs and QC, not hardware; one image-management and identity layer; validate the cross-site pathway as its own intended use.

### Most impressive to mention (markers)

- **The cross-CP examples** — CellaVision/DI-60 differential, automated micro plate reading (WASPLab/Copan), flow gating/version control, urine microscopy (iQ200): proves the validation logic is core-lab, not AP-only.
- **Silent scope creep, named** — plus "enforce the boundary in the system, not on paper."
- **Algorithm governance** — locked vs. adaptive models, version tracking, drift monitoring, "the pathologist signs the result, not the algorithm," revalidate on vendor update.
- **The cyber/business-continuity framing** — a petabyte PHI archive is an attack surface; the downtime plan (fall back to glass, immutable backups, tested restore) is a security control.
- **Storage as a modeled, recurring cost** — scales with scan strategy (z-stacking) not just slide count; hot/warm/cold lifecycle and retention policy.
- **Leadership without title** — leading a turnaround-recovery or standardization effort with data and shared ownership rather than authority.
- **"Harmonize the process, not the hardware"** — the cross-site standardization line that mirrors how you'd standardize chemistry methods or reference intervals across a growing system.
