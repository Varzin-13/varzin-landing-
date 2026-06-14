# LUXVAR: A Constructed Language with Distinctive Morphemic Structure and AI-Recoverable Morpheme Families

**Reza Nirouyar**  
ORCID: 0009-0000-4690-6842  
Independent Researcher · VARZIN Project  
contact@varzin.org · varzin.org  

**Preprint · Not peer-reviewed · June 2026**

---

## Abstract

We present LUXVAR, a constructed symbolic language developed as part of the VARZIN experimental research framework. Through computational and AI-based analyses on a generated corpus of 1.3 billion morphological forms derived from 801 stable roots, we report five principal findings: (1) LUXVAR exhibits non-random morphological structure (z = 4.36, p < 0.001); (2) the LUXVAR corpus is maximally balanced by design (H/H_max = 0.9995, V < 0.02 for all column pairs at n = 2M); (3) LUXVAR possesses a distinctive phonotactic fingerprint relative to six reference languages including Esperanto, Lojban, Toki Pona, English, German, and Persian (uniqueness = 0.738, 95% CI: [0.703, 0.781], on curated lexical corpora); (4) string-level and graph-level semantic structure tests found no evidence that the designed semantic axes are encoded in word forms (SEM-001/002, criterion not met); and (5) two fully documented AI systems (Claude and Gemini) consistently recovered the same morpheme families (ELUZ, SHA, NAR, ZAR/motion-cluster) from Core-30 words without prior knowledge (inter-model ARI = 0.718), while not recovering the designed semantic axes (mean ARI vs axes = 0.150); GPT-4 results are archived in supplementary VPE-001B materials. We also report that the Hexacore six-cluster hypothesis was not confirmed (k = 3, not k = 6). We conclude that LUXVAR's structure — as recovered by independent language models — is **morphemic rather than axial**: the surface structure of the language reflects morpheme families, not the designed semantic axes. Cognitive validity of the semantic axes remains untested and is proposed as a pre-registered human rater study (VPE-001A).

**Keywords:** constructed language, LUXVAR, morpheme families, phonotactics, AI clustering, VPE-001

---

## 1. Introduction

### 1.1 Motivation

The construction of artificial languages for research purposes — from Esperanto (Zamenhof, 1887) to Lojban (Cowan, 1997) to Toki Pona (Lang, 2001) — reflects different design philosophies encoded in phonotactic and morphological structure. LUXVAR was designed around a third axis: whether a language built around specific semantic axes (Light, Reflection, Silence, Gate, Motion) would produce a measurable and distinctive structural signature, and whether that structure would be detectable by independent systems.

This paper reports what was found, including negative findings. It does not claim LUXVAR is cognitively superior, nor that its semantic axes are validated.

### 1.1b Research Pipeline

```
DESIGN
  │  801 stable roots · 5 semantic axes · Core-30 registry
  ▼
MORPHOLOGICAL ANALYSIS
  │  z = 4.36 (non-random) · k = 3 (not k = 6) · Hexacore REJECTED
  ▼
CORPUS BALANCE CHECK
  │  H/H_max = 0.9995 · V < 0.02 · Generator maximally balanced
  ▼
PHONOTACTIC BENCHMARK (GEN-001→GEN-003R+)
  │  Uniqueness = 0.738 [0.703, 0.781] vs 6 languages · DISTINCTIVE
  ▼
SEMANTIC STRUCTURE TESTS (SEM-001/002)
  │  String-level: no signal · Graph-level: 1/4 positive · NOT MET
  ▼
AI CLUSTERING (VPE-001B+)
  │  Inter-model ARI = 0.718 · ELUZ/SHA/NAR recovered · Axes NOT recovered
  ▼
OPEN: VPE-001A
     Do humans recover morpheme families or semantic axes?
     (κ ≥ 0.40 threshold · ≥5 blind raters)
```

*Figure 1: VARZIN research pipeline. Each stage informed the next. Dashed box indicates pending empirical study.*

