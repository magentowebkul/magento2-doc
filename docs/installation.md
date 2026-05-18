---
title: Installation — Deployment Guide
description: Install and deploy the Magento 2 Power BI Connector module. Learn how to upload files and run the Magento compiler commands.
meta:
  - name: keywords
    content: install magento 2 power bi, deploy magento module, magento 2 terminal commands, power bi connector setup
---

# Install the Module

::: tip At a Glance
- **Time:** About 5 minutes.
- **What you do:** Upload files to app/code → run setup commands → verify compile.
- **Up next:** [Azure AD Setup](./azure-ad-setup.md)
- **Want the short version?** See the [Quick Start](./quick-start.md).
:::

## Pre-flight Checklist

Run through this list to ensure a flawless deployment environment.

- [ ] Magento 2.4.3 or higher installed.
- [ ] Access to the SSH terminal of your Magento server.
- [ ] PHP version matching your Magento version (e.g., PHP 8.1, 8.2, 8.3).
- [ ] Cron daemon is enabled and running (`bin/magento cron:install`).
- [ ] Website is running on **HTTPS** (Required by Azure OAuth Redirect URLs).
- [ ] You have administrative rights to your Azure Portal and Power BI accounts.

## Deployment Procedures

You can install the module by extracting the zip archive directly into your Magento filesystem.

### Step 1 — Prepare Directories

First, navigate to your Magento root installation and ensure the correct directory structure exists for the Webkul namespace.

```bash
cd /your/magento/root/dir/
mkdir -p app/code/Webkul/PowerBiConnector
```

### Step 2 — Upload and Extract

1. Download the Power BI Connector extension archive from your Webkul user dashboard.
2. Transfer the zip file into the `app/code/Webkul/PowerBiConnector` folder via SCP, SFTP, or direct upload.
3. Extract the archive's contents into this folder.

The absolute path to your `registration.php` file should resemble:
`<Magento_Root>/app/code/Webkul/PowerBiConnector/registration.php`

### Step 3 — Register Extension and Compile

Log in to your server via SSH and execute the standard Magento 2 compilation chain.

```bash
# 1. Upgrade the setup schema and register the module
php bin/magento setup:upgrade

# 2. Recompile the dependency injection configuration
php bin/magento setup:di:compile

# 3. Deploy static content assets (Use -f if forced override needed)
php bin/magento setup:static-content:deploy -f
```

### Step 4 — Cache & Maintenance

Finally, flush the cache storage to finalize application rendering.

```bash
php bin/magento cache:flush
```

---

## System Verification

To confirm successful installation, run the following command in terminal:

```bash
php bin/magento module:status Webkul_PowerBiConnector
```

**Expected Output:**
`Module is enabled`

## What Happens Post-Deployment

Once standard compilation completes, you will notice the following additions in your Magento admin environment:

1. **New Menu Path**: Navigate to **Power Bi** in the main vertical navigation bar.
2. **System Config Section**: A dedicated settings section will load under **Stores → Configuration → Webkul → Power Bi**.
3. **Message Queue Handlers**: A new data consumer `powerbi_data_push_consumer` is registered in the system.
4. **CLI Utilities**: Specialized commands become available when you run `bin/magento list wkpbic`.

## Where to Go Next

The module code is running, but connectivity is not established yet. Follow the sequential setup chain below:

1. **[Azure AD Setup](./azure-ad-setup.md)** — obtain your app Client credentials.
2. **[Power BI Account Setup](./power-bi-setup.md)** — configure your analytics workspaces.
3. **[Module Settings](./settings.md)** — input the credentials into Magento Admin and click Authorize.

## Uninstallation and Cleanup

Should you need to disable or remove the module:

**To temporary disable:**
```bash
php bin/magento module:disable Webkul_PowerBiConnector
php bin/magento setup:upgrade
```

**To fully remove (Optional Cleanup):**
1. Drop module tables from database (prefix `wk_pbi_`).
2. Delete folder `app/code/Webkul/PowerBiConnector`.
3. Execute compilation suite again.

