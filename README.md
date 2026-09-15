# VARZIN Project

**Independent computational research and reproducibility framework**

VARZIN is an independent research project by **Reza Nirouyar** focused on:

- finite affine systems and deterministic computational models,
- reproducible computational experiments,
- structured analysis of the LUXVAR constructed symbolic system,
- falsification-oriented testing of semantic and structural claims,
- publication provenance, corrections, negative results, and open research questions.

Website: https://varzin.org
ORCID: https://orcid.org/0009-0000-4690-6842
Contact: contact@varzin.org

---

## Current source-of-truth policy

For **current scientific interpretation**, this repository now prioritizes the latest relevant public Zenodo manuscript and its version-matched reproducibility artifacts. Older website prose, historical protocols, and earlier version deposits remain available for provenance, but they do not override later evidence for the same claim.

Claim-specific current sources include:

- Level-1 finite-affine/software stack: `10.5281/zenodo.22036769`
- LUXVAR morphology, phonotactics, generator scale, and semantic-axis tests: `10.5281/zenodo.22115483`
- dedicated frozen-model Track D audit: `10.5281/zenodo.22101179`
- latest projection-head / scale / true-position / composition record: `10.5281/zenodo.22287006`
- frozen-Qwen representation-recovery vs composition study: `10.5281/zenodo.22679978`

Later records supersede earlier **interpretation within the same experimental line**; they do not erase the earlier DOI record. A trained recovery result is not relabeled as spontaneous frozen-model recovery, and group-position classification is not relabeled as composition.

---

## Research status

VARZIN separates mathematical, computational, empirical, and historical claims.

### Established within the current project scope

- deterministic affine and finite-state computational components have reproducible implementations;
- specified affine bijection and connectivity results are treated separately from empirical language claims;
- LUXVAR contains designed morphemic and structural regularities;
- several computational tests detect surface or morphemic structure;
- Track D produced a negative result for recovery of the designed semantic axes by the tested language models.

### Not established

The project does **not** currently treat the following as established scientific findings:

- independent semantic emergence in LUXVAR;
- universal or non-human semantic origin;
- physical or consciousness-field effects;
- quantum mechanisms associated with LUXVAR;
- causal or biological effects of symbolic frequency references;
- independent AI recovery of the intended semantic axes.

Historical materials may contain stronger formulations. They are retained for provenance but do not override the current research status.

The affine map on `Z_N` is bijective exactly when `gcd(a,N)=1`, so `|Aff(Z_N)| = Nφ(N)` and `|Aff(Z_12)| = 48`. This is **proved mathematics**. The 312-state / 600-edge Mirror-13 construction, connectivity checks, and M13-INV-001 counts are construction-specific computational/algebraic audit claims. A general analytic Mirror connectivity proof artifact has not been independently inspected.

Mirror-13 spectral reports name three distinct quantities: approximately zero periodic standard-walk convergence gap, raw positive-branch separation `0.200`, and conditional lazy-walk convergence gap `0.04133`. The reported MDL `13.11` bits and rank `1/1,035` apply within the project-defined coding and candidate space; the full candidate table was not separately indexed. Entropy change `+127.6%` is a reported metric whose raw component entropies were not located in the audited set.

---

## Current evidence categories

| Category | Current interpretation |
|---|---|
| Finite affine systems | Mathematical/computational results, subject to stated assumptions |
| Reproducibility | Deterministic artifacts and computational audit materials |
| LUXVAR morphology | Designed and computationally detectable surface structure |
| LUXVAR semantic axes | Not independently recovered in the current direct model tests |
| Track D | Negative result for the tested frozen, unremediated models on intended axis/orbit recovery |
| Trained remediation | Later project-reported targeted representation/group-position recovery after explicit training or projection; not spontaneous recovery |
| Composition | Negative result for systematic generalization to unseen pairs under the project-reported preregistered composition procedure; not a claim about all LLM algebra |
| Human semantic evaluation | Open empirical question |
| Frequency / resonance language | Historical or symbolic material; not established physical evidence |
| Consciousness / field claims | Not established |

