# Real-World Data Sources Exploration

This document outlines the real-world research behind the data ingestion formats selected for the enterprise pipeline.

## 1. SAP Fuel & Procurement (Scope 1)
* **Real-World Format Selected:** Flat CSV Export from an ALV Grid Report.
* **What Was Learned:** SAP systems are notoriously rigid. Enterprise plants regularly rely on manual flat-file reports rather than direct live OData API services. These exports often feature technical column headers (e.g., `MBLNR` for Document Number, `MATNR` for Material ID) and unstandardized metric values.
* **Production Vulnerabilities:** This pipeline will break if a local plant administrator modifies the report configuration layout, introducing customized language string variations or altering default column orders.

## 2. Utility Electricity Billing Data (Scope 2)
* **Real-World Format Selected:** Monthly Portal CSV Export.
* **What Was Learned:** Facilities teams usually log into utility provider accounts to batch-download historical billing periods. These billing parameters almost never align cleanly with regular calendar months (e.g., running from Jan 12 to Feb 11), requiring clear start and end date tracking ranges in the data schema to prevent duplicate calculations.
* **Production Vulnerabilities:** This parser will break during mid-month physical meter replacements or if a facility integrates net-metering solar arrays, which introduces unexpected negative usage values.

## 3. Corporate Travel – Concur API (Scope 3)
* **Real-World Format Selected:** Concur Travel V4 API Structure (JSON Response).
* **What Was Learned:** Travel aggregators do not provide direct distances traveled. Instead, they pass raw string-based IATA airport codes (e.g., `HYD to DEL`). The ingestion engine must normalize these routing keys into clear passenger-kilometer distances while factoring in cabin seat configurations (Business class carries a higher carbon multiplier than Economy).
* **Production Vulnerabilities:** Breaks when an employee registers a manual multi-city itinerary text string or types custom text like "Flight to Mumbai" instead of utilizing structured airport code drop-downs.