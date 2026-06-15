# VPE-001A — Human Rater Study Protocol
**Pre-registered design · Not yet executed**
**Date drafted:** June 2026

---

## Research Question

Do naive human raters group Core-30 LUXVAR words by:
- **Morpheme families** (ELUZ/SHA/NAR) — as AI systems do (VPE-001B+, ARI=0.812)
- **Semantic axes** (LIGHT/REFLECTION/SILENCE/GATE/MOTION) — as designed
- **Something else** — neither of the above

All three outcomes are scientifically interpretable.

---

## Participants

| Parameter | Value |
|-----------|-------|
| Minimum n | 5 raters |
| Target n | 10–15 raters |
| Inclusion | No prior LUXVAR knowledge |
| Exclusion | Any exposure to VARZIN project, conlang research, or this paper |
| Recruitment | Convenience sample — colleagues, online volunteers |

**Blinding:** Raters receive no information about family structure, axes, or frequencies. Only the 30 words are shown.

---

## Materials

**The 30 words (Core-30):**

```
ELUZ-MAHAR, SARTHAL, SHARUM-DOZ, XANORAH, MATIR-ELUZ, ANUR,
SHAUREN, RAHMOT-SHA, HALZAR, BANIR-RAHT, SHUKAR-MAH, NAZRUK,
NARAH-SHA, GON-SIL, VARKHAN, SHALOM-HATTAH, NARAH, NEMRUH,
SAR-ELUZ, SAVAR-ELUZ, DARZAN, RAZKAN, ELURIM, RITAM,
ZARTH, ZUN-NAR, KHALTUR, KUZTUR, TARHAN-ELUZ, KHIRZAH
```

**Instructions to raters (verbatim):**

> *"You are looking at 30 words from a constructed language you have never seen before. Please group these words into however many groups feel natural to you (between 2 and 8 groups). There are no right or wrong answers — use whatever feels most natural. You may use sound, spelling, or any other pattern you notice. For each group, give it a name or description in one or two words."*

**Format:** Card sorting (physical or digital). Each word on a separate card/tile.

---

## Scoring

### Primary metric: Fleiss κ

| κ | Interpretation |
|---|---------------|
| < 0.20 | Slight agreement |
| 0.21–0.40 | Fair |
| **0.41–0.60** | **Moderate — primary threshold** |
| 0.61–0.80 | Substantial |
| > 0.80 | Almost perfect |

**Primary threshold:** κ ≥ 0.40 (pre-registered)

### Secondary metrics

| Metric | Computation |
|--------|-------------|
| ARI vs true axes | adjusted_rand_score(rater_labels, true_axis_labels) |
| ARI vs morpheme families | adjusted_rand_score(rater_labels, family_labels) |
| NMI vs axes | normalized_mutual_info_score(...) |
| Inter-rater ARI | Mean pairwise ARI across all rater pairs |
| Mean n_groups | Average number of groups per rater |

---

## Power Analysis

With n=5 raters and 30 items:
- Fleiss κ ≥ 0.40 is detectable with reasonable confidence
- For κ ≥ 0.60, n=5 is sufficient
- Recommended: n≥10 for publication-grade power

---

## Key Research Outcomes

| Result | Interpretation |
|--------|---------------|
| κ ≥ 0.40 + ARI_family > ARI_axes | Humans group by morpheme (same as AI) |
| κ ≥ 0.40 + ARI_axes > ARI_family | Axes exist in cognitive layer (not surface) |
| κ ≥ 0.40 + both ARI low | Novel cognitive structure (neither AI nor designer) |
| κ < 0.40 | No consistent human grouping — structure may be idiosyncratic |

---

## What This Test Settles

**If humans → morpheme families (like AIs):**
> Morpheme-family organization is the primary cognitive unit of LUXVAR. Designed axes are a secondary abstraction.

**If humans → semantic axes:**
> Semantic axes exist in a cognitive layer inaccessible to computational analysis. The gap between AI and human structure is real and meaningful.

**If κ < 0.40:**
> LUXVAR's structure is not reliably perceived by naive observers. This is also a valid scientific result.

---

## Timeline

| Step | Action |
|------|--------|
| 1 | Recruit ≥5 blind raters |
| 2 | Administer card-sort (20–30 min per rater) |
| 3 | Score: Fleiss κ, inter-rater ARI, ARI vs axes/families |
| 4 | Compare human groupings to AI groupings (VPE-001B+) |
| 5 | Write Paper B |

---

*Pre-registered protocol · VPE-001A · VARZIN Project*
*Reza Nirouyar · ORCID: 0009-0000-4690-6842*
