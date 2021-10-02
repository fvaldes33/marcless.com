import React from "react";

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

  return (
    <section className="pt-12 [ md:pt-24 ]">
      <div className="max-w-screen-lg mx-auto px-4 [ xl:px-0 ]">
        <div className="lg:text-center">
          {eyebrow && eyebrow}
          {heading}
          {body && body}
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {items.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-800">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default FeatureList;
