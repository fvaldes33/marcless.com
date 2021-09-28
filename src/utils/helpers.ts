
export const helpMe = (): string => {
  return 'done!'
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price: number): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}
