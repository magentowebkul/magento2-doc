---
title: FAQ
description: Common questions and answers about the Magento 2 Power BI Connector. License, Azure AD, sync, security, multi-store, performance, and more.
meta:
  - name: keywords
    content: power bi Magento2 faq, Magento 2 power bi questions, power bi license, azure ad questions, Magento 2 analytics faq
---

# Frequently Asked Questions

::: tip Can't find your answer?
Check the [Troubleshooting](./troubleshooting.md) page for error-specific fixes, or open a ticket at [Webkul Support](https://webkul.uvdesk.com/).
:::

| Category | Questions |
|---|---|
| [Getting Started](#getting-started) | Licenses, HPOS, personal accounts, setup time |
| [Azure AD and OAuth](#azure-ad-and-oauth) | Client Secret, expiry, ROPC, MFA |
| [Data and Sync](#data-and-sync) | Data types, subsets, duplicates, large stores, schedules |
| [Multi-Store](#multi-store) | Remote stores, supported entities |
| [Reports and Embedding](#reports-and-embedding) | Frontend embedding, page builders, filters |
| [Security](#security) | Credential storage, encryption, key rotation |
| [Performance](#performance) | Speed impact, batch sizes, API usage |
| [Licensing and Updates](#licensing-and-updates) | Updates, developer license, support |
| [Compatibility](#compatibility) | WPML, custom extensions, Multisite |

---

## Getting Started

### Do I need a paid Power BI license?

Not for basic sync. But if you want to **share or embed reports**, yes. You need **Power BI Pro** or **PPU** for everyone who will view the reports. See [Power BI Account Setup](./power-bi-setup.md).

### Does this plugin work with Magento 2 HPOS?

Yes. In fact, HPOS is **required**. Turn it on at `Magento 2 → Settings → Advanced → Features`.

### Can I use a personal Microsoft account?

No. You need a **Microsoft work or school account** (an Azure AD account). Personal Outlook or Live accounts will not work. You can get a free Microsoft 365 Developer tenant if you need one.

### How long does the first setup take?

About 15 to 20 minutes. You will spend about 10 minutes on Azure AD, 5 minutes on the module configuration, and then the time for your first sync.

## Azure AD and OAuth

### Where can I find the Client Secret if I already closed Azure?

Sorry — you cannot. Azure only shows the Value once. You will need to go to Certificates & secrets, delete the old secret, make a new one, and copy the Value right away.

### How often does the client secret expire?

By default, every **6 months**. When you create one, Azure lets you pick 3, 6, 12, or 24 months. Set a calendar reminder so you can rotate it in time.

### What is ROPC and do I really need it?

ROPC stands for Resource Owner Password Credentials. It lets the plugin refresh tokens on its own using email and password. It is optional. However, we recommend it for production sites. Without it, you will have to sign in by hand every time a token expires.

### Does ROPC work with MFA?

No. Use a **service account without MFA** for ROPC.

## Data and Sync

### How many data types can I sync?

**16 or more** out of the box: Orders, Line Items, Customers, Customer Profiles, Products, Categories, Coupons, Refunds, Invoices, Shipping Zones, Tax Data, Payment Gateways, Reviews, Inventory, Subscriptions, Order Grid, and Report Types.

### Can I sync only a subset of orders?

Yes. Create a [Load Profile](./data-load-profiles.md) with a date range filter or order status filter.

### Does sync create duplicate rows?

No. Incremental sync uses a per-entity watermark, so it only pushes new or changed rows. Full sync also uses unique keys to avoid duplicates.

### How large a store can the plugin handle?

There is no hard limit. Stores with millions of rows work well if you use the right batch size (500 to 2000), scheduled mode instead of live, and incremental sync.

### Can different entities have different schedules?

Yes. Just create one [Load Profile](./data-load-profiles.md) per entity. For example, you can sync Orders every 15 minutes and Products once a day.

## Multi-Store

### How many remote stores can I connect?

Out of the box, one remote store through the Settings page. However, you can add more with the `wkpbic_remote_stores` filter. Each remote store needs its own Consumer Key and Secret. Every row gets a `source_store` tag.

### Do all entities sync from remote stores?

No. Only five remote entities work today: Orders, Products, Customers, Categories, and Coupons. Your local entities still work as normal.

## Reports and Embedding

### Can I embed reports on my public frontend?

Yes, with the `[wkpbic_report id="..."]` shortcode. But remember, **each viewer needs a Power BI Pro license**. Or your workspace must be on Premium capacity for anonymous embedding. See [Reports & Dashboards](./reports.md).

### Does embedding work with Elementor, Gutenberg, or Divi?

Yes. Add a Shortcode block or widget and paste `[wkpbic_report id="..."]`.

### Can visitors filter the embedded report?

Yes. You can pass filters through the shortcode: `[wkpbic_report id="..." filter="Orders/Status eq 'completed'"]`. Visitors can also use the slicers inside the report.

## Security

### Where are my credentials stored?

In `wp_options`, with **AES-256-CBC** encryption. The key comes from your Magento2 salts. Credentials are never logged, never sent to the browser, and never in git (when you use backup/export).

### Is data encrypted during transfer?

Yes. Every call to Microsoft and Power BI uses HTTPS. The plugin will not even start without HTTPS on your Magento2 site, because OAuth requires it.

### Can I rotate the encryption key?

Yes. Change your Magento2 salts in `wp-config.php`, then re-save each credential in Settings. The old encrypted blobs become unreadable.

## Performance

### Will the plugin slow down my store?

No. Sync runs in the background through Action Scheduler. Live mode adds a few milliseconds to each Magento 2 event. If that is too much, switch to Scheduled mode.

### What batch size should I use?

Pick based on your store size:

- Small store (under 10,000 orders): **500**
- Medium store (10,000 to 100,000): **1000**
- Large store (over 100,000): **2000** with fewer concurrent workers
- Very large (over 1 million): Split across more than one profile and workspace

### How do I lower my Power BI API usage?

Try these:

- Use **Incremental** mode, not Full.
- Schedule sync every hour, not every 15 minutes.
- Only push the entities you actually use in reports.

## Licensing and Updates

### How do I get plugin updates?

Updates come through your Webkul account. You can download the latest ZIP and replace the plugin folder. You can also click **Check for Updates** in Settings.

### Is there a developer license?

Yes. Contact Webkul sales for multi-site or developer licenses. These allow unlimited installations.

### What does support include?

Standard Webkul support covers 3 to 12 months of bug fixes and install help. Custom features are handled as paid work.

## Compatibility

### Does it work with WPML or Polylang?

Yes. The plugin is i18n-ready. Data syncs in its native language.

### Does it work with custom Magento 2 extensions?

Yes, if the extension uses standard Magento 2 tables and metas. For custom fields, use the Query Builder's meta-field filter. Or add a small snippet with the `wkpbic_entity_schema` filter.

### Can I add my own entities?

Yes. Hook into the `wkpbic_register_entities` filter. Then register your own class that extends `Wkpbic\Entity\BaseEntity`.

### Does it work with Magento2 Multisite?

Yes. Each site has its own settings and keys. Network activation works fine.

## Still have questions?

- Read the [Troubleshooting](./troubleshooting.md) page.
- Open a ticket at [https://webkul.uvdesk.com/](https://webkul.uvdesk.com/).
- Email [support@webkul.com](mailto:support@webkul.com).
