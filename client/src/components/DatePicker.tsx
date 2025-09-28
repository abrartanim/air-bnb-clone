import React from "react";
// @ts-ignore
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

interface DatePickerProps {
  ranges: Range[];
  onChange: (item: any) => void;
  onClear: () => void;
  nights: number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  ranges,
  onChange,
  onClear,
  nights,
}) => {
  const startDate = ranges[0]?.startDate;
  const endDate = ranges[0]?.endDate;

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-2">
        {nights > 0
          ? `${nights} ${nights === 1 ? "night" : "nights"}`
          : "Select check-in date"}
      </h2>
      <p className="text-gray-500 mb-4">
        {startDate && endDate && nights > 0
          ? `${format(startDate, "MMM d, yyyy")} – ${format(
              endDate,
              "MMM d, yyyy"
            )}`
          : "Add your travel dates for exact pricing"}
      </p>
      <DateRange
        editableDateInputs={true}
        onChange={onChange}
        moveRangeOnFirstSelection={false}
        ranges={ranges}
        minDate={new Date()}
        rangeColors={["#212121"]}
        months={2}
        direction="horizontal"
        className="w-full"
      />
      {/* Add the clear button back, linked to the onClear prop */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onClear}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Clear dates
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
