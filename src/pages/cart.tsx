/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import type { LineItem } from 'shopify-buy';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { Context } from '@/src/state';
import { defaultDescription } from '@/src/utils/constants';
import { classNames, formatPrice } from '../utils/helpers';
import Button from '../components/Button';
import { Action } from '../types';

const Cart: NextPage = () => {
  const { state: { shopifyClient, checkout }, dispatch } = useContext(Context);

  const proceedToCheckout = () => {
    window.location.href = checkout?.webUrl;
  }

  const removeLineItem = async (itemID: string) => {
    const newCheckout = await shopifyClient.checkout.removeLineItems(
      checkout.id,
      [itemID]
    );
    dispatch({ type: Action.SetCheckout, payload: { checkout: newCheckout } });
  }

  return (
    <>
      <Head>
        <title>Cart | Marcless</title>
        <meta name="description" content={defaultDescription} />
      </Head>

      <section className={classNames(
        'py-12 [ mg:py-24 ]',
        checkout.lineItems.length === 0 ? 'min-h-screen' : ''
      )}>
        <div className="container max-w-screen-lg mx-auto px-4 [ lg:px-0 ]">
          <h1 className="font-serif text-4xl [ md:text-5xl ] text-center">
            Your Cart {checkout.lineItems.length === 0 && 'is Empty'}
          </h1>

          {checkout.lineItems.length === 0 && (
            <div className="flex justify-center mt-8">
              <Button href="/shop">
                continue shopping
              </Button>
            </div>
          )}

          {checkout.lineItems.length > 0 && (
            <div className="mt-12 [ md:mt-24 md:grid md:grid-cols-3 md:gap-6 ]">
              <ul role="list" className="-my-6 divide-y divide-gray-200 [ md:col-span-2 ]">
                {checkout.lineItems.map((lineItem: LineItem) => {
                  const { title, variant, quantity } = lineItem;
                  return (
                    <li key={lineItem.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={variant.image.src}
                          alt={variant.image.altText}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-bold text-gray-900">
                            <h3>
                              <Link href={`/shop/${variant.product.handle}/${variant.sku}`} passHref>
                                <a>{title}</a>
                              </Link>
                              <span className="block mt-1 font-normal text-sm text-gray-500">{variant.title}</span>
                            </h3>
                            <p className="ml-4">
                              {variant.compareAtPrice && (
                                <span className="text-red-600 line-through block">
                                  {formatPrice(+variant.compareAtPrice)}
                                </span>
                              )}
                              {formatPrice(+variant.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {quantity}</p>

                          <div className="flex">
                            <button onClick={() => removeLineItem(lineItem.id as string)} type="button" className="font-medium text-primary hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <aside className="bg-gray-100 rounded-lg p-6 mt-8 [ md:mt-0 ]">
                <h2 className="text-xl mb-6">Order Summary</h2>
                <ul className="mb-8">
                  <li className="py-2 flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(+checkout.subtotalPrice)}</span>
                  </li>
                  <li className="py-2 flex items-center justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-xs">Calculated at checkout</span>
                  </li>
                  <li className="py-2 flex items-center justify-between text-sm">
                    <span>Tax <span className="text-xs">(estimate)</span></span>
                    <span>{formatPrice(+checkout.totalTax)}</span>
                  </li>
                  <li className="py-4 flex items-center justify-between font-bold border-t border-gray-300">
                    <span>Total</span>
                    <span>{formatPrice(+checkout.totalPrice)}</span>
                  </li>
                </ul>
                <div className="mb-3">
                  <Button block onClick={() => proceedToCheckout()}>
                    proceed to checkout
                  </Button>
                </div>
                <div className="text-center">
                  <span className="block mb-3">&mdash; or &mdash;</span>
                  <Link href="/shop" passHref>
                    <a className="">Continue Shopping</a>
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Cart
