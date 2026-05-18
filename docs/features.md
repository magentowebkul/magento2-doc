---
title: Features
description: See every feature of the Magento 2 Power BI Connector. From 16 data types to embedded reports, alerts, and a visual Query Builder — all in one plugin.
meta:
  - name: keywords
    content: Magento 2 power bi features, power bi connector plugin, Magento 2 analytics, embed power bi Magento2, power bi query builder, Magento 2 reports
---

# Features

::: warning Power BI Pro required for embedding
You can sync data with a free Power BI account. But to embed reports in Magento2 or share dashboards, you need **Power BI Pro** or **Premium Per User** for each viewer.
:::

**Connect your Magento 2 store to Microsoft Power BI. Sync data, build reports, and embed dashboards — all from inside Magento2.**

Here is a full tour of what the plugin can do. Use the table of contents to jump to the part you care about.

## Highlights

- **16 data types** ready to export — Orders, Customers, Products, Refunds, Coupons, Invoices, Taxes, Shipping, and more.
- **Visual Query Builder** — build queries by clicking, not coding.
- **Automatic sync** — hourly, daily, or weekly, with smart retries.
- **Embedded reports** — show Power BI reports inside your Magento2 admin and your site pages.
- **Role-based access** — 6 fine-grained permissions for your team.
- **Smart alerts** — get an email when sales drop or stock runs low.
- **REST API and Magento CLI** — 24 endpoints and 7 commands for automation.
- **Bank-grade security** — AES-256 encryption plus OAuth 2.0.
- **HPOS ready** — works with Magento 2 High-Performance Order Storage.
- **5-minute setup** — guided wizard from zero to first sync.

---

## 1. Interactive Analytics Dashboard

You get a full dashboard built right into your Magento2 admin. No more switching tabs just to check sales.

![Analytics Dashboard Header, Setup Progress, and Key Performance Indicators](/magento2-power-bi/images/dashboard-top-grouped.webp)

Here is what you will see in the analytics console:

- **Sales Trend (Last 30 Days)** visualizes real-time Revenue vs. Order counts, complete with **Smart Insights** and **Store Health** metrics in the dedicated sidebar.
  ![Sales Trend Analysis and Store Health Sidebars](/magento2-power-bi/images/dashboard-sales-grouped.webp)
 
 - A comprehensive suite of dynamic analytics charts including **Orders by Status**, **Top 5 Products**, **Revenue by Payment Method**, and **Customer Growth** metrics.
  ![Dynamic Advanced Dashboard Charts and Grid Layout](/magento2-power-bi/images/dashboard-charts-grid.webp)
 
 - Full-spectrum administration utilities comprising the continuous **Recent Sync Activity** timeline and multi-sector **Quick Actions** panel.
  ![Recent Synchronization Events and Rapid Task Management Console](/magento2-power-bi/images/dashboard-footer-actions.webp)

See [Dashboard](./dashboard.md) for the full walkthrough.

---

## 2. 16+ Magento 2 Data Types

You can export almost any Magento 2 data to Power BI. Here is the full list:

| Category | Data Types |
|---|---|
| **Sales** | Orders, Order Line Items, Invoices, Refunds |
| **Products** | Product Catalog, Inventory, Categories |
| **Customers** | Customers, Reviews & Ratings |
| **Financial** | Tax Rates, Payment Gateways, Shipping Zones |
| **Advanced** | Coupons |

Every data type comes with automatic schema detection. The plugin maps each field to the right Power BI type — `String`, `Int64`, `Double`, `DateTime`, or `Boolean`.

---

## 3. Visual Query Builder

![Query Builder](/magento2-power-bi/images/query-builder.webp)

You can build custom queries without writing any code. Pick an entity, choose columns, set filters, and preview the result. It really is that easy.

Here is what you can do:

- Pick an entity from a dropdown.
- Choose columns with a grouped picker and a search box.
- Use quick presets like **Select All**, **Essential**, or **Analytics**.
- Add filters with operators — Equals, Not Equals, Contains, Greater Than, Less Than.
- Apply one-click quick filters per entity, like "Completed Orders" or "In Stock Only".
- Use date range presets — Last 7 Days, Last 30 Days, This Month, and so on.
- Sort by any field.
- See a live query summary on the right side.
- Preview data before you push it.
- Save the query as a reusable profile.

See [Query Builder](./query-builder.md) for a step-by-step walkthrough.

---

## 4. Automatic Data Sync

![Sync & Scheduler](/magento2-power-bi/images/sync-settings.webp)

Sync runs on its own, so your Power BI dashboards always have fresh data. You can pick the mode that fits your store:

- **Scheduled sync** — Hourly, Twice Daily, Daily, or Weekly.
- **Live mode** — Pushes on every Magento 2 event, for near real-time dashboards.
- **Manual sync** — One-click "Sync Now" button.
- **Incremental sync** — Only new or changed rows are pushed, so it runs fast.
- **Batch processing** — 50 to 5000 rows per call, to avoid timeouts.
- **Retry queue** — Failed batches retry on their own with exponential backoff.

See [Sync & Scheduler](./sync.md) for more.

---

## 5. Load Profiles

A load profile is a saved export. It remembers the entity, filters, dataset, and schedule. So you can run the same job again with one click.

You can:

- Link each profile to a dataset.
- Pick entities with a checklist.
- Filter by date range or order status.
- Map field names before push.
- Turn profiles on or off.
- Click **Run Now** to push right away.
- Duplicate a profile for quick variants.

