---
title: Logs & Retry Queue
description: A guide to inspecting Magento logging grids, retry holding tables, and diagnostic filesystem logging.
meta:
  - name: keywords
    content: magento retry queue, sync history grid, alert history logs
---

# Logs & Retry Queue

The module records comprehensive runtime tracking data directly within dedicated Magento UI Component Grids and localized filesystem log repositories, ensuring granular visibility into pipeline bottlenecks and authentication events.

Navigate to log management via the core menu:
```
Power Bi → Logs Management
```

---

## 1. Sync History Grid

Tracks granular summaries of every executed Load Profile serialization attempt.

| Column | Importance |
|---|---|
| **Load Profile ID** | The logical rule being executed. |
| **Start Time** | Useful for tracing cron concurrency delays. |
| **Rows Affected** | Tally of JSON objects dispatched to Microsoft. |
| **HTTP Status Code**| Direct 200/400 series code returned by Azure REST. |
| **Success Flag** | Simplified boolean visualization of the run state. |

---

## 2. The Retry Queue Table

Holding bucket for deferred transmission payloads. Entries populate here automatically when the Power BI API returns 5xx timeouts or 429 throttle violations.

- **Payload Contents**: The stored grid reveals the complete JSON string staged for the retry iteration.
- **Attempt Counter**: Increments automatically on every re-evalution loop by the system cron.
- **Manual Release**: Admins can manually select checkboxes and click "Retry Selected Now" to immediately free stuck packets without waiting for the next scheduler trigger.

---

## 3. Alert Notification History

Documents exactly when automated business alerts generated communications.

- **Alert Name**: Specific rule violated.
- **Calculated Snapshot**: The numeric evaluation point captured at the time of violation.
- **Trigger Datetime**: Verification of notification concurrency.
- **Recipients Delivered**: Confirms specific email routing success.

---

## 4. Filesystem Logging (Developer Debugging)

For direct server-level diagnosis of internal PHP errors, stack traces, and detailed CURL headers, the module maintains physical text files standard to Magento 2.

Navigate to your installation root shell:

```bash
tail -f var/log/webkul_powerbiconnector.log
```

### Log Levels Logged

| Type | Log Appearance | Context |
|---|---|---|
| **INFO** | `Connection successful.` | Daily runtime health confirmation. |
| **DEBUG** | `Outbound Payload: { json... }`| Generated only if Magento `Developer Mode` is on. |
| **CRITICAL**| `OAuth Token Expired.` | Fatal interruptions blocking sync execution. |
| **ERROR** | `Undefined index...` | PHP runtime logic exceptions. |

::: tip Advanced Debug Mode
To generate extremely granular output of full JSON request bodies, temporarily switch your environment variable to developer: `bin/magento deploy:mode:set developer`. **Warning:** This yields heavy write loads. Toggle back to Production mode when done.
:::
