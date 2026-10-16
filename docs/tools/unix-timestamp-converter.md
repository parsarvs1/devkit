# Unix Timestamp Converter

## Purpose

Converts between Unix timestamps and human-readable dates with support for both seconds and milliseconds. Provides output in multiple formats (UTC, local, ISO) and includes a "Now" button for the current time.

## When to use it

- You have a Unix timestamp and need to see the date in UTC, local, and ISO formats.
- You have a date and need to convert it to a Unix timestamp.
- You need to determine whether a timestamp is in seconds or milliseconds.
- You want the current time as a Unix timestamp.

## How to use it

1. Navigate to the [Unix Timestamp Converter tool page](/tools/unix-timestamp-converter).
2. Choose a conversion direction:
   - **Timestamp to Date:** Enter a numeric timestamp, select the unit (Auto-detect, Seconds, or Milliseconds), then click **Convert**.
   - **Date to Timestamp:** Pick a date and time using the native datetime picker, then click **Convert**.
3. Click **Now** to instantly populate the timestamp field with the current time and display the result.
4. Click **Copy ISO** to copy the ISO 8601 result to your clipboard.
5. Click **Clear** to reset all fields.

## Inputs

### Timestamp to Date

| Input | Description | Example |
|-------|-------------|---------|
| Timestamp | A numeric value (integer, optionally negative) | `1700000000` |
| Unit | How to interpret the timestamp | Auto-detect, Seconds, Milliseconds |

**Auto-detect logic:**
- Values with **10 digits or fewer** are treated as **seconds**.
- Values with **more than 10 digits** are treated as **milliseconds**.

### Date to Timestamp

| Input | Description | Example |
|-------|-------------|---------|
| Date / Time | A local date and time (native `datetime-local` input) | `2026-08-11T12:00` |

**Note:** The date/time input is interpreted in your **local timezone**.

## Options

| Option | Description |
|--------|-------------|
| Convert (timestamp) | Converts the timestamp to a date using the selected unit |
| Convert (date) | Converts the picked date/time to a timestamp |
| Now | Populates the timestamp field with the current time (in seconds) and shows the result |
| Copy ISO | Copies the ISO 8601 result to the clipboard |
| Clear | Resets all fields and results |

## Output

When a conversion succeeds, the result displays five representations:

| Output | Description | Example |
|--------|-------------|---------|
| UTC | Date in UTC format (RFC 7231) | `Tue, 11 Aug 2026 12:00:00 GMT` |
| Local | Date in the browser's local timezone | `Tue Aug 11 2026 20:00:00 GMT+0800 (China Standard Time)` |
| ISO | ISO 8601 format (UTC) | `2026-08-11T12:00:00.000Z` |
| Seconds | Unix timestamp in seconds | `1750000000` |
| Milliseconds | Unix timestamp in milliseconds | `1750000000000` |

## Examples

See [Unix Timestamp Converter Examples](../examples/unix-timestamp-converter.md) for practical use cases.

## Edge cases

- **Invalid number:** Non-numeric input (including decimals) produces the error "Invalid number."
- **Out of range:** Timestamps that produce an invalid Date object produce the error "Out of range."
- **Negative timestamps:** Negative values are accepted and represent dates before January 1, 1970.
- **Auto-detect ambiguity:** A value like `9999999999` (10 digits) is treated as seconds, while `99999999999` (11 digits) is treated as milliseconds. This heuristic works for most practical dates but may be ambiguous for far-future or far-past dates.
- **Local timezone variation:** The "Local" output depends on the browser's timezone settings and will differ across users in different timezones.

## Limitations

- The timestamp input only accepts integers (no decimal points). Sub-second precision is not supported for manual entry.
- The "Now" button always uses seconds as the unit.
- No batch conversion — only one timestamp or date can be converted at a time.
- The datetime-local input does not include timezone selection; it always uses the browser's local timezone.

## Privacy and security

- All conversion happens client-side. No data is sent to any server.
- No values are stored or persisted between sessions.

## Related tools

- [Timestamp Converter](timestamp.md) — a simpler converter with a different interface
- [UUID Generator](uuid-generator.md) — for generating unique identifiers
