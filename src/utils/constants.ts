import { ShieldCheckIcon, CashIcon, CheckIcon } from '@heroicons/react/outline';
import { MainMenuItem, SocialLinkItems } from "../types";

export const mainNav: MainMenuItem[] = [
  { label: 'Shop', href: '/shop', children: [
    { label: 'Wireless Chargers', href: '/shop/wireless-chargers' },
    { label: 'MagSafe iPhone Cases', href: '/shop/phone-cases' },
  ] },
  { label: 'About', href: '/about' },
  { label: 'Cart', href: '/cart' },
];

export const secondaryNav: MainMenuItem[] = [
  { label: 'Shipping', href: '/shipping-policy' },
  { label: 'Refunds', href: '/refund-policy' },
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-of-service' },
];

export const testimonials = [
  {
    name: 'James G',
    rating: 5,
    description: 'This Safety Razor is a must have! Great Razor for men or women! 5 Stars !! I will definitely buy again.',
  },
  {
    name: 'Paul V',
    rating: 5,
    description: 'Good quality and it seems durable. This is a great eco friendly alternative to disposable razors.',
  },
  {
    name: 'Alessandra E',
    rating: 4,
    description: 'It takes a little getting used to, just being honest. But I can’t believe it took me this long to try a safety razor. It makes my legs and armpits extremely smooth.',
  },
];

export const brandFeatures = [
  {
    color: 'bg-rose-100',
    name: 'Real Innovation',
    description:
      'Tech is commoditized. Marcless tech is different. We are constantly looking for new products that solve real problems.',
    icon: CashIcon,
  },
  {
    color: 'bg-fuchsia-100',
    name: 'Premium Quality Build',
    description:
      'All products are subject to a comprehensive quality inspection to make sure no faulty items are ever sent.',
    icon: CheckIcon,
  },
  {
    color: 'bg-emerald-100',
    name: 'Fast and Free Shipping',
    description:
      'We offer free insured shipping worldwide. We ship from our warehouses in the USA and HK to fulfill all orders quickly no matter where you are.',
    icon: ShieldCheckIcon,
  },
];

export const socialLinks: SocialLinkItems[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/shopmarcless',
    svgPath: `<path fill="currentColor" d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />`
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/shopmarcless',
    svgPath: `<path fill="currentColor" d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z" />`
  },
  // {
  //   label: 'Twitter',
  //   href: '#',
  //   svgPath: `<path fill="currentColor" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />`
  // },
];

export const defaultTitle: string = 'Better tech, less dollars | Marcless';
export const defaultDescription = 'We sell directly to customers, cutting unnecessary costs and crazy markups that make products overly expensive. We pass on the savings to you, so you get the same quality at a fraction of the cost.';

export const fadeInUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export const staggered = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
