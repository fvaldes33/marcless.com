import React from "react";
import { motion } from "framer-motion"

interface HeroFullWidthProps {
  media: JSX.Element;
  content: JSX.Element;
}
const HeroFullWidth: React.FC<HeroFullWidthProps> = ({
  media,
  content
}) => {
  return (
    <div className="h-[768] py-24 px-4 [ md:py-48 ] [ xl:px-0 ] relative bg-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0">
        {media}
      </div>

      <div className="container mx-auto relative z-10 flex items-center justify-start h-full">
        <motion.div
          className="max-w-screen-md flex flex-col items-start justify-start"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
        >
          {content}
        </motion.div>
      </div>
    </div>
  );
}

export default HeroFullWidth;
