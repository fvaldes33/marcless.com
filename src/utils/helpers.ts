import { GetProducts_products_edges_node, GetProducts_products_edges_node_variants_edges_node } from "../queries/__generated__/GetProducts";
import { ContainerType, ContainerTypeEnum } from "../types";

export const helpMe = (): string => {
  return 'done!'
}

export const pageview = (url: string) => {
  if (!('gtag' in window)) {
    return;
  }

  (window as any).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })

  // if facebook pixel is enabled
  if ('fbq' in (window as any)) {
    (window as any).fbq('track', 'PageView');
  }
}

// log specific events happening.
export const event = ({ action, params }: { action: string; params: any }) => {
  if (!('gtag' in window)) {
    return;
  }
  (window as any).gtag('event', action, params)
}

export const transformToGoogleItem = (
  product: GetProducts_products_edges_node,
  variant: GetProducts_products_edges_node_variants_edges_node
) => {
  return {
    id: product.id,
    name: product.title,
    brand: 'Marcless',
    category: product.productType || "Razors & Razor Blades",
    variant: variant.title,
    price: variant.priceV2.amount
  }
}

export const viewItems = ({ items }: any) => {
  event({
    action: 'view_item_list',
    params: {
      items
    }
  });
}

export const viewItem = ({ items }: any) => {
  event({
    action: 'view_item',
    params: {
      items
    }
  });
}

export const addToCart = ({ items }: any) => {
  event({
    action: 'add_to_cart',
    params: {
      currency: "USD",
      value: items[0].price,
      items: [
        ...items
      ]
    }
  });

  // if facebook pixel is enabled
  if ('fbq' in (window as any)) {
    (window as any).fbq('track', 'AddToCart', {
      value: items[0].price,
      currency: 'USD'
    });
  }
}

export const removeFromCart = (items: any) => {
  event({
    action: 'remove_from_cart',
    params: {
      items
    }
  });
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
export function fromLocalStorage<T extends unknown>(key: string, defaultValue: T): T {
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