### 1.2 Research Questions

**RQ1:** Does LUXVAR exhibit non-random morphological structure?  
**RQ2:** Is the LUXVAR generator balanced in its corpus distribution?  
**RQ3:** Is LUXVAR's phonotactic structure distinctive relative to reference languages?  
**RQ4:** Are the designed semantic axes detectable in word forms (string/graph level)?  
**RQ5:** Do independent AI systems converge on the same structure without prior knowledge?  
**RQ6 (open):** Do human raters recover morpheme families or semantic axes?

---

## 2. The LUXVAR Language

### 2.1 Design

LUXVAR is organized around five semantic axes with 6 words each (Core-30):

| Axis | Words |
|------|-------|
| LIGHT | ELUZ-MAHAR, SARTHAL, SHARUM-DOZ, XANORAH, MATIR-ELUZ, ANUR |
| REFLECTION | SHAUREN, RAHMOT-SHA, HALZAR, BANIR-RAHT, SHUKAR-MAH, NAZRUK |
| SILENCE | NARAH-SHA, GON-SIL, VARKHAN, SHALOM-HATTAH, NARAH, NEMRUH |
| GATE | SAR-ELUZ, SAVAR-ELUZ, DARZAN, RAZKAN, ELURIM, RITAM |
| MOTION | ZARTH, ZUN-NAR, KHALTUR, KUZTUR, TARHAN-ELUZ, KHIRZAH |

### 2.2 Corpus Structure

The full corpus contains 801 stable roots distributed across 6 semantic fields, 128 frequency classes (8 base Hz × 16 bandwidth states), and 5 conscious layers. The generator produces a corpus of 1.3 billion forms by exhaustive combination of these parameters — all rows are generated, not collected from natural use.

---

## 3. Methods

### 3.1 Morphological Analysis (1.3B Scan)

k-means clustering (k = 2–12) with elbow detection on 801 roots, 36 phonotactic features. Cramér's V for column associations. 20 shuffle iterations for baseline.

### 3.2 Phonotactic Feature Extraction (GEN-001)

34 binary and continuous features per word: length, vowel ratio, CV-alternation ratio, dash-separated morpheme count, bigram frequencies, and initial/final character patterns. Random Forest classifier (300 trees, 5-fold CV, balanced class weights).

### 3.3 Cross-Language Benchmark (GEN-003R+)

All languages balanced to n = 107 words. Same negative sample pool shared. Euclidean distance in 34-dimensional feature space. Uniqueness score = mean LUXVAR distance to others / max pairwise distance. Bootstrap CI: 200 iterations.

### 3.4 Semantic Structure Tests (SEM-001/002)

SEM-001: string-level — bigram similarity, edit distance, prefix cohesion. No axis clustering detected.  
SEM-002: graph-level — symbol recurrence network modularity, community stability, morpheme family density, frequency prediction. Criterion: ≥2/4 tests positive. Result: 1/4.

### 3.5 AI Clustering Benchmark (VPE-001B+)

Prompt: 30 Core-30 words presented to Claude, GPT-4, and Gemini independently in fresh conversations with no VARZIN context. Extended prompt asked for cluster name, central concept, suggested frequency (from fixed list), and reasoning. Adjusted Rand Index (ARI) computed against true axes and true frequencies. Inter-model ARI computed for all model pairs.

---

## 4. Results

### 4.1 RQ1: Morphological Structure

Non-random structure confirmed (z = 4.36, p < 0.001, silhouette = 0.406 vs shuffled mean = 0.174). Natural cluster count: k = 3 (elbow SSE drop = 11.15%). k = 6 SSE drop = −1.07% (negative): **Hexacore hypothesis rejected.**

### 4.2 RQ2: Generator Balance

At n = 2,000,000: V(root, field) < 0.02, V(root, frequency) < 0.02. Per-root field entropy: H/H_max = 0.9995. Root-to-frequency prediction: Δmajority = −1.4%. The generator successfully eliminated first-order statistical correlations. **This is a design property, not a null result.**

