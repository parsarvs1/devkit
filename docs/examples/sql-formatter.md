# SQL Formatter Examples

Inputs and exact outputs for the [SQL Formatter](/tools/sql-formatter). See the
[documentation](../tools/sql-formatter.md) for the full description.

> The formatter changes whitespace and keyword case only. It does not validate,
> parse, or execute the SQL.

## Example 1 — The built-in sample (keywords uppercased)

**Input:**

```sql
select u.id, u.name, o.total from users u join orders o on o.user_id = u.id where u.active = 1 and o.total > 100 order by o.total desc;
```

**Output with "Uppercase keywords" enabled:**

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

## Example 2 — Casing preserved

**Input:**

```sql
select id, name from users where age > 21 and active = true order by name asc limit 10;
```

**Output with "Uppercase keywords" disabled (preserve):**

```sql
select
  id,
  name
from
  users
where
  age > 21
  and active = true
order by
  name asc
limit
  10;
```

**Output with "Uppercase keywords" enabled:**

```sql
SELECT
  id,
  name
FROM
  users
WHERE
  age > 21
  AND active = TRUE
ORDER BY
  name ASC
LIMIT
  10;
```

Note that with uppercasing on, the literal `true` becomes `TRUE`.

## Example 3 — INSERT

**Input:**

```sql
insert into users (name, email) values ('Parsa', 'parsa@example.com');
```

**Output:**

```sql
INSERT INTO
  users (name, email)
VALUES
  ('Parsa', 'parsa@example.com');
```

## Example 4 — UPDATE

**Input:**

```sql
update orders set status = 'shipped' where id = 42;
```

**Output:**

```sql
UPDATE orders
SET
  status = 'shipped'
WHERE
  id = 42;
```

## Example 5 — GROUP BY / HAVING

**Input:**

```sql
select count(*) as total, status from orders group by status having count(*) > 5;
```

**Output:**

```sql
SELECT
  count(*) AS total,
  status
FROM
  orders
GROUP BY
  status
HAVING
  count(*) > 5;
```

## Example 6 — Empty input

Leave the input blank and click **Format**.

**Output:** the message `Input is empty.` and no formatted result.

## Copying and clearing

- **Copy** copies the formatted output.
- **Clear** empties both the input and the output.
- **Load Example** inserts the sample query from Example 1.