See [Data Load Profiles](./data-load-profiles.md).

---

## 6. Multi-Store Analytics

Got more than one Magento 2 store? You can pull data from all of them into one Power BI workspace.

Here is how it works:

- Connect a remote store with its Magento 2 REST API keys.
- Push five remote entities: Orders, Products, Customers, Categories, and Coupons.
- API keys are stored with AES-256-CBC encryption.
- The plugin adds a `source_store` column to every row, so you can split the data by origin.
- Click **Test Connection** to make sure it works.

See [Settings → Magento 2 API](./settings.md#Magento 2-api-tab).

---

## 7. Workspaces, Datasets, and Tables

You can manage every Power BI object without leaving Magento2. Pages for each one let you:

- List, create, and switch workspaces.
- Build datasets with auto-generated schemas.
- Pick temporary or permanent dataset types.
- Create, update, and clear tables.
- Publish or unpublish datasets in one click.
- Push rows on demand.

See [Workspaces, Datasets & Tables](./workspaces-datasets-tables.md).

---

## 8. Embedded Reports and Dashboards

![Embedded Reports](/magento2-power-bi/images/reports.webp)

Why leave Magento2 just to look at a Power BI report? You can embed them right inside.

- **Report embedding** uses the Power BI JavaScript SDK with server-side tokens.
- **Dashboard embedding** supports interactive tiles.
- **Fullscreen toggle** for big-screen viewing.
- **Shortcodes** so you can drop reports on any page or post.
- **Mobile links** to the Power BI app for iOS, Android, and Windows.
- **"View in Power BI"** link to open the full version.

See [Reports & Dashboards](./reports.md).

---

## 9. Smart Alerts

![Smart Alerts](/magento2-power-bi/images/alerts.webp)

You cannot watch your dashboard all day. Let the plugin watch it for you. Alerts send an email when a metric crosses a line you set.

- **Metrics:** Total Sales, Order Count, Average Order Value, Refund Rate, Low Stock Count.
- **Conditions:** Above, Below, Between, Outside Range.
- **Email notifications** to any address.
- **Cron-based monitoring** after every sync.
- **Test button** to check your config.
- **Enable/disable toggle** without deleting.
- **Alert history** on the Logs page.

See [Alerts](./alerts.md).

---

## 10. Role-Based Access Control

![Access Control](/magento2-power-bi/images/access-control.webp)

Not everyone on your team needs full access. You can give each role only the permissions it needs.

- **6 granular capabilities:** Manage Settings, View Reports, Manage Datasets, Manage Sync, Manage Alerts, View Logs.
- **Per-role matrix** for Administrators, Shop Managers, Editors, Authors, and custom roles.
- **Secure by default** — only admins get full access on first activation.

See [Access Control](./access-control.md).

---

## 11. Logs and Audit Trail

You can see every action the plugin takes. It is great for debugging and for audits.

- **Sync logs** with entity, status, rows pushed, duration, and errors.
- **Audit trail** for every user and system action.
- **Filters** for date range, status, entity, and user.
- **Search** across all log entries.
- **Auto-cleanup** — 30 days for sync, 90 days for audit.
- **Manual clear** button.

See [Logs](./logs.md).

---

## 12. REST API and Magento CLI

You can automate anything through the REST API or Magento CLI. Great for CI/CD, cron jobs, and custom integrations.

- **24 REST endpoints** for Entities, Sync, Workspaces, Datasets, Tables, Reports, and Alerts.
- **7 Magento CLI commands** for status, sync, logs, and cache.
- All endpoints use Magento 2 Authorization.

See [REST API & Magento CLI](./rest-api.md).

---

## 13. Built-In Security

Your credentials are safe. Here is how the plugin protects them:

- **AES-256-CBC encryption** for Azure and Magento 2 API keys.
- **OAuth 2.0 plus ROPC** with auto token refresh.
- **Nonce verification** on every form and AJAX call.
- **Input sanitization** and output escaping on every field.
- **Prepared SQL statements** everywhere.
- **No direct file access** guards.
- **CodeCanyon security audit** passed with 0 critical issues.

---

## System Requirements

Here is the short list of what you need:

| Requirement | Minimum | Tested Up To |
|---|---|---|
| Magento 2 | 2.4.* | 2.4.*
| PHP | 7.4 | 8.4 |
| Azure AD | App registration with Power BI API permissions | — |
| Power BI | Pro or PPU license for embedding | — |
| HTTPS | Required for OAuth | — |
| PHP extensions | `openssl`, `curl`, `json` | — |

---

## How We Compare

| Feature | This Plugin | Typical Competitors |
|---|---|---|
| Visual Query Builder | Full drag-and-drop with preview | Not available |
| Role-Based Access | 6 granular capabilities | Not available |
| In-Admin Dashboard | 5 chart types built in | No admin charts |
| Embedded Reports | Inside Magento admin and frontend | No embedding |
| Magento CLI | 7 commands | No CLI |
| REST API | 24 endpoints | No API |
| ROPC Auto-Refresh | Silent re-auth | Manual only |
| Smart Alerts | Built-in metric alerts | Relies on PBI alerts |
| Retry Queue | Exponential backoff | None |
| Audit Logging | Full history | None |
| Multi-Store | Multiple store views in one view | Single store only |
