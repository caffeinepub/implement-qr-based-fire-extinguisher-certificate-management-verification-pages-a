import { useParams } from '@tanstack/react-router';
import { useGetCertificateByToken } from '../hooks/useCertificates';
import { CertificateDetailsView } from '../components/CertificateDetailsView';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function CertificateVerificationPage() {
  const { token } = useParams({ strict: false }) as { token: string };
  const { data: certificate, isLoading, isError } = useGetCertificateByToken(token);

  if (isLoading) {
    return (
      <div className="container-custom section-padding">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading certificate...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !certificate) {
    return (
      <div className="container-custom section-padding">
        <div className="mx-auto max-w-2xl">
          <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Certificate Not Found</AlertTitle>
            <AlertDescription>
              The certificate you are looking for does not exist or the link is invalid.
              Please check the QR code or contact the service provider.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding">
      <div className="mx-auto max-w-4xl">
        <CertificateDetailsView certificate={certificate} showQr={true} />
      </div>
    </div>
  );
}
