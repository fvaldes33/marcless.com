import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as StartIconFilled } from '@heroicons/react/solid';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { fadeInUp, staggered } from "@/src/utils/constants";
import React, { useEffect } from 'react';

const testimonials = [
  {
    name: 'James G',
    rating: 5,
    description: 'This Safety Razor is a must have! Great Razor for men or women! 5 Stars !! I will definitely buy again.',
  },
  {
    name: 'Paul V',
    rating: 5,
    description: 'Good quality and it seems durable. This is a great eco friendly alternative to disposable razors.',
  },
  {
    name: 'Alessandra E',
    rating: 4,
    description: 'It takes a little getting used to, just being honest. But I can’t believe it took me this long to try a safety razor. It makes my legs and armpits extremely smooth.',
  },
]

interface TestimonialGridProps {
  eyebrow?: JSX.Element;
  heading: JSX.Element;
  body?: JSX.Element;
  items: Array<{
    name: string;
    description: string;
    rating: number;
  }>;
}

const TestimonialGrid: React.FC<TestimonialGridProps> = ({
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
    <section ref={ref} className="pt-12 [ md:pt-24 ]">
      <div className="max-w-screen-lg mx-auto px-6 [ xl:px-0 ]">
        <motion.div initial="hidden" animate={controls} variants={fadeInUp} className="text-center">
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
            {items.map((testimonial) => (
              <motion.div variants={fadeInUp} key={testimonial.name} className="relative bg-white shadow-lg rounded-lg overflow-hidden p-8 transition duration-200 hover:scale-105">
                <dt className="flex justify-between">
                  <p className="text-xl font-serif font-bold text-gray-800">{testimonial.name}</p>
                  <div className="flex mt-2">
                    {Array(5).fill(1).map((_, i) => {
                      if (i < testimonial.rating) {
                        return (
                          <StartIconFilled key={i} className="h-4 w-4 text-yellow-200" />
                        )
                      }
                      return (
                        <StarIcon key={i} className="h-4 w-4 text-yellow-200" />
                      )
                    })}
                  </div>
                </dt>
                <dd>
                  <p className="mt-4 text-base text-gray-600">{testimonial.description}</p>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

export default TestimonialGrid;
