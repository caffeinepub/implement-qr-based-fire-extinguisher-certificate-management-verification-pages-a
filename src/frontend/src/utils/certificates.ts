export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function isExpired(nextDueDateString: string): boolean {
  try {
    const nextDueDate = new Date(nextDueDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return nextDueDate < today;
  } catch {
    return false;
  }
}

export function parseDate(dateString: string): Date | null {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}
