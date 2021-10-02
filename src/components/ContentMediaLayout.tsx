import Image from 'next/image';
import { classNames, resolveClass } from '../utils/helpers';

interface ContentMediaProps {
  content: JSX.Element;
  media: JSX.Element;
  layout?: 'row' | 'reverse';
  spacing?: string;
  container?: 'normal' | 'thin' | 'wide' | 'full';
}
const ContentMedia: React.FC<ContentMediaProps> = ({
  content,
  media,
  layout = 'row',
  spacing = 'py-12 [ md:py-24 ]',
  container = 'normal'
}) => {

  return (
    <section className={classNames(
      spacing,
    )}>
      <div className={classNames(
        'container mx-auto space-y-6 [ md:space-y-0 md:flex ]',
        layout === 'row' ? '[ md:flex-row ]' : '[ md:flex-row-reverse ]',
        resolveClass('container', container)
      )}>

        {/* Content */}
        <div className={classNames(
          'flex flex-col items-start w-full self-center py-8 [ md:w-1/3 md:py-24 ]',
          layout === 'row' ? 'md:mr-12' : 'md:ml-12',
        )}>
          {content}
        </div>

        {/* Media */}
        <div className={classNames(
          'flex flex-col w-full rounded-2xl overflow-hidden relative shadow-xl z-0 h-80 [ md:h-auto md:w-2/3 ]'
        )}>
          {media}
        </div>
      </div>
    </section>
  );
}

export default ContentMedia;
