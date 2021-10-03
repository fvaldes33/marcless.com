import Client from 'shopify-buy';

// Otherwise, setup the client and export
const options = {
  // domain: `${process.env.NEXT_PUBLIC_STORE_ID}.myshopify.com`,
  domain: `${process.env.NEXT_PUBLIC_CUSTOM_DOMAIN}`,
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!,
}

export default Client.buildClient(options);
