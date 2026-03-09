'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';

export default function FootballSpeed() {
  const heroText =
    'An edge AI system for real-time football speed estimation and player tracking using OpenCV on Raspberry Pi 3. ' +
    'Implements detection and motion analysis pipelines optimized for low-resource hardware.';

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
        media={'/images/m31/app.png'}
        isImage={true}
        title={'Football Speed Detection & Player Tracking'}
        bgColour={'background'}
      />
      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Project Description</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            This computer vision project implements real-time speed detection and player tracking for
            football using OpenCV and Python. Optimized to run on Raspberry Pi 3, demonstrating edge
            computing capabilities for sports analytics.
          </p>
        </section>
      </div>
    </div>
  );
}
