# Contributing to DevKit

Thanks for your interest in contributing to DevKit!

DevKit is an open-source collection of useful tools for developers. Contributions of all kinds are welcome.

## Ways to Contribute

You can contribute by:

* Adding a new developer tool
* Fixing bugs
* Improving existing tools
* Improving the UI
* Improving accessibility
* Improving documentation
* Reporting bugs
* Suggesting new features

## Getting Started

Fork the repository and clone your fork:

```bash
git clone YOUR_FORK_URL
```

Move into the project directory:

```bash
cd devkit
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Adding a New Tool

When adding a new tool:

1. Create a new folder inside `src/app/tools/`.
2. Add the tool page.
3. Add the tool to `src/data/tools.ts`.
4. Make sure the tool works correctly.
5. Keep the UI consistent with the existing tools.
6. Make sure the project builds successfully.

## Code Style

Please keep the code:

* Simple
* Readable
* Consistent
* TypeScript-friendly
* Easy to maintain

Avoid adding unnecessary dependencies when a browser or existing project API can solve the problem.

## Pull Requests

Before opening a pull request:

* Test your changes locally.
* Make sure there are no build errors.
* Explain what you changed.
* Keep pull requests focused on one feature or fix when possible.

## Issues

If you find a bug or have an idea for a new feature, feel free to open an issue.

Please provide enough information for others to understand the problem or suggestion.

## Thank You

Every contribution helps make DevKit better.

Thanks for helping improve the project!
