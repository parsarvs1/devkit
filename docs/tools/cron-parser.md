# Cron Parser

## Purpose

Parses and validates standard 5-field cron expressions, providing a human-readable summary and a field-by-field breakdown of the schedule.

## When to use it

- You have a cron expression and want to understand what it does.
- You need to validate that a cron expression is syntactically correct.
- You want to see a breakdown of which values each field represents.
- You need to verify a cron schedule before deploying it.

## How to use it

1. Navigate to the [Cron Parser tool page](/tools/cron-parser).
2. Enter a cron expression in the input field (e.g., `*/15 * * * *`).
3. The tool automatically validates the expression as you type.
4. If valid, you see:
   - A green "Valid expression" indicator.
   - A human-readable **Schedule** summary.
   - A **Field Breakdown** showing each field's raw value and expanded meaning.
5. If invalid, you see a red error indicator with a description of what is wrong.
6. Click **Copy** to copy the expression to your clipboard (only available when valid).
7. Click **Reset** to restore the expression to `* * * * *`.
8. Click any of the **Examples** buttons to load a preset expression.

## Inputs

| Input | Description | Example |
|-------|-------------|---------|
| Cron expression | A standard 5-field cron expression (space-separated) | `0 9 * * 1-5` |

### Supported syntax

The parser supports standard 5-field cron:

```
minute hour day-of-month month day-of-week
```

| Field | Range | Supported syntax |
|-------|-------|------------------|
| Minute | 0–59 | `*`, lists (`1,2,3`), ranges (`1-5`), steps (`*/15`) |
| Hour | 0–23 | `*`, lists, ranges, steps |
| Day of Month | 1–31 | `*`, lists, ranges, steps |
| Month | 1–12 | `*`, lists, ranges, steps |
| Day of Week | 0–6 | `*`, lists, ranges, steps |

**Note:** Day-of-week uses 0–6 where 0 is Sunday. Quartz and other extended dialects are not supported.

## Options

| Option | Description |
|--------|-------------|
| Copy | Copies the valid expression to the clipboard |
| Reset | Resets the expression to `* * * * *` |
| Examples | Four preset buttons: Every minute, Every 15 min, Weekdays 9am, Monthly |

## Output

### Validation status

- **Valid:** Green checkmark with "Valid expression" text.
- **Invalid:** Red X with a descriptive error message (e.g., "Expected 5 fields, got 3." or "Minute: Out of range (0–59)").

### Schedule summary

A human-readable description of when the job runs. Examples:

| Expression | Summary |
|------------|---------|
| `* * * * *` | Runs every minute. |
| `*/15 * * * *` | Runs every 15 minutes. |
| `0 9 * * 1-5` | Runs at minute 0 past hour 9, on weekday 1-5. |
| `0 0 1 * *` | Runs at minute 0 past hour 0, on day 1. |

### Field breakdown

For each of the five fields, the breakdown shows:
- The field name (Minute, Hour, Day of Month, Month, Day of Week).
- The raw value as entered.
- A description: "Every" for `*`, "Never" for empty results, "N values" for lists/ranges, or an error message.

## Examples

See [Cron Parser Examples](../examples/cron-parser.md) for practical use cases.

## Edge cases

- **Wrong number of fields:** Expressions with fewer or more than 5 fields produce an error indicating the expected count.
- **Out-of-range values:** Values outside the valid range for a field produce an "Out of range" error.
- **Invalid steps:** Step values that are not positive integers produce an "Invalid step" error.
- **Empty fields:** An empty field produces a "Field is empty" error.
- **Comma-separated lists:** Each part of a comma-separated list is validated independently.

## Limitations

- Only standard 5-field cron is supported. Quartz (6 or 7 fields), `@daily` macros, and other extensions are not recognized.
- No next-run-time calculation — the tool only describes the schedule, it does not compute future execution times.
- Day-of-month and day-of-week OR semantics (standard cron behavior where both restrict the schedule) are not explicitly explained in the summary.

## Privacy and security

- All parsing happens client-side. No data is sent to any server.
- No expressions are stored or persisted.

## Related tools

- [Cron Generator](cron-generator.md) — for building cron expressions visually
