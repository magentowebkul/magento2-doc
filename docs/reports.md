# Reports & Dashboards (Embedding)

The Reports page is where you **import Power BI reports and dashboards back into Magento2** and embed them — either inside the admin area or on the public frontend via shortcodes.

**URL:** `yourstore.com/admin/powerbi/report/index`

![Reports & Dashboards page](/magento2-doc/images/reports.webp)
*Reports page — import, embed, and manage Power BI reports and dashboards.*

::: tip Prerequisite
Report embedding requires a **Power BI Pro** or **PPU** license for every user who views the embedded report. See [Power BI Account Setup](./power-bi-setup.md).
:::

---

## Workflow Overview

```
  Push data       Build report in       Import report       Embed report in
 to Power BI  →    Power BI Service  →   inside plugin   →   WP admin / frontend
  (Sync page)      (app.powerbi.com)    (Reports page)      (via shortcode)
```

The plugin does **not** build reports for you — you design them visually in Power BI Service using the datasets it pushes. Then you come back and embed them.

---

## Tabs

The Reports page has **two tabs**: **Reports** and **Dashboards**.

### Reports tab

| Element | Description |
|---|---|
| **Import Report** button | Opens a modal that lists every report in the active workspace. Pick the one to embed. |
| **Reports Grid** | Shows imported reports with: Name, Workspace, Last Updated, Embed Status, Actions |
| **Actions** | **View** (open embedded), **Refresh Token**, **Copy Shortcode**, **Remove** |

### Dashboards tab

The same UI but for Power BI **dashboards** (which are collections of tiles from multiple reports).

---

## Importing a Report

1. Make sure the Power BI workspace is set as **Active** on the [Workspaces](./workspaces-datasets-tables.md) page.
2. Click **Import Report**.
3. The plugin calls the Power BI API and lists all reports you have access to.
---

## Embedding in Magento2 Admin

After import, click **View** on any report. A new tab will open with the power pi particular link which look same as in power bi app:

- "View in Power BI" link that opens the report in [app.powerbi.com](https://app.powerbi.com)

![Embedded Power BI report in Magento2 admin](/magento2-doc/images/report-embed.webp)
*A Power BI bar chart embedded inside the Magento2 admin — with "View in Power BI" and "Hide" controls.*

---

## Access Control

Embedded reports are **only visible to logged-in users who have the `view_reports` capability**. You can assign this capability from the [Access Control](./access-control.md) page.

Public (non-logged-in) visitors will see a "Please sign in to view this report" message unless your Power BI workspace is on **Premium capacity** with anonymous embedding enabled.

---

## Embed Tokens

- Each embedded view requests a short-lived token (default 60 minutes) from Power BI via the plugin's server.
- Tokens are **never** exposed to the browser directly — the JS SDK receives them via a secure nonce-protected AJAX call.
- Click **Refresh Token** on any report to force a new token immediately.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "No reports found" after Import | Make sure the active workspace actually contains reports. Refresh the workspace list. |
| Embedded report shows "You don't have access" | The logged-in user's Power BI account lacks permission. Share the workspace in Power BI Service. |
| "Token expired" | Click Refresh Token, or shorten token lifetime in Settings → Advanced. |
