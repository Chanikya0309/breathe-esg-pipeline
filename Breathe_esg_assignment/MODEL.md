# Relational Database Architecture

This data model follows a decoupled **Staging Pattern** designed to provide absolute historical traceability for sustainability auditors.

## Schema Strategy
* **Data Lineage:** We explicitly separate incoming unverified text parameters (`raw_quantity`, `raw_unit`) from our processed floating decimals (`normalized_quantity`, `normalized_unit`). This ensures the system preserves a clear record of the exact text data that came from the client company.
* **Audit Trail Integration:** By linking each individual row explicitly to a unique global `IngestionJob` record, an auditor can instantly trace any row on the dashboard back to the exact upload batch and date it originated from.
* **Multi-Tenancy Support:** The database structure handles safe enterprise multi-tenancy isolation natively, allowing clean logical filtering per enterprise client profile.