import type { ReactNode } from 'react';

// The real <html>/<body> live in src/app/[locale]/layout.tsx so that the
// lang attribute can follow the active locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