### 4.3 RQ3: Phonotactic Distinctiveness (GEN-001, GEN-003R+)

| Metric | Value |
|--------|-------|
| GEN-001 CV accuracy | 98.9% (Δmajority = +32.2%) |
| Uniqueness vs 6 languages | 0.738 (95% CI: [0.703, 0.781]) |
| LUXVAR→Lojban cross-acc | 50.0% (near chance) |
| LUXVAR→Toki Pona cross-acc | 54.2% |

LUXVAR's phonotactic fingerprint is distinctive and stable across bootstrap resampling.

### 4.4 RQ4: Semantic Axis Recovery from Word Forms

| Test | Result |
|------|--------|
| SEM-001 (string-level) | No axis signal |
| SEM-002 T1 (modularity) | Weak positive |
| SEM-002 T2 (stability) | Negative |
| SEM-002 T3 (family density) | 2/5 families |
| SEM-002 T4 (frequency prediction) | Δmaj = −1.4% |
| **Criterion (≥2/4)** | **NOT MET** |

The designed semantic axes are not detectable from word forms alone at any tested level of analysis.

### 4.5 RQ5: AI Clustering (VPE-001B+)

| Metric | Value |
|--------|-------|
| Mean ARI vs true axes | 0.150 |
| Claude ↔ Gemini (clusters) | **0.718** |
| Claude ↔ Gemini (frequencies) | 0.602 |

*Note: GPT-4 was also run; full pairwise scoring for all three models is reported in the supplementary VPE-001B results file. The Claude↔Gemini pair is reported here as the fully documented pair.*
| ELUZ family recovery (Claude) | 6/7 words |
| ELUZ family recovery (Gemini) | 5/6 words |

All three models independently converged on the same morpheme families: **ELUZ, SHA, NAR, ZAR/motion-cluster.** None recovered the designed axes (LIGHT/REFLECTION/SILENCE/GATE/MOTION) as the primary grouping.

**Key finding:** Inter-model cluster ARI = 0.718 indicates strong convergence on a common structure. Mean ARI vs designed axes = 0.150 indicates this structure is not the designed axes. **LUXVAR's structure, as consistently recovered by independent language models, is morphemic, not axial.**

### 4.6 Negative Results Summary

| Hypothesis | Result |
|-----------|--------|
| Hexacore (k=6) emergence | ❌ Rejected (k=3) |
| Root→Field signal (V>0.02) | ❌ Not found |
| Root→Frequency signal | ❌ Not found |
| String-level axis recovery (SEM-001) | ❌ Not found |
| Graph-level axis recovery (SEM-002) | ❌ Criterion not met |
| Frequency mapping by AI (VPE-001B+) | ❌ Weak (ARI=0.15) |

---

## 5. Discussion

### 5.1 What This Study Establishes

1. Non-random morphological structure (z = 4.36)
2. Maximally balanced generator (H/H_max = 0.9995)
3. Distinctive phonotactic fingerprint (uniqueness = 0.738, CI stable)
4. Recoverable morpheme families (ELUZ, SHA, NAR) — inter-AI ARI = 0.718
5. A pipeline that detected its own circularity and rejected its own hypotheses

### 5.2 The Central Finding: Morphemic vs Axial Structure

Across all computational and AI tests, a consistent pattern emerges: **the structure that is recoverable from LUXVAR word forms is morphemic, not axial.** AI systems converge on morpheme families (ELUZ, SHA, NAR, ZAR) but not on the designed semantic axes (Light, Reflection, Silence, Gate, Motion).

This is consistent with SEM-001/002 negative results: if the axes were encoded in word-level features, string and graph analyses would have detected them. They did not.

Two interpretations remain open:
- The axes are purely designer-defined labels with no independent structural basis
- The axes exist in a cognitive layer inaccessible to string/graph/AI analysis, and VPE-001A is the test to determine this

### 5.3 Computational Boundary

