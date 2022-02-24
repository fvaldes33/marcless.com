/* eslint-disable @next/next/no-img-element */
import { useContext, Fragment } from "react";
import Link from "next/link";
import { Transition, Menu, Popover } from '@headlessui/react'
import { LogoutIcon, MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon, XIcon } from '@heroicons/react/outline';
import CartDrawer from './CartDrawer';
import MenuDrawer from './MenuDrawer';
import { Context } from "../state";
import { Action } from "../types";

const Header = () => {
  const { state: { customer, checkout, navOpen, active }, dispatch } = useContext(Context);

  const toggleNav = () => {
    dispatch({ type: Action.SetNav, payload: { navOpen: !navOpen } });
  }

  if (!active) {
    return null;
  }

  return (
    <header className="bg-white border-b text-gray-800 relative z-10">
      <div className="container mx-auto flex items-center justify-between h-20 px-6 [ xl:px-0 ]">
        <button onClick={() => toggleNav()} aria-label="Menu icon">
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Link href="/" passHref>
          <a className="relative font-sans block text-4xl tracking-wide cursor-pointer">
            <span className="relative z-10">marcless</span>
            <span className="bg-primary bg-opacity-50 absolute h-3 w-full bottom-0 left-0"></span>
          </a>
        </Link>
        <nav className="flex">
          <ul className="flex space-x-4">
            <li className="relative">
              <Link href="/cart" passHref>
                <a>
                  <span className="sr-only">View Cart</span>
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </Link>
              {checkout.lineItems.length > 0 && (
                <span
                  className="absolute transform -translate-x-2 -translate-y-2 top-0 right-0 h-4 w-4 text-xs bg-primary rounded-full flex justify-center items-center">{checkout.lineItems.length}</span>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <MenuDrawer />
      <CartDrawer />
    </header>
  );
}

export default Header;
