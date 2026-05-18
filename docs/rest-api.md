---
title: CLI & Queue Management
description: A complete reference for terminal-based administrative operations including synchronous profiling and message queue supervision.
meta:
  - name: keywords
    content: magento cli command, power bi terminal, queue management bash
---

# CLI & Queue Management

To ensure enterprise-grade stability, critical module interactions are available via the Magento Command Line Interface (CLI). Bypassing PHP maximum execution time constraints inherent to browsers, the CLI permits running intense data push iterations and health monitoring directly on the host server.

---

## Available Commands Summary

Access the specialized command list via terminal:

```bash
php bin/magento list wkpbic
```

| Command | Purpose | Usage Scenario |
|---|---|---|
| `wkpbic:sync` | Triggers explicit load profile execution. | Manual push, Cron replacements. |
| `wkpbic:alerts:check` | Executes full evaluation logic for smart alerts. | Out-of-band metric monitoring. |

---

## Deep Dive: `wkpbic:sync`

Instructs the Sync Engine to serialize the defined query constraints and push rows linearly directly within the terminal thread.

### Syntax
```bash
php bin/magento wkpbic:sync --id=<PROFILE_ID>
```

### Argument Definitions
- `--id`: **Required.** The internal incremental primary ID of the configuration row. You can find this ID on the Load Profile Grid sidebar.

### Example Execution
```bash
[user@server html]$ php bin/magento wkpbic:sync --id=4
Starting Synchronization for Profile ID: 4
Found dataset: Orders_Analytics_Dataset
Preparing 2400 rows...
[=============               ] 50% Complete
Push Result: SUCCESS. 2400 rows delivered to Table: Online_Orders.
```

---

## Deep Dive: `wkpbic:alerts:check`

Iterates through active Smart Alert Definitions in `wk_pbi_alerts`, queries current live dataset sums, evaluates boundaries, and issues emails instantly.

### Syntax
```bash
php bin/magento wkpbic:alerts:check
```

### Example Execution
```bash
[user@server html]$ php bin/magento wkpbic:alerts:check
Checking 3 registered Alerts...
Alert [Low Stock Monitor]: CONDITION MET (14 < 20). Email Dispatched to admin@company.com.
Alert [Refund Spike]: OK.
Evaluation Sequence Complete.
```

---

## Operating System Level Automation

For enterprise scalability, avoid triggering pushes inside user UI loops. Instead, lean on native OS tools to interact with Magento binaries.

### 1. Setup Long-Running Queue Consumer
Standard message queue publishers drop data packages into RabbitMQ/MySQL. To flush this continuously, maintain a running shell process.

Recommended `systemd` or `supervisord` configuration snippet:

```ini
[program:magento-powerbi-consumer]
command=php /var/www/html/bin/magento queue:consumers:start powerbi_data_push_consumer
directory=/var/www/html
autostart=true
autorestart=true
user=www-data
```

### 2. Forcing Automated Refresh via Sys-Cron
If you require specialized sync timing that overrides Magento native intervals, insert commands directly into root crontab:

```cron
# Triggers Load Profile ID #12 every day at Midnight server time
0 0 * * * /usr/bin/php /var/www/html/bin/magento wkpbic:sync --id=12 >> /var/log/magento_cron_pbi.log 2>&1
```

---

## Advanced Diagnosis Flags

Magento natively supports verbosity flags on all commands. Use these to reveal detailed PHP Exception stack traces if requests break midway.

```bash
# Standard execution
php bin/magento wkpbic:sync --id=1

# Verbose stack tracing
php bin/magento wkpbic:sync --id=1 -vvv
```
Outputs internal library traces and HTTP Request payload previews in real-time.
