import { useState, useEffect } from "react";

export function useChromeAi() {
  const [supportStatus, setSupportStatus] = useState("idle");

  useEffect(() => {
    if (!globalThis.ai) {
      setSupportStatus("not-supported");
      return;
    }

    globalThis.ai?.assistant.capabilities().then((cap) => {
      const isSupport = cap.available === "readily";
      setSupportStatus(isSupport ? "supported" : "not-supported");
    });
  }, []);

  return { supportStatus };
}
