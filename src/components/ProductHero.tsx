/* eslint-disable @next/next/no-img-element */
import { PlayIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Swiper as CoreSwiper, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import InnerImageZoom from 'react-inner-image-zoom';
import { GetSingleProduct_product } from "../queries/__generated__/GetSingleProduct";

export type ProductHeroProps = {
  product: GetSingleProduct_product;
}

const ProductHero = ({
  product
}: ProductHeroProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<CoreSwiper | null>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="mainSwiper h-64 md:h-[500px] mb-4"
      >
        {product.images.edges.map(({ node }, index: number) => (
          <SwiperSlide key={node.transformedSrc} className="w-full h-full">
            <InnerImageZoom
              className="w-full h-full object-center object-cover"
              hideHint={true}
              src={node.transformedSrc}
              zoomSrc={node.transformedZoomSrc}
              alt={node.altText || 'product image'}
            />
          </SwiperSlide>
        ))}
        {product.media.edges.map(({ node }) => {
          if (node.__typename !== 'Video') {
            return null;
          }
          const media = node.sources.find(s => s.format === 'mp4');
          if (!media) {
            return null;
          }

          return (
            <SwiperSlide key={node.id}>
              <div className="w-full h-full">
                <video className="w-full h-full object-center object-cover" controls autoPlay muted>
                  <source type={`video/${media.format}`} src={media.url} />
                </video>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="thumbSwiper h-32"
      >
        {product.images.edges.map(({ node }, index: number) => (
          <SwiperSlide key={node.transformedSrc}>
            <img className="w-full h-full object-top object-cover" src={node.transformedSrc} alt={node.altText ?? ''} />
          </SwiperSlide>
        ))}
        {product.media.edges.map(({ node }) => {
          if (node.__typename !== 'Video') {
            return null;
          }

          return (
            <SwiperSlide key={node.id}>
              <div className="w-full h-full">
                <img
                  className="w-full h-full object-top object-cover"
                  src={node.previewImage?.transformedSrc}
                  alt={node.previewImage?.altText || `product-thumbail-${product.title}`} />

                <PlayIcon className="text-gray-800 h-12 w-12 absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
}

export default ProductHero;
