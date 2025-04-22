type OptionBoxProps = {
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
  children: React.ReactNode;
};

const OptionBox = ({ value, selectedValue, onSelect, children }: OptionBoxProps) => {
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => onSelect(value)}
      className={`common-date-time-box-inner cursor-pointer border p-4 rounded-md transition-all w-full text-center relative
        ${isSelected ? "bg-[#073255] border-blue-500 text-white bg-active" : "bg-white"}
      `}
    >
      {children}
      {isSelected && (
        <p className="text-xs absolute -bottom-6 w-full text-black flex justify-center !text-sm">
          <strong>Selected</strong>
        </p>
      )}
    </div>
  );
};

export default OptionBox;
