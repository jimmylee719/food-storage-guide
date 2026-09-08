'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT } from '@/lib/site';

declare global {
  interface Window { adsbygoogle?: unknown[] }
}

/**
 * In-article AdSense unit. Renders nothing until a slot id is configured, so
 * the site stays clean while the AdSense application is under review.
 */
export default function AdSlot({ slot, label }: { slot?: string; label?: string }) {
  const pushed = useRef(false);
  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not loaded (blocked or offline) — ignore. */
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className="ad-slot">
      {label ? <span className="ad-label">{label}</span> : null}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
