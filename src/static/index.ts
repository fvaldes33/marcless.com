import { LightningBoltIcon, ShieldCheckIcon, ThumbUpIcon } from '@heroicons/react/outline'

import blueOnSoap from '@/src/assets/blue-on-soap.jpg';
import womanShaving from '@/src/assets/woman-shaving.jpg';
import womanShavingPits from '@/src/assets/woman-shaving-pits.jpg';
import brightSilverInStand from '@/src/assets/bright-silver-in-stand.jpg';
import goldWhiteOnDish from '@/src/assets/gold-white-on-dish.jpg';
import goldWhiteBlanket from '@/src/assets/gold-white-blanket.jpg';
import matteBlackBathroom from '@/src/assets/matte-black-bathroom.jpg';

import swatchblue from '@/src/assets/swatches/blue.png';
import swatchbright from '@/src/assets/swatches/bright-silver.png';
import swatchmatteblack from '@/src/assets/swatches/matte-black.png';
import swatchmattesilver from '@/src/assets/swatches/matte-silver.png';
import swatchmint from '@/src/assets/swatches/mint-green.png';
import swatchnavy from '@/src/assets/swatches/navy-blue.png';
import swatchpink from '@/src/assets/swatches/pink.png';
import swatchpurple from '@/src/assets/swatches/purple.png';
import swatchrose from '@/src/assets/swatches/rose-gold.png';
import swatchwhite from '@/src/assets/swatches/white.png';

export const colors = [
  { name: 'black', src: swatchmatteblack },
  { name: 'blue', src: swatchblue },
  { name: 'bright-silver', src: swatchbright },
  { name: 'matte-black', src: swatchmatteblack },
  { name: 'matte-silver', src: swatchmattesilver },
  { name: 'mint-green', src: swatchmint },
  { name: 'navy-blue', src: swatchnavy },
  { name: 'pink', src: swatchpink },
  { name: 'purple', src: swatchpurple },
  { name: 'rose-gold', src: swatchrose },
  { name: 'white', src: swatchwhite },
]

export const MarcRazor = {
  punchLine: 'Razor + 20 Blades',
  includes: {
    eyebrow: 'what do you get',
    heading: 'A great shave at a fraction of the cost.',
    copy: 'The Marc Razor cuts your hair precisely at the surface of your skin – ensuring that each strand can continue to grow normally. With 20 replacement razor blades, you\'ll have months of perfect shaves in your future.',
    subheading: 'Each razor comes with:',
    image: blueOnSoap,
    items: [
      '1x Reusable Safety Razor',
      '20 x Replacement razor blades',
      '1 x Cleaning Brush',
    ]
  },
  features: {
    eyebrow: 'the marc razor',
    heading: 'A great shave at a fraction of the cost.',
    copy: '',
    items: [
      {
        name: 'Safe and easy to use',
        description:
          'Assemble and disassemble conveniently in seconds.',
        icon: ThumbUpIcon,
      },
      {
        name: 'Perfect shave',
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
  },
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'What materials are Marc Razors made from?',
        answer: 'The safety razors are made from brass. The metal color has been electoplated, which makes it incredibly durable. The blue, pink, mint and lilac razor are powder coated and more prone to chipping if its being dropped. Even if the razor chips or scratches if cannot rust.'
      },
      {
        question: 'What blades does it accept?',
        answer: 'It accepts any standard double sided razor blades. They can be easily found online and in stores.'
      },
      {
        question: 'How long do they last?',
        answer: 'Everybody changes out their blades at different intervals due to the fact that our skin, hair, and preferences are all different. That said, most customers easily get 8 to 10 shaves out of each blade.'
      },
    ]
  },
  gallery: [
    { src: goldWhiteOnDish, alt: 'Blue on Soap' },
    { src: womanShaving, alt: 'Blue on Soap' },
    { src: brightSilverInStand, alt: 'Blue on Soap' },
    { src: womanShavingPits, alt: 'Blue on Soap' },
    { src: goldWhiteBlanket, alt: 'Blue on Soap' },
    { src: matteBlackBathroom, alt: 'Blue on Soap' },
  ],
  colors: [
    { name: 'blue', src: swatchblue },
    { name: 'bright-silver', src: swatchbright },
    { name: 'matte-black', src: swatchmatteblack },
    { name: 'matte-silver', src: swatchmattesilver },
    { name: 'mint-green', src: swatchmint },
    { name: 'navy-blue', src: swatchnavy },
    { name: 'pink', src: swatchpink },
    { name: 'purple', src: swatchpurple },
    { name: 'rose-gold', src: swatchrose },
    { name: 'white', src: swatchwhite },
  ]
}

const ProductMap: { [key: string]: any } = {
  'the-marc-razor': MarcRazor,
  'ninja-dragons-3-in1-wireless-foldable-charging-station-830911972': MarcRazor
};

export const getStaticProductDetails = (handle: string) => {
  if (handle in ProductMap) {
    return ProductMap[handle];
  }
  return {};
}
