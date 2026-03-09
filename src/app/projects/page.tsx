'use client';

import React, { useState } from 'react';
import ProjectLink from '@/app/projects/projectLink';
import Modal from '@/app/projects/project/modal';
import Layout from '@/components/layout';
import { ModalContext } from './modalContext';

const projects = [
  {
    title: 'End-to-End MLOps Pipeline',
    src: 'stylesync/stylesync.png',
    description:
      'Complete ML lifecycle pipeline with experiment tracking, model registry, Docker containerization, and automated CI/CD deployment on AWS.',
    href: '/projects/mlops-pipeline',
    tag: 'ML / DevOps',
    color: '#1f8fff'
  },
  {
    title: 'Mini LLM with RAG',
    src: 'm31/controller.jpg',
    description:
      'Domain-specific retrieval-augmented generation system using LangChain, FAISS, and FastAPI with semantic search capabilities.',
    href: '/projects/mini-llm-rag',
    tag: 'AI / LLM',
    color: '#000000'
  },
  {
    title: 'Football Speed Detection',
    src: 'm31/app.png',
    description:
      'Edge AI system for football speed estimation and player tracking using OpenCV on Raspberry Pi 3 with real-time processing.',
    href: '/projects/football-speed',
    tag: 'Computer Vision',
    color: '#303030'
  },
  {
    title: 'Shanghai Traders - Import Management',
    src: 'catapult-trading/dashboard.png',
    description:
      'Full-scale import management platform with supplier, inventory, sales, and shipment modules. Real-time dashboards and reporting.',
    href: '/projects/shanghai-traders',
    tag: 'Full-Stack',
    color: '#21242b'
  },
  {
    title: 'Bricksters Pizza - POS System',
    src: 'bottles/block.png',
    description:
      'Production POS system for live restaurant operations with real-time order tracking and receipt printing.',
    href: '/projects/bricksters-pos',
    tag: 'Full-Stack',
    color: '#EFE8D3'
  },
  {
    title: 'Automated Pneumonia Detection',
    src: 'astra/astra.png',
    description:
      'ML model to classify pneumonia from chest X-rays with preprocessing, augmentation, and performance evaluation.',
    href: '/projects/pneumonia-detection',
    tag: 'ML / Healthcare',
    color: '#ee5622'
  },
  {
    title: 'Pathfinding Algorithm Visualizer',
    src: 'stylesync/pca.png',
    description:
      'Interactive visualization for Dijkstra and A* algorithms with obstacle-based shortest path computation using Pygame.',
    href: '/projects/pathfinding-visualizer',
    tag: 'Algorithms',
    color: 'pink'
  },
  {
    title: 'Chess Game',
    src: 'axo/prototype.png',
    description:
      'GUI-based chess game with move validation and AI opponent developed using C++ and SFML.',
    href: '/projects/chess-game',
    tag: 'C++ / Gaming',
    color: '#9289BD'
  }
];

export default function ProjectsHome() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Layout title={'My Work'}>
        <div className="m-0">
          <div className="m-0 overflow-hidden">
            {projects.map((project, index) => {
              return (
                <div key={index}>
                  <ProjectLink
                    index={index}
                    title={project.title}
                    tag={project.tag}
                  />
                </div>
              );
            })}
          </div>
          <Modal projects={projects} />
        </div>
      </Layout>
    </ModalContext.Provider>
  );
}
