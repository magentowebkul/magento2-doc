---
title: Automatic Sync & Queues
description: Documenting the Magento data movement pipeline, covering system cron schedules, batch sizes, and asynchronous message queue consumers.
meta:
  - name: keywords
    content: magento cron sync, message queue powerbi, batch push settings
---

# Automatic Sync & Queues

The synchronization engine is architecturalized around the high-throughput demands of Enterprise Commerce. Data is decoupled from immediate UI operations, relying instead on Magento’s internal Cron ecosystem and decoupled **Message Queue Framework** to pipeline payloads into Microsoft Power BI seamlessly.

---

## 1. Automatic Data Sync (Cron Scheduling)

Set generalized recurrence schedules to extract entity snapshots automatically without manual intervention.

Access via:
```
Power Bi → Sync Management → Automatic Data Sync
```

### Configuration Form Definitions
The scheduled sync form (`powerbi_autosync_form`) specifies how periodic pulls behave.

| Field | Definition | Value Spectrum |
|---|---|---|
| **Frequency** | Determines the cron repeat interval. | Hourly, Daily, Weekly |
| **Entity Selection** | Specific domains to queue for the push. | Multi-Select: Categories, Products, Customers, Orders |
| **Batch Size** | Max record limit serialized per outbound API request. | Recommended: 100 - 500 rows |
| **Process State** | Enables or completely pauses background iteration. | Enabled / Disabled |

When a scheduled window arrives, the `Webkul\PowerBiConnector\Cron\AutoSyncProcess` fetches the current watermark pointers and schedules payload generations.

---

## 2. Robust Message Queue Architecture

For enterprise environments scaling heavily (hundreds of transactions per minute), the module offers native support for the **Magento Message Queue Framework (AMQP / RabbitMQ / MySQL)**.

Payload serialization pushes messages to the `powerbi_data_push_queue`. These messages sit in staging until offloaded by consumer processes.

### Managing Consumers
Verify and run queue listener daemon continuously via shell:

```bash
# 1. Check system for registered consumers
php bin/magento queue:consumers:list

# Expected output includes: "powerbi_data_push_consumer"

# 2. Start the consumer process manually
php bin/magento queue:consumers:start powerbi_data_push_consumer
```

::: tip Process Monitors
In Production, deploy supervisor agents (like `supervisord`) to maintain `queue:consumers:start powerbi_data_push_consumer` running continuously in the background without timeout.
:::

---

## 3. Failover: The Retry Queue

The module features an autonomous Recovery Layer built to withstand external Microsoft outages and throttle violations (HTTP 429).

- **Origin**: When an API request fails (e.g., timeout), the raw JSON payload is dumped into the `wk_pbi_retry_queue` db table.
- **Re-evaluation**: The `Webkul\PowerBiConnector\Cron\RetryQueue` iterates periodically across stored fails.
- **Execution Limit**: The module attempts regeneration fixed times before permanently archiving the record into the Failure Log history.

Find the active holding table at:
```
Power Bi → Logs Management → Retry Queue
```

---

## 4. Operations via Command Line (CLI)

System administrators can bypass browser interface limitations and execute heavy direct synchronization commands over SSH.

### Sync Command Syntax
```bash
php bin/magento wkpbic:sync --id=<LOAD_PROFILE_ID>
```

### Parameters
| Parameter | Description |
|---|---|
| `--id` | Pass the specific Load Profile Primary ID to push just one specific configured set. |

Executing via command line outputs real-time batch tallies and direct exception payloads immediately to your stdout, proving invaluable for diagnosing credential mismatch errors.
