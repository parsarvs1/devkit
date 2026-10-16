# Cron Generator — Examples

## Using presets

### Example 1: Every minute

**Action:** Click the **Every minute** preset.

**Expected output:**

```
Expression: * * * * *
Summary:    Runs every minute.
```

### Example 2: Every 15 minutes

**Action:** Click the **Every 15 min** preset.

**Expected output:**

```
Expression: */15 * * * *
Summary:    Runs every 15 minutes.
```

### Example 3: Every hour

**Action:** Click the **Every hour** preset.

**Expected output:**

```
Expression: 0 * * * *
Summary:    Runs at minute 0 of every hour.
```

### Example 4: Daily at midnight

**Action:** Click the **Daily 00:00** preset.

**Expected output:**

```
Expression: 0 0 * * *
Summary:    Runs at 00:00.
```

### Example 5: Weekdays at 9 AM

**Action:** Click the **Weekdays 9am** preset.

**Expected output:**

```
Expression: 0 9 * * 1-5
Summary:    Runs at 09:00, on weekday 1-5.
```

### Example 6: Weekly on Monday

**Action:** Click the **Weekly Mon** preset.

**Expected output:**

```
Expression: 0 0 * * 1
Summary:    Runs at 00:00, on weekday 1.
```

### Example 7: Monthly

**Action:** Click the **Monthly** preset.

**Expected output:**

```
Expression: 0 0 1 * *
Summary:    Runs at 00:00, on day 1.
```

## Custom schedules

### Example 8: Every 30 minutes

**Action:** Set the fields to:

| Field | Value |
|-------|-------|
| Minute | `*/30` |
| Hour | `*` |
| Day of Month | `*` |
| Month | `*` |
| Day of Week | `*` |

**Expected output:**

```
Expression: */30 * * * *
Summary:    Runs every 30 minutes.
```

### Example 9: Twice daily at 9 AM and 6 PM

**Action:** Set the fields to:

| Field | Value |
|-------|-------|
| Minute | `0` |
| Hour | `9,18` |
| Day of Month | `*` |
| Month | `*` |
| Day of Week | `*` |

**Expected output:**

```
Expression: 0 9,18 * * *
Summary:    Runs at 09:00, on weekday 18.
```

**Note:** The summary has a known quirk -- when the hour field is a list like `9,18`, the summary says "on weekday 18" instead of "at 09:00, 18:00". This is a limitation of the summary formatting.

### Example 10: First Monday of every month at midnight

**Action:** Set the fields to:

| Field | Value |
|-------|-------|
| Minute | `0` |
| Hour | `0` |
| Day of Month | `1-7` |
| Month | `*` |
| Day of Week | `1` |

**Expected output:**

```
Expression: 0 0 1-7 * 1
Summary:    Runs at 00:00, on day 1-7, on weekday 1.
```

**Explanation:** This uses the standard cron OR semantics -- the job runs when *either* the day-of-month is 1-7 *or* the day-of-week is Monday. In practice, this means it runs on the 1st through 7th of each month, and also on every Monday.

### Example 11: Every 5 minutes during business hours

**Action:** Set the fields to:

| Field | Value |
|-------|-------|
| Minute | `*/5` |
| Hour | `9-17` |
| Day of Month | `*` |
| Month | `*` |
| Day of Week | `1-5` |

**Expected output:**

```
Expression: */5 9-17 * * 1-5
Summary:    Runs every 5 minutes past hour 9-17, on weekday 1-5.
```

## Copy and reset

### Example 12: Copy the generated expression

**Action:**
1. Click the **Daily 00:00** preset.
2. Click **Copy**.

**Expected result:** `0 0 * * *` is copied to the clipboard. The button shows "Copied!" for 1.5 seconds.

### Example 13: Reset to defaults

**Action:**
1. Modify any field.
2. Click **Reset**.

**Expected result:** All five fields return to `*` and the expression becomes `* * * * *`.

## Practical scenarios

### Scenario 1: Database backup at 2 AM daily

**Action:** Set minute to `0`, hour to `2`, leave the rest as `*`.

**Expression:** `0 2 * * *`

**Summary:** Runs at 02:00.

### Scenario 2: Log rotation every Sunday at midnight

**Action:** Set minute to `0`, hour to `0`, day-of-week to `0` (Sunday).

**Expression:** `0 0 * * 0`

**Summary:** Runs at 00:00, on weekday 0.

### Scenario 3: Health check every 10 minutes

**Action:** Set minute to `*/10`, leave the rest as `*`.

**Expression:** `*/10 * * * *`

**Summary:** Runs every 10 minutes.

### Scenario 4: Monthly report on the 1st at 6 AM

**Action:** Set minute to `0`, hour to `6`, day-of-month to `1`.

**Expression:** `0 6 1 * *`

**Summary:** Runs at 06:00, on day 1.

## Validation note

The Cron Generator does **not** validate field values. For example, entering `99` for the minute field will produce `99 * * * *`, which is invalid. Always verify generated expressions with the [Cron Parser](../tools/cron-parser.md).
