import Image from 'next/image';

interface ContentMediaProps {
  heading: string;
  body: string;
  image: StaticImageData | string;
  cta?: JSX.Element;
}
const ContentMedia: React.FC<ContentMediaProps> = ({ heading, body, cta, image }) => {

  return (
    <div className="py-12 px-4 [ md:py-32 ] [ lg:px-0 ] relative bg-white">
      <div className="container max-w-screen-lg mx-auto space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-10">
        <div className="flex flex-col items-start w-full self-center py-12 [ md:py-24 ]">
          <h1 className="font-serif text-3xl [ md:text-4xl ] [ xl:text-5xl ]">
            {heading}
          </h1>
          <p className="font-sans text-lg pt-6 pb-8">
            {body}
          </p>
          {cta && cta}
        </div>

        <div className="flex flex-col w-full rounded-2xl overflow-hidden relative z-0 h-80 md:h-auto">
          <Image src={image} layout="fill" objectFit="cover" alt="Marc One" />
          <div className="absolute inset-0 w-full h-full bg-secondary opacity-50 z-50"></div>
        </div>
      </div>
    </div>
  );
}

export default ContentMedia;
