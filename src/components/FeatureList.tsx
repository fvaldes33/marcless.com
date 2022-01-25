import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { fadeInUp, staggered } from "@/src/utils/constants";
import { classNames } from "../utils/helpers";

interface FeatureListProps {
  eyebrow?: JSX.Element;
  heading: JSX.Element;
  body?: JSX.Element;
  items: Array<{ color: string; name: string; description: string; icon: (props: React.ComponentProps<'svg'>) => JSX.Element }>;
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
      <div className="container mx-auto px-4 [ xl:px-0 ] md:flex md:justify-between">
        <motion.div initial="hidden" animate={controls} variants={fadeInUp} className="w-full md:w-3/5 flex-shrink-0 pr-12">
          {eyebrow && eyebrow}
          {heading}
          {body && body}
        </motion.div>

        <div className="mt-10">
          <motion.dl
            className="space-y-10 flex flex-col"
            variants={staggered}
            initial="hidden"
            animate={controls}
          >
            {items.map((feature) => (
              <motion.div key={feature.name} variants={fadeInUp} className="relative">
                <dt>
                  <div className={classNames(
                    'absolute flex items-center justify-center h-12 w-12 rounded-full text-gray-800',
                    feature.color
                  )}>
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
