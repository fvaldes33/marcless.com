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
    <header className="border-b border-gray-200 px-2 [ lg:px-0 ]">
      <div className="container mx-auto flex items-center justify-between h-20">
        <button onClick={() => toggleNav()} aria-label="Menu icon">
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Link href="/" passHref>
          <a className="font-serif block text-4xl tracking-wide">
            marc<span className="bg-primary text-white">less</span>
          </a>
        </Link>
        <nav className="flex">
          <ul className="flex space-x-4">
            {/* <li className="hidden md:block">
              <SearchIcon className="h-6 w-6" aria-hidden="true" />
            </li> */}
            {/* <li className="hidden md:block">
              {(customer && customer.email) ? (
                <Menu as="div" className="relative">
                  <Menu.Button>
                    <img src={customer.avatar} className="h-6 w-6 rounded-full overflow-hidden" alt="avatar" />
                  </Menu.Button>
                  <Menu.Items className="bg-white shadow-xl rounded-xl overflow-hidden absolute mt-2 right-0 origin-top-right z-10 flex flex-col">
                    <Menu.Item>
                      <a className="px-4 py-2 hover:bg-gray-200 flex items-center" href="/analytics">
                        <UserIcon className="h-4 w-4 mr-3" aria-hidden="true" />
                        <span>Account</span>
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a className="px-4 py-2 hover:bg-gray-200 flex items-center" href="/analytics">
                        <LogoutIcon className="h-4 w-4 mr-3" aria-hidden="true" />
                        <span>Logout</span>
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <UserIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </li> */}
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
