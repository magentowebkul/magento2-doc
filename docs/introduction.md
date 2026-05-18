---
title: Introduction
description: Learn how to connect Magento 2 to Microsoft Power BI. Step-by-step setup, Azure AD credentials, Visual Query Builder, reports, and embedding — all in one guide.
meta:
  - name: keywords
    content: magento power bi, magento 2 power bi connector, magento analytics, power bi ecommerce, azure ad setup, embed power bi report magento
---

# Magento 2 Power BI Connector — Documentation

The **Magento 2 Power BI Connector** seamlessly synchronizes your Magento store data — including dynamic catalog attributes, sales data, and customer accounts — directly into Microsoft Power BI workspaces. Automate complex data transformation with a built-in Visual Query Builder and access embedded BI reports natively inside the Magento Admin.

| Feature | Details |
|---|---|
| **Rich Entities** | Products, Categories, Customers, Orders, Shipments, Invoices, and Refunds |
| **Analytics Hub** | Native Magento dashboard showing real-time trends, KPIs, and store health |
| **Visual Query Builder** | 3-panel custom query designer with direct attribute mapping and AJAX previews |
| **Smart Alerts** | Email triggers based on metrics like AOV, Low Stock Count, and Refund Rates |
| **Enterprise Architecture** | Built on Magento Cron and Message Queue for scalable data piping |
| **CLI Toolkit** | Specialized CLI commands (`wkpbic:*`) for scheduled triggering and diagnosis |

## How It Works

```mermaid
graph LR
  A[Magento 2 Catalog/Sales] --> B[Message Queue / Cron]
  B --> C[Power BI Connector]
  C --> D[Azure AD OAuth2]
  D --> E[Power BI REST API]
  E --> F[Workspace / Dataset]
```

1. Register your app inside the **Azure Portal** to obtain Client ID, Client Secret, and Tenant ID.
2. Configure the credentials under **Stores → Configuration → Webkul** and authorize via OAuth.
3. Create **Workspaces** and **Datasets** through the module's built-in grids.
4. Define extraction rules in **Visual Query Builder** to map attributes to Power BI fields.
5. Push data manually or setup **Automatic Sync** via schedules to feed Power BI datasets.

## Quick Navigation

### Getting Started

| Step | Page | What you do |
|:---:|---|---|
| 1 | [Quick Start](./quick-start.md) | 5-minute walkthrough of setting up connectivity |
| 2 | [Installation](./installation.md) | Extracting files and running `bin/magento setup:upgrade` |
| 3 | [Azure AD Setup](./azure-ad-setup.md) | Setting up App Registrations and Application Permissions |
| 4 | [Power BI Setup](./power-bi-setup.md) | Preparing workspaces in your Microsoft account |

### Analytics & Reporting

- [Analytics Dashboard](./dashboard.md)
- [Embedded Reports & Dashboards](./reports.md)
- [Smart Alerts Config](./alerts.md)

### Configuration

- [Module Settings](./settings.md)
- [Access Control (ACL)](./access-control.md)

### Data Lifecycle

- [Workspaces & Datasets](./workspaces-datasets-tables.md)
- [Visual Query Builder](./query-builder.md)
- [Load Profiles](./data-load-profiles.md)
- [Synchronization Engines](./sync.md)

### Advanced Developer Mode

- [CLI & Queue Utilities](./rest-api.md)
- [Logs & Retry Queue](./logs.md)
- [Troubleshooting](./troubleshooting.md)
- [FAQ](./faq.md)

---

::: tip System Ready
This guide assumes you have root access to your terminal to run `bin/magento` setup commands and administrative rights to the Azure portal for your tenant.
:::
