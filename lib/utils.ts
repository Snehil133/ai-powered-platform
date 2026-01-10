
export function formatDate(date: Date | string | number): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid Date";

    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
}
