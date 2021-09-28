import { useContext, Fragment } from "react";
import Link from "next/link";
import { Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon, XIcon } from '@heroicons/react/outline';
import { Context } from "../state";
import { Action } from "../types";

const Header = () => {
  const { state: { store, navOpen }, dispatch } = useContext(Context);

  const toggleNav = () => {
    dispatch({ type: Action.SetNav, payload: { navOpen: !navOpen } });
  }

  return (
    <header className="border-b border-gray-200 px-2 [ lg:px-0 ]">
      <div className="container mx-auto flex items-center justify-between h-20">
        <button onClick={() => toggleNav()}>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Link href="/" passHref>
          <a className="font-serif block text-4xl tracking-wide">
            marc<span className="bg-primary text-white">less</span>
          </a>
        </Link>
        <nav className="flex">
          <ul className="flex space-x-4">
            <li className="hidden md:block">
              <SearchIcon className="h-6 w-6" aria-hidden="true" />
            </li>
            <li className="hidden md:block">
              <UserIcon className="h-6 w-6" aria-hidden="true" />
            </li>
            <li>
              <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
            </li>
          </ul>
        </nav>
      </div>
      <Transition
        show={navOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 w-full h-full bg-gray-100 opacity-75 z-50"></div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="absolute inset-0 w-4/5 bg-white h-full border-r border-gray-300 [ md:w-1/2 ] [ lg:w-1/3 ] z-50">
            <button
              className="absolute top-0 left-0 mt-4 ml-4 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white"
              onClick={() => toggleNav()}
            >
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </Transition.Child>
      </Transition>
    </header>
  );
}

export default Header;
