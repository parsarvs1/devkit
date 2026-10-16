# SQL Formatter

Reformat SQL for readability.

- Tool page: [SQL Formatter](/tools/sql-formatter)
- Examples: [SQL Formatter examples](../examples/sql-formatter.md)

## Purpose

SQL Formatter takes a SQL query and rewrites it with consistent indentation,
line breaks, and keyword casing. It makes dense or one-line queries easier to
read and review. Formatting is purely presentational.

## When to use it

- Tidying a query before pasting it into a pull request or ticket.
- Normalizing SQL produced by a generator or an ORM.
- Making a long `SELECT` easier to scan.

## How to use it

1. Paste your SQL into the **Input** editor.
2. Toggle **Uppercase keywords** if you want keywords in upper case.
3. Click **Format**.
4. Copy the formatted result, or click **Load Example** to try the sample query.

**Clear** empties both the input and the output.

## Inputs

| Input | Description |
| --- | --- |
| SQL | Free-text SQL to reformat. |
| Uppercase keywords | Checkbox controlling keyword casing (on by default). |

## Options

- **Uppercase keywords** — when enabled, SQL keywords (and boolean/null
  literals such as `TRUE`) are upper-cased. When disabled, the original casing
  of keywords is preserved.
- **Format** — runs the formatter on the input.
- **Copy** — copies the formatted output.
- **Clear** — empties the input and output.
- **Load Example** — inserts the bundled sample query into the input.

Formatting uses the `sql-formatter` library (version 15.x) with the standard
`sql` dialect.

## Output

The formatted SQL. Keywords are placed on their own lines where the formatter
inserts breaks, columns are indented, and clauses are spaced. For example, the
sample query becomes:

```sql
SELECT
  u.id,
  u.name,
  o.total
FROM
  users u
  JOIN orders o ON o.user_id = u.id
WHERE
  u.active = 1
  AND o.total > 100
ORDER BY
  o.total DESC;
```

## Examples

See [SQL Formatter examples](../examples/sql-formatter.md) for the sample query
and several other statements with their exact formatted output.

## Edge cases

- Empty input produces the message `Input is empty.` and no output.
- When **Uppercase keywords** is off, the original casing of keywords is kept
  (`select` stays `select`, `true` stays `true`).
- The formatter changes whitespace and keyword case only; it does not rewrite
  identifiers, values, or structure.
- If the formatter cannot process the input it reports the library's error
  message.

## Limitations

- **This is a formatter, not a validator, linter, or executor.** It does not
  check that the SQL is syntactically correct, does not verify schema or table
  names, and does not run the query anywhere.
- Only the standard `sql` dialect is supported; there is no selector for
  MySQL, PostgreSQL, T-SQL, or other dialects.
- Formatting may not preserve every vendor-specific construct.
- Very large queries may take a moment to format.

## Privacy and security

Formatting happens entirely in the browser. The SQL is never executed,
transmitted, or stored. You can use it on queries that contain sensitive data
without sending them anywhere.

## Related tools

- [Tool Chaining](/tools/tool-chaining)
- [Character Counter](/tools/character-counter)
