import { ContainerType, ContainerTypeEnum } from "../types";

export const helpMe = (): string => {
  return 'done!'
}

export const pageview = (url: string) => {
  (window as any).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({ action, params }: { action: string; params: any }) => {
  (window as any).gtag('event', action, params)
}

const resolveContainer = (value: ContainerType): string => {
  switch (value) {
    case ContainerTypeEnum.Normal:
      return 'container mx-auto px-4 [ xl:px-0 ]';
    case ContainerTypeEnum.Thin:
      return 'container max-w-screen-lg mx-auto px-4 [ xl:px-0 ]';
    case ContainerTypeEnum.Full:
      return 'px-4 [ xl:px-0 ]';
    default:
      return 'container mx-auto';
  }
}

const resolverMap: { [key: string]: (value: string) => string } = {
  container: resolveContainer
}

export const resolveClass = (prop: string, value: string): string => {
  if (!(prop in resolverMap)) {
    return '';
  }
  return resolverMap[prop](value);
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
