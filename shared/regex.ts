export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export interface RegexResult {
  matches: RegexMatch[];
  count: number;
}

export function testRegex(
  pattern: string,
  flags: string,
  text: string
): RegexResult {
  if (!pattern.trim()) {
    throw new Error("Please enter a regular expression.");
  }

  let regex: RegExp;

  try {
    regex = new RegExp(pattern, flags);
  } catch {
    throw new Error("Invalid regular expression.");
  }

  const matches: RegexMatch[] = [];

  if (regex.global) {
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1),
      });

      // Prevent infinite loops for zero-length matches.
      if (match[0] === "") {
        regex.lastIndex++;
      }
    }
  } else {
    const match = regex.exec(text);

    if (match) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1),
      });
    }
  }

  return {
    matches,
    count: matches.length,
  };
}

export function getRegexExample() {
  return {
    pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b",
    flags: "gi",
    text: `Contact us at hello@example.com or support@devkit.dev.
You can also email admin@test.org.`,
  };
}