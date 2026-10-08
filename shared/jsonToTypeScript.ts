// Shared conversion logic for the JSON → TypeScript tool.
// Kept pure so it can be unit-tested independently of the page.

export function formatKey(key: string): string {
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) {
    return key;
  }

  // Escape embedded quotes and backslashes inside quoted keys.
  return `"${key.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function capitalize(value: string): string {
  if (!value) return "";
  return value[0].toUpperCase() + value.slice(1);
}

export function makeInterfaceName(
  base: string,
  interfaces: Map<string, string>
): string {
  // PascalCase + unique, so two nested keys never collide.
  const clean = base
    .replace(/[^A-Za-z0-9_$]/g, "")
    .replace(/^[a-z]/, (char) => char.toUpperCase());

  if (!interfaces.has(clean)) {
    return clean;
  }

  let counter = 2;
  while (interfaces.has(`${clean}${counter}`)) {
    counter++;
  }
  return `${clean}${counter}`;
}

export function getType(
  value: unknown,
  name: string,
  interfaces: Map<string, string>
): string {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "unknown[]";
    }

    const types = value.map((item) =>
      getType(item, name, interfaces)
    );
    const uniqueTypes = [...new Set(types)];

    if (uniqueTypes.length === 1) {
      return `${uniqueTypes[0]}[]`;
    }

    return `(${uniqueTypes.join(" | ")})[]`;
  }

  if (typeof value === "object") {
    // Recurse into nested objects, giving each one its own interface.
    const interfaceName = makeInterfaceName(name, interfaces);
    const object = value as Record<string, unknown>;

    const lines = Object.entries(object).map(([key, item]) => {
      const childName = `${interfaceName}${capitalize(
        key.replace(/[^A-Za-z0-9_$]/g, "")
      )}`;
      return `  ${formatKey(key)}: ${getType(
        item,
        childName,
        interfaces
      )};`;
    });

    interfaces.set(
      interfaceName,
      `interface ${interfaceName} {\n${lines.join("\n")}\n}`
    );

    return interfaceName;
  }

  if (typeof value === "string") {
    return "string";
  }

  if (typeof value === "number") {
    return "number";
  }

  if (typeof value === "boolean") {
    return "boolean";
  }

  return "unknown";
}

export function jsonToTypeScript(
  value: unknown,
  name = "Root"
): string {
  // A primitive or null root has no interface to declare.
  if (value === null || typeof value !== "object") {
    return `export type ${name} = ${getType(
      value,
      name,
      new Map()
    )};`;
  }

  const interfaces = new Map<string, string>();

  const rootType = getType(value, `${name}Shape`, interfaces);

  // Nested interfaces are declared first so the root type resolves.
  return [
    ...interfaces.values(),
    `export type ${name} = ${rootType};`,
  ].join("\n\n");
}
