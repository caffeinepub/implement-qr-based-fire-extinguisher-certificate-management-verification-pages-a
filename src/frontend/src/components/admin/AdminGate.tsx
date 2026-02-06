import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useCertificates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldAlert, LogIn } from 'lucide-react';

interface AdminGateProps {
  children: ReactNode;
}

export function AdminGate({ children }: AdminGateProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin(!!identity);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Please log in to access the admin panel.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full"
              size="lg"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login with Internet Identity
                </>
              )}
            </Button>
            <div className="text-center">
              <Button asChild variant="link" size="sm">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Checking admin status
  if (checkingAdmin) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Not an admin - show access denied
  if (!isAdmin) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <ShieldAlert className="h-5 w-5" />
              <AlertTitle>Unauthorized</AlertTitle>
              <AlertDescription>
                You do not have permission to access the admin panel. Only authorized
                administrators can manage certificates.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin authenticated - render children
  return <>{children}</>;
}
