# JSON to TypeScript Examples

All examples show the exact input and the exact output produced by the tool.

---

## Example 1: Basic object

**Input:**
```json
{
  "name": "Parsa",
  "age": 20,
  "active": true,
  "skills": ["Next.js", "TypeScript"]
}
```

**Output:**
```typescript
interface RootShape {
  name: string;
  age: number;
  active: boolean;
  skills: string[];
}

export type Root = RootShape;
```

---

## Example 2: Nested objects

**Input:**
```json
{
  "user": {
    "name": "Alice",
    "address": {
      "city": "Berlin",
      "zip": "10115"
    }
  }
}
```

**Output:**
```typescript
interface RootShapeUserAddress {
  city: string;
  zip: string;
}

interface RootShapeUser {
  name: string;
  address: RootShapeUserAddress;
}

interface RootShape {
  user: RootShapeUser;
}

export type Root = RootShape;
```

---

## Example 3: Mixed-type array

**Input:**
```json
{
  "values": [1, "two", true]
}
```

**Output:**
```typescript
interface RootShape {
  values: (number | string | boolean)[];
}

export type Root = RootShape;
```

---

## Example 4: Empty array

**Input:**
```json
{
  "items": []
}
```

**Output:**
```typescript
interface RootShape {
  items: unknown[];
}

export type Root = RootShape;
```

---

## Example 5: Null value

**Input:**
```json
{
  "deletedAt": null
}
```

**Output:**
```typescript
interface RootShape {
  deletedAt: null;
}

export type Root = RootShape;
```

---

## Example 6: Non-identifier keys

**Input:**
```json
{
  "first-name": "Alice",
  "2fa": true
}
```

**Output:**
```typescript
interface RootShape {
  "first-name": string;
  "2fa": boolean;
}

export type Root = RootShape;
```

---

## Example 7: Root is an array

**Input:**
```json
[1, 2, 3]
```

**Output:**
```typescript
export type Root = number[];
```

---

## Example 8: Root is a primitive string

**Input:**
```json
"hello"
```

**Output:**
```typescript
export type Root = string;
```

---

## Example 9: Root is null

**Input:**
```json
null
```

**Output:**
```typescript
export type Root = null;
```

---

## Example 10: Array of objects

**Input:**
```json
{
  "users": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
  ]
}
```

**Output:**
```typescript
interface RootShapeUsers {
  name: string;
  age: number;
}

interface RootShape {
  users: RootShapeUsers[];
}

export type Root = RootShape;
```

---

## Example 11: Deeply nested structure

**Input:**
```json
{
  "company": {
    "name": "Acme",
    "departments": [
      {
        "name": "Engineering",
        "teams": [
          {"name": "Platform", "size": 10}
        ]
      }
    ]
  }
}
```

**Output:**
```typescript
interface RootShapeCompanyDepartmentsTeams {
  name: string;
  size: number;
}

interface RootShapeCompanyDepartments {
  name: string;
  teams: RootShapeCompanyDepartmentsTeams[];
}

interface RootShapeCompany {
  name: string;
  departments: RootShapeCompanyDepartments[];
}

interface RootShape {
  company: RootShapeCompany;
}

export type Root = RootShape;
```

---

## Example 12: Array with null values

**Input:**
```json
{
  "data": [null, null]
}
```

**Output:**
```typescript
interface RootShape {
  data: null[];
}

export type Root = RootShape;
```

---

## Example 13: Invalid JSON

**Input:**
```json
{"name": "John",}
```

**Output:** Error message displayed:

```
Invalid JSON. Please check your input.
```

---

## Example 14: Boolean and number primitives

**Input:**
```json
{
  "active": true,
  "count": 42,
  "ratio": 3.14,
  "name": "test"
}
```

**Output:**
```typescript
interface RootShape {
  active: boolean;
  count: number;
  ratio: number;
  name: string;
}

export type Root = RootShape;
```

---

## Example 15: Keys with special characters in nested objects

**Input:**
```json
{
  "user": {
    "first-name": "Alice",
    "last-name": "Smith"
  }
}
```

**Output:**
```typescript
interface RootShapeUser {
  "first-name": string;
  "last-name": string;
}

interface RootShape {
  user: RootShapeUser;
}

export type Root = RootShape;
```

Note: The key `first-name` is preserved with quotes in the interface body. The interface name `RootShapeUser` is derived from the parent name + capitalized key with special characters stripped, but since both keys sanitize to the same base, the interface is named `RootShapeUser` (not `RootShapeUserFirstName`).
