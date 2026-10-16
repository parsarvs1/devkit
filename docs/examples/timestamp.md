# Timestamp Converter — Examples

## Timestamp to Date

### Example 1: Convert a Unix timestamp (seconds)

**Input (timestamp):** `1750000000`

**Action:** Click **Convert to Date**.

**Expected output (date):**

```
2025-06-15T12:26:40.000Z
```

**Explanation:** `1750000000` has 10 digits, so it is treated as seconds. The tool multiplies by 1000 to get milliseconds, then converts to an ISO date in UTC.

### Example 2: Convert a Unix timestamp (milliseconds)

**Input (timestamp):** `1750000000000`

**Action:** Click **Convert to Date**.

**Expected output (date):**

```
2025-06-15T12:26:40.000Z
```

**Explanation:** `1750000000000` has 13 digits (more than 10), so it is treated as milliseconds directly. The result is the same date as Example 1.

### Example 3: Convert the Unix epoch

**Input (timestamp):** `0`

**Action:** Click **Convert to Date**.

**Expected output (date):**

```
1970-01-01T00:00:00.000Z
```

**Explanation:** `0` represents the Unix epoch — January 1, 1970 at 00:00:00 UTC.

### Example 4: Invalid timestamp

**Input (timestamp):** `abc`

**Action:** Click **Convert to Date**.

**Expected error:**

```
Invalid Unix timestamp.
```

## Date to Timestamp

### Example 5: Convert an ISO date to a timestamp

**Input (date):** `2025-06-15T12:26:40.000Z`

**Action:** Click **Convert to Timestamp**.

**Expected output (timestamp):**

```
1750000000
```

**Explanation:** The date is parsed as UTC (indicated by the `Z` suffix), and the output is in seconds.

### Example 6: Convert a date with timezone offset

**Input (date):** `2025-06-15T12:26:40.000+08:00`

**Action:** Click **Convert to Timestamp**.

**Expected output (timestamp):**

```
1749971200
```

**Explanation:** The `+08:00` offset means the UTC time is `2025-06-15T04:26:40.000Z`, which corresponds to a smaller timestamp than the same time in UTC.

### Example 7: Invalid date

**Input (date):** `not-a-date`

**Action:** Click **Convert to Timestamp**.

**Expected error:**

```
Invalid date.
```

## Use Current Time

### Example 8: Get the current time

**Action:** Click **Use Current Time**.

**Expected result:** Both fields are populated:
- The **timestamp** field shows the current Unix timestamp in seconds.
- The **date** field shows the current time in ISO 8601 format (UTC).

**Example (values will vary):**

```
Timestamp: 1759876543
Date:      2025-10-07T12:09:03.000Z
```

## Clear

### Example 9: Reset the tool

**Action:** Enter values in both fields, then click **Clear**.

**Expected result:** Both input fields are emptied and any error messages are removed.
