import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { generateCertificatePdf } from '../../utils/pdf/certificatePdf';
import type { FireExtinguisherCertificateDto } from '../../backend';

interface DownloadCertificatePdfButtonProps {
  certificate: FireExtinguisherCertificateDto;
}

export function DownloadCertificatePdfButton({ certificate }: DownloadCertificatePdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateCertificatePdf(certificate);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isGenerating} size="sm" className="w-full">
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF Certificate
        </>
      )}
    </Button>
  );
}
