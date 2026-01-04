# Post-Flood Road Surface Roughness Analysis Using Sentinel-1 SAR (NH-45, Chennai)

This repository presents a **satellite-based surface roughness assessment** of **National Highway 45 (NH-45)** in Chennai, India, using **Sentinel-1 SAR imagery** and **Google Earth Engine (GEE)**. The study evaluates **post-flood infrastructure degradation** by comparing radar backscatter characteristics before and after major flood events.

---

## 📌 Project Objective

The objectives of this project are:

- To analyze **road surface roughness changes** along NH-45 following major flood events.
- To compare **pre-flood (2019)** and **post-flood (2022)** surface conditions using SAR backscatter.
- To quantify **infrastructure degradation** caused by prolonged waterlogging and flood-induced damage.
- To demonstrate the applicability of **remote sensing for post-disaster infrastructure assessment**.

---

## 🌍 Study Area

- **Location:** NH-45 corridor (Guindy – Saidapet – Adyar region), Chennai, India  
- **Geometry:** Buffered point-based Region of Interest (2 km radius)  
- **Spatial Resolution:** 10 meters  

The selected ROI represents a known **urban flood-affected transportation corridor**.

---

## 🛰️ Data Source

### Sentinel-1 SAR
- **Platform:** Sentinel-1
- **Product:** GRD (Ground Range Detected)
- **Polarization:** VV
- **Acquisition Mode:** IW
- **Resolution:** 10 m

**Why SAR?**
- Penetrates clouds and rain
- Reliable during flood and post-flood conditions
- Sensitive to surface roughness variations on asphalt and concrete

All datasets are accessed directly from the **Google Earth Engine Data Catalog**.  
No raw satellite imagery is stored in this repository.

---

## 🛠️ Tools & Technologies

- **Google Earth Engine (JavaScript API)**
- **Sentinel-1 SAR Remote Sensing**
- **Infrastructure Degradation Analysis**
- **Radar Backscatter Interpretation**
- **Spatial Statistics**

---

## 🔍 Methodology Overview

1. **ROI Definition**
   - Point-based buffer covering NH-45 urban segment.

2. **Temporal Compositing**
   - **2019:** Pre-flood baseline condition.
   - **2022:** Post-flood recovery phase following 2021 flood events.

3. **Road Surface Masking**
   - Low backscatter threshold applied to isolate road surfaces.

4. **Roughness Proxy Estimation**
   - Change in VV backscatter used as a proxy for surface roughness.
   - Increased backscatter interpreted as:
     - Potholes
     - Debris
     - Asphalt degradation
     - Surface irregularities

5. **Change Detection**
   - Pixel-wise subtraction of pre-flood and post-flood composites.

6. **Quantitative Analysis**
   - Mean roughness values extracted for both periods.
   - Mean roughness change computed for the study area.

---

## ✨ Key Features

- High-resolution road surface analysis (10 m)
- Flood-impact assessment on transportation infrastructure
- Radar-based roughness proxy modeling
- Pre vs post flood comparative framework
- Export-ready quantitative statistics

---

