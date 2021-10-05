/* eslint-disable @next/next/no-img-element */
import { Fragment, useContext } from 'react';
import Link from 'next/link';
import type { LineItem } from 'shopify-buy';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Context } from '../state';
import { Action } from '../types';
import { formatPrice, removeFromCart, transformToGoogleItem } from '../utils/helpers';
import Button from './Button';
import { GetProducts_products_edges_node, GetProducts_products_edges_node_variants_edges_node } from '../queries/__generated__/GetProducts';

const CartDrawer: React.FC = () => {
  const { state: { shopifyClient, checkout, cartOpen }, dispatch} = useContext(Context);

  const toggleCart = () => {
    dispatch({ type: Action.SetCartOpen, payload: { cartOpen: !cartOpen } });
  }

  const removeLineItem = async (lineItem: LineItem) => {
    const itemID = lineItem.id as string;
    const newCheckout = await shopifyClient.checkout.removeLineItems(
      checkout.id,
      [itemID]
    );
    dispatch({ type: Action.SetCheckout, payload: { checkout: newCheckout } });
    removeFromCart({
      items: [{
        ...transformToGoogleItem(
          lineItem.variant.product as unknown as GetProducts_products_edges_node,
          lineItem.variant as unknown as GetProducts_products_edges_node_variants_edges_node
        ),
        quantity: newCheckout.lineItems.find(item => item.id === itemID)?.quantity ?? 0
      }]
    });
  }

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={toggleCart}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg text-gray-900">Shopping cart</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => toggleCart()}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {checkout.lineItems.length > 0 ? (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
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
                                        <button onClick={() => removeLineItem(lineItem)} type="button" className="font-medium text-primary hover:underline">
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <div className="flex flex-col py-24 items-center justify-center">
                            <h2 className="text-2xl font-serif mb-8">Your cart is empty</h2>
                            <Button onClick={() => toggleCart()}>
                              continue shopping
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {checkout.lineItems.length > 0 && (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{formatPrice(+checkout.subtotalPrice)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Button block href={checkout.webUrl}>
                          <span className="w-full text-center">
                            Checkout
                          </span>
                        </Button>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="text-indigo-600 font-medium hover:text-indigo-500"
                            onClick={() => toggleCart()}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartDrawer;
