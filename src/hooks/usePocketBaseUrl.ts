"use client";

import { useState, useEffect } from "react";
import { POCKETBASE_URL_LOCAL, POCKETBASE_URL_REMOTE } from "@/lib/pocketbase";

export function usePocketBaseUrl(): string {
  const [url, setUrl] = useState(POCKETBASE_URL_LOCAL);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        setUrl(POCKETBASE_URL_LOCAL);
      } else {
        setUrl(POCKETBASE_URL_REMOTE);
      }
    }
  }, []);

  return url;
}
