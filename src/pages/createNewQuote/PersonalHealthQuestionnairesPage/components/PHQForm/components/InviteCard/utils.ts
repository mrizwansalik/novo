import React from "react";

export function handleCopy(
  copyRef: React.Ref<HTMLInputElement>,
  setTooltipMessage: (message: string) => void
): void {
  (copyRef as any).current.select();
  (copyRef as any).current.setSelectionRange(0, 99999);
  document.execCommand("copy");
  setTooltipMessage("Copied");
}
