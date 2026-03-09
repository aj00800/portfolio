'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';

export default function PneumoniaDetection() {
  const heroText =
    'An ML model trained to classify pneumonia from chest X-rays using Python. ' +
    'Includes preprocessing, data augmentation, and comprehensive model evaluation.';

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
        media={'/images/astra/astra.png'}
        isImage={true}
        title={'Automated Pneumonia Detection System'}
        bgColour={'background'}
      />
      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Project Description</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            A machine learning classification model for detecting pneumonia from chest X-ray images.
            Applied image preprocessing techniques and data augmentation to improve model accuracy.
            Evaluated performance and analyzed misclassifications for insights.
          </p>
        </section>
      </div>
    </div>
  );
}
