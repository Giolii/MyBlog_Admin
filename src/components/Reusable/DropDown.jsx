import { useState } from "react";
import { ChevronDown } from "lucide-react";

const DropDown = ({
  options,
  defaultOption = "Select an option",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelect = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.value);
    }
  };

  return (
    <div className="relative w-45">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2 py-1 text-left bg-white border rounded-md shadow-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="block truncate">{selectedOption}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg 
                   max-h-60 overflow-auto border
                   transition-all duration-200 ease-in-out
                   transform origin-top
                   ${
                     isOpen
                       ? "opacity-100 scale-y-100"
                       : "opacity-0 scale-y-0 pointer-events-none"
                   }`}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="py-1">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 
                       focus:outline-none focus:bg-gray-100
                       transition-colors duration-150"
              role="menuitem"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
