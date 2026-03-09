'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';

export default function ChessGame() {
  const heroText =
    'A fully-featured chess game with GUI, move validation, and AI opponent developed using C++ and SFML graphics library.';

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
        media={'/images/axo/prototype.png'}
        isImage={true}
        title={'Chess Game'}
        bgColour={'background'}
      />
      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Project Description</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            A complete chess game implementation in C++ featuring a graphical interface built with SFML.
            Includes full chess rules, move validation, check/checkmate detection, and an AI opponent
            using minimax algorithm. Demonstrates proficiency in C++ object-oriented programming and
            game development.
          </p>
        </section>
      </div>
    </div>
  );
}
