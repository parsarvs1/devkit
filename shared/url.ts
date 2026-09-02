export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrl(input: string): string {
  return decodeURIComponent(input);
}

export function encodeUrlFull(input: string): string {
  return encodeURI(input);
}

export function decodeUrlFull(input: string): string {
  return decodeURI(input);
}

export function getUrlExample() {
  return {
    input:
      "https://example.com/search?q=hello world&name=Parsa",
  };
}