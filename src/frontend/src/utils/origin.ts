export function getOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}

export function getVerificationUrl(token: string): string {
  return `${getOrigin()}/certificate/${token}`;
}
