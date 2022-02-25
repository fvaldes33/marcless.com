import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../state";
import NewsletterForm from "./NewsletterForm";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { state: { customer }} = useContext(Context);

  useEffect(() => {
    if (!customer) {
      setTimeout(() => {
        setIsOpen(true);
      }, 3000);
    }
  }, [customer])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-gray-900"
              >
                <a className="relative inline-block font-sans text-4xl tracking-wide cursor-pointer">
                  <span className="relative z-10">marcless</span>
                  <span className="bg-primary bg-opacity-50 absolute h-3 w-full bottom-0 left-0"></span>
                </a>
              </Dialog.Title>

              <div className="my-8">
                <p className="text-2xl text-gray-800 mb-4">
                  Enjoy <strong>10% OFF</strong> your first purchase when you subscribe.
                </p>

                {!submitted ? (
                  <NewsletterForm centered onSubmitForm={(email, error) => {
                    console.log({ email, error })
                    setSubmitted(true);
                  }}/>
                ) : (
                  <p>Thanks for subscribing! Check your email for your 10% off promo code.</p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  {submitted ? 'Close' : 'No Thanks'}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default NewsletterPopup;
