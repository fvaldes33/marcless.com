import blueOnSoap from '@/src/assets/blue-on-soap.jpg';

export const MarcRazor = {
  punchLine: 'Razor + 20 Blades',
  includes: {
    eyebrow: 'what do you get',
    heading: 'The same great features, at a fraction of the cost.',
    copy: 'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',
    subheading: 'Each razor comes with:',
    image: blueOnSoap,
    items: [
      '1x Reusable Safety Razor',
      '20 x Replacement razor blades',
      '1 x Cleaning Brush',
    ]
  },
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'What’s the difference between Alloy and Steel?',
        answer: 'Our ALLOY razors are made from die-cast zinc alloy, coated with aerospace grade PVD chrome. Our STEEL razors are made from 100% solid stainless steel.'
      },
      {
        question: 'How to dispose of the razor blades?',
        answer: 'Our ALLOY razors are made from die-cast zinc alloy, coated with aerospace grade PVD chrome. Our STEEL razors are made from 100% solid stainless steel.'
      },
      {
        question: 'How long do they last?',
        answer: 'Everybody changes out their blades at different intervals due to the fact that our skin, hair, and preferences are all different. That said, most customers easily get 8 to 10 shaves out of each blade.'
      },
    ]
  }
}

const ProductMap: { [key: string]: any } = {
  'the-marc-razor': MarcRazor
};

export const getStaticProductDetails = (handle: string) => {
  if (handle in ProductMap) {
    return ProductMap[handle];
  }
  return {};
}
