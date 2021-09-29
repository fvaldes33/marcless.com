import { useContext, SyntheticEvent, useState } from "react";
import Link from "next/link";
import { Context } from "../state";
import { mainNav, secondaryNav, socialLinks } from "../utils/constants";
import { MailIcon, PaperAirplaneIcon, RefreshIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import { Action } from "../types";
import md5 from 'blueimp-md5';

const Footer = () => {
  const { state: { customer }, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const onSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      customer: {
        email,
        accepts_marketing: true,
        marketing_opt_in_level: 'confirmed_opt_in',
        tags: "newsletter",
      }
    };

    try {
      const res = await fetch(`/api/storefront`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_ADMIN_TOKEN!
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json();
      if (!data.errors) {
        // save customer
        dispatch({
          type: Action.SetCustomer,
          payload: {
            customer: {
              id: data.customer.id,
              email: data.customer.email,
              avatar: `https://www.gravatar.com/avatar/${md5(data.customer.email)}`
            }
          }
        });
      }
    } catch (error) {
      console.log('[error]', { error })
    } finally {
      setLoading(false);
      setSignupSuccess(true)
    }
  }

  return (
    <footer className="bg-secondary text-white py-6 [ md:py-12 ]">

      <div className="container mx-auto px-4 [ md:grid md:grid-cols-3 ] [ lg:px-0 ] py-12 border-b border-gray-200">
        <div className="text-center mb-4 [ md:mb-0 md:text-left md:col-span-2 ]">
          <Link href="/" passHref>
            <a className="font-serif block text-4xl tracking-wide">
              marc<span className="bg-primary text-white">less</span>
            </a>
          </Link>
        </div>
        <div className="text-center [ md:text-left ]">
          <p className="mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          {signupSuccess ? (
            <p>Thank you for signing up!</p>
          ) : (
            <form className="" onSubmit={onSubmitForm}>
              <div className="group relative flex items-center justify-start">
                <label className="invisible absolute">Email</label>
                <input
                  id="newsletter-email"
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-tl-full rounded-bl-full text-gray-800 [ md:w-2/3 ]"
                  type="email"
                  autoCorrect="off"
                  autoComplete="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="px-4 h-12 rounded-tr-full rounded-br-full bg-primary overflow-hidden"
                  type="submit"
                  onTouchStart={() => setHover(true)}
                  onMouseEnter={() => setHover(true)}
                  onTouchEnd={() => setHover(false)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Transition
                    as={'div'}
                    appear={true}
                    show={!hover && !loading}
                    enter="transition duration-75"
                    enterFrom="-translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition duration-75"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-full"
                  >
                    <MailIcon className="h-6 w-6 transform" aria-hidden="true" />
                  </Transition>
                  <Transition
                    as={'div'}
                    show={hover && !loading}
                    enter="transition-transform duration-75"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition-transform duration-75"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <PaperAirplaneIcon className="h-6 w-6 transform rotate-45" aria-hidden="true" />
                  </Transition>
                  <Transition
                    as={'div'}
                    show={loading}
                    enter="transition-transform duration-75"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition-transform duration-75"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <RefreshIcon className="h-6 w-6 animate-spin" aria-hidden="true" />
                  </Transition>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      <div className="container mx-auto [ md:grid md:grid-cols-2 ] py-12">
        <div className="text-center mb-8 [ md:mb-0 md:text-left ]">
          <ul className="flex flex-wrap justify-center [ md:justify-start ]">
            {mainNav.map(({ label, href }, index: number) => (
              <li key={index} className="px-3 mb-3 [ md:mb-0 ]">
                <Link href={href} passHref>
                  <a>{label}</a>
                </Link>
              </li>
            ))}
            {secondaryNav.map(({ label, href }, index: number) => (
              <li key={index} className="px-3 mb-3 [ md:mb-0 ]">
                <Link href={href} passHref>
                  <a>{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center [ md:flex-row md:justify-end ]">
          <p className="font-serif text-lg mb-6 [ md:mb-0 md:mr-6 ]">Stay Connected</p>
          <ul className="flex space-x-6">
            {socialLinks.map(({ label, href, svgPath }, index: number) => (
              <li key={index}>
                <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: svgPath }}></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
