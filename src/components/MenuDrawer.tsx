/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Context } from '../state';
import { Action } from '../types';
import { mainNav, secondaryNav } from '../utils/constants';

const MenuDrawer: React.FC = () => {
  const { state: { navOpen }, dispatch } = useContext(Context);

  const toggleNav = () => {
    dispatch({ type: Action.SetNav, payload: { navOpen: !navOpen } });
  }

  return (
    <Transition.Root show={navOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={toggleNav}>
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

          <div className="fixed inset-y-0 left-0 pr-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  {/* header */}
                  <div className="flex items-center justify-between h-20 border-b border-gray-200 px-4 sm:px-6">
                    <div className="h-7 flex items-center">
                      <button
                        type="button"
                        className="m-2 p-2 bg-primary rounded-full transition duration-300 text-white hover:bg-opacity-50"
                        onClick={() => toggleNav()}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <Dialog.Title>
                      <Link href="/" passHref>
                        <a className="font-serif block text-4xl tracking-wide">
                          marc<span className="bg-primary text-white">less</span>
                        </a>
                      </Link>
                    </Dialog.Title>
                  </div>

                  <div className="flex-1">
                    <div className="py-8 px-4 sm:px-6 h-full">
                      <div className="flex flex-col items-start h-full">
                        <ul role="list" className="-my-6 divide-y divide-gray-200 mb-12 w-full">
                          {mainNav.map(({ label, href }, index: number) => (
                            <li key={index} className="transition duration-300 ease-in-out hover:translate-x-2">
                              <Link href={href} passHref>
                                <a onClick={() => toggleNav()} className="py-6 block text-2xl text-gray-800">{label}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <ul role="list" className="mt-auto w-full">
                          {secondaryNav.map(({ label, href }, index: number) => (
                            <li key={index} className="transition duration-300 ease-in-out hover:translate-x-2">
                              <Link href={href} passHref>
                                <a onClick={() => toggleNav()} className="text-gray-800 py-3 block">{label}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MenuDrawer;
