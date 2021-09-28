import Link from 'next/link';
import { Fragment } from 'react';
import { classNames } from '../utils/helpers';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'light';
}

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  variant = 'primary'
}) => {

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
        <a className={classNames(
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
      <button className={classNames(
        getVariantClass(),
        baseClasses
      )}>
        {children}
      </button>
    </Fragment>
  );
}

export default Button;
