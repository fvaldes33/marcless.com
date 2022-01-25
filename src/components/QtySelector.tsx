import { useContext, useEffect, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Context } from "../state";

interface QtySelectorProps {
  defaultValue?: number;
  onChange: (e: number) => void;
}

const QtySelector: React.FC<QtySelectorProps> = ({
  defaultValue = 1,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const decrement = () => {
    if (value === 0) {
      return;
    }

    setValue(v => v - 1);
  }

  const increment = () => {
    setValue(v => v + 1);
  }

  useEffect(() => {
    onChange(value);
  }, [value, onChange])

  return (
    <div className="h-full border border-gray-200 flex">
      <button onClick={() => decrement()} aria-label="Decrease quantity by one" className="flex items-center w-12 justify-center">
        <MinusCircleIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
      </button>
      <div className="flex items-center">
        <input
          aria-label="Manually enter quantity"
          className="appearance-none border-none text-center w-12 focus:border-none focus:ring-0 focus:outline-none"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          type="number"
          min="1"
          inputMode="numeric"
        />
      </div>
      <button onClick={() => increment()} aria-label="Increase quantity by one" className="flex items-center w-12 justify-center">
        <PlusCircleIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
      </button>
    </div>
  );
}

export default QtySelector;
