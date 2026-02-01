"use client";

import { useState, useEffect } from "react";

const POCKETBASE_URL_LOCAL = process.env.NEXT_PUBLIC_POCKETBASE_URL_LOCAL || "http://127.0.0.1:8090";
const POCKETBASE_URL_REMOTE = process.env.NEXT_PUBLIC_POCKETBASE_URL_REMOTE || "http://127.0.0.1:8090";

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

// Fonction utilitaire pour utilisation hors composants React
export function getPocketBaseUrlClient(): string {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return POCKETBASE_URL_LOCAL;
    }
    return POCKETBASE_URL_REMOTE;
  }
  return POCKETBASE_URL_LOCAL;
}