Negative results are part of the project record and are not treated as failures to be hidden.

## Quantitative LUXVAR record and limits

The following are **project-reported results**, not independent validation of LUXVAR semantics. The historical [LUXVAR preprint](VARZIN_preprint_v2.md) provides the methods and correction history; the [field index](https://varzin.org/field-index.html) separates conditional findings from mathematical results.

| Test or artifact | Reported result and scope |
|---|---|
| Morphology | Non-random morphology in the tested generated corpus: z = 4.36, p < 0.001; silhouette = 0.406 versus shuffled mean 0.174. Natural cluster count k = 3; the k = 6 Hexacore hypothesis was rejected under that analysis. |
| Generator balance | At n = 2,000,000, H/H_max = 0.9995; V(root, field) < 0.02 and V(root, frequency) < 0.02. This is a **design property**, not evidence of semantic validity. |
| GEN-001 | 98.9% five-fold cross-validation accuracy; delta-majority = +32.2% for the tested phonotactic classification. |
| GEN-003R+ | Uniqueness = 0.738; 95% CI [0.703, 0.781], compared with six reference languages using curated lexical corpora. This does not establish general cross-language distinctiveness beyond those corpora. |
| SEM-001 | No semantic-axis signal at string level in the tested analysis. |
| SEM-002 | Result 1/4 against a criterion of at least 2/4; **criterion not met**. |

The Core-30 public registry records 30/30 entries across five designed axes. The prior README recorded a frozen September 2025 manifest SHA-256 prefix, `e87e920622671c6d…`. That prefix is quoted **exactly as it appeared there**, not presented as a complete digest; a full manifest hash was not found in this repository. See the [Core-30 registry and boundary](https://varzin.org/field-index.html#core30). The v2.2 manuscript reports a broader layer of 801 stable designed roots. These are not presented as 801 independently validated natural-language lexical items. The same manuscript reports an approximately 1.3-billion-form generated combinatorial corpus; later work adds a separate 300-word scale/generalization benchmark, a separate 360-word true-group-position benchmark, and a 10,800-record VARZIN V2 frozen dataset. These are distinct artifacts, not one silently enlarged Core-30 lexicon.

## Distinct AI results and protocol status

**VPE-001B+ — historical inter-model clustering.** The [LUXVAR preprint](VARZIN_preprint_v2.md) reports Claude/Gemini cluster ARI = 0.812, convergence on morpheme families, and mean ARI versus the designed axes = 0.150. The 0.812 figure measures **inter-model surface/morpheme agreement**, not semantic-axis or algebraic recovery. Its July 2026 correction says an earlier internal draft used 0.718 and that the author could not independently re-verify raw pairwise scoring at correction time. An earlier README also recorded 0.26 as a stale inter-AI figure. These are provenance cautions, not a new verification of 0.812.

**Track D — frozen, unremediated models.** The [August 2026 preprint addendum](VARZIN_preprint_v2.md) reports Mistral 7B ARI = -0.0337 and Llama 3 8B ARI = 0.0152 against intended axis/orbit labels. This is a negative result for those tested models under that protocol. It does not establish that every AI system fails or settle the effect of later training.

**Later trained remediation and composition — latest versioned evidence.** The Morphological Hijacking v3 record preserves strong targeted representation/group-position recovery after explicit training or projection while keeping that result distinct from spontaneous frozen-model recovery. The documented line includes frozen GPT2/Pythia/Mistral/Qwen failure under the adversarial baseline, trained GPT2/Mistral/Qwen recovery (including 1.000±0.000 / 0.957±0.090 / 0.880±0.115 in the stated configurations), a 300-word Appendix E scale test (pooled held-out-root ARI 0.992±0.007 under the easier same-script/same-order condition), and a separate 360-word Appendix F true-group-position benchmark with shuffled-label controls. Appendix F is classification/recovery, not composition. Appendix G then reports seen-pair MLP ≈0.996 but held-out TRUE 0.106 versus SHUFFLED 0.281 and WRONG_OP 0.175. The verified public v3 ZIP contains 40 entries, including scripts 01–25, the arbitrary-scale generator, the expanded-lexicon test, the preserved rejected leaking design, the corrected true-position control, and the composition diagnostic chain. VARZIN V2 independently reports frozen-Qwen surface-span mean BA 0.9666 across 29 indices while the preregistered composition phase returns 0/58 PASS. The V2 Zenodo record exposes the final PDF and the large `All code Phase.zip` reproducibility package. These are scoped experimental results, not a universal claim about all LLM algebra.

**VPE-001A — no human outcome.** The [human-study status page](https://varzin.org/vpe001a-status.html) is the common reference for current status and the distinction between the three designs. Later project documentation describes an N = 59 plan with three cohorts: Control, Affine Priming, and Morphological Priming. Recruitment has not commenced; **no human outcome is established**. The repository contains an older [Core-30 protocol design](VPE001A_protocol_design.md) specifying at least five blind raters and Fleiss kappa >= 0.40. That is **protocol history**, not the later three-cohort plan. The repository also contains other VPE-001 protocol material; the YEGJ8/2NKZA protocol identity relationship remains unresolved. IRB approval is declared in project documents; the approval certificate was not independently located in the audited artifact set.

---

## Applied research prototype

**VARZIN Cognitive CAPTCHA** now has two distinct delivery surfaces. The corrected local Streamlit MVP v1.0.2 completed the full 10-challenge flow without application exceptions. Separately, the VARZIN Cognitive Engine API is distributed commercially through RapidAPI (`varzin-cognitive-engine.p.rapidapi.com`) with a FastAPI origin hosted on Render (`varzin-engine-api.onrender.com`). The current live API contract is `GET /api/v1/generate?modulus=12&samples=5`; older material showing this call as POST is superseded. The public product page is https://varzin.org/cognitive-captcha.html and the commercial listing is https://rapidapi.com/varzin-labs-varzin-labs-default/api/varzin-cognitive-engine.

The academic/reproducibility layer remains the open Zenodo Level-1 software record at https://doi.org/10.5281/zenodo.22036769. Hosted SaaS availability, open research code, and scientific evidence are separate layers. The product is functional, but current evidence does not establish “machine-proof” behavior, 99.98% accuracy, production false-positive/false-negative rates, or general resistance to modern automated systems.

## Current research records

The publication and archive registry is maintained at:

**https://varzin.org/all-dois.html**

Current project-listed public Zenodo records include:

The current public titles, version labels, publication dates and creator strings were cross-checked against the Zenodo REST API on 2026-09-14; creator name order/casing varies across deposits, while ORCID 0009-0000-4690-6842 provides the normalized researcher identity.

- **Morphemes vs. Manifolds: Diagnosing Structural Blindness and Morphological Hijacking in Large Language Models via Finite Affine Orbits** (v1.0.0)
  https://doi.org/10.5281/zenodo.22101179

- **VARZIN V2 — Recoverable but Not Composable: Representation Recovery and Systematic Composition in a Frozen Language Model** (V1.0)
  https://doi.org/10.5281/zenodo.22679978

- **LUXVAR: A Constructed Language with Distinctive Morphemic Structure and AI-Recoverable Morpheme Families** (v2.2)
  https://doi.org/10.5281/zenodo.22115483

- **VARZIN Level-1 Computational Stack: Finite Affine Core, Genomic Scanner, and Torus Manifold Solver** (v2.0.0)
  https://doi.org/10.5281/zenodo.22036769

- **Morphological Hijacking in Frozen Language Models: A Contrastive, Symmetry-Regularized Projection Head for Algebraic Structure Recovery** (v1)
  https://doi.org/10.5281/zenodo.22258644

- **Morphological Hijacking in Frozen Language Models: A Contrastive, Symmetry-Regularized Projection Head for Algebraic Structure Recovery** (v2)
  https://doi.org/10.5281/zenodo.22262388

- **Morphological Hijacking in Frozen Language Models: A Contrastive, Symmetry-Regularized Projection Head for Algebraic Structure Recovery** (v3)
  https://doi.org/10.5281/zenodo.22287006

- **OSF record**
  https://doi.org/10.17605/OSF.IO/YEGJ8

The historical LUXVAR title retains the phrase “AI-Recoverable” for citation continuity. The current project interpretation does not treat independent AI recovery of the intended semantic axes as an established result. The three projection-head deposits are separate version-specific records; later intervention/training results are not treated as spontaneous frozen-model recovery.

DOI 10.5281/zenodo.22115483 is now listed as the public LUXVAR v2.2 record. The relationship to the older 20691858 identity remains a historical provenance question. For that mapping and the 29 earlier records removed from public access by the author, use the registry above. Platform-specific archival status is not generalized here.

---

## Reproducibility

The repository contains a mixture of:

- research documentation,
- computational code,
- deterministic artifacts,
- web presentation material,
- historical project records.

Reproducibility claims should be tied to the specific artifact or release being cited. Do not infer that every historical page or file represents the current scientific position of the project.

When possible, verify:

1. the exact release or DOI,
2. the code/artifact version,
3. the stated assumptions,
4. whether the result is mathematical, computational, empirical, or exploratory,
5. whether later corrections or negative results supersede an earlier interpretation.

---

## LUXVAR

LUXVAR is treated here as a **constructed symbolic system** with deliberately designed structural regularities.

Current evidence supports analysis of:

- morphemic structure,
- phonotactic regularities,
- finite-state or affine representations used by the project,
- computational distinguishability under specified procedures.

Current evidence does not establish independent semantic recovery of the designed axes.

---

## Historical symbolic vocabulary / design lineage

Earlier VARZIN materials used the bilingual identity “VARZIN: Open Code of Light / وارزین: کد باز نور” and terms such as:

- ELŪZ–MAHAR,
- KALTŪR,
- ETFM (Earth–Torus Field Model, a geometric visualization model),
- QMSG and RAHTALĒN–13,
- 474 Hz / 528 Hz / 777 Hz references,
- resonance-field and consciousness-field language.

These materials are retained for design lineage and provenance, not as current scientific conclusions. They do not establish physical fields, consciousness effects, quantum mechanisms, biological frequency effects, or causal resonance. The historical ETFM parameterization was written as `r(θ, φ) = R + r₀·cos θ`; it is a symbolic/geometric model description, not a measured Earth-field equation.

Historical pages may therefore be archived or marked `noindex` while remaining publicly accessible for auditability.

---

## Key project pages

- Research portal: https://varzin.org
- Research status / field index: https://varzin.org/field-index.html
- Research atlas: https://varzin.org/atlas.html
- Publications & archive registry: https://varzin.org/all-dois.html
- VPE-001 protocol: https://varzin.org/vpe001-protocol.html
- Contact: https://varzin.org/feedback.html

---

## Citation

Do not cite the repository generically when a specific research record is available.

Use the citation metadata in `CITATION.cff` and cite the specific DOI or release associated with the result being used.

Current repository citation guidance:

> Nirouyar, Reza. VARZIN Research Portal and Reproducibility Materials. VARZIN Project.

For result-specific citation, consult:

https://varzin.org/all-dois.html

---

## Researcher

**Reza Nirouyar**
Independent Researcher — VARZIN Project

- ORCID: https://orcid.org/0009-0000-4690-6842
- GitHub: https://github.com/Varzin-13
- Website: https://varzin.org
- Contact: contact@varzin.org

---

## Archive policy

VARZIN uses an evidence-first archive policy:

- corrected interpretations remain traceable;
- negative results remain visible;
- historical claims are not silently rewritten as current findings;
- superseded material is labeled rather than erased where practical;
- current scientific claims are separated from symbolic or exploratory material.

This repository should be read as an evolving reproducibility and audit record, not as a claim that every historical document remains scientifically current.
