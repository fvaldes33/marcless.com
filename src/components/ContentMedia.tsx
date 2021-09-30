import Image from 'next/image';
import { classNames } from '../utils/helpers';

interface ContentMediaProps {
  eyebrow?: string;
  heading: string;
  body: string;
  image: StaticImageData | string;
  imagePosition?: 'left' | 'right';
  cta?: JSX.Element;
}
const ContentMedia: React.FC<ContentMediaProps> = ({ eyebrow, heading, body, cta, image, imagePosition = 'right' }) => {

  return (
    <section className="pt-12 px-4 [ md:pt-24 ] [ lg:px-0 ] relative bg-white">
      <div className={classNames(
        'container mx-auto space-y-10 [ md:space-y-0 md:flex ]',
        imagePosition === 'left' ? 'md:flex-row-reverse' : '',
      )}>

        <div className={classNames(
          'flex flex-col items-start w-full self-center py-8 [ md:w-1/3 md:py-24 ]',
          imagePosition === 'left' ? 'md:ml-12' : 'md:mr-12',
        )}>
          {eyebrow && <h2 className="font-sans font-normal mb-6 text-primary tracking-wider">{eyebrow}</h2>}
          <p className="text-3xl font-serif mb-4 text-gray-800">
            {heading}
          </p>
          <p className="mb-16 max-w-2xl text-lg text-gray-600" dangerouslySetInnerHTML={{ __html: body }}></p>
          {cta && cta}
        </div>

        <div className="flex flex-col w-full rounded-2xl overflow-hidden relative shadow-xl z-0 h-80 [ md:h-auto md:w-2/3 ]">
          <Image src={image} layout="fill" objectFit="cover" objectPosition="bottom" alt="Marc One" />
          {/* <div className="absolute inset-0 w-full h-full bg-secondary opacity-25 z-50"></div> */}
        </div>
      </div>
    </section>
  );
}

export default ContentMedia;
