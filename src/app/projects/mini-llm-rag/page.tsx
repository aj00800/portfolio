'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';

export default function MiniLLMRAG() {
  const heroText =
    'A domain-specific Retrieval-Augmented Generation (RAG) system built with open-source LLMs, ' +
    'LangChain, and FAISS for semantic search. Features async FastAPI endpoints with role-based ' +
    'access control and modular pipelines designed for scalable deployment.';

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
        media={'/images/m31/controller.jpg'}
        isImage={true}
        title={'Mini LLM with RAG'}
        bgColour={'background'}
      />

      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Project Overview</h2>
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            This project implements a production-ready Retrieval-Augmented Generation system that combines
            the power of large language models with domain-specific knowledge retrieval. By leveraging
            semantic search and vector databases, it provides accurate, context-aware responses grounded
            in custom data sources.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Architecture & Technologies</h2>
          <div className="space-y-6">
            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">Core Components</h3>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <div>
                    <strong>LangChain Integration:</strong> Orchestrates LLM calls, document processing,
                    and chain-of-thought reasoning for complex queries.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <div>
                    <strong>FAISS Vector Database:</strong> Efficient similarity search and clustering
                    of embeddings for fast, relevant document retrieval.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <div>
                    <strong>Open-Source LLMs:</strong> Utilizes models like Llama or Mistral for
                    cost-effective, customizable language generation.
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">Backend & API</h3>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <div>
                    <strong>FastAPI Framework:</strong> Asynchronous endpoints for high-performance
                    concurrent request handling.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <div>
                    <strong>Role-Based Access Control:</strong> Secure authentication and authorization
                    system for multi-user environments.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <div>
                    <strong>Modular Design:</strong> Clean separation of concerns with reusable
                    components for easy maintenance and scaling.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">RAG Pipeline</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Document Ingestion</h3>
                <p className="text-foreground/70">
                  Documents are preprocessed, chunked, and converted into embeddings using state-of-the-art
                  sentence transformers.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Semantic Search</h3>
                <p className="text-foreground/70">
                  User queries are embedded and matched against the vector database using cosine similarity
                  to retrieve the most relevant context.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Context-Aware Generation</h3>
                <p className="text-foreground/70">
                  Retrieved documents are injected into the LLM prompt, enabling accurate, grounded
                  responses based on actual data.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Key Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-card/50 p-4 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Scalable Architecture</h4>
              <p className="text-sm text-foreground/70">
                Modular design allows easy scaling of individual components and integration into
                existing systems.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 p-4 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Fast Retrieval</h4>
              <p className="text-sm text-foreground/70">
                FAISS enables millisecond-level similarity search across thousands of documents.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 p-4 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Secure by Design</h4>
              <p className="text-sm text-foreground/70">
                Built-in authentication and role-based access control protect sensitive data.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 p-4 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Production Ready</h4>
              <p className="text-sm text-foreground/70">
                Async endpoints, error handling, and logging make it suitable for production deployment.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Technical Skills Demonstrated</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            This project showcases advanced skills in NLP, vector databases, API development, and
            system design. It demonstrates the ability to work with cutting-edge LLM technologies
            while maintaining production-quality code standards with proper architecture, security,
            and scalability considerations.
          </p>
        </section>
      </div>
    </div>
  );
}
