---
title: Visual Query Builder
description: Construct precise data extraction rules via the 3-panel query builder, enabling direct attribute mapping and instant preview.
meta:
  - name: keywords
    content: magento query builder, export designer, sql attribute mapping, dataset designer
---

# Visual Query Builder

The **Visual Query Builder** is an advanced configuration utility that abstracts complex Magento collection logic into a simple click-and-point interface. Build filtered views of your store data, rename attributes to fit existing Power BI schemas, and generate operational **Load Profiles** without writing custom database views.

Access this utility via the sidebar:
```
Power Bi → Power Bi Connector Management → Query Builder
```

---

## Interactive UI Layout

The Query Builder utilizes a modular 3-column SPA structure:

```
┌───────────────────┬───────────────────────────┬───────────────────┐
│ 1. Configuration  │ 2. Attribute Mapping      │ 3. Data Summary   │
│ - Name & Status   │ - Column Inclusion        │ - Overview Stats  │
│ - Entity Select   │ - Power BI Field Alias    │ - Est. Row Count  │
│ - Date Presets    │ - Quick Presets           │ - Preview Modal   │
│ - Condition Engine│                           │ - Save Action     │
└───────────────────┴───────────────────────────┴───────────────────┘
```

---

## Column 1: Query Config & Filtering

The left panel defines the skeleton and filtering boundaries of your dataset.

### Fundamental Information
- **Profile Name**: Define a semantic label (e.g., `High Value Customer List`).
- **Status**: Select `Enabled` (data pushes via cron) or `Disabled` (paused).
- **Entity Selector**: Choose underlying datasets: Orders, Products, Customers, etc.

### Condition Logic Engine
Build dynamic constraints against backend collection fields:
- **Add Condition**: Opens a sub-row containing **Attribute**, **Operator**, and **Value**.
- **Available Operators**:
  - `eq` (Equals) / `neq` (Not Equals)
  - `gt` / `lt` (Greater than / Less than)
  - `like` (Contains wildcard matching)
  - `null` / `notnull` (Existence checking)

### Time Bound Sorting & Presets
Directly limit extracts to rolling periods:
- **Date Quick Presets**: `Last 7 Days`, `Last 30 Days`, `Current Month`.
- **Custom Window**: Enter explicitly defined date ranges for static historical pulls.
- **Ordering**: Select sorting attribute and direction (e.g., `created_at DESC`).

---

## Column 2: Field Mapping (Unique Feature)

The center stage lets you perform schema transformation in real-time.

Instead of accepting raw Magento database names (like `grand_total`), you define the destination schema name transmitted via REST payloads.

### Mapping Interaction
For every attribute checkbox you activate:
1. **Source Attribute**: The Magento internal identifier.
2. **Destination Field**: An editable textbox prepopulated with standard mapping. 
3. **Edit Mapping**: Click to change `shipping_incl_tax` to `TotalShipping` for Power BI compatibility instantly.

### Quick Selection Presets
- **Select All**: Grabs the full entity schema.
- **Essential**: Selects IDs, Dates, Amounts, and Primary Contact info.
- **Analytics**: Drops raw text fields, selecting purely metrics and categorization flags.

---

## Column 3: Verification & Aggregation

The persistent right sidebar serves as your runtime confirmation beacon.

- **Selected Summary**: Tracks counts of actively mapped attributes and enforced filter rules.
- **Estimated Rows**: Performs a server-side `COUNT()` using AJAX to tell you instantly how large the payload will be.
- **Preview Sample**: Triggers an overlaid interactive grid showing the **First 10 Rows** computed under your existing configuration, allowing absolute logic verification before pushing data.

---

## Finalizing Queries

When fully satisfied with the summary:
1. **Validate Inputs**: Ensure Profile Name and Required Entity are populated.
2. **Click "Save Profile"**: The Builder validates configuration, generates a backend JSON definition, and stores it in `wk_pbi_load_profiles`.
3. The screen automatically navigates to the grid where you can map the load profile with dataset and workspace and save the profile will publish the dataset to power bi and create the required tables for the dataset.
4. Now the load profile is ready to push data from grid in each row in select option you can click Run and this will export the data to powerbi.
