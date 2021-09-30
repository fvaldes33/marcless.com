import React from "react";

interface FeatureListProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  items: Array<{ name: string; description: string; icon: (props: React.ComponentProps<'svg'>) => JSX.Element }>;
}

const FeatureList: React.FC<FeatureListProps> = ({
  eyebrow,
  heading,
  body,
  items = [],
}) => {

  return (
    <section className="pt-12 [ md:pt-24 ] bg-white">
      <div className="max-w-screen-lg mx-auto px-4 [ lg:px-0 ]">
        <div className="lg:text-center">
          {eyebrow && <h2 className="font-sans font-normal mb-6 text-primary tracking-wider" dangerouslySetInnerHTML={{ __html: eyebrow }}></h2>}
          <p className="text-3xl font-serif mb-4 text-gray-800" dangerouslySetInnerHTML={{
            __html: heading,
          }}></p>
          {body && (
            <p className="mb-16 max-w-2xl text-xl text-gray-600 lg:mx-auto" dangerouslySetInnerHTML={{ __html: body }}></p>
          )}
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
