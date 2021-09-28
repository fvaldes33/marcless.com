/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { GetProducts } from '@/src/queries';
import { formatPrice } from '@/src/utils/helpers';
import Button from './Button';

const ProductGrid: React.FC<GetProducts> = ({ products }) => {

  return (
    <div className="py-12 px-4 [ md:py-24 ] [ lg:px-0 ] relative bg-white">
      <div className="container max-w-screen-lg mx-auto overflow-visible [ md:grid md:grid-cols-2 md:gap-x-10 ]">
        {products?.edges.map(({ node }) => {
          const image = node.images.edges[0].node;
          return (
            <article key={node.id} className="group mb-12 [ md:mb-0 ]">
              <figure className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                <Link href={`/shop/${node.handle}`} passHref>
                  <a className="block">
                    <img
                      className="w-full h-full object-center object-cover"
                      src={image.transformedSrc}
                      alt={image.altText || 'product image'} />
                  </a>
                </Link>
              </figure>
              <div className="py-4 flex flex-col items-center">
                <h1 className="font-serif text-2xl mb-2">
                  {node.title.toLowerCase()}
                </h1>
                <p className="font-sans text-base mb-4">
                  {formatPrice(node.priceRange.minVariantPrice.amount)}

                  {node.compareAtPriceRange && (
                    <span className="text-red-600 line-through ml-2">
                      {formatPrice(node.compareAtPriceRange.minVariantPrice.amount)}
                    </span>
                  )}
                </p>
                <Button href={`/shop/${node.handle}`}>
                  buy {node.title.toLowerCase()}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default ProductGrid;
