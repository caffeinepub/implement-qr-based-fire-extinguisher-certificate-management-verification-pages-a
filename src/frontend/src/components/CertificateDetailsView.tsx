import { BrandLogo } from './BrandLogo';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { QrCode } from './QrCode';
import { formatDate, isExpired } from '../utils/certificates';
import { getVerificationUrl } from '../utils/origin';
import type { FireExtinguisherCertificateDto } from '../backend';

interface CertificateDetailsViewProps {
  certificate: FireExtinguisherCertificateDto;
  showQr?: boolean;
  compact?: boolean;
}

export function CertificateDetailsView({
  certificate,
  showQr = false,
  compact = false,
}: CertificateDetailsViewProps) {
  const expired = isExpired(certificate.nextDueDate);
  const verificationUrl = getVerificationUrl(certificate.uniqueToken);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-primary">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <BrandLogo className="h-20 w-20" />
            <div>
              <h1 className="text-2xl font-bold text-primary md:text-3xl">SHREE FIRE WORKS</h1>
              <p className="text-sm text-muted-foreground md:text-base">
                Kal Ki Shuruwat Aaj Se – Be Safe With SFW
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-xl font-bold md:text-2xl">
                🔥 Fire Extinguisher Service Certificate 🔥
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validity Status */}
      {expired ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>⚠️ Refilling Due</AlertTitle>
          <AlertDescription>
            Please Contact Authorized Service Provider
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle>Valid Certificate</AlertTitle>
          <AlertDescription>This certificate is currently valid.</AlertDescription>
        </Alert>
      )}

      {/* Client Information */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-bold">Client Information</h3>
          <div className="space-y-2">
            <DetailRow label="Client Name" value={certificate.clientName} />
            {certificate.clientAddress && (
              <DetailRow label="Site / Location" value={certificate.clientAddress} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service Information */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-bold">Service Information</h3>
          <div className="space-y-2">
            <DetailRow label="Installation Date" value={formatDate(certificate.installationDate)} />
            <DetailRow label="Refilling Date" value={formatDate(certificate.refillingDate)} />
            <DetailRow
              label="Next Due Date"
              value={formatDate(certificate.nextDueDate)}
              highlight={expired}
            />
            <DetailRow
              label="Validity Status"
              value={
                <Badge variant={expired ? 'destructive' : 'default'}>
                  {expired ? 'Expired' : 'Valid'}
                </Badge>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-bold">Technical Details</h3>
          <div className="space-y-2">
            <DetailRow label="Fire Extinguisher Type" value={certificate.extinguisherType} />
            <DetailRow label="Capacity" value={certificate.capacity} />
            <DetailRow
              label="Cylinder Manufacturing Date"
              value={formatDate(certificate.cylinderManufDate)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Authorization Details */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-bold">Authorization Details</h3>
          <div className="space-y-2">
            <DetailRow label="Refilling Done By" value={certificate.refillingDoneBy} />
            <DetailRow label="Tested By" value={certificate.testedBy} />
            <DetailRow label="Certified By" value={certificate.certifiedBy} />
            <DetailRow label="Refilling Company" value={certificate.refillingCompany} />
          </div>
          {certificate.remarks && (
            <>
              <Separator className="my-4" />
              <DetailRow label="Remarks" value={certificate.remarks} />
            </>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-2 border-primary">
        <CardContent className="pt-6">
          <div className="space-y-4 text-center">
            <p className="font-semibold text-primary">
              Authorized Service as per MP Government Norms
            </p>
            <Separator />
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-left">
                <p className="text-sm font-medium">Certificate Number</p>
                <p className="text-lg font-bold text-primary">
                  {certificate.certificateNumber?.toString() || 'N/A'}
                </p>
              </div>
              {showQr && (
                <div className="flex flex-col items-center space-y-2">
                  <QrCode value={verificationUrl} size={compact ? 100 : 120} />
                  <p className="text-xs text-muted-foreground">Scan to verify</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}

function DetailRow({ label, value, highlight = false }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <dt className="min-w-[180px] font-medium text-muted-foreground">{label}:</dt>
      <dd className={`font-semibold ${highlight ? 'text-destructive' : ''}`}>{value}</dd>
    </div>
  );
}
