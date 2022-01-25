import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { classNames, resolveClass } from '../utils/helpers';
import { useEffect } from 'react';
import { fadeInUp } from '../utils/constants';

interface ContentMediaProps {
  content: JSX.Element;
  media: JSX.Element;
  layout?: 'row' | 'reverse';
  spacing?: string;
  container?: 'normal' | 'thin' | 'wide' | 'full';
}

const mediaVariantsLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  }
}
const mediaVariantsRight = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  }
}

const ContentMedia: React.FC<ContentMediaProps> = ({
  content,
  media,
  layout = 'row',
  spacing = 'py-12 [ md:py-24 ]',
  container = 'normal'
}) => {
  const [ref, inView] = useInView({
    threshold: 0.4,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView])

  return (
    <section ref={ref} className={classNames(
      spacing,
    )}>
      <div className={classNames(
        'container mx-auto space-y-6 [ md:space-y-0 md:flex ]',
        layout === 'row' ? '[ md:flex-row ]' : '[ md:flex-row-reverse ]',
        resolveClass('container', container)
      )}>

        {/* Content */}
        <motion.div initial="hidden" animate={controls} variants={fadeInUp} className={classNames(
          'flex flex-col items-start w-full self-center py-8 [ md:w-1/3 md:py-24 ]',
          layout === 'row' ? 'md:mr-12' : 'md:ml-12',
        )}>
          {content}
        </motion.div>

        {/* Media */}
        <motion.div initial="hidden" animate={controls} variants={layout === 'row' ? mediaVariantsRight : mediaVariantsLeft} className={classNames(
          'flex flex-col w-full overflow-hidden relative shadow-xl z-0 h-80 [ md:h-auto md:w-2/3 ]'
        )}>
          {media}
        </motion.div>
      </div>
    </section>
  );
}

export default ContentMedia;
