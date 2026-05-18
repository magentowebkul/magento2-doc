---
title: Troubleshooting
description: Diagnose connectivity interruptions, cron staleness, and visual layout errors in the Magento environment.
meta:
  - name: keywords
    content: magento power bi errors, cron not running, power bi connection failed, azure ad error
---

# Troubleshooting

Magento 2’s architecture inherently requires distinct troubleshooting compared to other platforms. Ensure your troubleshooting logic leverages standard compilation clearing and file system visibility.

---

## Connection and Sign-in Errors

### 1. `AADSTS50011: Redirect URI does not match`
This implies the static URL registered within Azure doesn't align byte-for-byte with the Magento callback endpoint.

- **Verification**: In Azure, your URL MUST follow the pattern: `https://[domain]/[admin_frontname]/powerbi/oauth/callback/`.
- **Common Fallacy**: If your local testing uses `http://` instead of `https://`, Azure rejects the handshake. Always enforce SSL.

### 2. `AADSTS7000215: Invalid client secret`
Magento encrypts values upon form submission. 
- **Fix**: You likely copied the `Secret ID` GUID rather than the secret string `Value`. Generate a completely NEW secret in Azure, copy the **Value** instantly, and re-save in Magento.

### 3. Connection Drops Randomly After 1 Hour
Tokens naturally expire. If refresh is failing automatically:
- Verify the system cron is processing: `bin/magento cron:run`.
- Verify the `OAuthTokenRefresh` cron group is not blocked or halted in the `cron_schedule` database table.

---

## Data Movement & Loading Failures

### 1. "Memory Limit Exceeded" During Sync
Highly dense product catalogs may deplete PHP RAM buffers during serialization.

- **Adjustment**: Lower the `Batch Size` inside the **Automatic Data Sync** form from 500 to 50.
- **Override**: Execute the execution via terminal: `php bin/magento wkpbic:sync --id=1` which bypasses standard FPM timeouts.

### 2. Power BI Dataset Disappears
If an employee manually deletes a workspace object in Microsoft cloud, Magento models may reference dead IDs.

- **Solution**: Navigate to **Manage Workspace/Dataset**, locate the obsolete row, and remove it locally. Re-run the initialization logic.

---

## Interface and Visual UI Faults

### 1. Grid is Stuck Spinning / Not Loading
AJAX queries backing the UI Components might be encountering JavaScript prototype clashes.

**Resolution Pipeline:**
```bash
# Clear cache
php bin/magento cache:flush

# Regenerate static deploy symlinks
php bin/magento setup:static-content:deploy -f

# Clear generation cache
rm -rf var/view_preprocessed/* pub/static/adminhtml/*
```

### 2. Save Profile Yields 500 Internal Error
Ensure database whitelist metadata is fully compiled.

```bash
php bin/magento setup:upgrade
php bin/magento setup:di:compile
```

---

## Essential Developer Diag Toolkit

Keep these shortcuts bookmarked to evaluate backend health instantly:

| Task | Command |
|---|---|
| **Verify Module Enabled** | `php bin/magento module:status Webkul_PowerBiConnector` |
| **Inspect Live Failures** | `tail -f var/log/webkul_powerbiconnector.log` |
| **List Running Consummers**| `php bin/magento queue:consumers:list` |
| **Iterate Manual Alert** | `php bin/magento wkpbic:alerts:check` |

---

## Still Seeking Assistance?

If diagnostic commands run perfectly but transmission remains intermittent, reach out to Webkul Global Support:

1. **Tickets**: Submit logs to the [UVDesk Ticket Portal](https://webkul.uvdesk.com/).
2. **Attach Logs**: Zip the file `var/log/webkul_powerbiconnector.log` and include it in the ticket body. Redact Client IDs prior to uploading for absolute security compliance.
