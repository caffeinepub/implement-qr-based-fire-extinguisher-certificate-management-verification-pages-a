import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSubmitInquiry } from '../hooks/useQueries';
import { siteContent } from '../content/siteContent';
import { usePageMeta } from '../hooks/usePageMeta';
import { seoMeta } from '../content/seoMeta';

export default function ContactPage() {
  usePageMeta(seoMeta.contact.title, seoMeta.contact.description);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceNeeded: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitInquiry = useSubmitInquiry();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.serviceNeeded) {
      newErrors.serviceNeeded = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await submitInquiry.mutateAsync({
        name: formData.name,
        company: formData.company || null,
        phone: formData.phone,
        email: formData.email,
        serviceNeeded: formData.serviceNeeded,
        message: formData.message,
      });

      // Reset form on success
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        serviceNeeded: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="text-xl opacity-90">Get in Touch for Fire Safety Solutions</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <MapPin className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{siteContent.contact.address}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${siteContent.contact.phone}`}
                  className="text-lg font-semibold text-primary hover:underline"
                >
                  {siteContent.contact.phone}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">Available for emergency support</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="text-lg font-semibold text-primary hover:underline"
                >
                  {siteContent.contact.email}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">We'll respond within 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">Request a Quote</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and our team will get back to you with a customized fire safety solution.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                {submitInquiry.isSuccess && (
                  <Alert className="mb-6 border-primary bg-primary/10">
                    <AlertDescription className="text-primary">
                      Thank you for your inquiry! We have received your message and will contact you shortly.
                    </AlertDescription>
                  </Alert>
                )}

                {submitInquiry.isError && (
                  <Alert className="mb-6 border-destructive bg-destructive/10">
                    <AlertDescription className="text-destructive">
                      Failed to submit inquiry. Please try again or contact us directly.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Your full name"
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+91 XXXXXXXXXX"
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">
                      Service Needed <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.serviceNeeded} onValueChange={(value) => handleChange('serviceNeeded', value)}>
                      <SelectTrigger className={errors.serviceNeeded ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {siteContent.services.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceNeeded && <p className="text-sm text-destructive">{errors.serviceNeeded}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Please describe your fire safety requirements..."
                      rows={6}
                      className={errors.message ? 'border-destructive' : ''}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={submitInquiry.isPending}>
                    {submitInquiry.isPending ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>We're here to help you</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Saturday:</span>
                  <span className="text-muted-foreground">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-muted-foreground">10:00 AM - 5:00 PM</span>
                </div>
                <div className="mt-4 rounded-lg bg-primary/10 p-4">
                  <p className="text-sm font-semibold text-primary">Emergency Support Available 24/7</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For urgent fire safety issues, call us anytime at {siteContent.contact.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
