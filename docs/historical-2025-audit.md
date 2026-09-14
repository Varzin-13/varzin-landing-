# VARZIN 2025 historical scientific re-audit

This internal/public audit note records the September 2026 forensic re-analysis of the downloaded 2025 VARZIN Zenodo archive. It preserves provenance while separating reproducible computational artifacts from unsupported or statistically invalid scientific interpretations.

## Decisive findings

- **QMSG raw-data reanalysis:** released observed counts are `[19, 12, 23]`. Under the report's own 5:4:5 null, expected counts are `[19.2857, 15.4286, 19.2857]`, giving chi-square = **1.48148**, df=2, **p=0.4767606**. The later `[190,120,230]` scaling multiplies chi-square by ten without new independent observations and creates artificial significance.
- **ETFM provenance mismatch:** Phase-1 pack reports `R0=0.400`, `R1=0.705`, `RMS=0.1426647112`; the narrative report lists `R0=0.708`, `R1=0.654`, `RMS=0.129`.
- **ETFM null re-test:** 2,000,000 random 12-node sphere sets under the same axis convention yielded `P(RMS <= 0.1426647112) ≈ 0.3282`; roughly 38.3% passed the historical 0.15 threshold. The observed fit is not exceptional.
- **SETI/QMSG audio:** `luxvar_seti_qmsg.py` explicitly synthesizes 144→474 Hz and 474→777 Hz chirps. Spectral peaks at those frequencies are therefore by construction.
- **Genomics:** no FASTA/FASTQ/BAM/SAM/VCF/BED files were found in the re-extracted archive. The genomic-activation conclusion lacks a genomic measurement layer.
- **P=NP:** the historical HTML argument assumes a polynomial-time `g` agreeing with an NP function and then concludes P=NP; this is circular. Five subset-sum demonstrations cannot establish the universal result.

## Reclassification rule

Historical documents remain part of the public record. Their titles and original claims are not silently rewritten. Current scientific status is assigned from released data, code, assumptions, null models, negative results, and reproducibility.

## Salvageable layers

LUXVAR remains usable as a constructed symbolic-language artifact. Descriptive calendar statistics, manifests/checksums, standard geometry, deterministic signal-generation code, and other reproducible computations can remain useful when their claims are narrowed to what the artifacts actually establish.
