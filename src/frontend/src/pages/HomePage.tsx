import { Link } from '@tanstack/react-router';
import { Shield, Award, Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CtaBar } from '../components/CtaBar';
import { ServiceIcon } from '../components/ServiceIcon';
import { siteContent } from '../content/siteContent';
import { usePageMeta } from '../hooks/usePageMeta';
import { seoMeta } from '../content/seoMeta';

export default function HomePage() {
  usePageMeta(seoMeta.home.title, seoMeta.home.description);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-industrial-fire-safety.dim_1920x800.png"
            alt="Industrial Fire Safety"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80" />
        </div>
        <div className="container-custom relative py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {siteContent.hero.title}
            </h1>
            <p className="mb-4 text-xl font-semibold text-primary md:text-2xl">
              {siteContent.hero.subtitle}
            </p>
            <p className="mb-8 text-lg opacity-90 md:text-xl">
              {siteContent.hero.description}
            </p>
            <CtaBar variant="compact" />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-background py-12">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-bold">Certified Products</h3>
                <p className="text-sm text-muted-foreground">Quality Assured</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Award className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-bold">Expert Team</h3>
                <p className="text-sm text-muted-foreground">Experienced Professionals</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-bold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Emergency Response</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-bold">Trusted by Many</h3>
                <p className="text-sm text-muted-foreground">Satisfied Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Fire Safety Services</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive fire safety solutions for industrial, commercial, and residential properties
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteContent.services.slice(0, 6).map((service) => (
              <Card key={service.id} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex items-center justify-center">
                    <ServiceIcon index={service.icon} alt={service.title} className="h-16 w-16" />
                  </div>
                  <CardTitle className="text-center text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Why Choose SHREE FIRE WORKS?</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                We are committed to providing the highest quality fire safety solutions with expert service and support.
              </p>
              <ul className="space-y-4">
                {siteContent.about.whyChooseUs.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Fire Safety Products</CardTitle>
                  <CardDescription>All types of fire extinguishers and safety equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>ABC Powder Extinguishers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>CO₂ Extinguishers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Foam & DCP Extinguishers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Fire Hydrant Systems</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Fire Alarm Panels</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Complete Fire Safety Systems</span>
                    </li>
                  </ul>
                  <Button asChild className="mt-6 w-full">
                    <Link to="/products">View All Products</Link>
                  </Button>
                </CardContent>
              </Card>
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
