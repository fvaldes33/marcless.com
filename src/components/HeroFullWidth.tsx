import React, { useContext } from "react";
import Image from 'next/image';
import { Context } from "@/src/state";
import Button from '@/src/components/Button';
import marcOne from '@/src/assets/marcone-rosegold-exloded.png';
import marcOneMatte from '@/src/assets/matte-black-bathroom.jpg';
import brightSilver from '@/src/assets/bright-silver-in-stand.jpg';

interface HeroFullWidthProps {
  media: JSX.Element;
  content: JSX.Element;
}
const HeroFullWidth: React.FC<HeroFullWidthProps> = ({
  media,
  content
}) => {
  return (
    <div className="py-24 px-4 [ md:py-48 ] [ xl:px-0 ] relative bg-tertiary text-white overflow-hidden">
      <div className="absolute inset-0">
        {media}
      </div>

      <div className="container mx-auto relative z-10 flex items-center justify-start h-full">
        <div className="max-w-screen-md flex flex-col items-start justify-start">
          {content}
        </div>
      </div>
    </div>
  );
}

export default HeroFullWidth;
