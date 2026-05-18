---
title: Analytics Dashboard
description: Comprehensive guide to the Magento Analytics Dashboard hub including KPIs, live chart visualizations, and sync health panels.
meta:
  - name: keywords
    content: magento analytics dashboard, store health metrics, power bi kpi cards
---

# Analytics Dashboard

The **Analytics Dashboard** serves as your centralized command center. It aggregates critical Magento performance data locally, providing immediate visualization of the state of your catalog and sales, aligned with your Power BI data pipelines.

Find it in the Magento Admin sidebar under:
```
Power Bi → Power Bi Connector Management → Analytics Dashboard
```

![Analytics Hub High-Level Overview](/magento2-power-bi/images/dashboard-top-grouped.webp)
*Anatomy of the native Analytics Hub.*

---

## 1. Setup Progress Tracker

Located prominently at the top for new installations, this vertical stepper tracks mandatory configuration stages:
- **Azure AD Setup**: Confirms if Client keys exist.
- **Authentication**: Confirms if the OAuth token flow completed successfully.
- **First Sync Profile**: Detects if you created a Query Profile.
- **Initial Sync**: Marks complete after the very first chunk of data reaches Microsoft.

Once all steps turn green, the tracker collapses to conserve screen real estate.

## 2. Connection Metrics Bar

Displays real-time integrity indicators computed directly by the helper system:
- **Connection Integrity**: Displays a live `Connected` or `Disconnected` state verified against current API tokens.
- **Sync Schedule Status**: Indicates whether Magento Cron triggers are properly processing queues.
- **Data Freshness**: A time-drift calculator showing how many minutes/hours have passed since the latest outbound push.

## 3. Key Performance Indicators (KPIs)

Interactive cards located mid-page compute totals dynamically over the standard **Last 30 Days** window:
- **Total Revenue**: Sum of invoiced grand totals (excluding refunds).
- **Total Order Count**: Aggregate order volume count.
- **Average Order Value (AOV)**: Total Revenue divided by Total Order Count.
- **New Customer Registrations**: Count of recently registered store accounts.

::: tip Historic Benchmarking
Each card automatically calculates the percentage delta ($\Delta$) comparing the current 30-day window to the preceding 30-day period, visually rendered in Green (Increase) or Red (Decrease).
:::

## 4. Native Visualization Charts

The core analytics viewport visualizes high-density transactional timelines seamlessly integrated with operational health telemetry:

![Sales Trend Visuals and Store Health Sidebar Matrix](/magento2-power-bi/images/dashboard-sales-grouped.webp)

Below the KPIs, the module leverages optimized Javascript rendering (via Chart.js integration) to present five primary visualizations:

| Chart Widget | Rendering Type | Dataset Visualized |
|---|---|---|
| **Sales Trends** | Dual-Axis Line | Overlays daily Revenue (bar) vs daily Order Count (line). |
| **Order Splitting**| Pie / Doughnut | Partitions orders by state (e.g., Pending, Processing, Complete, Closed). |
| **Top Performers** | Horizontal Bar | The Top 5 Product SKUs by cumulative gross revenue. |
| **Revenue Sources**| Donut | Grouping of totals aggregated by active Payment Gateway IDs. |
| **Customer Growth**| Line Chart | Tracks monthly acquisition volumes across the last 12 months. |

![Extended Secondary Chart Visualization Engine](/magento2-power-bi/images/dashboard-charts-grid.webp)

## 5. Store Health Matrix

Unlike standard sync lists, this pane gives actionable inventory alerts:
- **Low Stock Inventory**: Count of catalog items currently below defined quantity thresholds.
- **Out of Stock**: Count of globally disabled SKUs.
- **Processing Bottlenecks**: Count of Orders resting in intermediate states needing attention.

## 6. Sync History & Realtime Actions

The footer displays the most recent system-to-system synchronization log payloads:
- **Entity Type**: Category, Product, etc.
- **Status Indicator**: Success, Failed, or Warning.
- **Execution Duration**: Milliseconds elapsed.
- **Immediate Actions**: A "Retry" button permitting one-click queue repopulation directly from the dashboard if a fail occurs.
 
  ![Continuous System Sync Logger and Direct Action Console](/magento2-power-bi/images/dashboard-footer-actions.webp)

---

## Troubleshooting

| Problem | Action Path |
|---|---|
| **KPIs render as zero** | Ensure sales data is cached. Run `php bin/magento indexer:reindex` and verify Load Profile has run successfully at least once. |
| **Disconnection State persistent** | Go to **Stores -> Config**, confirm Tenant ID, and re-trigger the **Connect to Power BI** authorization chain. |
| **Graphs not rendering properly** | Flush Magento cache via Admin UI or terminal (`php bin/magento cache:flush`) to clear potentially corrupt template JS loads. |
