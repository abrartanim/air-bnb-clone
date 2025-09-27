import React, { useState } from "react";
// @ts-ignore
import { DateRange, Range } from "react-date-range";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker: React.FC = () => {
  const today = new Date();

  const [state, setState] = useState<Range[]>([
    {
      startDate: today,
      endDate: addDays(today, 2),
      key: "selection",
    },
  ]);

  const startDate = state[0]?.startDate || null;
  const endDate = state[0]?.endDate || null;

  // nights calculation only if both dates exist
  const nights =
    startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-2xl w-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        {nights > 0
          ? `${nights} ${nights === 1 ? "night" : "nights"} in Kuala Lumpur`
          : "Select your dates"}
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        {startDate == endDate
          ? `${format(startDate, "MMM d, yyyy")} – ${format(
              endDate,
              "MMM d, yyyy"
            )}`
          : "No dates selected"}
      </p>

      <DateRange
        editableDateInputs={true}
        onChange={(item: { selection: Range }) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state.length ? state : []}
        minDate={today}
        rangeColors={["#000000"]}
        months={2}
        direction="horizontal"
      />

      <button
        onClick={() =>
          setState([
            {
              startDate: today,
              endDate: today,
              key: "selection",
            },
          ])
        }
        className="text-sm text-gray-600 mt-3 hover:underline"
      >
        Clear dates
      </button>
    </div>
  );
};

export default DatePicker;
