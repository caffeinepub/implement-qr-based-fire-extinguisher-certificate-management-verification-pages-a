import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceIcon } from '../components/ServiceIcon';
import { CtaBar } from '../components/CtaBar';
import { siteContent } from '../content/siteContent';
import { usePageMeta } from '../hooks/usePageMeta';
import { seoMeta } from '../content/seoMeta';

export default function ServicesPage() {
  usePageMeta(seoMeta.services.title, seoMeta.services.description);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Fire Safety Services</h1>
          <p className="text-xl opacity-90">Comprehensive Fire Protection Solutions for Every Need</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              SHREE FIRE WORKS offers a complete range of fire safety services from design and installation to maintenance and support. Our expert team ensures your property is protected with the latest fire safety technology and systems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteContent.services.map((service) => (
              <Card key={service.id} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex items-center justify-center">
                    <ServiceIcon index={service.icon} alt={service.title} className="h-16 w-16" />
                  </div>
                  <CardTitle className="text-center text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Service Process</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Consultation</h3>
              <p className="text-muted-foreground">
                We assess your fire safety needs and recommend appropriate solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Design</h3>
              <p className="text-muted-foreground">
                Our experts design a customized fire safety system for your facility.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Installation</h3>
              <p className="text-muted-foreground">
                Professional installation by certified technicians ensuring quality and compliance.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                4
              </div>
              <h3 className="mb-2 text-xl font-semibold">Maintenance</h3>
              <p className="text-muted-foreground">
                Regular maintenance and support to keep your systems in optimal condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Standards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Compliance & Standards</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              All our fire safety installations comply with National Building Code (NBC), National Fire Protection Association (NFPA) standards, and local fire safety regulations. We ensure your facility meets all statutory requirements and passes fire safety audits.
            </p>
            <p className="text-lg text-muted-foreground">
              Our team stays updated with the latest fire safety codes and best practices to provide you with compliant, reliable, and effective fire protection systems.
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
