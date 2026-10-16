# Cron Parser — Examples

## Valid expressions

### Example 1: Every minute

**Input:** `* * * * *`

**Expected result:**

```
Valid expression
```

**Schedule summary:**

```
Runs every minute.
```

**Field breakdown:**

| Field | Raw | Description |
|-------|-----|-------------|
| Minute | `*` | Every |
| Hour | `*` | Every |
| Day of Month | `*` | Every |
| Month | `*` | Every |
| Day of Week | `*` | Every |

### Example 2: Every 15 minutes

**Input:** `*/15 * * * *`

**Expected result:**

```
Valid expression
```

**Schedule summary:**

```
Runs every 15 minutes.
```

**Field breakdown:**

| Field | Raw | Description |
|-------|-----|-------------|
| Minute | `*/15` | 4 values |
| Hour | `*` | Every |
| Day of Month | `*` | Every |
| Month | `*` | Every |
| Day of Week | `*` | Every |

### Example 3: Weekdays at 9 AM

**Input:** `0 9 * * 1-5`

**Expected result:**

```
Valid expression
```

**Schedule summary:**

```
Runs at minute 0 past hour 9, on weekday 1-5.
```

**Field breakdown:**

| Field | Raw | Description |
|-------|-----|-------------|
| Minute | `0` | 1 value |
| Hour | `9` | 1 value |
| Day of Month | `*` | Every |
| Month | `*` | Every |
| Day of Week | `1-5` | 5 values |

### Example 4: Monthly on the 1st

**Input:** `0 0 1 * *`

**Expected result:**

```
Valid expression
```

**Schedule summary:**

```
Runs at minute 0 past hour 0, on day 1.
```

### Example 5: Every hour

**Input:** `0 * * * *`

**Expected result:**

**Schedule summary:**

```
Runs at minute 0 of every hour.
```

### Example 6: Specific minutes

**Input:** `0,30 8-17 * * 1-5`

**Expected result:**

**Schedule summary:**

```
Runs at minute 0,30 past hour 8-17, on weekday 1-5.
```

**Field breakdown:**

| Field | Raw | Description |
|-------|-----|-------------|
| Minute | `0,30` | 2 values |
| Hour | `8-17` | 10 values |
| Day of Month | `*` | Every |
| Month | `*` | Every |
| Day of Week | `1-5` | 5 values |

### Example 7: Step with range

**Input:** `0 0-6/2 * * *`

**Expected result:**

**Schedule summary:**

```
Runs at minute 0 past hour 0-6/2.
```

**Field breakdown:**

| Field | Raw | Description |
|-------|-----|-------------|
| Minute | `0` | 1 value |
| Hour | `0-6/2` | 4 values (0, 2, 4, 6) |
| Day of Month | `*` | Every |
| Month | `*` | Every |
| Day of Week | `*` | Every |

## Invalid expressions

### Example 8: Too few fields

**Input:** `* * * *`

**Expected error:**

```
Expected 5 fields, got 4. Format: minute hour day-of-month month day-of-week
```

### Example 9: Too many fields

**Input:** `* * * * * *`

**Expected error:**

```
Expected 5 fields, got 6. Format: minute hour day-of-month month day-of-week
```

### Example 10: Out of range

**Input:** `60 * * * *`

**Expected error:**

```
Minute: Out of range (0–59)
```

### Example 11: Invalid step

**Input:** `*/0 * * * *`

**Expected error:**

```
Minute: Invalid step "0"
```

### Example 12: Invalid value

**Input:** `abc * * * *`

**Expected error:**

```
Minute: Invalid value "abc"
```

### Example 13: Empty expression

**Input:** *(empty)*

**Expected error:**

```
Expression is empty.
```

## Using the examples

### Example 14: Load a preset

**Action:** Click the **"Every 15 min"** button in the Examples section.

**Expected result:** The expression input is populated with `*/15 * * * *` and the validation, summary, and field breakdown update accordingly.

## Copy

### Example 15: Copy a valid expression

**Action:**
1. Enter `0 9 * * 1-5`.
2. Click **Copy**.

**Expected result:** `0 9 * * 1-5` is copied to the clipboard. The button shows "Copied!" for 1.5 seconds.

**Note:** The Copy button is disabled when the expression is invalid.
