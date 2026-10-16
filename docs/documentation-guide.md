# Documentation Contribution Guide

This guide explains how to maintain DevKit's tool documentation and examples.

## Structure

```
docs/
  tools/           # One Markdown file per tool
  examples/        # One Markdown file per tool with practical examples
  documentation-guide.md  # This file
```

## Updating Tool Documentation

When a tool's behavior changes:

1. **Update the tool page** in `app/tools/<tool-slug>/page.tsx`.
2. **Update the documentation** in `docs/tools/<tool-slug>.md`:
   - Keep all sections accurate: Purpose, When to use it, How to use it, Inputs, Options, Output, Examples, Edge cases, Limitations, Privacy and security, Related tools.
   - Remove references to features that no longer exist.
   - Add new options, inputs, or behaviors.
3. **Update examples** in `docs/examples/<tool-slug>.md`:
   - Verify every example still produces the documented output.
   - Add examples for new features.
   - Remove or update examples for removed features.
4. **Update the index** in `docs/tools/README.md` if the tool name, route, or description changed.

## Adding Documentation for a New Tool

1. Create `docs/tools/<tool-slug>.md` with all required sections.
2. Create `docs/examples/<tool-slug>.md` with at least 3 practical examples.
3. Add the tool to the index in `docs/tools/README.md`.
4. Add the tool to the examples index in `docs/examples/README.md`.

## Writing Good Examples

- Use realistic, non-sensitive data.
- Show exact input and expected output.
- Explain why the example is useful.
- Include edge cases and invalid inputs where error behavior is relevant.
- For nondeterministic output (e.g., UUIDs, timestamps), explain what varies.
- Verify examples against the actual implementation before publishing.

## Style Guidelines

- Use clear, professional English.
- Use consistent heading levels: `##` for main sections, `###` for subsections.
- Use code fences with language identifiers for all code samples.
- Use relative Markdown links between documentation pages.
- Do not invent features, options, or output formats.
- Do not include real secrets, credentials, or personal data.

## Validation

Before submitting documentation changes:

- [ ] Every tool in `data/tools.tsx` has a documentation page.
- [ ] Every documentation page has corresponding examples.
- [ ] All internal Markdown links point to existing files.
- [ ] All examples have been verified against the actual implementation.
- [ ] No placeholder text or "TODO" markers remain.
- [ ] The documentation index lists all tools.
