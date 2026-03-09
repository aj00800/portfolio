'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';
import Image from 'next/image';

export default function MLOpsPipeline() {
  const heroText =
    'A complete machine learning lifecycle pipeline featuring experiment tracking, ' +
    'model registry, containerized training and inference, and automated CI/CD validation. ' +
    'Deployed on AWS EC2 with S3-based dataset storage for production-grade ML operations.';

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
        media={'/images/stylesync/hero.svg'}
        isImage={true}
        title={'End-to-End MLOps Pipeline'}
        bgColour={'background'}
      />

      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Overview</h2>
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            This project implements a complete MLOps pipeline that addresses the entire machine learning
            lifecycle from experimentation to production deployment. Built with industry-standard tools
            and best practices, it provides a scalable foundation for ML model development and deployment.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Tech Stack</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">ML Tools</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• Python for ML development</li>
                <li>• MLflow for experiment tracking</li>
                <li>• Model registry for versioning</li>
              </ul>
            </div>
            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">DevOps</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• Docker for containerization</li>
                <li>• GitHub Actions for CI/CD</li>
                <li>• Automated testing pipeline</li>
              </ul>
            </div>
            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">Cloud Infrastructure</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• AWS EC2 for deployment</li>
                <li>• S3 for dataset storage</li>
                <li>• Production-ready scaling</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Key Features</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Experiment Tracking</h3>
              <p className="text-foreground/70">
                Complete experiment tracking with MLflow to monitor model performance, hyperparameters,
                and metrics across multiple training runs. Enables data-driven model selection.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Containerized Workflows</h3>
              <p className="text-foreground/70">
                Docker containers ensure consistent environments across development, testing, and production.
                Simplifies dependency management and deployment.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">CI/CD Automation</h3>
              <p className="text-foreground/70">
                GitHub Actions pipeline automatically validates model changes, runs tests, and deploys
                to production when quality thresholds are met.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Cloud Deployment</h3>
              <p className="text-foreground/70">
                Production models deployed on AWS EC2 with S3 for scalable dataset storage. Infrastructure
                designed for reliability and performance.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Impact & Learning</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            This project demonstrates end-to-end MLOps capabilities, bridging the gap between ML development
            and production deployment. It showcases proficiency in modern ML engineering practices including
            experiment tracking, containerization, CI/CD automation, and cloud infrastructure management.
          </p>
        </section>
      </div>
    </div>
  );
}
