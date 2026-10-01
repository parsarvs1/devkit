# DevKit Project Guide

This project is a comprehensive developer toolkit built with Next.js, React, and TypeScript. It includes various developer tools for everyday tasks like JSON formatting, base64 encoding, hash generation, and more.

## Project Structure

### Core Components
- **Desktop Application** (`desktop/`): Main desktop app with all tools
  - `src/`: Application source code
    - `App.tsx`: Main application component
    - `components/`: UI components
    - `tools/`: Individual developer tools
    - `types/`: Type definitions
    - `hooks/`: Custom React hooks

### Available Developer Tools

The following tools are available in the desktop application:

1. **JSON Formatter** - Format, minify, and validate JSON data
2. **JWT Decoder** - Decode and inspect JWT tokens
3. **UUID Generator** - Generate random UUIDs
4. **Regex Tester** - Test regular expressions
5. **Base64 Encoder/Decoder** - Encode and decode Base64 strings
6. **Timestamp Converter** - Convert between Unix timestamps and dates
7. **Color Converter** - Convert between HEX, RGB, and HSL color formats
8. **Hash Generator** - Generate various hashes (MD5, SHA-1, SHA-256, etc.)
9. **Hash Compare** - Compare two hashes to see if they match
10. **URL Encoder/Decoder** - Encode and decode URL components
11. **Lorem Ipsum Generator** - Generate placeholder text
12. **Markdown Formatter** - Format and validate Markdown text (NEW!)

### Development Guidelines

#### Tool Architecture
- Each tool is a standalone React component
- Tools import shared utility functions from the `shared/` directory
- Common patterns include:
  - Input/textarea for user input
  - Output area for results
  - Action buttons (Format, Example, Clear, Copy)
  - Error handling for invalid input
  - Responsive design with consistent styling

#### Code Style
- TypeScript with strict typing
- React functional components with hooks
- CSS modules for styling
- Lucide React for icons
- ESLint and Prettier for code quality

#### Testing and Quality
- Comprehensive error handling
- Input validation for all tools
- User-friendly error messages
- Responsive design for all screen sizes
- Accessibility considerations

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## Tool Development

To add a new tool:

1. Create a shared utility function in `shared/` directory
2. Create a React component in `desktop/src/tools/`
3. Add the component import to `App.tsx`
4. Add the tool to `TOOL_INFO` object in `App.tsx`
5. Update `types.ts` to include the new tool type
6. Add CSS styles to `App.css` if needed

## Markdown Formatter Tool

The newest addition is the **Markdown Formatter**, which allows you to:

- Format Markdown text with proper HTML output
- Validate Markdown syntax
- Test various Markdown features (headers, lists, links, code blocks, etc.)
- Copy formatted output to clipboard
- See live preview of formatted text

### Features

- **Format**: Convert Markdown to HTML with semantic tags
- **Validation**: Check for common Markdown errors
- **Example**: Load a comprehensive example with all Markdown features
- **Clear**: Reset the input and output
- **Copy**: Copy formatted output to clipboard

### Usage

1. Click on "Markdown Formatter" in the tools sidebar
2. Type or paste Markdown text in the input area
3. Click "Format" to see the HTML output
4. Use "Example" button to test various Markdown features
5. Click "Copy" to copy the formatted output

## Shared Utilities

All tools share common utility functions located in the `shared/` directory:

- `base64.ts`: Base64 encoding/decoding
- `colorConverter.ts`: Color format conversion
- `hash.ts`: Hash generation
- `hashCompare.ts`: Hash comparison
- `jsonFormatter.ts`: JSON formatting and validation
- `jwt.ts`: JWT decoding
- `markdownFormatter.ts`: Markdown formatting and validation (NEW!)
- `regex.ts`: Regular expression testing
- `timestamp.ts`: Timestamp conversion
- `url.ts`: URL encoding/decoding
- `uuid.ts`: UUID generation

## Deployment

The application is deployed as a Progressive Web App (PWA) with offline support. It's designed to work seamlessly across desktop, mobile, and web platforms.

## Support and Community

For support, questions, or contributions, please refer to the project's documentation and contribute guidelines.

---

*Last updated: 2026*