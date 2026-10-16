# Unix Timestamp Converter — Examples

Practical examples for the [Unix Timestamp Converter](/tools/unix-timestamp-converter). See the [full documentation](../tools/unix-timestamp-converter.md).

## Example 1: Epoch zero (seconds)

**Input:** `0` (seconds)

**Output:**
```
UTC: Thu, 01 Jan 1970 00:00:00 GMT
ISO: 1970-01-01T00:00:00.000Z
Seconds: 0
Milliseconds: 0
```

The Unix epoch. Useful as a baseline reference.

## Example 2: Same instant in milliseconds

**Input:** `1000` with unit set to **Milliseconds**

**Output:**
```
UTC: Thu, 01 Jan 1970 00:00:01 GMT
ISO: 1970-01-01T00:00:01.000Z
```

1000 milliseconds = 1 second after the epoch. This confirms seconds and milliseconds represent the same instant at different scales.

## Example 3: Auto-detect milliseconds

**Input:** `1700000000000` (auto-detect)

The value has 13 digits (> 10), so the tool treats it as **milliseconds**:

```
ISO: 2023-11-14T22:13:20.000Z
Seconds: 1700000000
```

Auto-detect uses length: more than 10 digits means milliseconds.

## Example 4: Recent timestamp

**Input:** `1700000000` (seconds)

**Output:**
```
UTC: Tue, 14 Nov 2023 22:13:20 GMT
ISO: 2023-11-14T22:13:20.000Z
Local: (depends on your timezone)
```

The `Local` line reflects the viewer's timezone; UTC and ISO are always UTC.

## Example 5: Date to timestamp

**Input (local date/time):** `2023-11-14T22:13` interpreted in your local timezone

**Output:** The matching seconds and milliseconds for that local date/time, plus UTC and ISO representations.

Because the input is local, the exact output depends on your timezone offset. The UTC and ISO lines remove that ambiguity.

## Example 6: Invalid input

**Input:** `abc`

**Output:** Error — "Invalid number."

Non-numeric input is rejected with a clear message.

## Example 7: Empty input

**Input:** (empty)

**Output:** Error — "Enter a timestamp."

Empty input is handled gracefully rather than producing a misleading date.

## Caveats

- **Local vs UTC**: The date/time input is interpreted in the browser's local timezone. Always check the UTC or ISO line when precision matters.
- **Auto-detect**: Length-based detection means a 10-digit millisecond value (before ~2001) would be misread as seconds. Use the explicit unit selector for ambiguous values.
- **Negative timestamps**: Values before 1970 are supported and produce valid dates.
