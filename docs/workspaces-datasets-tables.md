# Workspaces, Datasets & Tables

The plugin gives you a full UI for managing the three Power BI objects that make up your data pipeline:

- **Workspaces** — containers for datasets & reports (created on Power BI side)
- **Datasets** — schemas pushed into a workspace
- **Tables** — individual entity tables inside a dataset

Each of these has its own admin page. You can do everything here without opening Power BI Service.

---

## Workspaces

**URL:** `your-magento-store/admin/powerbi/workspaces/index/`

![Workspaces page](//magento2-doc//images/workspaces.webp)
*Workspaces — list, create, and set the active Power BI workspace.*

### What you can do

- **List** all Power BI workspaces available to the signed-in user.
- **Create a new workspace** without leaving Magento2.
- **Set Active Workspace** — the workspace used by all sync jobs and profiles.
- **Refresh** — reload the list from Power BI if you created a workspace externally.

### How to create a workspace

1. Click **Create New**.
2. Enter a name (e.g. `WC Store Prod`).
3. Click **Create Workspace**.
4. The new workspace appears in the list with an "Active" button. Click it to make it the target.

![Create New Workspace](//magento2-doc//images/create-workspace.webp)
*Create New Workspace — enter a name and click Create Workspace.*

### How to switch workspaces

Click the **Set as Active** button next to any workspace. All subsequent syncs will go to the new workspace. Existing datasets remain in the old workspace (they are not moved).

::: warning
Switching workspaces mid-sync can produce partial data in both places. Finish any running sync first (check the [Logs](./logs.md) page).
:::

---

## Datasets

**URL:** `your-magento-store/admin/powerbi/datasets/index/`

![Datasets page](//magento2-doc//images/datasets.webp)
*Datasets — publish, manage, and track dataset state in one grid.*

A **dataset** is the Power BI object that contains one or more tables and the schemas for each. The plugin normally creates one dataset per configured entity (e.g. `WC Orders`, `WC Products`), but you can also create bundled datasets with multiple tables.

### Datasets Grid

| Column | Description |
|---|---|
| **Dataset Name** | Your custom label |
| **Workspace** | The workspace it lives in |
| **Type** | Temporary (rebuild-on-push) or Permanent (structure-locked) |
| **Status** | Not Published / Loaded / Published |
| **Last Push** | Timestamp |
| **Actions** | Edit, Publish, Unpublish, Delete |

### Create / Edit Dataset

Click **+ Create Dataset** to open the form:

| Field | Description |
|---|---|
| **Dataset Name** | Custom label shown in Power BI |
| **Workspace** | Target workspace |
| **Type** | `Temporary` — the plugin can recreate the schema each push (safest for frequent schema changes). `Permanent` — schema is locked; great for production reports. |
| **Select Stores** | Multi-select from the available Magento 2 stores |
| **Table Name** (per table) | Override the default table name |
| **Save Dataset** | Persists the dataset definition locally |
| **Publish to Power BI** | Creates the dataset and tables on the Power BI side |

### Dataset lifecycle

```
Not Published  →  Publish  →  Published  →  Push Rows  →  Loaded
                                    ↓
                                Unpublish
                                    ↓
                              Not Published
```

::: tip Temporary vs Permanent
Choose **Temporary** while you're still iterating on schemas or adding new fields — the plugin will rebuild the table each full push. Switch to **Permanent** once you've finalized your reports to avoid accidental recreation.
:::

---

## Tables

**URL:** `your-magento-store/admin/powerbi/table/index/`

![Tables page](//magento2-doc//images/tables.webp)
*Tables — inspect schemas, push rows, or clear data on individual tables.*

The Tables page lets you inspect and manage individual tables inside a dataset.

### What you can see

- **Table Name**
- **Parent Dataset**
- **Schema** — expandable view showing each column and its Power BI type (String, Int64, Double, DateTime, Boolean)
- **Last Push Time**

### What you can do

- **Push Rows** — manually push the current Magento 2 data for this entity to the Power BI table.
- **Clear Rows** — empty the table in Power BI without deleting the schema. Useful before a clean re-sync.
- **Update Schema** — re-push the schema definition if you've added custom fields.
- **Preview** — see the first 100 rows as they would be sent.

::: warning Clearing rows
`Clear Rows` immediately deletes data in the Power BI dataset. Any Power BI reports that reference those rows will show empty until the next push.
:::

### Magento 2 entities available as tables

- Orders
- Order Line Items
- Customers
- Products
- Categories
- Coupons
- Refunds
- Invoices
- Shipping Methods
- Tax Data & Rates
- Payment Gateway Data
- Reviews
- Inventory

---
