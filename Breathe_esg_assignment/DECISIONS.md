# Architectural Decisions Log

## 1. Operational Clarifications
* **Scope Strategy:** Unprocessed factory fuel data is explicitly assigned to **Scope 1** (Direct Emissions). Grid electricity usage maps directly to **Scope 2** (Indirect Energy). Employee travel data maps to **Scope 3** (Value Chain Travel).
* **Anomaly Detection Threshold:** The ingestion script implements basic rule-based threshold flags. If an incoming value shows an extreme variance against expected baselines, the status is immediately flagged as `SUSPICIOUS` and annotated with context notes for the analyst rather than processing it blindly.

## 2. Strategic Technical Questions for the PM
* When an analyst corrects or manually overrides an entry on the frontend dashboard, should the pipeline automatically re-trigger standard validation rules, or should the analyst's manual override completely lock the row out from background scripts?
* If a row fails validation entirely, should it block the entire file upload batch, or should the system isolate only the broken row while loading the remaining valid data?