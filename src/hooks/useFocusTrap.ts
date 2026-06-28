import { useEffect, useRef, type RefObject } from "react";

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  open: boolean,
  ref: RefObject<HTMLElement | null>
) {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement;

    const el = ref.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(focusableSelector);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      const current = document.activeElement;
      if (e.shiftKey) {
        if (current === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (current === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previousFocus.current?.focus();
    };
  }, [open, ref]);
}
