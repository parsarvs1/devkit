export function formatJson(input: string): string {
  const parsed = JSON.parse(input);

  return JSON.stringify(parsed, null, 2);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);

  return JSON.stringify(parsed);
}

export function getJsonExample(): string {
  return JSON.stringify(
    {
      name: "Parsa",
      age: 20,
      developer: true,
      skills: [
        "Next.js",
        "React",
        "TypeScript",
      ],
    },
    null,
    2
  );
}