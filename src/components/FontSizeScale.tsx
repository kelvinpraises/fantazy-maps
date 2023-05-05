import * as React from "react";

export const FontSizeScale = ({
  size,
  step = 0,
}: {
  size: number;
  step?: number;
}) => {
  return (
    <div className="flex justify-between items-start px-[5px]">
      {Array.from(Array(size + 1).keys()).map((x, i) => (
        <div key={i} className="relative mb-4">
          <div className="w-0.5 h-[5px] bg-[#9C9C9C] rounded-[2]"></div>
          <p className="absolute -translate-x-2/4 translate-y-0 left-2/4 text-[10px] text-grey-text">
            {x % 2 === 0 ? x + step : ""}
          </p>
        </div>
      ))}
    </div>
  );
};
