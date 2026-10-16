# .gitignore Generator Examples

Practical outputs for [.gitignore Generator](/tools/gitignore-generator). See
the [documentation](../tools/gitignore-generator.md) for the full description.

## Example 1 — Node + Python (the built-in example)

Click **Load Example**. This selects `node` and `python` and generates a file
that begins:

```
# Node
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/
...
```

and then continues with the Python section after a `---` separator:

```
---

# Python
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class
...
```

The footer reports `2 templates selected: node, python` and the total character
count.

## Example 2 — Node only

Select only **Node**, then click **Generate**. The output starts with:

```
# Node
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
...
```

The preview panel shows the first ten unique patterns, including `node_modules/`,
`.env*`, `dist/`, `build/`, `coverage/`, `*.log`, `.idea/`, and `.vscode/`.

## Example 3 — Java + Go

Select **Java** and **Go**, then click **Generate**. The output contains a
`# Java` section (with `target/`, `*.class`, `*.jar`, `.gradle/`, `.idea/`) and,
after a `---` separator, a `# Go` section (with `*.exe`, `*.test`, `bin/`,
`pkg/`, `go.mod`, `go.sum`).

## Example 4 — Default template

Select only **Default**, then click **Generate**. The output starts with:

```
# Default
# Logs
logs/
*.log

# Environment variables
.env
.env.local
...
```

Note that the **Default** template has no entry in the pattern list used by the
preview, so selecting only **Default** produces output but no preview.

## Example 5 — Clearing the form

After generating, click **Clear**. All selections are removed and the output
area is emptied.
