import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CtaBar } from '../components/CtaBar';
import { siteContent } from '../content/siteContent';
import { usePageMeta } from '../hooks/usePageMeta';
import { seoMeta } from '../content/seoMeta';

export default function ProductsPage() {
  usePageMeta(seoMeta.products.title, seoMeta.products.description);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Fire Safety Products</h1>
          <p className="text-xl opacity-90">Complete Range of Fire Extinguishers and Safety Equipment</p>
        </div>
      </section>

      {/* Fire Extinguishers Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold">Fire Extinguishers</h2>
            <p className="text-lg text-muted-foreground">
              We supply all types of fire extinguishers suitable for different fire classes and applications. Each extinguisher is certified and meets international safety standards.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteContent.products.extinguishers.map((product, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{product.name}</span>
                    <Badge variant="secondary">Certified</Badge>
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm font-semibold text-foreground">Typical Use Case:</p>
                    <p className="mt-1 text-sm text-muted-foreground">{product.useCase}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Products */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="mb-8 text-3xl font-bold">Other Fire Safety Products</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="hydrant">
              <AccordionTrigger className="text-xl font-semibold">
                Fire Hydrant System Components
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <ul className="space-y-2 pl-4">
                  <li>• Fire Pumps (Electric & Diesel)</li>
                  <li>• Hydrant Valves & Landing Valves</li>
                  <li>• Fire Hose Pipes & Hose Reels</li>
                  <li>• Fire Nozzles & Branch Pipes</li>
                  <li>• Underground & Overhead Water Tanks</li>
                  <li>• Pressure Gauges & Control Panels</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="alarm">
              <AccordionTrigger className="text-xl font-semibold">
                Fire Alarm & Detection Systems
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <ul className="space-y-2 pl-4">
                  <li>• Addressable Fire Alarm Panels</li>
                  <li>• Conventional Fire Alarm Panels</li>
                  <li>• Smoke Detectors (Optical & Ionization)</li>
                  <li>• Heat Detectors (Fixed & Rate of Rise)</li>
                  <li>• Manual Call Points</li>
                  <li>• Fire Hooters & Sirens</li>
                  <li>• Beam Detectors & Aspirating Systems</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="suppression">
              <AccordionTrigger className="text-xl font-semibold">
                Fire Suppression Systems
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <ul className="space-y-2 pl-4">
                  <li>• Sprinkler Systems (Wet & Dry)</li>
                  <li>• Gas Suppression Systems (FM200, CO₂)</li>
                  <li>• Foam Systems (Low & High Expansion)</li>
                  <li>• Water Mist Systems</li>
                  <li>• Kitchen Hood Suppression Systems</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety">
              <AccordionTrigger className="text-xl font-semibold">
                Fire Safety Equipment & Accessories
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <ul className="space-y-2 pl-4">
                  <li>• Fire Blankets</li>
                  <li>• Fire Safety Signs & Signage</li>
                  <li>• Emergency Lighting & Exit Signs</li>
                  <li>• Fire Extinguisher Cabinets & Stands</li>
                  <li>• Fire Hose Boxes & Cabinets</li>
                  <li>• Personal Protective Equipment (PPE)</li>
                  <li>• Fire Doors & Fire Dampers</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <CtaBar />
        </div>
      </section>
    </div>
  );
}
