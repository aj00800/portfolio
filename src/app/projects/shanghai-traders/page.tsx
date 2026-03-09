'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';

export default function ShangaiTraders() {
  const heroText =
    'A comprehensive import management platform built for Shanghai Traders featuring supplier management, ' +
    'inventory tracking, sales monitoring, and shipment logistics. Includes real-time dashboards for revenue ' +
    'and operations analysis with seamless deployment on Railway and Vercel.';

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
        media={'/images/catapult-trading/dashboard.png'}
        isImage={true}
        title={'Shanghai Traders - Import Management System'}
        bgColour={'background'}
      />

      <div className="mx-8 sm:mx-24 text-foreground">
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Project Overview</h2>
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            Shanghai Traders is a full-scale enterprise management system designed to streamline import
            operations for a trading company. The platform provides end-to-end solutions for managing
            supplier relationships, tracking inventory, monitoring sales, and coordinating international
            shipments—all through an intuitive, data-driven interface.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Tech Stack</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">Frontend</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• React.js</li>
                <li>• Modern UI/UX</li>
                <li>• Real-time updates</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">Backend</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• Django REST Framework</li>
                <li>• RESTful APIs</li>
                <li>• Authentication</li>
                <li>• Business logic</li>
              </ul>
            </div>
            <div className="rounded-lg bg-card p-6 border border-foreground/10">
              <h3 className="text-xl font-semibold mb-3 text-primary">Database & Deploy</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• PostgreSQL</li>
                <li>• Railway (backend)</li>
                <li>• Vercel (frontend)</li>
                <li>• CI/CD pipeline</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Core Modules</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Supplier Management</h3>
              <p className="text-foreground/70 mb-3">
                Complete supplier database with contact information, payment terms, product catalogs,
                and performance metrics. Track supplier reliability and negotiate better terms based
                on historical data.
              </p>
              <ul className="text-sm text-foreground/60 space-y-1">
                <li>• Supplier profiles and contact management</li>
                <li>• Performance tracking and ratings</li>
                <li>• Payment terms and conditions</li>
                <li>• Product catalog integration</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Inventory Tracking</h3>
              <p className="text-foreground/70 mb-3">
                Real-time inventory management system with stock level monitoring, automated reorder
                alerts, and warehouse location tracking. Prevents stockouts and optimizes storage.
              </p>
              <ul className="text-sm text-foreground/60 space-y-1">
                <li>• Real-time stock levels</li>
                <li>• Automated low-stock alerts</li>
                <li>• Warehouse location mapping</li>
                <li>• Product categorization</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Sales Monitoring</h3>
              <p className="text-foreground/70 mb-3">
                Comprehensive sales tracking with order management, customer relationship tools, and
                revenue analytics. Generate reports to identify trends and optimize sales strategies.
              </p>
              <ul className="text-sm text-foreground/60 space-y-1">
                <li>• Order processing and tracking</li>
                <li>• Customer management</li>
                <li>• Sales analytics and reporting</li>
                <li>• Revenue forecasting</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Shipment Logistics</h3>
              <p className="text-foreground/70 mb-3">
                End-to-end shipment tracking from origin to destination with customs documentation,
                carrier management, and delivery status updates. Coordinate international logistics
                seamlessly.
              </p>
              <ul className="text-sm text-foreground/60 space-y-1">
                <li>• Shipment status tracking</li>
                <li>• Customs documentation</li>
                <li>• Carrier coordination</li>
                <li>• Delivery notifications</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Real-Time Dashboards</h2>
          <p className="text-lg leading-relaxed text-foreground/80 mb-6">
            Interactive dashboards provide instant visibility into business operations with key metrics,
            trends, and actionable insights:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-card/50 p-5 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Revenue Dashboard</h4>
              <p className="text-sm text-foreground/70">
                Track revenue trends, profit margins, and sales performance across products and time periods.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 p-5 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Operations Dashboard</h4>
              <p className="text-sm text-foreground/70">
                Monitor inventory levels, pending orders, shipment status, and supplier performance metrics.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 p-5 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Analytics & Reports</h4>
              <p className="text-sm text-foreground/70">
                Generate custom reports with data visualization for informed decision-making.
              </p>
            </div>
            <div className="rounded-lg bg-card/50 p-5 border border-foreground/10">
              <h4 className="font-semibold text-primary mb-2">Alert System</h4>
              <p className="text-sm text-foreground/70">
                Automated notifications for critical events like low stock, delayed shipments, or payment due dates.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Technical Highlights</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">RESTful API Architecture</h3>
                <p className="text-foreground/70">
                  Well-structured Django REST endpoints with proper authentication, authorization, and
                  data validation for secure and reliable operations.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Database Optimization</h3>
                <p className="text-foreground/70">
                  Optimized PostgreSQL queries, proper indexing, and efficient data modeling for fast
                  performance even with large datasets.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Modern Deployment</h3>
                <p className="text-foreground/70">
                  Seamless deployment with Railway hosting the Django backend and Vercel serving the
                  React frontend, ensuring high availability and performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Impact & Results</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            This project demonstrates full-stack development expertise from database design to user
            interface implementation. It showcases the ability to build complex, real-world business
            applications that solve actual operational challenges while maintaining clean code,
            scalability, and user-friendly design.
          </p>
        </section>
      </div>
    </div>
  );
}
