"use client";

import { PropsWithChildren, Suspense } from "react";

export const SuspensePage = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};
