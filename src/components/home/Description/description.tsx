import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { opacity, slideUp } from './anim';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';

export default function Description() {
  const phrase1 =
    'A Computer Vision & Full-Stack Engineer with expertise in ML/AI\n' +
    'and production-ready web applications.\n\n ';

  const phrase2 =
    'Specializing in computer vision pipelines, deep learning systems, and ' +
    'scalable full-stack solutions. Experienced in training ML models, preparing ' +
    'annotated datasets, and deploying real-world applications with React and Django.';
  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div
      ref={description}
      className="relative flex flex-col justify-center gap-12 p-8 sm:mt-[200px] sm:flex-row sm:p-20 "
    >
      <div className="space-y-4">
        <p className="m-0 gap-2 leading-snug sm:text-4xl">
          {phrase1.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
        <p className="m-0 gap-2 leading-snug sm:text-4xl">
          {phrase2.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>
      <div>
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 pb-3 font-light sm:text-lg"
        >
          Currently Computer Vision Engineer Intern @AIBee.pk and CV Data Specialist @JinAnnotator.
        </motion.p>
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 text-lg font-light"
        >
          Building end-to-end ML pipelines, preparing production-grade datasets, and 
          deploying scalable web applications. Experienced with Python, React, Django, 
          and cloud infrastructure.
        </motion.p>
        <div data-scroll-speed={0.1}>
          <Link href={'/about'}>
            <RoundedButton className="absolute ml-56 mt-6 flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full bg-destructive text-background sm:ml-16 sm:mt-16 sm:h-[200px] sm:w-[200px]">
              About me
            </RoundedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
