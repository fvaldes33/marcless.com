import { useContext } from "react";
import Image from 'next/image';
import { Context } from "../state";

interface BannerProps {
  heading: string;
  image: StaticImageData | string;
}

const Banner: React.FC<BannerProps> = ({ heading, image }) => {
  const { state: { store, navOpen }, dispatch } = useContext(Context);

  return (
    <div className="py-12 px-4 [ md:py-40 ] [ lg:px-0 ] relative text-white">

      <div className="absolute container mx-auto inset-0 z-0 rounded-2xl overflow-hidden">
        <Image className="object-cover object-right" layout="fill" src={image} alt="man shaving" />
        <div className="absolute inset-0 w-full h-full bg-secondary opacity-50 z-50"></div>
      </div>

      <div className="container max-w-screen-lg mx-auto flex flex-col relative z-10 [ md:flex-row md:items-center md:justify-between ]">
        <div className="flex flex-col items-start w-full text-center">
          <h1 className="font-serif text-3xl text-white [ md:text-4xl ] [ lg:text-5xl ]">
            {heading}
          </h1>
        </div>
      </div>

    </div>
  );
}

export default Banner;
