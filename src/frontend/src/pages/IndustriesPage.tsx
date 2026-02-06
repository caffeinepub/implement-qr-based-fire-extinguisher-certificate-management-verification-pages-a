import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Factory, Building, Store, Home, Hospital, Car, Building2 } from 'lucide-react';
import { CtaBar } from '../components/CtaBar';
import { siteContent } from '../content/siteContent';
import { usePageMeta } from '../hooks/usePageMeta';
import { seoMeta } from '../content/seoMeta';

export default function IndustriesPage() {
  usePageMeta(seoMeta.industries.title, seoMeta.industries.description);

  const industryIcons = [Factory, Building, Store, Home, Hospital, Car, Building2];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Industries We Serve</h1>
          <p className="text-xl opacity-90">Fire Safety Solutions Tailored to Your Industry</p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              SHREE FIRE WORKS provides specialized fire safety solutions for diverse industries. We understand that each sector has unique fire safety requirements and compliance needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteContent.industries.map((industry, index) => {
              const Icon = industryIcons[index];
              return (
                <Card key={index} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4">
                      <Icon className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{industry.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{industry.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry-Specific Solutions */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold">Industry-Specific Fire Safety Solutions</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Manufacturing & Industrial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  High-capacity fire hydrant systems, foam suppression for flammable liquids, gas suppression for electrical rooms, and comprehensive fire alarm networks.
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Chemical plants and refineries</li>
                  <li>Textile and garment factories</li>
                  <li>Automobile manufacturing units</li>
                  <li>Warehouses and storage facilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Commercial Buildings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Integrated fire alarm systems, sprinkler systems, emergency evacuation systems, and fire extinguisher placement as per building codes.
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Office buildings and IT parks</li>
                  <li>Shopping malls and retail centers</li>
                  <li>Hotels and restaurants</li>
                  <li>Multiplexes and entertainment venues</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Healthcare Facilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Specialized fire safety systems meeting healthcare regulations, including clean agent suppression for sensitive medical equipment and patient safety protocols.
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Hospitals and medical centers</li>
                  <li>Diagnostic laboratories</li>
                  <li>Pharmaceutical facilities</li>
                  <li>Nursing homes and care centers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Residential Complexes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Fire safety systems for apartments, housing societies, and gated communities including fire extinguishers, hose reels, and fire alarm systems.
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>High-rise apartments</li>
                  <li>Housing societies</li>
                  <li>Gated communities</li>
                  <li>Individual homes and villas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Industry Compliance & Regulations</h2>
            <p className="text-lg text-muted-foreground">
              We ensure all our fire safety installations comply with industry-specific regulations, National Building Code (NBC), National Fire Protection Association (NFPA) standards, and local fire department requirements. Our solutions help you meet statutory compliance and pass fire safety audits with confidence.
            </p>
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
