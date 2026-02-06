import { formatDate, isExpired } from '../certificates';
import { getVerificationUrl } from '../origin';
import { generateQrCodeDataUrl } from '../qr';
import type { FireExtinguisherCertificateDto } from '../../backend';

const A4_WIDTH = 595;
const A4_HEIGHT = 842;
const MARGIN = 40;
const CONTENT_WIDTH = A4_WIDTH - 2 * MARGIN;

export async function generateCertificatePdf(
  certificate: FireExtinguisherCertificateDto
): Promise<void> {
  const canvas = document.createElement('canvas');
  canvas.width = A4_WIDTH;
  canvas.height = A4_HEIGHT;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not create canvas context');
  }

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);

  let yPos = MARGIN;

  // Load and draw logo
  const logo = new Image();
  logo.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    logo.onload = () => resolve();
    logo.onerror = () => reject(new Error('Failed to load logo'));
    logo.src = '/assets/generated/shree-fire-works-logo.dim_512x512.png';
  });

  const logoSize = 60;
  ctx.drawImage(logo, A4_WIDTH / 2 - logoSize / 2, yPos, logoSize, logoSize);
  yPos += logoSize + 15;

  // Company name
  ctx.fillStyle = '#DC2626';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SHREE FIRE WORKS', A4_WIDTH / 2, yPos);
  yPos += 25;

  // Tagline
  ctx.fillStyle = '#666666';
  ctx.font = '12px Arial';
  ctx.fillText('Kal Ki Shuruwat Aaj Se – Be Safe With SFW', A4_WIDTH / 2, yPos);
  yPos += 30;

  // Certificate title
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('🔥 Fire Extinguisher Service Certificate 🔥', A4_WIDTH / 2, yPos);
  yPos += 35;

  // Border
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 2;
  ctx.strokeRect(MARGIN, yPos, CONTENT_WIDTH, 2);
  yPos += 20;

  // Validity status
  const expired = isExpired(certificate.nextDueDate);
  ctx.textAlign = 'left';
  ctx.font = 'bold 14px Arial';
  ctx.fillStyle = expired ? '#DC2626' : '#16A34A';
  ctx.fillText(
    expired ? '⚠️ REFILLING DUE - PLEASE CONTACT SERVICE PROVIDER' : '✓ VALID CERTIFICATE',
    MARGIN,
    yPos
  );
  yPos += 30;

  // Helper function to draw section
  const drawSection = (title: string, fields: Array<[string, string]>) => {
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(title, MARGIN, yPos);
    yPos += 20;

    ctx.font = '11px Arial';
    fields.forEach(([label, value]) => {
      ctx.fillStyle = '#666666';
      ctx.fillText(label + ':', MARGIN + 10, yPos);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(value, MARGIN + 180, yPos);
      ctx.font = '11px Arial';
      yPos += 18;
    });

    yPos += 10;
  };

  // Client Information
  const clientFields: Array<[string, string]> = [
    ['Client Name', certificate.clientName],
  ];
  if (certificate.clientAddress) {
    clientFields.push(['Site / Location', certificate.clientAddress]);
  }
  drawSection('Client Information', clientFields);

  // Service Information
  drawSection('Service Information', [
    ['Installation Date', formatDate(certificate.installationDate)],
    ['Refilling Date', formatDate(certificate.refillingDate)],
    ['Next Due Date', formatDate(certificate.nextDueDate)],
    ['Validity Status', expired ? 'EXPIRED' : 'VALID'],
  ]);

  // Technical Details
  drawSection('Technical Details', [
    ['Fire Extinguisher Type', certificate.extinguisherType],
    ['Capacity', certificate.capacity],
    ['Cylinder Manufacturing Date', formatDate(certificate.cylinderManufDate)],
  ]);

  // Authorization Details
  const authFields: Array<[string, string]> = [
    ['Refilling Done By', certificate.refillingDoneBy],
    ['Tested By', certificate.testedBy],
    ['Certified By', certificate.certifiedBy],
    ['Refilling Company', certificate.refillingCompany],
  ];
  if (certificate.remarks) {
    authFields.push(['Remarks', certificate.remarks]);
  }
  drawSection('Authorization Details', authFields);

  // Footer section
  yPos += 10;
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 2;
  ctx.strokeRect(MARGIN, yPos, CONTENT_WIDTH, 2);
  yPos += 25;

  ctx.fillStyle = '#DC2626';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Authorized Service as per MP Government Norms', A4_WIDTH / 2, yPos);
  yPos += 30;

  // Certificate number and QR code
  ctx.textAlign = 'left';
  ctx.fillStyle = '#000000';
  ctx.font = '11px Arial';
  ctx.fillText('Certificate Number:', MARGIN, yPos);
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = '#DC2626';
  ctx.fillText(certificate.certificateNumber?.toString() || 'N/A', MARGIN, yPos + 20);

  // QR Code
  const qrSize = 100;
  const verificationUrl = getVerificationUrl(certificate.uniqueToken);
  const qrDataUrl = generateQrCodeDataUrl(verificationUrl, qrSize);
  const qrImage = new Image();
  await new Promise<void>((resolve) => {
    qrImage.onload = () => resolve();
    qrImage.src = qrDataUrl;
  });
  ctx.drawImage(qrImage, A4_WIDTH - MARGIN - qrSize, yPos - 10, qrSize, qrSize);

  // Convert canvas to PDF blob and download
  canvas.toBlob((blob) => {
    if (!blob) {
      throw new Error('Failed to generate PDF blob');
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificate-${certificate.certificateNumber || 'Unknown'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
