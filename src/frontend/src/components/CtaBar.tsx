import { Link } from '@tanstack/react-router';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CtaBarProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function CtaBar({ variant = 'default', className = '' }: CtaBarProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
        <Button asChild size="lg">
          <a href="tel:+919171608851">
            <Phone className="mr-2 h-5 w-5" />
            Call Now
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">
            <MessageSquare className="mr-2 h-5 w-5" />
            Get Quote
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-primary p-8 text-primary-foreground ${className}`}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">Ready to Protect Your Property?</h2>
        <p className="mb-6 text-lg opacity-90">
          Contact us today for a free consultation and quote on fire safety solutions tailored to your needs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <a href="tel:+919171608851">
              <Phone className="mr-2 h-5 w-5" />
              Call +91 9171608851
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <a href="mailto:shreefireworks@yahoo.com">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              <MessageSquare className="mr-2 h-5 w-5" />
              Request Quote
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
