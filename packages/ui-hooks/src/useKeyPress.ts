import { useEffect, useState } from "react";

export interface UseKeyPressOptions {
  enabled?: boolean;
  target?: Window | Document | null;
  preventDefault?: boolean;
  onPress?: (event: KeyboardEvent) => void;
}

function normalizeKeys(keys: string | string[]) {
  return (Array.isArray(keys) ? keys : [keys]).map((key) => key.toLowerCase());
}

export function useKeyPress(
  keys: string | string[],
  options?: UseKeyPressOptions,
): boolean {
  const {
    enabled = true,
    target,
    preventDefault = false,
    onPress,
  } = options ?? {};
  const [pressed, setPressed] = useState(false);
  const keyList = normalizeKeys(keys).join("|");

  useEffect(() => {
    const normalizedKeys = keyList.split("|").filter(Boolean);
    if (!enabled) {
      return undefined;
    }

    const eventTarget =
      target ?? (typeof window !== "undefined" ? window : null);
    if (!eventTarget) {
      return undefined;
    }

    const isMatch = (event: KeyboardEvent) =>
      normalizedKeys.includes(event.key.toLowerCase());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMatch(event)) {
        return;
      }

      if (preventDefault) {
        event.preventDefault();
      }

      setPressed(true);
      onPress?.(event);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (isMatch(event)) {
        setPressed(false);
      }
    };

    eventTarget.addEventListener("keydown", handleKeyDown as EventListener);
    eventTarget.addEventListener("keyup", handleKeyUp as EventListener);

    return () => {
      eventTarget.removeEventListener(
        "keydown",
        handleKeyDown as EventListener,
      );
      eventTarget.removeEventListener("keyup", handleKeyUp as EventListener);
    };
  }, [enabled, keyList, onPress, preventDefault, target]);

  return pressed;
}
