# Timestamp Converter

## Purpose

Converts between Unix timestamps (seconds since January 1, 1970 UTC) and ISO 8601 date strings. Provides bidirectional conversion with a one-click "Use Current Time" shortcut.

## When to use it

- You have a Unix timestamp and need to know what date/time it represents.
- You have a date and need to convert it to a Unix timestamp for an API or database.
- You need the current time as a Unix timestamp or ISO date.

## How to use it

1. Navigate to the [Timestamp Converter tool page](/tools/timestamp).
2. Choose a conversion direction:
   - **Timestamp to Date:** Enter a numeric Unix timestamp, then click **Convert to Date**.
   - **Date to Timestamp:** Enter an ISO 8601 date string, then click **Convert to Timestamp**.
3. Click **Use Current Time** to instantly populate both fields with the current time.
4. Click **Clear** to reset both fields.

## Inputs

### Timestamp to Date

| Input | Description | Example |
|-------|-------------|---------|
| Unix timestamp | A numeric value representing seconds since 1970-01-01 00:00:00 UTC | `1750000000` |

**Seconds vs. milliseconds:** The tool interprets the input based on its length:
- Values with **10 digits or fewer** are treated as **seconds** (multiplied by 1000 internally).
- Values with **more than 10 digits** are treated as **milliseconds** (used as-is).

### Date to Timestamp

| Input | Description | Example |
|-------|-------------|---------|
| ISO date | An ISO 8601 formatted date-time string | `2026-08-11T12:00:00.000Z` |

## Options

| Option | Description |
|--------|-------------|
| Convert to Date | Converts the Unix timestamp to an ISO date string |
| Convert to Timestamp | Converts the ISO date to a Unix timestamp (in seconds) |
| Use Current Time | Populates both fields with the current time |
| Clear | Resets all fields |

## Output

### Timestamp to Date output

An ISO 8601 date string in UTC:

```
2025-06-15T12:26:40.000Z
```

### Date to Timestamp output

A Unix timestamp in **seconds** (integer):

```
1750000000
```

## Examples

See [Timestamp Converter Examples](../examples/timestamp.md) for practical use cases.

## Edge cases

- **Invalid timestamp:** Non-numeric input or values that produce an invalid Date object result in the error "Invalid Unix timestamp."
- **Invalid date:** Unparseable date strings result in the error "Invalid date."
- **Empty input:** Both convert buttons are disabled when their respective input fields are empty.
- **Negative timestamps:** The tool accepts negative values (dates before 1970), though the seconds/milliseconds detection is based on string length, not sign.

## Limitations

- The date input is a plain text field, not a native date picker. You must type or paste an ISO 8601 string.
- Output is always in UTC (ISO format with `Z` suffix). No local timezone output is provided.
- The "Date to Timestamp" output is always in seconds, even if the original timestamp was in milliseconds.

## Privacy and security

- All conversion happens client-side in the browser. No data is transmitted to any server.
- No values are stored or persisted between sessions.

## Related tools

- [Unix Timestamp Converter](unix-timestamp-converter.md) — a more full-featured converter with unit selection and multiple output formats
- [UUID Generator](uuid-generator.md) — for generating unique identifiers
