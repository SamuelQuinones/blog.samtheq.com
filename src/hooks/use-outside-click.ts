import type { RefObject } from "react";
import { resolveElement } from "@util/ReactHelper";
import useEventListener from "./use-event-listener";

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | T,
  handler: (event: MouseEvent) => void,
  mouseEvent: "mousedown" | "mouseup" | "pointerdown" = "mousedown"
): void {
  useEventListener("window", mouseEvent, (event) => {
    const el = resolveElement<T>(ref);
    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Element)) {
      return;
    }
    handler(event);
  });
}

export default useOutsideClick;
