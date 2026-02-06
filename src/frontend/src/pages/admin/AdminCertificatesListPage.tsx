import { Link } from '@tanstack/react-router';
import { useGetAllCertificates } from '../../hooks/useCertificates';
import { AdminGate } from '../../components/admin/AdminGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, ExternalLink, Edit } from 'lucide-react';
import { formatDate, isExpired } from '../../utils/certificates';
import { getVerificationUrl } from '../../utils/origin';

function AdminCertificatesListContent() {
  const { data: certificates, isLoading } = useGetAllCertificates();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading certificates...</p>
        </div>
      </div>
    );
  }

  const sortedCertificates = [...(certificates || [])].sort((a, b) => {
    const aNum = a.certificateNumber ? Number(a.certificateNumber) : 0;
    const bNum = b.certificateNumber ? Number(b.certificateNumber) : 0;
    return bNum - aNum;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fire Extinguisher Certificates</h1>
          <p className="text-muted-foreground">
            Manage and view all fire extinguisher service certificates
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/certificates/new">
            <Plus className="mr-2 h-4 w-4" />
            New Certificate
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Certificates ({sortedCertificates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedCertificates.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No certificates found. Create your first certificate.</p>
              <Button asChild className="mt-4">
                <Link to="/admin/certificates/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Certificate
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate #</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Next Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCertificates.map((cert) => {
                    const expired = isExpired(cert.nextDueDate);
                    const verificationUrl = getVerificationUrl(cert.uniqueToken);
                    const certNumber = cert.certificateNumber?.toString() || 'N/A';
                    return (
                      <TableRow key={cert.uniqueToken}>
                        <TableCell className="font-medium">
                          {certNumber}
                        </TableCell>
                        <TableCell>{cert.clientName}</TableCell>
                        <TableCell>{cert.extinguisherType}</TableCell>
                        <TableCell>{formatDate(cert.nextDueDate)}</TableCell>
                        <TableCell>
                          {expired ? (
                            <Badge variant="destructive">Expired</Badge>
                          ) : (
                            <Badge variant="default">Valid</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button asChild variant="ghost" size="sm">
                              <a
                                href={verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View Public Certificate"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                            {cert.certificateNumber && (
                              <Button asChild variant="ghost" size="sm">
                                <Link
                                  to="/admin/certificates/$certificateNumber/edit"
                                  params={{ certificateNumber: cert.certificateNumber.toString() }}
                                  title="Edit Certificate"
                                >
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminCertificatesListPage() {
  return (
    <div className="container-custom section-padding">
      <AdminGate>
        <AdminCertificatesListContent />
      </AdminGate>
    </div>
  );
}
