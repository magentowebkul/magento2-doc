---
title: Smart Alerts
description: Monitor critical business indicators and receive instant email notifications when conditions drift beyond normal parameters.
meta:
  - name: keywords
    content: magento store alerts, aov threshold, low stock email notifications
---

# Smart Alerts

The **Smart Alerts** system proactively monitors metrics within your store and flags negative outliers before you generate reports. Utilizing automated Magento cron evaluation, the engine verifies counts and aggregate sums, firing emails directly to assigned store administrators.

Navigate to the system grid via:
```
Power Bi → Alerts Management → Manage Alerts
```

---

## Tracked KPIs (Metrics)

Configure triggers based on six critical operational data points:

| Metric Selection | Calculation Definition | Unit Type |
|---|---|---|
| **Order Count** | Total distinct orders submitted in the period. | Numeric Integer |
| **Total Sales** | Aggregate `grand_total` from valid, non-canceled orders. | Currency Float |
| **Average Order Value** | Total Sales divided by Order Count. | Currency Float |
| **Refund Rate (%)** | Ratio of creditmemo refund instances to total order instances. | Percentage |
| **Low Stock Count** | Sum of active product IDs dropping beneath configured thresholds. | Unique Count |
| **Sync Failure Count**| The number of distinct synchronization payload rejections. | Fail Count |

## Defining Conditions

Alert logic is created via standard equality evaluations applied across chronological time boundaries.

### 1. Time Windows
Specify the rolling period examined by the evaluation engine:
- **1 Hour**: Instantaneous reaction to spikes.
- **24 Hours**: Best for daily volume dips.
- **7 Days** / **30 Days**: Best for long-tail averages (e.g., AOV drift).

### 2. Threshold Logic
- **Greater Than (`>`)**: Triggers when the computed value exceeds the threshold (e.g., Refund rate > 5%).
- **Less Than (`<`)**: Triggers when counts collapse (e.g., Sales < 1000.00).
- **Equals To (`=`)**: Fires on specific static states.

---

## Crafting Notifications

The notification engine outputs formatted Magento transactional email formats.

1. **Email Subject**: A semantic title summarizing the risk.
2. **Email Body**: Support standard dynamic substitution variables:
   - `{metric}`: Inserted human-readable metric name.
   - `{value}`: Computed system value (e.g., 143.20).
   - `{threshold}`: The configured constraint point (e.g., 200.00).

*Example Template Pattern:*
> **Attention:** Alert triggered for {metric}. Current calculated value is {value} which violated threshold of {threshold}.

3. **Recipient Chain**: Accepts single or multi-recipient CSV lists.

---

## Scheduling and Execution

Evaluations occur continuously on the native Magento Cron lifecycle.

**Command Line Validation:**
You can trigger an instantaneous, verbose check of every registered active condition by calling the CLI listener:

```bash
php bin/magento wkpbic:alerts:check
```

This manually initiates iteration over each alert configuration and executes direct email deliveries immediately. Check the corresponding **Alert History** menu in Magento to review firing results.
