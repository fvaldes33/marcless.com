
export const helpMe = (): string => {
  return 'done!'
}

export function toLocalStorage(key: string, value: any): void {
  try {
    window.localStorage.setItem(`__marcless__${key}`, JSON.stringify(value));
  } catch (error) {
    // silence
  }
}
export function fromLocalStorage<T extends {}>(key: string, defaultValue: T): T {
  try {
    const storedValue = window.localStorage.getItem(`__marcless__${key}`);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    // silence
    return defaultValue;
  }
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price: number): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}
