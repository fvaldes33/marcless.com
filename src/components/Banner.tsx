import { classNames } from "../utils/helpers";

interface BannerProps {
  media: JSX.Element;
  content: JSX.Element;
  spacing?: string;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  content,
  media,
  className = '',
  spacing = 'mt-12 px-4 [ md:mt-24 ]'
}) => {
  return (
    <section className={classNames(
      className,
      spacing
    )}>
      <div className="px-4 py-12 [ md:py-32 ] [ lg:px-0 ] relative text-white">
        <div className="absolute container mx-auto inset-0 z-0 rounded-2xl overflow-hidden">
          {media}
        </div>

        <div className="container max-w-screen-md mx-auto flex flex-col relative z-10 [ md:flex-row md:items-center md:justify-between ]">
          <div className="flex flex-col items-center justify-center w-full text-center">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
