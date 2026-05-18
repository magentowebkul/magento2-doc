---
title: Load Profiles
description: Manage stored data push configurations, linking filtered visual queries to explicit Microsoft Power BI targets.
meta:
  - name: keywords
    content: magento power bi load profile, workspace binding, dataset definition
---

# Load Profiles

A **Load Profile** encapsulates the logical pairing between a Magento data extraction rule and an operational endpoint within Microsoft Power BI. 

Essentially, the Visual Query Builder defines *what* gets extracted, while the Load Profile binds *where* it goes.

Navigate to the control plane via:
```
Power Bi → Power Bi Connector Management → Load Profiles
```

---

## Destination Hierarchy

Every profile performs a strict three-tier routing mapping to Microsoft infrastructure:

1. **Target Workspace**: The logical directory in Power BI hosting the asset.
2. **Target Dataset**: The container schema representing your tables.
3. **Target Table Name**: The explicit JSON-compatible name generated within Microsoft servers holding records.

When execution occurs, the connector queries the API dynamically to confirm if the Workspace/Dataset exists, and transparently pushes to the table definition provided.

---

## Managing Load Profiles via Grid

The centralized grid facilitates total oversight across saved pipeline configurations.

| Standard Grid Column | Description |
|---|---|
| **ID** | System incremental key needed for CLI execution. |
| **Profile Name** | Custom semantic name defined during creation. |
| **Workspace** | Identifies the target workspace container. |
| **Created At** | Datestamp of rule persistence. |
| **Updated At** | Datestamp of last sync. |


### Action Row Operations
- **Edit**: Reopens the core profile form.
- **Delete**: Removes the JSON definition from local storage (does not delete already pushed datasets in MS Cloud).
- **Run Now**: Triggers immediate execution bypassing the Cron cycle.

---

## Technical Binding (The Form)

Should you select a profile to modify directly, the UI Component surfaces precise linkage parameters:

| Section | Field Definition | Requirement |
|---|---|---|
| **Basic Info** | **Profile Name** | Identifiable reference for dashboard logs. |
| | **Entity Type** | Fixed upon initialization. |
| **Microsoft Mapping** | **Workspace** | Dynamic dropdown loaded directly from Azure API. |
| | **Dataset** | Identifies the target schema container. |
| | **Table Name** | User-defined text string (AlphaNumeric). |
| **Definition (JSON)** | **Condition Rule** | Read-only compressed state containing filters. |
| | **Selected Columns** | Encoded mapping state from builder. |

---

## Execution Workflow

When triggered (either via "Sync Now", Cron, or Message Queue):
1. Load Profile ID initializes the Model.
2. Authorization Helper fetches a fresh OAuth Token.
3. Dataset definition pushes schema create request (if missing).
4. Collection iterations parse rows into chunks specified by global **Batch Size**.
5. JSON streams transmit directly to Power BI REST Push API endpoints.
6. A corresponding status line item writes to `wk_pbi_sync_history`.
