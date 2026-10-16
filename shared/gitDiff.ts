// Git diff parsing and utilities

export interface DiffHunk {
  header: string;
  lines: DiffLine[];
}

export interface DiffLine {
  type: "add" | "remove" | "context";
  content: string;
  oldLine?: number;
  newLine?: number;
}

export interface FileDiff {
  oldPath: string;
  newPath: string;
  hunks: DiffHunk[];
}

export interface ParsedDiff {
  files: FileDiff[];
}

// Parse a unified diff string
export function parseDiff(diff: string): ParsedDiff {
  const files: FileDiff[] = [];
  const lines = diff.split("\n");

  let currentFile: FileDiff | null = null;
  let currentHunk: DiffHunk | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // New file header
    if (line.startsWith("diff --git")) {
      // Parse file paths from the git diff format
      const oldPathLine = lines[++i];
      const newPathLine = lines[++i];

      currentFile = {
        oldPath: parseFilePath(oldPathLine),
        newPath: parseFilePath(newPathLine),
        hunks: [],
      };
      files.push(currentFile);
      currentHunk = null;
      continue;
    }

    // Index line (skipped)
    if (line.startsWith("index")) {
      continue;
    }

    // New file mode / deleted file mode
    if (line.startsWith("new file") || line.startsWith("deleted file") || line.startsWith("mode")) {
      continue;
    }

    // Binary files
    if (line.startsWith("Binary files")) {
      if (!currentFile) {
        currentFile = {
          oldPath: "unknown",
          newPath: "unknown",
          hunks: [],
        };
        files.push(currentFile);
      }
      continue;
    }

    // Hunk header
    if (line.startsWith("@@")) {
      if (!currentFile) {
        currentFile = {
          oldPath: "unknown",
          newPath: "unknown",
          hunks: [],
        };
        files.push(currentFile);
      }

      currentHunk = {
        header: line,
        lines: [],
      };
      currentFile.hunks.push(currentHunk);
      continue;
    }

    // Add line
    if (line.startsWith("+") && !line.startsWith("+++" )) {
      if (currentHunk) {
        currentHunk.lines.push({
          type: "add",
          content: line.substring(1),
          newLine: extractLineNumber(line),
        });
      }
    }
    // Remove line
    else if (line.startsWith("-") && !line.startsWith("---")) {
      if (currentHunk) {
        currentHunk.lines.push({
          type: "remove",
          content: line.substring(1),
          oldLine: extractLineNumber(line),
        });
      }
    }
    // Context line
    else if (line.startsWith(" ") || line === "") {
      if (currentHunk) {
        currentHunk.lines.push({
          type: "context",
          content: line.startsWith(" ") ? line.substring(1) : "",
        });
      }
    }
    // End of file marker
    else if (line === "\\ No newline at end of file") {
      // Skip this marker line
      continue;
    }
  }

  return { files };
}

// Parse file path from git diff format
function parseFilePath(line: string): string {
  // Format: "a/filename" or "b/filename"
  if (line.startsWith("a/")) {
    return line.substring(2);
  }
  if (line.startsWith("b/")) {
    return line.substring(2);
  }
  // Handle "index" or other lines
  return "unknown";
}

// Extract line number from diff line
function extractLineNumber(line: string): number | undefined {
  // For context lines, no line number
  if (line.startsWith(" ")) {
    return undefined;
  }
  // Remove the prefix (+, -, or space) and parse
  const content = line.substring(1);
  // Match patterns like "123" at the start
  const match = content.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : undefined;
}

// Generate a sample diff for testing
export function getSampleDiff(): string {
  return `diff --git a/src/components/Button.tsx b/src/components/Button.tsx
index 1234567..abcdefg 100644
--- a/src/components/Button.tsx
+++ b/src/components/Button.tsx
@@ -1,15 +1,20 @@
 import React from "react";
 import { cn } from "@/lib/utils";

-interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
+export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "primary" | "secondary" | "outline" | "ghost";
   size?: "sm" | "md" | "lg";
 }

-export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
+export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
+  function Button({ className, variant = "primary", size = "md", ...props }, ref) {
+    return (
+      <button
+        ref={ref}
+        className={cn(
   className,
-    )}
-    {...props}
-  >
-    {children}
-  </button>
+        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
+        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
+        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/90",
+        variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
+        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
+        size === "sm" && "h-9 px-3 text-xs",
+        size === "md" && "h-10 px-4 py-2",
+        size === "lg" && "h-11 px-8 text-lg",
+        className
+      )}
+      {...props}
+    />
+  }
 );

-export { Button };
+export { Button };
`;
}

// Get diff statistics
export function getDiffStats(diff: string): {
  totalFiles: number;
  totalAdditions: number;
  totalDeletions: number;
  fileStats: { path: string; additions: number; deletions: number }[];
} {
  const stats = {
    totalFiles: 0,
    totalAdditions: 0,
    totalDeletions: 0,
    fileStats: [] as { path: string; additions: number; deletions: number }[],
  };

  const files = parseDiff(diff).files;

  stats.totalFiles = files.length;

  for (const file of files) {
    let additions = 0;
    let deletions = 0;

    for (const hunk of file.hunks) {
      for (const line of hunk.lines) {
        if (line.type === "add") additions++;
        if (line.type === "remove") deletions++;
      }
    }

    stats.totalAdditions += additions;
    stats.totalDeletions += deletions;
    stats.fileStats.push({
      path: file.newPath !== "unknown" ? file.newPath : file.oldPath,
      additions,
      deletions,
    });
  }

  return stats;
}

// Check if a diff contains only additions
export function isAdditionOnly(diff: string): boolean {
  const parsed = parseDiff(diff);
  for (const file of parsed.files) {
    for (const hunk of file.hunks) {
      for (const line of hunk.lines) {
        if (line.type === "remove") return false;
      }
    }
  }
  return true;
}

// Check if a diff contains only deletions
export function isDeletionOnly(diff: string): boolean {
  const parsed = parseDiff(diff);
  for (const file of parsed.files) {
    for (const hunk of file.hunks) {
      for (const line of hunk.lines) {
        if (line.type === "add") return false;
      }
    }
  }
  return true;
}

// Get a simple summary of the diff
export function getDiffSummary(diff: string): string {
  const stats = getDiffStats(diff);
  const changes: string[] = [];

  if (stats.totalAdditions > 0) {
    changes.push(`${stats.totalAdditions} addition${stats.totalAdditions > 1 ? "s" : ""}`);
  }
  if (stats.totalDeletions > 0) {
    changes.push(`${stats.totalDeletions} deletion${stats.totalDeletions > 1 ? "s" : ""}`);
  }

  if (changes.length === 0) {
    return "No changes";
  }

  return `${stats.totalFiles} file${stats.totalFiles > 1 ? "s" : ""} changed, ${changes.join(", ")}`;
}
