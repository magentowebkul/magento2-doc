---
title: Module Settings
description: Configure configuration pathways, Azure AD credentials, and authorization tokens in the Magento 2 System Settings.
meta:
  - name: keywords
    content: magento power bi settings, client id setup, oauth authorization magento, tenant id configuration
---

# Module Settings

The Power BI Connector leverages Magento 2's native Core Configuration system. This guarantees that critical API secrets are securely encrypted within your `core_config_data` using Magento's encryption key.

You can find the settings panel at:

```
Magento Admin → Stores → Configuration → Webkul → Power Bi
```

## General Settings

The single configuration group includes master triggers, cloud identity parameters, and live token inspection.

![Settings — Power Bi Configuration](//magento2-doc//images/settings-panel.webp)
*Standard Magento Configuration hierarchy for the connector.*

| Field Name | Input Type | Requirement | Description |
|---|---|---|---|
| **Enable** | Dropdown | Required | Global on/off switch. Disabling removes module resources from memory and prevents query execution. |
| **Client ID** | Text (Encrypted) | Required | The **Application (client) ID** generated inside your Azure App Registration. |
| **Client Secret Key** | Obscure (Encrypted)| Required | The string **Value** generated under Certificates & Secrets in Azure. |
| **Power Bi Tenant Id**| Text (Encrypted) | Required | The **Directory (tenant) ID** representing your Azure AD environment. |
| **Token** | Textarea | Read-only | A system-populated field showing the active bearer token received from Microsoft identity servers. |
| **Refresh Token** | Textarea | Read-only | A stored token utilized by Cron schedules to maintain connectivity silently when the primary token expires. |
| **Expiration** | Text | Read-only | The specific Unix timestamp when the active token expires. |
| **Connect to Power BI** | Action Button | Required | Initiates the three-legged OAuth authorization flow redirecting to Microsoft Login. |

---

## Authorization Lifecycle

Unlike legacy authentication methods requiring user/password storage, the connector implements standard **OAuth 2.0 Code Flow with Refresh Tokens**.

### Initial Authorization
Once **Client ID**, **Client Secret**, and **Tenant ID** are entered and **saved**:
1. Click the **Connect to Power BI** button.
2. Magento redirects your browser to `login.microsoftonline.com`.
3. Upon approving access scopes, Microsoft redirects you back to the Magento Admin OAuth controller.
4. The module captures the Authorization Code, exchanges it for tokens, and saves them to the database automatically.

### Automated Refresh
The module registers a Cron Job (`OAuthTokenRefresh`) scheduled to evaluate the **Expiration Timestamp** regularly. If the token is nearing expiration, the module automatically requests a new token using the saved `refresh_token`, ensuring seamless data pipelines without requiring admin intervention for months.

::: tip Keep Refresh Tokens Active
If the authorization fails over a long period, standard Microsoft security policies might expire the static Refresh Token. Simply click **Connect to Power BI** again to regenerate access instantly.
:::

## Scoping & Hierarchy

Because the module lives inside Magento’s Configuration infrastructure, it fully supports native scoping hierarchies:

- **Global Scope (Default Config)**: Setting credentials here applies them across all store views.
- **Website Scope**: Override Client IDs if different Magento websites utilize entirely separate Microsoft Cloud tenants.
- **Store View Scope**: You can selectively toggle **Enable** to `Yes` or `No` for individual store views depending on whether catalog/data aggregation should happen at that level.

---

## Advanced Verification

Should credentials seem correct but synchronization fails, verify connectivity manually via Command Line.

```bash
# Forces an explicit token verification and logic verification
php bin/magento wkpbic:sync --id=TEST
```
The system logger will push direct HTTP responses to `var/log/webkul_powerbiconnector.log` instantly.
