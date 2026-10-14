export const OPEN_COMMAND_PALETTE_EVENT =
  "devkit:open-command-palette";


export function openCommandPalette() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(OPEN_COMMAND_PALETTE_EVENT),
  );
}
