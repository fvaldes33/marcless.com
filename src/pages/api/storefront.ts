// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const { customer } = req.body;
  if (!customer) {
    return res.status(400).json({
      error: 'Parameter "Customer" is required'
    });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/customers.json`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_ADMIN_TOKEN!
      },
      body: JSON.stringify({ customer }),
    })
    const data = await response.json();

    if (data.errors) {
      return res.status(500).json({
        errors: data.errors
      })
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      errors: {
        internal: ['Internal error']
      }
    });
  }
}
