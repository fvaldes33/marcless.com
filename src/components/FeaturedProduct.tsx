/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Button from './Button';
import { GetProducts_products_edges_node } from '../queries/__generated__/GetProducts';
import { formatPrice } from '../utils/helpers';

interface FeaturedProductProps {
  product: GetProducts_products_edges_node;
}
const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {

  const image = product.images.edges[0].node;

  return (
    <div className="py-12 px-4 [ md:py-24 ] [ lg:px-0 ] relative bg-white">
      <div className="container max-w-screen-lg mx-auto space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-10">
        <div className="flex flex-col items-start w-full self-center py-12 [ md:py-24 ]">
          <h1 className="font-serif text-3xl text-gray-800 [ md:text-4xl ] [ xl:text-5xl ]">
            {product.title.toLowerCase()}
          </h1>
          <div className="font-sans text-gray-500 text-lg pt-6 pb-8">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi ex repudiandae ipsam beatae, officiis ipsum. Eius asperiores earum magni tempore dolorum est at molestiae ducimus soluta! Temporibus voluptas corrupti cupiditate.</p>
          </div>
          <Button href={`/shop/${product.handle}`}>
            buy {product.title.toLowerCase()} <span className="mx-4">|</span> {formatPrice(product.priceRange.minVariantPrice.amount)}
          </Button>
        </div>

        <div className="flex flex-col w-full rounded-2xl overflow-hidden relative z-0 h-80 md:h-auto">
          <img src={image.transformedSrc} alt={image.altText || 'product image'} />
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
