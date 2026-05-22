# LabSolution Technology — Product Catalog Spec Sheets

> Compiled 2026-05-20 for upload to https://www.labsolution-tech.com/
> Source-of-truth precedence: vendor service/installation manual in this repo →
> vendor brochure (textified sidecar) → official vendor product page → reputable
> distributor / academic source. Every clickable PDF link below opens to the
> exact cited page (`file://` URI; replace prefix with the GitHub permalink form
> if publishing externally — see CLAUDE.md §4 rule 4).
>
> **Catalog field schema (proposed standard for labsolution-tech.com):**
> Manufacturer · Model · Category · Methodology · Throughput · Sample type ·
> Sample volume · Test menu / parameters · Onboard reagents · Reaction /
> read-out · Dimensions (W×D×H) · Weight · Power · Environment · Connectivity ·
> Certifications · Intended use · Source citation.

---

## 1. SNIBE MAGLUMI X3 — Fully-automated Chemiluminescence Immunoassay (CLIA)

| Field | Value |
|---|---|
| Manufacturer | Snibe Diagnostic (Shenzhen) |
| Category | Mid-throughput CLIA immunoanalyzer |
| Methodology | Direct chemiluminescence (ABEI label) — single-cuvette reaction, 5-side heating at **37 ± 0.3 °C** |
| Throughput | **200 tests/hour** (≈ 294 T/h/m² — best-in-class footprint efficiency) |
| Sample positions | **72** |
| Reagent positions | **20**, integrated 24-hour refrigeration |
| Pipetting needle | Single Teflon-coated probe; liquid-level / clot / crash detection |
| Mixing | Non-contact vortex (multiple modes) |
| Test menu | ≥ 181 CLIA parameters (thyroid, fertility, infectious dz, tumor markers, cardiac, diabetes, anemia, prenatal, autoimmune, bone, growth) |
| Footprint | < 0.68 m² |
| Dimensions (W×D×H) | 900 × 750 × 780 mm (per third-party distributor data) |
| Weight | ≈ 181 kg |
| Certifications | CE, NMPA |
| Citations | [SNIBE MAGLUMI X3 IFU V1.4](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/SNIBE/MAGLUMI-X3/437-2-MAGLUMI-X3-IFU-en-V1.4.pdf) · [SNIBE official product page](https://www.snibe.com/en/product/CLIA_analyzer/43.html) |

---

## 2. SNIBE MAGLUMI X6 — Fully-automated Chemiluminescence Immunoassay (CLIA)

| Field | Value |
|---|---|
| Manufacturer | Snibe Diagnostic (Shenzhen) |
| Category | High-throughput floor-standing CLIA immunoanalyzer |
| Methodology | Direct chemiluminescence (ABEI label) — 243 simultaneous incubation cuvettes; 5-side heating at **37 ± 0.3 °C** |
| Throughput | **450 tests/hour** |
| Sample positions | **112** standard, **expandable to 412** (and TLA-link capable) |
| Reagent positions | **30**, 24-hour onboard refrigeration |
| Pipetting volume | **10 – 280 µL** |
| Walk-away tests | **Up to 2,000** |
| Test menu | Up to 260 parameters (full MAGLUMI CLIA panel) |
| Installation env. | 10 – 30 °C · ≤ 70 % RH · altitude ≤ 2000 m · pure-water conductivity ≤ 1 µs/cm · water pressure 0.1 – 0.5 MPa · flow ≥ 10 L/h · fuse 250 V / 6 A |
| Footprint (door clearance) | Base width 119 cm (with track) → 88 cm with full removable panel kit for narrow lab doors |
| Connectivity | TLA-ready, LIS bi-directional |
| Certifications | CE, NMPA |
| Citations | [SNIBE MAGLUMI X6 Installation Guide V3 (2023)](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/SNIBE/MAGLUMI-X6/Maglumi-X6-Installation-Guidance-V3-20230908-Trixie-EN.pdf) p.6-8 · [SNIBE official product page](https://www.snibe.com/en/product/CLIA_analyzer/42.html) |

---

## 3. DiaSys respons®240c — Bench-top Random-Access Clinical Chemistry

| Field | Value |
|---|---|
| Manufacturer | DiaSys Diagnostic Systems GmbH |
| Category | Compact bench-top clinical chemistry analyzer (small-to-medium lab) |
| Methodology | Colorimetry, turbidimetry, ISE* (optional upgrade kit); endpoint, fixed-time and kinetic |
| Throughput | **240 photometric tests/h** (up to **400 T/h with ISE**) |
| Sample type | Serum, urine, CSF, plasma, others |
| Sample volume | 2 – 35 µL (0.1 µL steps) |
| Reaction volume | 100 – 360 µL |
| Cycle time | 15 s; 73 total cycles |
| Onboard reagent | 36 items + 3 ISE items; **5 open channels** |
| Photometer | Holographic concave flat-field grating; **12 wavelengths 340 – 800 nm**, abs range 0 – 3.5 OD, maintenance-free |
| Reaction tray | 80 plastic cuvettes in 8 segments of 10; 5 mm optical path; 37 °C ± 0.3 °C air-bath |
| Sample tray | 36 positions; tubes Ø12-13 mm × 68.5-100 mm, or 0.5/2 mL cups |
| Water consumption | < 1.5 L/h |
| Dimensions (L×H×D) | **860 × 550 × 660 mm** |
| Weight | **115 kg** |
| Safety | Horizontal/vertical crash sensor · clot detection (pressure) · LLD (capacitance) · reagent preheating |
| Citations | [DiaSys respons 240c — System Overview](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/DIASYS/RESPONS-240C/1-System-Overview.pdf) p.1-5 · [respons 240c Operator's Manual V3.0](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/DIASYS/RESPONS-240C/respons240c_Operators-Manual_V3.0.pdf) |

---

## 4. DiaSys respons®420c — Bench-top Random-Access Clinical Chemistry

| Field | Value |
|---|---|
| Manufacturer | DiaSys Diagnostic Systems GmbH |
| Category | Mid-throughput bench-top clinical chemistry analyzer |
| Methodology | Colorimetry, turbidimetry, ISE; endpoint, fixed-time and kinetic; **HbA1c with onboard hemolysis** |
| Throughput | **420 photometric tests/h** (up to **626 T/h with ISE**) |
| Sample type | Serum, urine, CSF, plasma, others, **whole blood** |
| Sample volume | 2 – 45 µL (0.1 µL steps) |
| Reaction volume | 100 – 300 µL |
| Cycle time | 8.55 s; 39 total cycles |
| Onboard reagent | 40 items + 3 ISE items; 5 open channels; 2-fixed positions for water/saline + cleaner |
| Sample tray | **3 rings × 34 positions** (inner ring for STAT / calibrator / control / system solutions); virtual trays; barcode |
| Reagent tray | **42 positions**, **2 – 8 °C peltier-cooled** |
| Water consumption | ≤ 20 L/h |
| Dimensions (W×H×D) | **1050 × 1150 × 720 mm** |
| Weight | **200 kg** |
| Power | AC 100-240 V ± 10 %, 50/60 Hz, **1000 VA** (UPS ≥ 3000 VA recommended) |
| Environment | 15 – 30 °C ± 2 °C/h · 35 – 85 % RH |
| Citations | [DiaSys respons 420c — System Overview](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/DIASYS/RESPONS-420C/System-Overview-420c.pdf) p.1-4 |

---

## 5. DiaSys respons®600c — Random-Access Clinical Chemistry (medium-size lab)

| Field | Value |
|---|---|
| Manufacturer | DiaSys Diagnostic Systems GmbH |
| Category | Medium-throughput floor-standing clinical chemistry analyzer |
| Methodology | Colorimetry, turbidimetry, ISE (integrated **Na, K, Cl** — 3 channels) |
| Throughput | **600 tests/h** (**800 T/h with ISE**) |
| Sample loading | Rack loader; **120 sample positions** in 12 racks; up to **30 STAT** positions; continuous loading |
| Reagent storage | **37 respons® containers**, refrigerated **2 – 8 °C** |
| Photometer | Grating photometer, **16 wavelengths** (340, 380, 412, 450, 480, 505, 546, 570, 605, 630, 660, 700, 740, 770, 800, 850 nm); photometric linearity **0 – 3.5 OD**; maintenance-free |
| Reaction unit | 124 cuvettes · 8-step auto-washing · contact-heating cuvette thermostat |
| Dimensions (W×D×H) | **138 × 86 × 120 cm** |
| Weight | ≈ **350 kg** |
| Water consumption | < 25 L/h |
| Citations | **No local manual in repo.** [DiaSys official respons®600c product page](https://www.diasys-diagnostics.com/products/instruments/respons-c-line/respons600c/) |
| Note | "Based on web-sourced vendor data (not verified against an in-repo service manual) — engineer should confirm power supply / certifications at site survey." |

---

## 6. Medica EasyLyte® — Direct-Measurement Electrolyte Analyzer

| Field | Value |
|---|---|
| Manufacturer | Medica Corporation (Bedford, MA, USA) |
| Category | Bench-top electrolyte analyzer (ISE direct-measurement) |
| Available configurations | **Na/K** · **Na/K/Cl** · **Na/K/Li** · **Na/K/Ca/pH** |
| Sample type | Whole blood, serum, plasma, **urine** (urine measurable on Na/K, Na/K/Cl, Na/K/Li configurations only) |
| Sample volume | **≈ 100 µL** whole blood / serum / plasma; **≈ 400 µL** diluted urine; **60 µL** capillary mode (Na/K and Na/K/Cl only) |
| Analysis time | ≈ **60 s** blood cycle; ≈ **90 s** urine cycle |
| Calibration | **Automatic recalibration every 4 hours**; STAT-capable |
| Electrode set | Na, K, Cl/Li (interchangeable), reference; or Na, K, Ca, pH, disposable reference (depending on configuration). Internal filling solution = 2 mol/L KCl salt bridge |
| Reagent system | Patented modular **solutions pack** (also functions as waste receptacle); 800 mL pack good for ≈ **1,200 samples** |
| Optional autosampler | **EasySampler** — 24-position carousel (21 sample + 1 STAT + 2 QC) |
| Display / printer | LCD with Yes/No-prompted UI; **integrated thermal printer** |
| Connectivity | RS-232 serial, LIS interface |
| Intended use | In Vitro Diagnostic Use (IVD) |
| Citations | [Medica EasyLyte C-series Service Manual REF 2288](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/MEDICA/EL-Files/EL-C-Service-Manual.pdf) p.7-13 · [EasyLyte Operator's Manual EN R7](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/MEDICA/EL-Files/EL-Operators-Manual-English-R7.pdf) · [Medica Corp product page](https://www.medicacorp.com/products/electrolyte-analyzers/easylyte/) |

---

## 7. Bionime GE100 (a.k.a. "GE 100") — Blood Glucose Monitoring System

| Field | Value |
|---|---|
| Manufacturer | Bionime Corp. (distributed under "GE100" / Veridian VHKIT-GE100 brandings) |
| Category | Hand-held SMBG (self-monitoring blood glucose) meter |
| Methodology | Electrochemical biosensor — **glucose oxidase** (Bionime GE100 test strips, exclusive) |
| Measurement range | **20 – 600 mg/dL** |
| Test time | **5 seconds** |
| Sample volume | **0.75 µL** capillary whole blood |
| Hematocrit range | **30 – 60 %** |
| Calibration | Plasma-calibrated; **auto-coding** (no chip / code-strip) |
| Memory | **500 results**; 1, 7, 14, 30 and 90-day averaging |
| Display | Backlit LCD, single-button operation |
| Battery | CR2032 lithium; ≈ **1,000 tests** per battery |
| Dimensions | **90.6 × 46 × 16.5 mm** |
| Weight | **53 ± 5 g** (with battery) |
| Operating env. | 10 – 40 °C / 10 – 90 % RH (non-condensing) |
| Citations | **No local manual in repo.** [Bionime GE100 user manual / spec (Manua.ls)](https://www.manua.ls/ge/ge100/manual) · [Vitality Medical product page](https://www.vitalitymedical.com/bionime-blood-glucose-monitoring-system-ge100.html) · [Macgill product page](https://www.macgill.com/ge100-blood-glucose-meter.html) |
| Note | "Based on web-sourced vendor / distributor data — engineer should verify the exact strip catalog # at procurement (Bionime GS300 / Veridian VHKIT-GE100-STR)." |

---

## 8. Lifotronic H8 — Fully-Automated Hemoglobin A1c Analyzer (HPLC)

| Field | Value |
|---|---|
| Manufacturer | Lifotronic Technology Co., Ltd. (Shenzhen) |
| Category | Bench-top HbA1c analyzer |
| Methodology | **High-Performance Liquid Chromatography (HPLC)** — NGSP & IFCC traceable; reports HbA1a, HbA1b, HbF, HbA1c, LA1c, HbA0 peak areas/ratios + IFCC/NGSP/ADAG values |
| Test modes | **Fast Mode** · **Variant Mode** |
| Test range | **3 % – 18 %** HbA1c |
| Precision | **CV ≤ 1.3 %** (intra + inter ≤ 3 %) |
| First sample result | **1.5 min** (130 s) |
| Throughput | 1.5 min/sample Fast Mode; 2.2 min/sample Variant Mode |
| Sample type | Venous blood (primary tube, cap-piercing); finger peripheral blood (50 µL / 1:150 dilution); lyophilized whole blood |
| Auto sample station | **10 positions** |
| Photometer | 415 nm / 500 nm LED, **20,000 h** life span |
| Column | ≥ **8,000 tests** rated life (filter also ≥ 8,000) |
| Display | **10.1″ TFT colour touchscreen** |
| Storage | 4,000 sample results |
| Connectivity | USB, LAN, LIS compatible; barcode scanner; thermal printer + optional external laser printer |
| Reagent kit | Eluent A / B / C, Hemolysin, Calibrator, QC material |
| Dimensions (W×D×H) | **580 × 500 × 510 mm** (22.8″ × 19.7″ × 20.5″) |
| Weight | **50 kg** (110 lbs) |
| Operating env. | 10 – 30 °C · ≤ 85 % RH |
| Power | AC 100 – 230 V, 50/60 Hz, 1200 VA |
| Certifications | **NGSP, IFCC, CE, CFDA** |
| Citations | [Lifotronic H8 Brochure](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/LIFOTRONICS/H8/H8-brochure.pdf) p.1-2 · [H8 User's Manual](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/LIFOTRONICS/H8/H8-Users-Manual.pdf) · [H8 Installation Guide](file:///home/marloeu/projects/manuals-and-lis-protocol/manuals-and-lis-protocol/LIFOTRONICS/H8/H8-Installation-Guide.pdf) |

---

## 9. CTK OnSite® Duo Dengue Ag-IgG/IgM Rapid Test (R0062C)

| Field | Value |
|---|---|
| Manufacturer | CTK Biotech Inc. (Poway, CA, USA) |
| Category | Lateral-flow immunochromatographic rapid test (cassette) |
| Catalog # | **R0062C** |
| Pack size | **30 tests/box** (individually sealed foil pouches + desiccant + buffer + 25 µL pipettes + insert) |
| Detection | **Simultaneous detection** of dengue **NS1 antigen (DEN-1, 2, 3, 4)** + **IgG** + **IgM** anti-dengue antibodies |
| Sample type | Human serum, plasma, or whole blood |
| Result time | **20 – 25 minutes** |
| Built-in control | C-line internal procedural control |
| Clinical interpretation | IgM+ ⇒ primary infection · IgG+ ⇒ secondary/past · IgG+/IgM+ ⇒ late primary/early secondary; NS1+ supports acute viraemia regardless of antibody status |
| Cross-reactivity (none observed) | Chikungunya, CMV, HAV, HBV, HCV, HIV, hCG, *H. pylori*, TB, *T. gondii*, Typhoid, Rubella, ANA, HAMA, RF (up to 8,400 IU/mL) |
| Storage | 2 – 30 °C (room temperature stable per CTK insert) |
| Shelf life | 24 months |
| Certifications | **CE-IVD** |
| Citations | [CTK OnSite Duo Dengue product page](https://ctkbiotech.com/onsite-duo-dengue-ag-igg-igm-rapid-test-ce/) · [QuickLab insert PDF (CTK R0062C)](https://quicklab.in/wp-content/uploads/2022/10/duo-dengue-R0062C.pdf) |
| Note | No CTK manual in repo (only RTR barcode reference docs). Engineer should download the latest package insert from CTK before procurement to confirm lot-specific sensitivity/specificity claims. |

---

## 10. CTK OnSite® Typhoid IgG/IgM Combo Rapid Test (R0161C)

| Field | Value |
|---|---|
| Manufacturer | CTK Biotech Inc. (Poway, CA, USA) |
| Category | Lateral-flow immunochromatographic rapid test (cassette) |
| Catalog # | **R0161C** |
| Pack size | **30 tests/box** |
| Detection | Differential detection of **IgG** and **IgM** anti-*Salmonella* Typhi & Paratyphi using both **O** and **H** antigens |
| Sample type | Serum, plasma, whole blood |
| Result time | **15 minutes** |
| Clinical performance (vs. culture, Harare outbreak study) | Sensitivity **100 %** · Specificity **94.35 %** · PPV 63.16 % · NPV 100 % |
| Shelf life | 24 months |
| Certifications | **CE-IVD** |
| Citations | [CTK OnSite Typhoid IgG/IgM Combo product page](https://ctkbiotech.com/onsite-typhoid-igg-igm-combo-rapid-test/) · [Tech-info — Typhoid IgG/IgM (R0160C/R0161C)](https://ctkbiotech.com/tech-info/typhoid-iggigm-rapid-test/) · [Harare evaluation study (PMC4344803)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4344803/) |
| Note | No CTK manual in repo. Lot-specific sensitivity/specificity must be re-confirmed from package insert at procurement. |

---

## 11. CTK OnSite® Malaria Pf/Pv Ag Rapid Test (R0112C)

| Field | Value |
|---|---|
| Manufacturer | CTK Biotech Inc. (Poway, CA, USA) |
| Category | Lateral-flow immunochromatographic rapid test (cassette) |
| Catalog # | **R0112C** |
| Pack size | **30 tests/box** |
| Detection | Simultaneous **Pf** (Plasmodium falciparum, **HRP-II**) and **Pv** (Plasmodium vivax, **pLDH**) antigen detection |
| Sample type | Whole blood (EDTA/heparin/citrate or fingerstick) |
| Sample volume | **5 µL** whole blood |
| Result time | **15 – 20 minutes** |
| Performance (sister Pf/Pan kit, peer-reviewed) | Pf 94.2 % sens / 99.5 % spec; Pv 97.3 % sens / 98.7 % spec |
| Shelf life | 24 months |
| Certifications | **CE-IVD** |
| Citations | [CTK OnSite Malaria Pf/Pv Ag product page](https://ctkbiotech.com/product/malaria-pf-pv-ag-rapid-test-ce/) · [Tech-info — Malaria Pf/Pv Ag (R0112C)](https://ctkbiotech.com/tech-info/malaria-pfpv-ag-rapid-test/) · [OnSite Pf/Pan field evaluation (PMC3544592)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3544592/) |
| Note | No CTK manual in repo. The sensitivity/specificity values above are from a related Pf/Pan SKU and are surrogate evidence only — confirm R0112C-specific data from the latest package insert. |

---

## Appendix A — Catalog-page deltas LabSolution will need to fill in

These fields are routinely required by Philippine FDA / DOH-licensing reviewers
and by the laboratory directors the catalog is targeting. They are **not**
extractable from the vendor docs above and must be supplied by LabSolution
locally:

1. **Local FDA-IVD Certificate of Product Registration (CPR) #** — required for
   distribution in the Philippines.
2. **Local distributor warranty (months)** — typically 12 months for analyzers,
   24 months for rapid tests under unopened seal.
3. **Service-level commitment (MTTR, on-site SLA)** — pulls from the new
   Operating Procedure v1.0 KPI of MTTR 4.8 h → 3.6 h target.
4. **Compatible reagent SKUs** stocked locally (LabSolution part #s).
5. **Recommended LIS interface** — Snibe MAGLUMI series uses HL7 over TCP via
   SnibeLis; DiaSys respons uses ASTM E1394 / LIS-2-A2; Medica EasyLyte uses
   simple RS-232 unidirectional; Lifotronic H8 uses bidirectional LIS over LAN.
   The exact LIS profile per analyzer is captured in
   `manuals-and-lis-protocol/<vendor>/<model>/.../LIS*.pdf` and should be linked
   from the catalog page so customers can confirm middleware compatibility.

---

## Appendix B — Gaps / follow-ups recommended before catalog goes live

| # | Gap | Recommended action |
|---|---|---|
| 1 | No local manuals for **CTK Dengue Duo / Typhoid / Malaria** | Onboard the latest CTK package inserts (PDF) into `manuals-and-lis-protocol/CTK/<test>/` and re-run `graphify update .` so they become citable. |
| 2 | No local manual for **DiaSys respons 600c** | Request the System Overview + Operator's Manual from DiaSys APAC and add under `manuals-and-lis-protocol/DIASYS/RESPONS-600C/`. |
| 3 | No local manual for **Bionime GE100** | Add the user manual PDF (manua.ls source) under `manuals-and-lis-protocol/<new vendor: BIONIME>/GE-100/`; extend the alias table so future lookups resolve directly. |
| 4 | **MAGLUMI X3 user manual** PDF (66 MB) is mostly blank/illegible after textify — possibly a scanned source. | Re-textify with vision pass on the high-resolution IFU (`437-2-MAGLUMI-X3-IFU-en-V1.4.pdf`, 5.6 MB — cleaner source) before the next graphify rebuild. |
| 5 | Aliases for **Respons-600C**, **GE100**, **CTK rapid tests** missing | Add curated aliases to `graphify-out/aliases/build_aliases.py`, then run it. |
