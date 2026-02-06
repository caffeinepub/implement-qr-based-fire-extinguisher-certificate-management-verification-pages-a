import { Shield, Target, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteContent } from '../content/siteContent';
import { usePageMeta } from '../hooks/usePageMeta';
import { seoMeta } from '../content/seoMeta';

export default function AboutPage() {
  usePageMeta(seoMeta.about.title, seoMeta.about.description);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About SHREE FIRE WORKS</h1>
          <p className="text-xl opacity-90">Your Trusted Fire Safety Solutions Provider in Indore</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold">Who We Are</h2>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              {siteContent.about.overview}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {siteContent.about.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Our Core Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Shield className="mb-4 h-12 w-12 text-primary" />
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prioritize safety in every solution we provide, ensuring the highest standards of fire protection.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Target className="mb-4 h-12 w-12 text-primary" />
                <CardTitle>Quality Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Committed to delivering certified, high-quality fire safety products and services.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Award className="mb-4 h-12 w-12 text-primary" />
                <CardTitle>Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experienced team brings years of knowledge in fire safety system design and installation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="mb-4 h-12 w-12 text-primary" />
                <CardTitle>Customer Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dedicated to providing prompt, reliable service and support to all our clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Why Choose Us?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {siteContent.about.whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 rounded-lg border p-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Serving Indore and Beyond</h2>
            <p className="text-lg text-muted-foreground">
              Based in Indore, we provide fire safety solutions across the region, serving industrial units, commercial establishments, hospitals, educational institutions, and residential complexes. Our team is equipped to handle projects of all sizes, from small installations to large-scale fire safety systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
