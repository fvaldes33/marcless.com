import { useContext, useState } from "react";
import Link from "next/link";
import { Context } from "../state";
import { mainNav, secondaryNav, socialLinks } from "../utils/constants";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  const { state: { active } } = useContext(Context);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!active) {
    return null;
  }

  return (
    <footer className="bg-secondary text-white py-6 [ md:py-12 ] mt-12 [ md:mt-24 ]">

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
            <NewsletterForm
              onSubmitForm={() => setSignupSuccess(true)}
            />
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
