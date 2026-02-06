import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { SiteLayout } from './components/SiteLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';
import CertificateVerificationPage from './pages/CertificateVerificationPage';
import AdminCertificatesListPage from './pages/admin/AdminCertificatesListPage';
import AdminCertificateEditorPage from './pages/admin/AdminCertificateEditorPage';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductsPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsPage,
});

const industriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/industries',
  component: IndustriesPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const certificateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/certificate/$token',
  component: CertificateVerificationPage,
});

const adminCertificatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/certificates',
  component: AdminCertificatesListPage,
});

const adminCertificateNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/certificates/new',
  component: AdminCertificateEditorPage,
});

const adminCertificateEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/certificates/$certificateNumber/edit',
  component: AdminCertificateEditorPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  productsRoute,
  servicesRoute,
  projectsRoute,
  industriesRoute,
  contactRoute,
  certificateRoute,
  adminCertificatesRoute,
  adminCertificateNewRoute,
  adminCertificateEditRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
