import { classNames } from '../utils/helpers';

interface TypographyProps {
  color?: string;
  className?: string;
  fontFamily?: string;
}

const Eyebrow: React.FC<TypographyProps> = ({
  color = 'text-primary',
  className = 'mb-6',
  children
}) => {
  return (
    <p className={classNames(
      'font-sans uppercase tracking-widest font-bold',
      color,
      className
    )}>{children}</p>
  );
}

const Paragraph: React.FC<TypographyProps> = ({
  color = 'text-gray-500',
  className = 'mb-6',
  children
}) => {
  return (
    <p className={classNames(
      'font-sans leading-loose',
      color,
      className
    )}>{children}</p>
  );
}

const LargeLead: React.FC<TypographyProps> = ({
  color = 'text-gray-800',
  className = 'mb-6',
  children
}) => {
  return (
    <p className={classNames(
      'font-sans text-lg [ md:text-xl ]',
      color,
      className
    )}>{children}</p>
  );
}

const Display: React.FC<TypographyProps> = ({
  color = 'text-gray-800',
  className = 'mb-12',
  fontFamily = 'font-sans font-bold',
  children
}) => {
  return (
    <h1 className={classNames(
      'text-4xl [ md:text-7xl md:leading-tight ]',
      fontFamily,
      color,
      className
    )}>
      {children}
    </h1>
  );
}

const H1: React.FC<TypographyProps> = ({
  color = 'text-gray-800',
  className = 'mb-12',
  fontFamily = 'font-sans font-bold',
  children
}) => {
  return (
    <h1 className={classNames(
      'text-3xl [ md:text-4xl ]',
      fontFamily,
      color,
      className
    )}>
      {children}
    </h1>
  );
}

const H2: React.FC<TypographyProps> = ({
  color = 'text-gray-800',
  className = 'mb-10',
  fontFamily = 'font-sans font-bold',
  children
}) => {
  return (
    <h2 className={classNames(
      'text-2xl [ md:text-3xl ]',
      fontFamily,
      color,
      className
    )}>
      {children}
    </h2>
  );
}

export { Eyebrow, Display, H1, H2, Paragraph, LargeLead };
