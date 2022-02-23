import usbCable from '@/src/assets/usb-cable.png';
import quickCharge from '@/src/assets/quick-charger.png';
import standardWithoutDevices from '@/src/assets/without-devices-transparent.png';
import travelerWithoutDevices from '@/src/assets/traveler-black-transparent.png';


const ProductMap: { [key: string]: any } = {
  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzcyNjk1NzU4MTk0MTc=': {
    box: [
      { image: standardWithoutDevices.src, name: 'Standard Charger' },
      { image: usbCable.src, name: 'USB to USB-C Cable' },
      { image: quickCharge.src, name: 'Quick Charge 3.0' }
    ]
  },
  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzcyNjk2OTkzODc1NDU=': {
    box: [
      { image: travelerWithoutDevices.src, name: 'Traveler Charger' },
      { image: usbCable.src, name: 'USB to USB-C Cable' },
    ]
  }
};

export const getStaticProductDetails = (handle: string) => {
  if (handle in ProductMap) {
    return ProductMap[handle];
  }
  return {};
}
