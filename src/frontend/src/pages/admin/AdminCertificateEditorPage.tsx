import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  useCreateCertificate,
  useUpdateCertificate,
  useGetCertificateByNumber,
} from '../../hooks/useCertificates';
import { AdminGate } from '../../components/admin/AdminGate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Loader2, Save, CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { CertificateDetailsView } from '../../components/CertificateDetailsView';
import { DownloadCertificatePdfButton } from '../../components/admin/DownloadCertificatePdfButton';
import { getVerificationUrl } from '../../utils/origin';
import type { FireExtinguisherCertificateDto } from '../../backend';

interface FormData {
  clientName: string;
  clientAddress: string;
  extinguisherType: string;
  capacity: string;
  cylinderManufDate: string;
  installationDate: string;
  refillingDate: string;
  nextDueDate: string;
  refillingDoneBy: string;
  testedBy: string;
  certifiedBy: string;
  refillingCompany: string;
  remarks: string;
}

function AdminCertificateEditorContent() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { certificateNumber?: string };
  const certificateNumber = params.certificateNumber ? BigInt(params.certificateNumber) : null;
  const isEditMode = !!certificateNumber;

  const { data: existingCertificate, isLoading: loadingCertificate } = useGetCertificateByNumber(
    certificateNumber || BigInt(0),
    isEditMode
  );

  const createMutation = useCreateCertificate();
  const updateMutation = useUpdateCertificate();

  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientAddress: '',
    extinguisherType: '',
    capacity: '',
    cylinderManufDate: '',
    installationDate: '',
    refillingDate: '',
    nextDueDate: '',
    refillingDoneBy: '',
    testedBy: '',
    certifiedBy: '',
    refillingCompany: '',
    remarks: '',
  });

  const [savedCertificate, setSavedCertificate] = useState<FireExtinguisherCertificateDto | null>(
    null
  );

  useEffect(() => {
    if (existingCertificate) {
      setFormData({
        clientName: existingCertificate.clientName,
        clientAddress: existingCertificate.clientAddress || '',
        extinguisherType: existingCertificate.extinguisherType,
        capacity: existingCertificate.capacity,
        cylinderManufDate: existingCertificate.cylinderManufDate,
        installationDate: existingCertificate.installationDate,
        refillingDate: existingCertificate.refillingDate,
        nextDueDate: existingCertificate.nextDueDate,
        refillingDoneBy: existingCertificate.refillingDoneBy,
        testedBy: existingCertificate.testedBy,
        certifiedBy: existingCertificate.certifiedBy,
        refillingCompany: existingCertificate.refillingCompany,
        remarks: existingCertificate.remarks || '',
      });
      setSavedCertificate(existingCertificate);
    }
  }, [existingCertificate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode && certificateNumber) {
        await updateMutation.mutateAsync({
          certificateNumber,
          ...formData,
          clientAddress: formData.clientAddress || null,
          remarks: formData.remarks || null,
        });
        setSavedCertificate({
          ...existingCertificate!,
          ...formData,
          clientAddress: formData.clientAddress || undefined,
          remarks: formData.remarks || undefined,
        });
      } else {
        const certNumber = await createMutation.mutateAsync({
          ...formData,
          clientAddress: formData.clientAddress || null,
          remarks: formData.remarks || null,
        });
        // Fetch the newly created certificate to get the token
        const newCert: FireExtinguisherCertificateDto = {
          certificateNumber: certNumber,
          uniqueToken: `${certNumber}-temp`,
          ...formData,
          clientAddress: formData.clientAddress || undefined,
          remarks: formData.remarks || undefined,
          createdAt: BigInt(Date.now() * 1000000),
          updatedAt: undefined,
        };
        setSavedCertificate(newCert);
      }
    } catch (error: any) {
      console.error('Error saving certificate:', error);
    }
  };

  if (loadingCertificate) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading certificate...</p>
        </div>
      </div>
    );
  }

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const isSuccess = createMutation.isSuccess || updateMutation.isSuccess;
  const error = createMutation.error || updateMutation.error;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <a onClick={() => navigate({ to: '/admin/certificates' })}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Certificates
            </a>
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditMode ? 'Edit Certificate' : 'Create New Certificate'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? 'Update fire extinguisher service certificate details'
              : 'Enter fire extinguisher service details to generate a certificate'}
          </p>
        </div>
      </div>

      {isSuccess && (
        <Alert>
          <CheckCircle className="h-5 w-5" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Certificate {isEditMode ? 'updated' : 'created'} successfully.
            {savedCertificate && (
              <div className="mt-2 space-y-1">
                <p className="font-medium">
                  Certificate Number: {savedCertificate.certificateNumber?.toString()}
                </p>
                <p className="text-sm">
                  Public Verification URL:{' '}
                  <a
                    href={getVerificationUrl(savedCertificate.uniqueToken)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {getVerificationUrl(savedCertificate.uniqueToken)}
                  </a>
                </p>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to save certificate'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">
                  Client / Customer Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  placeholder="Enter client name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address / Location</Label>
                <Input
                  id="clientAddress"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleChange}
                  placeholder="Enter client address (optional)"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="extinguisherType">
                    Fire Extinguisher Type <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="extinguisherType"
                    name="extinguisherType"
                    value={formData.extinguisherType}
                    onChange={handleChange}
                    required
                    placeholder="e.g., ABC, CO₂, DCP"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">
                    Capacity <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 6 Kg, 4.5 Liter"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cylinderManufDate">
                  Cylinder Manufacturing Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cylinderManufDate"
                  name="cylinderManufDate"
                  type="date"
                  value={formData.cylinderManufDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="installationDate">
                    Installation Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="installationDate"
                    name="installationDate"
                    type="date"
                    value={formData.installationDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refillingDate">
                    Refilling Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="refillingDate"
                    name="refillingDate"
                    type="date"
                    value={formData.refillingDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nextDueDate">
                    Next Due Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nextDueDate"
                    name="nextDueDate"
                    type="date"
                    value={formData.nextDueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="refillingDoneBy">
                  Refilling Done By (Technician Name) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="refillingDoneBy"
                  name="refillingDoneBy"
                  value={formData.refillingDoneBy}
                  onChange={handleChange}
                  required
                  placeholder="Enter technician name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testedBy">
                  Tested By <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="testedBy"
                  name="testedBy"
                  value={formData.testedBy}
                  onChange={handleChange}
                  required
                  placeholder="Enter tester name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifiedBy">
                  Certified By (Authorized Person) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="certifiedBy"
                  name="certifiedBy"
                  value={formData.certifiedBy}
                  onChange={handleChange}
                  required
                  placeholder="Enter authorized person name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="refillingCompany">
                  Refilling Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="refillingCompany"
                  name="refillingCompany"
                  value={formData.refillingCompany}
                  onChange={handleChange}
                  required
                  placeholder="Enter company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Additional notes (optional)"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditMode ? 'Update Certificate' : 'Create Certificate'}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {savedCertificate && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CertificateDetailsView certificate={savedCertificate} showQr={true} compact />
                <div className="flex flex-col gap-2">
                  <DownloadCertificatePdfButton certificate={savedCertificate} />
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={getVerificationUrl(savedCertificate.uniqueToken)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Public Certificate
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminCertificateEditorPage() {
  return (
    <div className="container-custom section-padding">
      <AdminGate>
        <AdminCertificateEditorContent />
      </AdminGate>
    </div>
  );
}
