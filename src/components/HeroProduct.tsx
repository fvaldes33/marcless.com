import { useContext } from "react";
import Image from 'next/image';
import { Context } from "@/src/state";
import Button from '@/src/components/Button';
import marcOne from '@/src/assets/marcone-rosegold-exloded.png';

const HeroWithProduct = () => {
  const { state: { store, navOpen }, dispatch } = useContext(Context);

  return (
    <div className="pt-24 px-4 [ lg:px-0 ] relative bg-primary text-white overflow-hidden">
      <div className="container max-w-screen-lg mx-auto flex flex-col [ md:flex-row md:items-center md:justify-between ]">
        <div className="flex flex-col items-start w-full [ md:w-1/2 ]">
          <h1 className="font-serif text-6xl text-white">the<br/>marc <span className="underline">razor</span></h1>
          <p className="font-sans text-white text-2xl pt-6 pb-12">
            The easiest way to keep your skin looking fresh and healthy. Try the world&apos;s safest single blade razor.
          </p>
          <Button href="/shop" variant="light">
            shop now
          </Button>
        </div>
        <div className="flex flex-col w-full [ md:w-1/2 ] align-bottom transform rotate-12 translate-y-6">
          <Image src={marcOne} alt="Marc One" />
        </div>
      </div>
    </div>
  );
}

export default HeroWithProduct;
