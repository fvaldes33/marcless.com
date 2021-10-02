import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Image from 'next/image';

interface GalleryProps {
  images: Array<{ src: string; alt: string; }>
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <section className="mt-12 px-4 [ md:mt-24 md:px-6 ]">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 3,
          }
        }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
      >
        {images.map(({ src, alt }: { src: string, alt: string }, index: number) => (
          <SwiperSlide key={index} className="gallery__slide">
            <Image className="rounded-lg overflow-hidden" objectFit="cover" src={src} layout="fill" alt={alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Gallery;
