---
title: Access Control (ACL)
description: Delegate administrative access to specific Power BI sub-menus using native Magento User Role Permissions.
meta:
  - name: keywords
    content: magento user role permissions, acl power bi, secure access magento admin
---

# Access Control (ACL)

The Power BI Connector fully complies with Magento 2’s highly granular **Access Control List (ACL)** framework. You can govern EXACT permissions—preventing analysts from modifying backend API credentials while enabling them to view dashboards.

To manage these, navigate to:
```
System → Permissions → User Roles
```

---

## Available Resources Tree

When creating or modifying an Admin Role, open the **Role Resources** tab. Under `Webkul PowerBiConnector`, you will find following structure tree:

| Resource Label | Purpose | Security Level |
|---|---|---|
| **PowerBiConnector Lab** | Grants access to the Stores -> Configuration panel | **HIGH** (Contains API Secrets) |
| **Analytics Dashboard** | View native Charts and KPIs | LOW |
| **Manage Workspace/Dataset** | Define remote containers at Microsoft | MEDIUM |
| **Manage Query Builder** | Construct extraction rules | MEDIUM |
| **Manage Reports** | Embed external visual frame URLs | LOW |
| **Manage Load Profiles** | Delete/Modify explicit sync pipelines | MEDIUM |
| **Manage Automatic Data Sync**| Alter global Cron schedule timing | MEDIUM |
| **Manage Account & OAuth** | Access the `Authorize` trigger button | **CRITICAL** |

---

## Separation of Duties (Best Practices)

Follow the Magento Principle of Least Privilege by constructing discrete Roles:

### 1. BI Data Engineer
- **Resources Needed**: Workspace, Dataset, Query Builder, Load Profiles.
- **Duties**: Building tables and defining maps. Does NOT need full global system settings.

### 2. Store Analyst / Viewer
- **Resources Needed**: Analytics Dashboard, Manage Reports, Manage Dashboards.
- **Duties**: Purely read-only monitoring of outputs.

### 3. DevOps / Administrator
- **Resources Needed**: Sync Logs, Retry Queue, and system Configuration access.
- **Duties**: Maintenance, clearing blocks, and initial installation.

---

## Permission Troubleshooting

If an Administrator user reports seeing a **"404 Not Found"** or **"Access Denied"** screen when clicking a Power BI sidebar link:

1. Ensure their assigned User Role explicitly checks the requested sub-node in Role Resources.
2. Click **Save Role**.
3. Have the affected admin **Log Out and Log In again** to clear the specific active session's ACL cache stack.
