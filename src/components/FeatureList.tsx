import { useContext } from "react";
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon, ShieldCheckIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { Context } from "../state";

const features = [
  {
    name: 'Safe and easy to use',
    description:
      'Assemble and disassemble conveniently in seconds.',
    icon: ThumbUpIcon,
  },
  {
    name: 'Perfect shaving',
    description:
      'Achieve a closer, smoother, more professional shave.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Clean and sustainable',
    description:
      'Durable and recyclable, while free of nasty chemicals.',
    icon: ShieldCheckIcon,
  },
]

const FeatureList = () => {
  const { state: { store, navOpen }, dispatch } = useContext(Context);

  return (
    <div className="py-12 [ md:py-24 ] bg-white">
      <div className="max-w-screen-lg mx-auto px-4 [ lg:px-0 ]">
        <div className="lg:text-center">
          <h2 className="font-sans font-normal mb-6 text-primary tracking-wider">why marc<i>less</i></h2>
          <p className="text-3xl font-serif mb-4 text-gray-800">
            The same great features, at a fraction of the cost.
          </p>
          <p className="mb-16 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
            accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
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
    </div>
  );
}

export default FeatureList;
