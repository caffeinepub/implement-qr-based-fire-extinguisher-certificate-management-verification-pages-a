import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiX, SiFacebook, SiLinkedin } from 'react-icons/si';
import { BrandLogo } from './BrandLogo';
import { navigationLinks } from '../content/routes';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container-custom section-padding">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BrandLogo className="h-12 w-12" />
              <div>
                <h3 className="text-lg font-bold">SHREE FIRE WORKS</h3>
                <p className="text-sm text-secondary-foreground/80">Fire Safety Solutions</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              Professional fire safety solutions provider dealing in all types of fire extinguishers and complete fire protection systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-base font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-base font-semibold">Our Services</h4>
            <ul className="flex flex-col space-y-2 text-sm text-secondary-foreground/70">
              <li>Fire Extinguishers</li>
              <li>Fire Hydrant Systems</li>
              <li>Fire Alarm Panels</li>
              <li>Fire Safety AMC</li>
              <li>Industrial Safety Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-base font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+919171608851"
                className="flex items-start space-x-2 text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
              >
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>+91 9171608851</span>
              </a>
              <a
                href="mailto:shreefireworks@yahoo.com"
                className="flex items-start space-x-2 text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
              >
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>shreefireworks@yahoo.com</span>
              </a>
              <div className="flex items-start space-x-2 text-sm text-secondary-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>72, Reti Mandi Square, Rajendra Nagar, Indore – 452012</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-secondary-foreground/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-center text-sm text-secondary-foreground/60">
              © {currentYear}. Built with ❤️ using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-secondary-foreground"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-secondary-foreground/60 transition-colors hover:text-secondary-foreground"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 transition-colors hover:text-secondary-foreground"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 transition-colors hover:text-secondary-foreground"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
