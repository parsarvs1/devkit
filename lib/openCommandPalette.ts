export const OPEN_COMMAND_PALETTE_EVENT =
  "devkit:open-command-palette";

/**
 * Opens the command palette from anywhere in the app.
 *
 * The palette listens for this event so any component (a navbar
 * button, a help page link, etc.) can trigger it without prop
 * drilling or a context provider. Keyboard users who cannot press
 * Ctrl+K still get a visible button to open it.
 */
export function openCommandPalette() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(OPEN_COMMAND_PALETTE_EVENT),
  );
}
