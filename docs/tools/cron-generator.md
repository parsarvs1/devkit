# Cron Generator

## Purpose

Builds standard 5-field cron expressions visually using preset schedules and custom field inputs. Provides a human-readable summary of the generated expression.

## When to use it

- You need a cron expression but are unsure of the correct syntax.
- You want to quickly generate common schedules (daily, weekly, monthly) without memorizing cron syntax.
- You want to customize a schedule by editing individual cron fields.

## How to use it

1. Navigate to the [Cron Generator tool page](/tools/cron-generator).
2. Choose a method:
   - **Presets:** Click one of the preset buttons to instantly load a common schedule.
   - **Custom Schedule:** Edit the five field inputs directly.
3. The generated expression and a human-readable summary update automatically.
4. Click **Copy** to copy the expression to your clipboard.
5. Click **Reset** to restore all fields to `*`.

## Inputs

### Presets

| Preset | Expression |
|--------|------------|
| Every minute | `* * * * *` |
| Every 15 min | `*/15 * * * *` |
| Every hour | `0 * * * *` |
| Daily 00:00 | `0 0 * * *` |
| Weekdays 9am | `0 9 * * 1-5` |
| Weekly Mon | `0 0 * * 1` |
| Monthly | `0 0 1 * *` |

### Custom fields

| Field | Range | Description |
|-------|-------|-------------|
| Minute | 0–59 | Minute of the hour |
| Hour | 0–23 | Hour of the day |
| Day of Month | 1–31 | Day of the month |
| Month | 1–12 | Month of the year |
| Day of Week | 0–6 | Day of the week (0 = Sunday) |

Each field accepts standard cron syntax: `*`, lists (`1,2,3`), ranges (`1-5`), and steps (`*/15`).

## Options

| Option | Description |
|--------|-------------|
| Preset buttons | Load a predefined schedule into the fields |
| Field inputs | Edit individual cron fields directly |
| Copy | Copies the generated expression to the clipboard |
| Reset | Resets all fields to `*` |

## Output

### Generated expression

The five fields joined with spaces:

```
0 9 * * 1-5
```

### Human-readable summary

A description of when the job runs:

| Expression | Summary |
|------------|---------|
| `* * * * *` | Runs every minute. |
| `*/15 * * * *` | Runs every 15 minutes. |
| `0 * * * *` | Runs at minute 0 of every hour. |
| `0 0 * * *` | Runs at 00:00. |
| `0 9 * * 1-5` | Runs at 09:00, on weekday 1-5. |
| `0 0 * * 1` | Runs at 00:00, on weekday 1. |
| `0 0 1 * *` | Runs at 00:00, on day 1. |

## Examples

See [Cron Generator Examples](../examples/cron-generator.md) for practical use cases.

## Edge cases

- **No validation:** The generator does not validate field values. Invalid values (e.g., `99` for minute) will produce an expression that the Cron Parser would reject.
- **Free-text input:** The field inputs are plain text fields. You can enter any string, including complex expressions like `1,15` or `*/30`.
- **Summary formatting:** The summary uses `HH:MM` format (zero-padded) when both minute and hour are specific values.

## Limitations

- No validation of generated expressions. Use the [Cron Parser](cron-parser.md) to verify correctness.
- No next-run-time calculation.
- Only standard 5-field cron is supported. Quartz and other dialects are not available.
- No `@daily`, `@weekly`, or other macro shortcuts.

## Privacy and security

- All generation happens client-side. No data is sent to any server.
- No expressions are stored or persisted.

## Related tools

- [Cron Parser](cron-parser.md) — for validating and understanding cron expressions
