export function generateOrderId(): string {
  return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}
