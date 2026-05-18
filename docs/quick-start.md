---
title: Quick Start — 5 Minutes
description: Get the Magento 2 Power BI Connector running in 5 minutes. Follow this fast-path guide for experienced users. Covers Azure AD and connection setup.
meta:
  - name: keywords
    content: magento power bi quick start, power bi setup, fast analytics deployment
---

# Quick Start — Up and Running in 5 Minutes

::: tip Who this page is for
You understand Magento architecture and Azure AD concepts. You just need the key variables and sequential roadmap.
:::

## The Big Picture

| Step | Task | Estimated Time | Reference Guide |
|---|---|---|---|
| 1 | Upload & Compile Code | 3 min | [Installation](./installation.md) |
| 2 | Register Azure App & Secret | 5 min | [Azure AD Setup](./azure-ad-setup.md) |
| 3 | Input Settings & Authorize | 2 min | [Module Settings](./settings.md) |
| 4 | Map Queries & Run Sync | 3 min | [Visual Query Builder](./query-builder.md) |
| **Total** | | **~13 min** | |

## Preparation Checklist

- [ ] Magento 2.4.x installation is operational.
- [ ] SSL/HTTPS is provisioned globally.
- [ ] Microsoft Account with Global Admin/Contributor rights for App Registration.
- [ ] Power BI Pro workspace created.

---

## Step-by-Step Fast Path

### 1. Azure App Registration

1. Navigate to [portal.azure.com](https://portal.azure.com).
2. Open **App registrations** → **+ New registration**.
3. Populate configuration:
   - **Name:** `Magento 2 Power BI Connector`
   - **Supported account types:** Single tenant.
   - **Redirect URI:** Select **Web** and input:
     `https://your-domain.com/[your_admin_url]/powerbi/oauth/callback`
4. Copy the **Application (client) ID** and **Directory (tenant) ID** from the Overview panel.
5. Navigate to **Certificates & secrets** → **+ New client secret**. Copy the generated **Value** instantly.
6. In **API permissions**, add **Power BI Service** -> **Delegated permissions** and enable:
   - `Dataset.ReadWrite.All`
   - `Workspace.ReadWrite.All`
   - `Report.Read.All`
   - `Dashboard.Read.All`
7. Click **Grant admin consent** for the tenant.

### 2. Connect Magento to Microsoft

1. Log in to your Magento Admin Panel.
2. Go to **Stores → Configuration → Webkul → Power Bi**.
3. Set **Enable** to `Yes`.
4. Enter your copied **Client ID**, **Client Secret Key**, and **Power Bi Tenant Id**.
5. Click **Save Config**.
6. Locate and click the **Connect to Power BI** button.
7. Sign in with your Microsoft identity and accept the permissions granting dialog.

### 3. Map First Dataset

1. Go to **Power Bi → Power Bi Connector Management → Query Builder**.
2. Select an entity (e.g., **Orders**).
3. Use the presets to map required Magento attributes to Power BI column names.
4. Click **Preview Sample** to verify JSON payloads return correctly.
5. Click **Save Profile**.
6. Go to the generated Load Profile grid and click **Sync Now**.

---

## Validation: Check That It Worked

![Analytics Hub Success View](//magento2-doc//images/dashboard-top-grouped.webp)
*The integrated dashboard lights up as soon as data begins piping to Power BI.*

1. Open **Power Bi → Analytics Dashboard** to view synchronized KPIs.
2. Open [app.powerbi.com](https://app.powerbi.com) and verify the dataset populated your target workspace.

## What To Optimize Next

| Objective | Module Interface |
|---|---|
| Trigger sync every morning at 2 AM | **Automatic Data Sync** UI |
| Monitor failed synchronization payloads | **Retry Queue** panel |
| Email notifications for Low Stock alerts | **Smart Alerts** generator |
| Delegate report editing to specific admins | **Magento User Role ACL** |
