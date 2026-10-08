"use client";

/**
 * Copies text to the clipboard with a fallback for contexts where the
 * async Clipboard API is unavailable (insecure origins, denied permission,
 * or a browser/tab that isn't focused). Returns true on success.
 */
export async function copyToClipboard(
  text: string,
  onError?: (message: string) => void
): Promise<boolean> {
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.top = "0";
    textarea.style.left = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (!ok) {
      onError?.("Copy failed. Clipboard access was denied.");
      return false;
    }
    return true;
  } catch {
    onError?.("Copy failed. Clipboard access was denied.");
    return false;
  }
}
