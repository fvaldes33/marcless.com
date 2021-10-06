import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { fadeInUp, staggered } from "@/src/utils/constants";

interface FeatureListProps {
  eyebrow?: JSX.Element;
  heading: JSX.Element;
  body?: JSX.Element;
  items: Array<{ name: string; description: string; icon: (props: React.ComponentProps<'svg'>) => JSX.Element }>;
}

const FeatureList: React.FC<FeatureListProps> = ({
  eyebrow,
  heading,
  body,
  items = [],
}) => {

  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="pt-16 [ md:pt-32 ]">
      <div className="max-w-screen-lg mx-auto px-4 [ xl:px-0 ]">
        <motion.div initial="hidden" animate={controls} variants={fadeInUp} className="lg:text-center">
          {eyebrow && eyebrow}
          {heading}
          {body && body}
        </motion.div>

        <div className="mt-10">
          <motion.dl
            className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10"
            variants={staggered}
            initial="hidden"
            animate={controls}
          >
            {items.map((feature) => (
              <motion.div key={feature.name} variants={fadeInUp} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-800">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-600">{feature.description}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

export default FeatureList;
