'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlight?: boolean;
}

const journeyData: TimelineItem[] = [
  {
    year: 'Now',
    title: 'Computer Vision Engineer (Intern)',
    company: 'AIBee.pk',
    companyUrl: 'https://aibee.pk/',
    description:
      'Developing computer vision solutions using Python for real-world applications. Improving preprocessing, feature extraction, and inference pipelines. Conducting model experimentation, evaluation, and iterative refinement in a hybrid agile environment.',
    highlight: true
  },
  {
    year: '2025',
    title: 'Computer Vision Data Specialist',
    company: 'JinAnnotator',
    description:
      'Preparing production-grade labeled datasets for ML and deep learning systems. Executing bounding box, classification, and segmentation annotations under strict QA guidelines. Conducting dataset auditing to improve training accuracy and reduce bias.',
    highlight: true
  },
  {
    year: '2024',
    title: 'Full-Stack Developer (Freelance)',
    company: 'Independent',
    description:
      'Delivering full-stack web solutions using React.js, Django REST, and PostgreSQL. Managing projects end-to-end from requirements to production deployment. Integrating third-party APIs for payments, storage, and real-time systems.'
  },
  {
    year: '2024',
    title: 'AI/ML Intern',
    company: 'ThingTrax',
    description:
      'Assisted in building computer vision systems for industrial monitoring. Trained and fine-tuned ML models for anomaly detection using image and sensor data. Integrated trained models into backend services for real-time inference.'
  },
  {
    year: '2024',
    title: 'Frontend Intern',
    company: 'Rixty Soft',
    description:
      'Improved frontend performance using React.js and Tailwind CSS. Optimized UI flows and reduced unnecessary component re-renders. Worked within a Git-based agile workflow.'
  },
  {
    year: '2023',
    title: 'Computer Science B.S.',
    company: 'Information Technology University (ITU)',
    description:
      'Studying Computer Science with focus on AI, machine learning, and software engineering. Expected graduation in 2027.'
  }
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const items = itemsRef.current;
    if (!items.length) return;

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.05
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-1">
        {journeyData.map((item, i) => {
          const isLastItem = i === journeyData.length - 1;

          return (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="group relative"
            >
              {/* Timeline item - clean horizontal layout */}
              <div
                className={`grid py-4 sm:grid-cols-[60px_1fr] sm:gap-4 sm:py-6 ${
                  isLastItem ? '' : 'border-b border-foreground/10'
                }`}
              >
                {/* Year */}
                <div className="items-start px-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      item.highlight
                        ? 'bg-primary/10 text-primary'
                        : 'bg-foreground/5 text-foreground/60'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      {item.title}
                    </h3>
                    {item.companyUrl ? (
                      <Link
                        href={item.companyUrl}
                        className="text-sm font-medium text-primary transition-colors hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{item.company} ↗
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-foreground/50">
                        @{item.company}
                      </span>
                    )}
                  </div>
                  <p className="max-w-2xl text-foreground/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
