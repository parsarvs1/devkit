// Git command templates and utilities

export interface GitCommand {
  id: string;
  name: string;
  description: string;
  category: string;
  command: string;
  flags?: string[];
  variables?: { name: string; description: string; placeholder?: string }[];
}

export const gitCategories = ["General", "Branching", "Remote", "History", "Staging", "Config"] as const;
export type GitCategory = typeof gitCategories[number];

// Common git commands
export const gitCommands: GitCommand[] = [
  // General
  {
    id: "status",
    name: "git status",
    description: "Show the working tree status",
    category: "General",
    command: "git status",
  },
  {
    id: "init",
    name: "git init",
    description: "Initialize a new Git repository",
    category: "General",
    command: "git init",
  },
  {
    id: "clone",
    name: "git clone",
    description: "Clone a repository into a new directory",
    category: "General",
    command: "git clone <repository-url>",
    variables: [
      { name: "repository-url", description: "URL of the repository to clone" },
    ],
  },
  {
    id: "help",
    name: "git help",
    description: "Get help on git commands",
    category: "General",
    command: "git help <command>",
    variables: [
      { name: "command", description: "Git command to get help for" },
    ],
  },

  // Branching
  {
    id: "branch-list",
    name: "git branch",
    description: "List, create, or delete branches",
    category: "Branching",
    command: "git branch",
    flags: ["-a", "-d", "-D", "-m"],
  },
  {
    id: "branch-create",
    name: "git branch <name>",
    description: "Create a new branch",
    category: "Branching",
    command: "git branch <name>",
    variables: [
      { name: "name", description: "Name for the new branch" },
    ],
  },
  {
    id: "checkout",
    name: "git checkout",
    description: "Switch branches or restore working tree files",
    category: "Branching",
    command: "git checkout <branch>",
    variables: [
      { name: "branch", description: "Branch to switch to" },
    ],
  },
  {
    id: "checkout-new",
    name: "git checkout -b",
    description: "Create and switch to a new branch",
    category: "Branching",
    command: "git checkout -b <name>",
    variables: [
      { name: "name", description: "Name for the new branch" },
    ],
  },
  {
    id: "merge",
    name: "git merge",
    description: "Join two or more development histories together",
    category: "Branching",
    command: "git merge <branch>",
    variables: [
      { name: "branch", description: "Branch to merge" },
    ],
  },
  {
    id: "rebase",
    name: "git rebase",
    description: "Reapply commits on top of another base tip",
    category: "Branching",
    command: "git rebase <branch>",
    variables: [
      { name: "branch", description: "Base branch for rebase" },
    ],
  },

  // Remote
  {
    id: "remote-add",
    name: "git remote add",
    description: "Add a new remote repository",
    category: "Remote",
    command: "git remote add <name> <url>",
    variables: [
      { name: "name", description: "Remote name (usually 'origin')" },
      { name: "url", description: "URL of the remote repository" },
    ],
  },
  {
    id: "remote-remove",
    name: "git remote remove",
    description: "Remove a remote repository",
    category: "Remote",
    command: "git remote remove <name>",
    variables: [
      { name: "name", description: "Remote name to remove" },
    ],
  },
  {
    id: "fetch",
    name: "git fetch",
    description: "Download objects and refs from another repository",
    category: "Remote",
    command: "git fetch",
  },
  {
    id: "pull",
    name: "git pull",
    description: "Fetch from and integrate with another repository",
    category: "Remote",
    command: "git pull <remote> <branch>",
    variables: [
      { name: "remote", description: "Remote name" },
      { name: "branch", description: "Branch to pull" },
    ],
  },
  {
    id: "push",
    name: "git push",
    description: "Update remote refs along with associated objects",
    category: "Remote",
    command: "git push <remote> <branch>",
    variables: [
      { name: "remote", description: "Remote name" },
      { name: "branch", description: "Branch to push" },
    ],
    flags: ["-u", "--force", "--tags"],
  },
  {
    id: "remote-verify",
    name: "git remote -v",
    description: "Show fetch/push URLs of remote repositories",
    category: "Remote",
    command: "git remote -v",
  },

  // History
  {
    id: "log",
    name: "git log",
    description: "Show commit logs",
    category: "History",
    command: "git log",
    flags: ["-p", "--stat", "--oneline", "--graph", "--author"],
  },
  {
    id: "show",
    name: "git show",
    description: "Show various types of objects",
    category: "History",
    command: "git show <object>",
    variables: [
      { name: "object", description: "Commit hash, tag, or reference" },
    ],
  },
  {
    id: "diff",
    name: "git diff",
    description: "Show changes between commits, commit and working tree",
    category: "History",
    command: "git diff",
    flags: ["--staged", "--cached", "--stat"],
  },

  // Staging
  {
    id: "add",
    name: "git add",
    description: "Add file contents to the staging area",
    category: "Staging",
    command: "git add <file>",
    variables: [
      { name: "file", description: "File or directory to add" },
    ],
    flags: ["-A", "-u", "-p"],
  },
  {
    id: "rm",
    name: "git rm",
    description: "Remove files from the working tree and staging area",
    category: "Staging",
    command: "git rm <file>",
    variables: [
      { name: "file", description: "File to remove" },
    ],
    flags: ["-r", "-f", "--cached"],
  },
  {
    id: "stash",
    name: "git stash",
    description: "Stash changes in working directory",
    category: "Staging",
    command: "git stash",
    flags: ["push", "pop", "list", "apply", "drop"],
  },
  {
    id: "reset",
    name: "git reset",
    description: "Reset current HEAD to specified state",
    category: "Staging",
    command: "git reset",
    flags: ["--soft", "--mixed", "--hard", "--keep"],
  },

  // Config
  {
    id: "config",
    name: "git config",
    description: "Get and set repository or global options",
    category: "Config",
    command: "git config --global <key> <value>",
    variables: [
      { name: "key", description: "Configuration key (e.g., user.name)" },
      { name: "value", description: "Configuration value" },
    ],
  },
  {
    id: "config-list",
    name: "git config --list",
    description: "List all configuration settings",
    category: "Config",
    command: "git config --list",
  },
];

// Get command by ID
export function getCommandById(id: string): GitCommand | undefined {
  return gitCommands.find((cmd) => cmd.id === id);
}

// Get commands by category
export function getCommandsByCategory(category: string): GitCommand[] {
  return gitCommands.filter((cmd) => cmd.category === category);
}

// Generate command with flags and variables
export function generateCommand(
  command: string,
  flags: string[] = [],
  variables: Record<string, string> = {}
): string {
  let result = command;

  // Replace variables
  for (const [key, value] of Object.entries(variables)) {
    if (value) {
      result = result.replace(`<${key}>`, value);
    }
  }

  // Add flags
  if (flags.length > 0) {
    result = `${result} ${flags.join(" ")}`;
  }

  return result.trim();
}

// Get example command
export function getExample(): {
  command: GitCommand;
  flags: string[];
  variables: Record<string, string>;
} {
  return {
    command: gitCommands.find((c) => c.id === "push")!,
    flags: ["-u"],
    variables: {
      remote: "origin",
      branch: "main",
    },
  };
}
