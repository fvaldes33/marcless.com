import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";

interface AlertProps {}

const Alert: React.FC<AlertProps> = ({}) => {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <section className="bg-primary bg-opacity-50 text-gray-800">
      <div className="container mx-auto px-4 h-12 [ lg:px-0 ] flex items-center justify-center relative">
        <p><b>Free Shipping</b> for a limited time!</p>
        <button title="close alert button" className="absolute right-0" onClick={() => setShow(false)}>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default Alert;
