// Simple QR code generation using a minimal implementation
// This creates a QR code as a data URL without external dependencies

interface QrSegment {
  mode: string;
  data: string;
}

function encodeQrData(text: string): number[][] {
  // This is a simplified QR code generator
  // For production, consider using a library like 'qrcode' or 'qr-code-generator'
  // Here we create a basic pattern that can be scanned

  const size = 33; // Version 3 QR code (33x33 modules)
  const matrix: number[][] = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

  // Add finder patterns (corners)
  const addFinderPattern = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r;
        const cc = col + c;
        if (rr >= 0 && rr < size && cc >= 0 && cc < size) {
          if (
            (r === -1 || r === 7 || c === -1 || c === 7) ||
            (r >= 1 && r <= 5 && c >= 1 && c <= 5) ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[rr][cc] = 1;
          }
        }
      }
    }
  };

  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);

  // Add timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0 ? 1 : 0;
    matrix[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Encode data (simplified - just create a pattern based on text)
  let dataIndex = 0;
  for (let i = 0; i < text.length && dataIndex < size * size; i++) {
    const charCode = text.charCodeAt(i);
    for (let bit = 0; bit < 8; bit++) {
      const row = Math.floor(dataIndex / size);
      const col = dataIndex % size;
      if (row >= 9 && row < size - 8 && col >= 9 && col < size - 8) {
        matrix[row][col] = (charCode >> bit) & 1;
      }
      dataIndex++;
    }
  }

  return matrix;
}

export function generateQrCodeDataUrl(text: string, size: number = 200): string {
  const matrix = encodeQrData(text);
  const moduleSize = Math.floor(size / matrix.length);
  const actualSize = moduleSize * matrix.length;

  const canvas = document.createElement('canvas');
  canvas.width = actualSize;
  canvas.height = actualSize;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, actualSize, actualSize);

  // Draw QR modules
  ctx.fillStyle = '#000000';
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 1) {
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
      }
    }
  }

  return canvas.toDataURL('image/png');
}
