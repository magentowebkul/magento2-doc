# Glossary

::: tip New to Azure and Power BI?
Read this page before starting the [Azure AD Setup](./azure-ad-setup.md) or [Power BI Setup](./power-bi-setup.md) guides. It explains every term you'll encounter.
:::

Quick definitions for every technical term used in this documentation.

## Microsoft / Azure

**Azure Active Directory (Azure AD / Entra ID)**
Microsoft's cloud identity service. You must register an "application" here so the plugin can talk to Power BI on your behalf.

**App Registration**
A record in Azure AD that represents the plugin as an application Microsoft can identify, trust, and grant permissions to.

**Tenant ID (Directory ID)**
A GUID that uniquely identifies your Microsoft organization. Every Azure AD user belongs to exactly one tenant.

**Client ID (Application ID)**
A GUID assigned to your app registration. Used along with the secret to identify the plugin during OAuth.

**Client Secret**
A password-like value that proves your app's identity. Generated once in Azure — **the Value is only shown once**, so copy immediately.

**Redirect URI**
The URL Microsoft sends the user back to after successful OAuth login. Must match the plugin's wizard URL exactly.

**OAuth 2.0**
The industry-standard authorization protocol the plugin uses to obtain tokens for Power BI. Uses interactive browser flow.

**ROPC (Resource Owner Password Credentials)**
An OAuth flow that swaps a username + password directly for a token — no browser redirect. Used for silent auto-refresh. Requires "Allow public client flows" in Azure and an account without MFA.

**Access Token**
A short-lived (~1 hour) credential that authorizes each Power BI API call.

**Refresh Token**
A longer-lived credential that can exchange itself for a new access token.

**Admin Consent**
The action an Azure AD admin takes to grant an app access to API permissions for all users in the tenant.

**Service Principal**
The "identity" of an app registration inside a specific tenant. Used for non-interactive scenarios.

**MFA (Multi-Factor Authentication)**
Extra sign-in verification (SMS, authenticator). Blocks ROPC — use a dedicated service account without MFA.

---

## Power BI

**Power BI Service**
The cloud product at [app.powerbi.com](https://app.powerbi.com) where you build reports and share dashboards.

**Workspace**
A container for datasets, reports, and dashboards in Power BI Service. The plugin pushes into one Active workspace.

**Dataset**
A named collection of tables + schemas inside a workspace. Reports query datasets.

**Table**
A typed collection of rows inside a dataset (like a database table). The plugin creates one table per Magento 2 entity.

**Report**
An interactive, multi-page visualization built on top of a dataset in Power BI Desktop or Service.

**Dashboard**
A single-page canvas that pins tiles from one or more reports.

**Embed Token**
A short-lived token Power BI issues so reports can be embedded in third-party sites (like Magento2).

**Premium / PPU / Pro**
Power BI licenses. **Free** = personal use. **Pro** = sharing & embedding for individuals. **PPU (Premium Per User)** = Pro + extras. **Premium Capacity** = enterprise, anonymous embedding.

**Push Dataset**
A Power BI dataset type where rows are streamed via the REST API. The plugin uses push datasets.

**Streaming Dataset**
A variant optimized for real-time dashboards (not used by this plugin).

---

## Plugin-Specific

**Entity**
A Magento 2 data type the plugin knows how to export — Orders, Products, Customers, Refunds, Coupons, etc. 16+ are registered by default.

**Schema**
The list of columns and their data types for an entity, auto-generated from Magento 2 metadata.

**Dataset Type — Temporary vs Permanent**
Temporary datasets can be rebuilt automatically (useful during development). Permanent datasets are structure-locked (use in production).

**Load Profile**
A saved, reusable export configuration: entity + filters + dataset + schedule. Runs from Data Load or Export Center.

**Watermark**
The timestamp of the most recently-synced row per entity. Incremental sync uses it to push only new/changed rows.

**Batch**
A group of rows (50–5000) sent to Power BI in one HTTP request. Large entities are chopped into batches automatically.

**Retry Queue**
Failed batches are automatically re-attempted with exponential backoff (1 min → 5 min → 30 min → 3 hr).

**Full Sync**
Pushes every row of an entity, ignoring watermarks.

**Incremental Sync**
Pushes only rows newer than the watermark. Default for scheduled sync.

**Live Mode**
The plugin hooks into Magento 2 events (order created, etc.) and pushes immediately.

**Scheduled Mode**
Uses Magento2 cron / Action Scheduler to push at fixed intervals.

**Manual Mode**
Nothing runs automatically — you trigger sync from the UI, WP-CLI, or REST API.

**Action Scheduler**
Magento 2's built-in background job runner. The plugin queues long-running syncs on it.

**HPOS (High-Performance Order Storage)**
Magento 2's new storage engine for orders. **Required** by this plugin.

**Multi-Store**
Mode that pulls data from a remote Magento 2 site via its REST API. Rows are tagged with a `source_store` column.

**Query Builder**
The visual no-code UI for selecting entity + columns + filters → preview → save.

**Embed Shortcode**
`[wkpbic_report id="..."]` / `[wkpbic_dashboard id="..."]` — place a Power BI visualization on any page or post.

**Capability**
A Magento2 permission flag (e.g. `wkpbic_view_reports`). The plugin defines 6 capabilities for granular access control.

**Audit Trail**
A log of user actions (settings changes, alert edits, profile deletes) with timestamp, user, and diff.

---

## Acronyms at a Glance

| Acronym | Meaning |
|---|---|
| AES-256-CBC | The encryption algorithm used for credentials at rest |
| AOV | Average Order Value |
| API | Application Programming Interface |
| CBC | Cipher Block Chaining |
| CLI | Command Line Interface |
| CRUD | Create, Read, Update, Delete |
| CSV | Comma-Separated Values |
| GUID | Globally Unique Identifier |
| HPOS | High-Performance Order Storage |
| HTTPS | HTTP Secure |
| KPI | Key Performance Indicator |
| MFA | Multi-Factor Authentication |
| OAuth | Open Authorization |
| PBI | Power BI |
| PPU | Premium Per User |
| REST | Representational State Transfer |
| ROPC | Resource Owner Password Credentials |
| SDK | Software Development Kit |
| SQL | Structured Query Language |
| WC | Magento 2 |
| WP | Magento2 |
