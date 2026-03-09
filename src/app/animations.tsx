'use client';
import { PropsWithChildren, useEffect } from 'react';

export default function Animations({ children }: PropsWithChildren<{}>) {
  useEffect(() => {
    (async () => {
      try {
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        // @ts-ignore
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
        
        return () => {
          locomotiveScroll?.destroy();
        };
      } catch (error) {
        console.error('Failed to initialize LocomotiveScroll:', error);
      }
    })();
  }, []);

  return <div className="main">{children}</div>;
}
