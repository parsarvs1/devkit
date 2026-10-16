# UUID Generator — Examples

## Basic usage

### Example 1: Generate a UUID

**Action:** Click **Generate UUID**.

**Expected output (format):**

```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

Each `x` is a random hexadecimal digit (0-9, a-f). The `4` indicates UUID version 4, and `y` is one of `8`, `9`, `a`, or `b`.

**Note:** The actual value is different every time. Two consecutive clicks will always produce different UUIDs.

### Example 2: Generate and copy a UUID

**Action:**
1. Click **Generate UUID**.
2. Click **Copy**.

**Expected result:** The UUID is copied to the clipboard. The button text changes to "Copied!" for 1.5 seconds.

## Practical scenarios

### Scenario 1: Database record ID

You need a unique ID for a new database record.

**Action:** Generate a UUID and use it as the primary key.

**Example output (will vary):**

```
a3f8c2d1-4e5b-4a6f-9c8d-1e2f3a4b5c6d
```

### Scenario 2: Session token

You need a random session identifier.

**Action:** Generate a UUID and store it as a session token.

**Example output (will vary):**

```
7b2e9f0a-1c3d-4e5f-8a9b-0c1d2e3f4a5b
```

### Scenario 3: Multiple unique IDs

You need several unique IDs for batch processing.

**Action:** Click **Generate UUID** repeatedly, copying each result.

**Example sequence (will vary):**

```
1st: f47ac10b-58cc-4372-a567-0e02b2c3d479
2nd: 550e8400-e29b-41d4-a716-446655440000
3rd: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
```

## Error case

### Non-secure context

If the page is served over plain HTTP (not localhost), `crypto.randomUUID()` is unavailable.

**Expected error message:**

```
UUID generation is unavailable in this context (secure context required).
```
