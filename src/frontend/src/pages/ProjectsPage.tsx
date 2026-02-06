import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Bell, Droplets, Shield } from 'lucide-react';
import { CtaBar } from '../components/CtaBar';
import { siteContent } from '../content/siteContent';
import { usePageMeta } from '../hooks/usePageMeta';
import { seoMeta } from '../content/seoMeta';

export default function ProjectsPage() {
  usePageMeta(seoMeta.projects.title, seoMeta.projects.description);

  const projectIcons = [Droplets, Bell, Bell, Shield];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Fire Safety Projects</h1>
          <p className="text-xl opacity-90">Turnkey Fire Protection System Installation & Implementation</p>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              SHREE FIRE WORKS has successfully executed numerous fire safety projects across various industries. We provide complete turnkey solutions from initial design and engineering to final commissioning and handover.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {siteContent.projects.map((project, index) => {
              const Icon = projectIcons[index];
              return (
                <Card key={index} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4">
                      <Icon className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Capabilities */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Project Capabilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Design & Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive fire safety system design with hydraulic calculations, equipment selection, and layout planning.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Supply & Procurement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sourcing of certified fire safety equipment and materials from reputed manufacturers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Installation & Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional installation by trained technicians with comprehensive testing and commissioning.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete project documentation including as-built drawings, test reports, and operation manuals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fire safety training for facility staff on system operation and emergency procedures.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>After-Sales Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ongoing maintenance support and annual maintenance contracts for installed systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Industries We Serve</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our fire safety projects span across multiple industries including manufacturing plants, commercial buildings, hospitals, educational institutions, hotels, shopping malls, and residential complexes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {siteContent.industries.map((industry, index) => (
                <span
                  key={index}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {industry.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <CtaBar />
        </div>
      </section>
    </div>
  );
}
