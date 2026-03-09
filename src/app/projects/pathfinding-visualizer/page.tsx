'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';

export default function PathfindingVisualizer() {
  const heroText =
    'An interactive visualization tool for pathfinding algorithms built with Python and Pygame. ' +
    'Demonstrates Dijkstra and A* algorithms with obstacle-based shortest path computation.';

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
        media={'/images/stylesync/pca.png'}
        isImage={true}
        title={'Pathfinding Algorithm Visualizer'}
        bgColour={'background'}
      />
      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Project Description</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            An educational visualization tool that demonstrates how pathfinding algorithms work.
            Users can draw obstacles and watch in real-time as Dijkstra's or A* algorithm finds
            the shortest path. Built with Pygame for interactive graphics.
          </p>
        </section>
      </div>
    </div>
  );
}
