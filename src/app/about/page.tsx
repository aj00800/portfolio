'use client';

import React from 'react';
import Link from 'next/link';
import { useSpotify } from '@/hooks/useSpotify';
import { useGitHub } from '@/hooks/useGithub';
import Layout from '@/components/layout';
import AnimatedSection from '@/components/about/AnimatedSection';
import TextReveal from '@/components/about/TextReveal';
import JourneyTimeline from '@/components/about/JourneyTimeline';
import SpotifyPlaylists from '@/app/about/spotifyPlaylists';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';
import RoundedButton from '@/components/animations/roundedButton';
import CompactGitHubWidget from '@/components/about/Widgets/CompactGitHubWidget';
import IMessageWidget from '@/components/about/Widgets/IMessageWidget';

export default function About() {
  const {
    playlists,
    isLoading: spotifyLoading,
    error: spotifyError
  } = useSpotify();

  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  return (
    <div className="relative overflow-hidden">
      <Layout title="About Me">
        <div>
          <section className="grid gap-8 py-12 md:gap-12">
            <div className="space-y-8">
              <AnimatedSection animation="fade-up">
                <TextReveal
                  text="Computer Science student specializing in Computer Vision and Machine Learning. I build production-ready CV pipelines, train deep learning models, and deploy scalable full-stack applications."
                  className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl"
                  as="p"
                  highlightWords={['Computer Vision', 'Machine Learning', 'production-ready']}
                  scrub={false}
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    My Superpower
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    Bridging the gap between research and production. I take ML models from
                    experimentation to deployment, ensuring they work reliably in real-world
                    applications with clean, maintainable code.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Beyond Code
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    Based in Lahore, Pakistan. Currently studying Computer Science at
                    Information Technology University (ITU). When I'm not training models
                    or building applications, I'm exploring the latest advancements in AI,
                    contributing to open-source projects, and continuously learning new
                    technologies. I believe in the power of technology to solve real-world
                    problems and make a positive impact.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>
          {/* Journey Section - split layout with widgets, inside card */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Where I&apos;ve Been
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* Timeline - takes 2/3 width */}
                <div className="min-w-0 lg:col-span-1">
                  <div className="rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm sm:p-8">
                    <JourneyTimeline />
                  </div>
                  <section className="py-16">
                    <AnimatedSection animation="fade-up">
                      <div className="rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm sm:p-8">
                        <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
                          Education & Skills
                        </h2>
                        <div className="mb-6">
                          <h3 className="font-semibold text-foreground mb-2">
                            Information Technology University (ITU), Lahore
                          </h3>
                          <p className="text-sm text-foreground/60 mb-1">B.S. Computer Science • Expected 2027</p>
                          <p className="text-foreground/70 text-sm">
                            Relevant Coursework: Data Structures, OOP, Algorithms, Databases, Mobile Development
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">AI & Computer Vision</h4>
                            <p className="text-foreground/70 text-sm">CV pipelines, dataset preparation, model training & evaluation</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">Languages</h4>
                            <p className="text-foreground/70 text-sm">Python, JavaScript, C, C++</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">Frameworks</h4>
                            <p className="text-foreground/70 text-sm">Django REST, React.js, FastAPI</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">Databases</h4>
                            <p className="text-foreground/70 text-sm">PostgreSQL, MySQL, SQLite, MongoDB</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">DevOps & Cloud</h4>
                            <p className="text-foreground/70 text-sm">Docker, GitHub Actions, AWS (EC2, S3), Vercel, Railway</p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </section>
                </div>

                {/* Widgets sidebar - takes 1/3 width */}
                <div className="min-w-0 lg:col-span-1">
                  <div className="space-y-4 lg:sticky lg:top-32">
                    <AnimatedSection animation="fade-up">
                      <CompactGitHubWidget />
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up">
                      <IMessageWidget />
                    </AnimatedSection>
                    {!spotifyLoading &&
                      !spotifyError &&
                      playlists.length > 0 && (
                        <AnimatedSection animation="fade-up">
                          <SpotifyPlaylists playlists={playlists} />
                        </AnimatedSection>
                      )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>
        </div>
      </Layout>

      <ContrastCursor isActive={false} text="" />
    </div>
  );
}
