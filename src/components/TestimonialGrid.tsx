import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as StartIconFilled } from '@heroicons/react/solid';

const testimonials = [
  {
    name: 'Xavier G',
    rating: 5,
    description: 'This Safety Razor is a must have! Great Razor for men or women! 5 Stars !! I will definitely buy again.',
  },
  {
    name: 'Jackie V',
    rating: 5,
    description: 'Good quality and it seems durable. This is a great eco friendly alternative to disposable razors.',
  },
  {
    name: 'Camila E',
    rating: 4,
    description: 'It takes a little getting used to, just being honest. But I can’t believe it took me this long to try a safety razor. It makes my legs and armpits extremely smooth.',
  },
]

const TestimonialGrid = () => {
  return (
    <section className="pt-12 [ md:pt-24 ] bg-white">
      <div className="max-w-screen-lg mx-auto px-4 [ lg:px-0 ]">
        <div className="text-center mb-4 [ md:mb-10 ]">
          <h2 className="font-sans font-normal mb-6 text-primary tracking-wider">testimonials</h2>
          <p className="text-3xl font-serif mb-4 text-gray-800">
            Don&apos;t take our word for it.
          </p>
        </div>

        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="relative bg-white shadow-lg rounded-lg overflow-hidden p-8 transition duration-200 hover:scale-105">
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
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default TestimonialGrid;
