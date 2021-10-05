// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'isomorphic-fetch';

const hardCodedUris = [
  'shop',
  'about',
  'shipping-policy',
  'refund-policy',
  'privacy-policy',
  'terms-of-service'
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const routes = hardCodedUris.map((uri: string) => (`
    <url>
      <loc>${process.env.NEXT_PUBLIC_BASE_URL}/${uri}</loc>
      <lastmod>2021-09-10T10:09:36-04:00</lastmod>
    </url>
  `));

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/products.json?fields=id,title,handle,variants,created_at`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_ADMIN_TOKEN!
      }
    });
    const { products } = await response.json();
    for (let product of products) {
      for (let variant of product.variants) {
        routes.push(`
          <url>
            <loc>${process.env.NEXT_PUBLIC_BASE_URL}/shop/${product.handle}/${variant.sku}</loc>
            <lastmod>${product.created_at}</lastmod>
          </url>
        `);
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.join('')}</urlset>`;
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
  } catch (error) {
    return res.status(500).json({
      errors: {
        internal: ['Internal error']
      }
    });
  }
}
