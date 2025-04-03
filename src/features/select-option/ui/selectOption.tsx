import { FC, useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@shared/lib';

interface SelectOptionProps {
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
  isSwipe?: boolean;
}

export const SelectOption: FC<SelectOptionProps> = ({
  options,
  selectedOption,
  isSwipe = false,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const handleSelect = (option: string) => {
  //   setSelected(option);
  //   setIsOpen(false);
  //   if (onSelect) onSelect(option);
  // };

  const handleSwipe = (direction: 'prev' | 'next') => {
    const currentIndex = options.indexOf(selectedOption);
    if (direction === 'prev' && currentIndex > 0) {
      onSelect(options[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < options.length - 1) {
      onSelect(options[currentIndex + 1]);
    }
  };

  return (
    <div ref={wrapperRef} className="flex items-center justify-between h-full flex-1">
      {isSwipe && (
        <button
          onClick={() => handleSwipe('prev')}
          disabled={options.indexOf(selectedOption) === 0}
          className={cn("p-1 opacity-100", options.indexOf(selectedOption) === 0 && 'opacity-0 cursor-default')}
        >
          <ArrowLeft size={15} />
        </button>
      )}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=""
        >
          {selectedOption}
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => onSelect(option)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  option === selectedOption ? 'bg-gray-200 font-bold' : ''
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {isSwipe && (
        <button
          onClick={() => handleSwipe('next')}
          disabled={options.indexOf(selectedOption) === options.length - 1}
          className={cn("p-1 opacity-100", options.indexOf(selectedOption) === options.length - 1 && 'opacity-0 cursor-default')}
        >
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
};
