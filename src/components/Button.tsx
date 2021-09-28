import Link from 'next/link';
import { forwardRef, Fragment } from 'react';
import { classNames } from '../utils/helpers';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'light';
  children?: React.ReactNode;
  onClick?: () => void;
}

type ButtonRef = HTMLAnchorElement & HTMLButtonElement;
const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    href,
    children,
    variant = 'primary',
    ...rest
  } = props;

  const baseClasses = 'text-base flex items-center justify-between px-12 py-4 rounded-lg transition duration-300 hover:opacity-90';
  const getVariantClass = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white';
      case 'secondary':
        return 'bg-secondary text-white';
      case 'light':
        return 'bg-white text-primary';
      default:
        break;
    }
    return '';
  }

  if (href) {
    return (
      <Link href={href} passHref>
        <a ref={ref} {...rest} className={classNames(
          getVariantClass(),
          baseClasses
        )}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <Fragment>
      <button ref={ref} {...rest} className={classNames(
        getVariantClass(),
        baseClasses
      )}>
        {children}
      </button>
    </Fragment>
  );
});

Button.displayName = 'Button';
export default Button;