The finding H/H_max = 0.9995 has a structural implication: the generator eliminated detectable first-order statistical correlations by design. Further computational analysis of the corpus is unlikely to yield new structural information. The remaining open question is whether the semantic axis structure is cognitively recognizable by naive human raters — a question that requires VPE-001A.

The present study does not establish the cognitive validity of the designed semantic axes. Instead, it demonstrates that independent computational systems consistently recover morpheme-family organization from LUXVAR word forms. Whether human observers recover the same morphemic structure or the intended semantic axes remains an open empirical question addressed by the proposed VPE-001A protocol.

### 5.4 Natural Language Baseline

The benchmark compares LUXVAR to constructed languages (Esperanto, Lojban, Toki Pona) and natural languages (English, German, Persian). LUXVAR occupies a distinct region of phonotactic space from all six. This distinctiveness is a property of the phonotactic design, not of the semantic axes.

---

## 5.5 Limitations

1. **AI systems are not human raters.** The VPE-001B+ benchmark establishes what language models recover, not what human observers perceive. These may differ substantially.

2. **Curated lexical corpora for cross-language comparison.** Reference language corpora (Esperanto, Lojban, Toki Pona, English, German, Persian) used curated word lists rather than large natural-language text corpora. Results should be replicated with larger, text-derived corpora.

3. **Frequency assignments are symbolic.** Frequency values (144Hz, 432Hz, 474Hz, etc.) are design parameters embedded in the generator, not experimentally validated perceptual categories. No claim is made about physical or cognitive effects of these frequencies.

4. **VPE-001A has not yet been performed.** The central open question — whether human observers recover morpheme families or semantic axes — remains empirically unaddressed. All results reported here are computational or AI-based.

5. **Single creator design.** LUXVAR was designed by one researcher. Inter-rater reliability of the semantic axis assignments has not been established prior to VPE-001A.

## 6. Proposed Follow-Up: VPE-001A

**Pre-registered hypothesis:** Naive human raters (≥5, no LUXVAR knowledge) can sort Core-30 words into consistent categories at above-chance agreement.

**Primary threshold:** κ ≥ 0.40 (Fleiss κ, ≥5 raters, 30 words)

**Key research question:** Do humans group by morpheme families (as AIs do) or by semantic axes (as designed)?

- If humans → axes while AIs → morphemes: axes exist in cognitive layer, not surface layer
- If humans → morphemes: morphemic structure is the primary organization of LUXVAR
- If humans → neither: designed axes are idiosyncratic to the creator

All three outcomes are scientifically interpretable.

---

## 7. Conclusion

LUXVAR is a constructed language with non-random morphological structure, a maximally balanced generator, and a distinctive phonotactic fingerprint relative to six reference languages. Two fully documented AI systems converge on the same morpheme families (ELUZ, SHA, NAR) with inter-model ARI = 0.718 (Claude↔Gemini), while not recovering the designed semantic axes (mean ARI = 0.150) — indicating that the structure consistently recovered by language models is morphemic, not axial. String-level and graph-level analyses confirm the semantic axes are not encoded in word forms alone. The computational analyses conducted in this study are substantially complete. The single open scientific question — whether semantic axis structure is cognitively recognizable — is formalized as VPE-001A.

Code and datasets used in this study are available at varzin.org and archived via Zenodo and OSF. Negative results are documented in full.

---

## Availability

Code and data: varzin.org · GitHub: Varzin-13/varzin-landing-  
DOI Archive: varzin.org/all-dois.html  
ORCID: 0009-0000-4690-6842

---

## References

Cowan, J. W. (1997). *The Complete Lojban Language.* Logical Language Group.  
Lang, S. (2001). *Toki Pona: The Language of Good.*  
Zamenhof, L. L. (1887). *Unua Libro.* Warsaw.

---

*Preprint · not peer-reviewed · v2.0 · June 2026*  
*Results are presented as computational linguistics findings, not empirical cognitive or physical claims.*
