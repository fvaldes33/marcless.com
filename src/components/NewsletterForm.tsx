import { SyntheticEvent, useContext, useState } from 'react';
import { MailIcon, PaperAirplaneIcon, RefreshIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import md5 from 'blueimp-md5';
import { Context } from '../state';
import { Action } from '../types';
import { classNames } from '../utils/helpers';

type NewsletterFormProps = {
  centered?: boolean;
  onSubmitForm: (email: string) => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ centered = false, onSubmitForm }) => {
  const { state, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const internalOnSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
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
      onSubmitForm(email)
    }
  }

  return (
    <form id="NewsletterForm" className="newsletterform w-full" onSubmit={internalOnSubmitForm}>
      <div className={classNames(
        'group relative flex items-center',
        centered ? 'justify-center' : 'justify-start'
      )}>
        <label className="invisible absolute">Email</label>
        <input
          id="newsletter-email"
          placeholder="Enter your email address"
          className="h-12 w-full rounded-tl-full rounded-bl-full border-r-0 text-gray-800 [ md:w-2/3 ]"
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
            <MailIcon className="h-6 w-6 transform text-white" aria-hidden="true" />
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
            <PaperAirplaneIcon className="h-6 w-6 transform rotate-45 text-white" aria-hidden="true" />
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
            <RefreshIcon className="h-6 w-6 animate-spin text-white" aria-hidden="true" />
          </Transition>
        </button>
      </div>
    </form>
  );
}

export default NewsletterForm;
