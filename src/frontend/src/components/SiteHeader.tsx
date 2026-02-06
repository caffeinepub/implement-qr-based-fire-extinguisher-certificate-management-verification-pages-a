import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { BrandLogo } from './BrandLogo';
import { navigationLinks } from '../content/routes';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { identity } = useInternetIdentity();

  const publicLinks = navigationLinks.filter((link) => !link.adminOnly);
  const showAdminLink = !!identity;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <BrandLogo className="h-10 w-10 md:h-12 md:w-12" />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-foreground md:text-xl">
                SHREE FIRE WORKS
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                Fire Safety Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 lg:flex">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === link.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {showAdminLink && (
              <Link
                to="/admin/certificates"
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  currentPath.startsWith('/admin') ? 'text-primary' : 'text-foreground'
                }`}
              >
                <Shield className="mr-1 inline-block h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center space-x-3 lg:flex">
            <Button asChild variant="outline" size="sm">
              <a href="tel:+919171608851">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button asChild size="sm">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Button asChild variant="ghost" size="icon">
              <a href="tel:+919171608851" aria-label="Call Now">
                <Phone className="h-5 w-5" />
              </a>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-6 pt-6">
                  <div className="flex items-center space-x-3">
                    <BrandLogo className="h-10 w-10" />
                    <span className="text-lg font-bold">SHREE FIRE WORKS</span>
                  </div>
                  <nav className="flex flex-col space-y-1">
                    {publicLinks.map((link) => (
                      <SheetClose asChild key={link.path}>
                        <Link
                          to={link.path}
                          className={`rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                            currentPath === link.path ? 'bg-accent text-accent-foreground' : ''
                          }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    {showAdminLink && (
                      <SheetClose asChild>
                        <Link
                          to="/admin/certificates"
                          className={`rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                            currentPath.startsWith('/admin') ? 'bg-accent text-accent-foreground' : ''
                          }`}
                        >
                          <Shield className="mr-2 inline-block h-4 w-4" />
                          Admin
                        </Link>
                      </SheetClose>
                    )}
                  </nav>
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button asChild>
                      <Link to="/contact" onClick={() => setIsOpen(false)}>
                        Get Quote
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="tel:+919171608851">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
