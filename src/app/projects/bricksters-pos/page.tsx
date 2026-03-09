'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';

export default function BrickstersPOS() {
  const heroText =
    'A production-ready POS system built for Bricksters Pizza with real-time order tracking, ' +
    'receipt printing, and optimized backend for live restaurant operations.';

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="pt-10">
      <ProjectHero
        description={heroText}
        media={'/images/bottles/block.png'}
        isImage={true}
        title={'Bricksters Pizza - POS System'}
        bgColour={'background'}
      />
      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Project Description</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            A complete Point-of-Sale system designed for restaurant operations using React.js and Node.js.
            Features include order management, real-time tracking, receipt generation, and performance
            reporting for business analytics.
          </p>
        </section>
      </div>
    </div>
  );
}
