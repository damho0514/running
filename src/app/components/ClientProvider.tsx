"use client";

import React, { ReactNode, use, useEffect } from "react";
import { useScreenSize } from "../lib/hooks/screen";

export default function ClientProvider({ children }: { children: ReactNode }) {
  useScreenSize();
  useEffect(() => {
    import("share-api-polyfill");
  }, []);
  return <div>{children}</div>;
}
