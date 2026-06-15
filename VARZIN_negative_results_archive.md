# VARZIN Negative Results Archive
**Date:** June 2026 | **Status:** Archived — computational phase complete

This document archives all confirmed negative findings from Phases I–VI.
Negative results are reported here as first-class scientific outcomes.

---

## 1. Hexacore Hypothesis — REJECTED (Phase I)

**Claim:** LUXVAR roots naturally cluster into 6 semantic groups (Hexacore).

**Test:** k-means clustering (k=2–12), elbow detection, N=1.3B corpus.

| Metric | Value |
|--------|-------|
| Natural elbow | k=3 (SSE drop=11.15%) |
| k=6 SSE drop | −1.07% (negative) |
| Verdict | **REJECTED** |

**Implication:** The designed 6-axis structure is not reflected in natural morphological clustering. The corpus organizes into 3 natural clusters, not 6.

---

## 2. Root→Field/Frequency Correlation — NOT FOUND (Phase I)

**Claim:** Roots are statistically associated with their assigned field or frequency class.

**Test:** Cramér's V at N=2,000,000.

| Metric | Value |
|--------|-------|
| V(root, field) | < 0.02 |
| V(root, frequency) | < 0.02 |
| H/H_max (generator) | 0.9995 |

**Verdict:** No detectable first-order correlation. This is a **design property**, not a null result — the generator deliberately eliminated these correlations.

---

## 3. String-Level Semantic Axis Recovery — NOT FOUND (SEM-001)

**Claim:** The five semantic axes (LIGHT/REFLECTION/SILENCE/GATE/MOTION) are detectable from word-form similarity.

**Test:** Bigram similarity, edit distance, prefix cohesion on Core-30.

**Verdict:** No axis clustering detected. Designed axes are not the natural phonetic grouping.

---

## 4. Graph-Level Semantic Axis Recovery — CRITERION NOT MET (SEM-002)

**Claim:** Axes are detectable in a word-recurrence graph.

**Test:** Symbol recurrence network — T1 modularity, T2 stability, T3 family density, T4 frequency prediction. Criterion: ≥2/4 positive.

| Test | Result |
|------|--------|
| T1 modularity | Weak positive |
| T2 stability | Negative |
| T3 family density | 2/5 families |
| T4 frequency prediction | Δmaj=−1.4% |
| **Score** | **1/4 — NOT MET** |

---

## 5. Frequency Encoding in Word Form — CONFIRMED ABSENT (T4, E1)

**Claim:** Frequency class (144/432/474/528/777Hz) is encoded in word form.

**Tests:** T4 (Structure Battery), E1 (Final Benchmark). N=692–704 labeled roots, 21 frequency classes.

| Test | Accuracy | Δ majority | Verdict |
|------|----------|-----------|---------|
| T4 (word form only) | 13.2% | −2.6% | Negative |
| E1 (word form only) | 12.8% | −3.6% | Negative |

**Verdict: CONFIRMED ABSENT** — replicated across two independent tests with sufficient sample size.

---

## 6. Frequency Encoding in Context — CONFIRMED ABSENT (FREQ-002, E2)

**Claim:** Frequency is predictable from word form + morpheme family + protocol combined.

**Tests:** FREQ-002, E2. Same sample.

| Test | Accuracy | Δ majority | Verdict |
|------|----------|-----------|---------|
| FREQ-002 (word+family+protocol) | 14.2% | −1.6% | Negative |
| E2 (word+family+protocol) | 13.6% | −2.7% | Negative |

**Verdict: CONFIRMED ABSENT** — even with full context, frequency is not recoverable. Frequency labels function as **symbolic annotations**, not computationally encoded structure.

---

## 7. Semantic Axes — NOT COMPUTATIONALLY SUPPORTED (AFD-001, AXIS-002)

**Claim:** The five designed axes are recoverable from any feature combination.

**Test:** AFD-001 with shuffle control. Five feature sets tested.

| Feature set | Real accuracy | Shuffle mean | Δ above shuffle |
|-------------|---------------|-------------|----------------|
| Word Form only | — | — | below shuffle |
| Family only | — | — | below shuffle |
| Protocol only | — | — | below shuffle |
| Family + Protocol | — | — | below shuffle |
| All features | — | — | below shuffle |

**Verdict:** No feature set predicts axes above shuffle control. **Axes are computationally unsupported.**

Note: AXIS-002 (without shuffle control) showed best_delta=+23.3% using AI cluster labels, suggesting *partial* overlap between AI-recovered morpheme families and designed axes. This is not sufficient for a positive claim.

---

## 8. Out-of-Family Generalization — NEGATIVE (OFG-001)

**Claim:** A model trained on known families can generalize to an unseen family.

**Test:** Leave-one-family-out cross-validation.

**Verdict:** Mean delta negative. LUXVAR's learned structure does not generalize to unseen families — the model memorizes existing families rather than learning a productive rule.

---

## 9. Generative Grammar — NOT CONFIRMED (GVT-001 Condition B)

**Claim:** Family+Protocol rules can generate phonotactically valid new family members.

**Test:** GVT-001 Condition B — blind generation (no shared morpheme with training set).

| Metric | Value |
|--------|-------|
| Blind accuracy | 8.3% |
| Chance level | 14.3% |
| Verdict | **Below chance** |

**Verdict:** The current Family-Protocol description does not constitute a productive generative grammar. LUXVAR structure is recognizable but not yet shown to be generative.

---

## Summary

| # | Claim | Status |
|---|-------|--------|
| 1 | Hexacore (k=6) | ❌ Rejected |
| 2 | Root→Field/Freq correlation | ❌ Not found (by design) |
| 3 | String-level axis recovery | ❌ Not found |
| 4 | Graph-level axis recovery | ❌ Criterion not met |
| 5 | Frequency in word form | ❌ Confirmed absent (×2) |
| 6 | Frequency in context | ❌ Confirmed absent (×2) |
| 7 | Semantic axes | ❌ Not computationally supported |
| 8 | Out-of-family generalization | ❌ Negative |
| 9 | Generative grammar | ❌ Not confirmed |

**9 hypotheses tested — 9 negative results documented.**

These negatives are not failures — they define the boundary of what LUXVAR is:
a morphemic-protocolic system with sub-character phonotactic grounding,
not a frequency-semantic language or a productive generative grammar.

---

*VARZIN Project · Reza Nirouyar · ORCID: 0009-0000-4690-6842*
*varzin.org · DOI: 10.5281/zenodo.20691858*
