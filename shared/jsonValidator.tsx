export type JsonValidationIssue = {
  message: string;
  line: number;
  column: number;
  excerpt: string;
};

export type JsonValidationWarning = {
  message: string;
  path: string;
};

export type JsonStats = {
  rootType: string;
  bytes: number;
  keys: number;
  arrayItems: number;
  maxDepth: number;
};

export type JsonValidationResult = {
  valid: boolean;
  error: string | null;
  issues: JsonValidationIssue[];
  warnings: JsonValidationWarning[];
  stats: JsonStats | null;
  formatted: string | null;
};

function findTrailingCommas(input: string): number[] {
  const positions: number[] = [];

  let index = 0;

  while (index < input.length) {
    const char = input[index];

    if (char === '"') {
      index += 1;

      while (index < input.length && input[index] !== '"') {
        index += input[index] === "\\" ? 2 : 1;
      }

      index += 1;

      continue;
    }

    if (char === ",") {
      let next = index + 1;

      while (next < input.length && /\s/.test(input[next])) {
        next += 1;
      }

      if (input[next] === "}" || input[next] === "]") {
        positions.push(index);
      }
    }

    index += 1;
  }

  return positions;
}

function collectKeys(input: string): string[] {
  const keys: string[] = [];

  let index = 0;

  while (index < input.length) {
    const char = input[index];

    if (char !== '"') {
      index += 1;

      continue;
    }

    const start = index + 1;

    index += 1;

    while (index < input.length && input[index] !== '"') {
      index += input[index] === "\\" ? 2 : 1;
    }

    const key = input.slice(start, index);

    index += 1;

    let next = index;

    while (next < input.length && /\s/.test(input[next])) {
      next += 1;
    }

    if (input[next] === ":") {
      keys.push(key);
    }
  }

  return keys;
}

function locate(input: string, position: number) {
  const safePosition = Math.min(Math.max(position, 0), input.length);

  const before = input.slice(0, safePosition);

  const line = before.split("\n").length;

  const lineStart = before.lastIndexOf("\n") + 1;

  return {
    line,
    column: safePosition - lineStart + 1,
    lineStart,
  };
}

function buildExcerpt(input: string, position: number): string {
  const { column, lineStart } = locate(input, position);

  let lineEnd = input.indexOf("\n", position);

  if (lineEnd === -1) {
    lineEnd = input.length;
  }

  const line = input.slice(lineStart, lineEnd);

  const MAX_WIDTH = 72;

  if (line.length <= MAX_WIDTH) {
    return `${line}\n${" ".repeat(column - 1)}^`;
  }

  const offset = Math.max(column - 1 - Math.floor(MAX_WIDTH / 2), 0);

  const cropped = line.slice(offset, offset + MAX_WIDTH);

  const caretColumn = column - offset;

  return `${cropped}\n${" ".repeat(caretColumn - 1)}^`;
}

function describeRootType(value: unknown): string {
  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null";
  }

  return typeof value;
}

function analyze(value: unknown): {
  keys: number;
  arrayItems: number;
  maxDepth: number;
} {
  let keys = 0;

  let arrayItems = 0;

  let maxDepth = 0;

  function walk(node: unknown, depth: number): void {
    maxDepth = Math.max(maxDepth, depth);

    if (Array.isArray(node)) {
      arrayItems += node.length;

      node.forEach((item) => walk(item, depth + 1));

      return;
    }

    if (node !== null && typeof node === "object") {
      const entries = Object.entries(
        node as Record<string, unknown>
      );

      keys += entries.length;

      entries.forEach(([, item]) => walk(item, depth + 1));
    }
  }

  walk(value, 0);

  return {
    keys,
    arrayItems,
    maxDepth,
  };
}

function findWarnings(
  value: unknown,
  path: string,
  warnings: JsonValidationWarning[]
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      findWarnings(item, `${path}[${index}]`, warnings);
    });

    return;
  }

  if (value === null || typeof value !== "object") {
    return;
  }

  const entries = Object.entries(value as Record<string, unknown>);

  entries.forEach(([key, item]) => {
    if (
      typeof item === "number" &&
      !Number.isSafeInteger(item) &&
      Number.isInteger(item)
    ) {
      warnings.push({
        message: `Number ${item} exceeds the safe integer range (±2^53 - 1) and loses precision when parsed.`,
        path: path ? `${path}.${key}` : key,
      });
    }

    findWarnings(
      item,
      path ? `${path}.${key}` : key,
      warnings
    );
  });
}

const POSITION_RE = /at position (\d+)/;

export function validateJson(input: string): JsonValidationResult {
  if (!input.trim()) {
    return {
      valid: false,
      error: "Empty input. Paste some JSON to validate.",
      issues: [],
      warnings: [],
      stats: null,
      formatted: null,
    };
  }
  const trailingCommas = findTrailingCommas(input);

  if (trailingCommas.length > 0) {
    const first = trailingCommas[0];

    const { line, column } = locate(input, first);

    const issues: JsonValidationIssue[] = trailingCommas.map(
      (position) => {
        const located = locate(input, position);

        return {
          message:
            "Trailing comma. JSON does not allow a comma before a closing bracket.",
          line: located.line,
          column: located.column,
          excerpt: buildExcerpt(input, position),
        };
      }
    );

    return {
      valid: false,
      error: `Unexpected trailing comma at line ${line}, column ${column}.`,
      issues,
      warnings: [],
      stats: null,
      formatted: null,
    };
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(input);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid JSON.";

    const positionMatch = message.match(POSITION_RE);

    const position = positionMatch
      ? Number(positionMatch[1])
      : input.length;

    const { line, column } = locate(input, position);

    const summary = message.replace(
      /\s*(?:is not valid JSON|at position \d+(?:\s*\([^)]*\))?)$/g,
      ""
    );

    return {
      valid: false,
      error: `${summary} (line ${line}, column ${column})`,
      issues: [
        {
          message: summary,
          line,
          column,
          excerpt: buildExcerpt(input, position),
        },
      ],
      warnings: [],
      stats: null,
      formatted: null,
    };
  }

  const warnings: JsonValidationWarning[] = [];
  const keyOccurrences = new Map<string, number>();

  for (const key of collectKeys(input)) {
    keyOccurrences.set(key, (keyOccurrences.get(key) ?? 0) + 1);
  }

  for (const [key, count] of keyOccurrences) {
    if (count > 1) {
      warnings.push({
        message: `Key "${key}" appears ${count} times. Duplicate keys keep only the last value.`,
        path: "(document)",
      });
    }
  }

  findWarnings(parsed, "", warnings);

  const { keys, arrayItems, maxDepth } = analyze(parsed);

  return {
    valid: true,
    error: null,
    issues: [],
    warnings,
    stats: {
      rootType: describeRootType(parsed),
      bytes: new Blob([input]).size,
      keys,
      arrayItems,
      maxDepth,
    },
    formatted: JSON.stringify(parsed, null, 2),
  };
}

export function getJsonValidatorExample(): string {
  return JSON.stringify(
    {
      name: "Parsa",
      role: "Developer",
      active: true,
      preferences: {
        theme: "dark",
        editor: {
          fontFamily: "JetBrains Mono",
          fontSize: 14,
          tabSize: 2,
        },
      },
      skills: ["Next.js", "React", "TypeScript"],
    },
    null,
    2
  );
}

export function getInvalidJsonExample(): string {
  return `{
  "name": "Parsa",
  "age": 20,
  "skills": ["Next.js", "TypeScript",],
  "meta": {
    "verified": true
  }
}`;
}
