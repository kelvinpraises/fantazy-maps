import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as React from "react";

export const QuantitySelector = ({
  id,
  array,
}: {
  id: string;
  array: number[];
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p>How many {id}?</p>
      <ToggleGroup.Root
        className="bg-grey-light flex justify-between items-center self-stretch p-1.5 rounded-md"
        type="single"
        value={array[0]}
        aria-label={`Quantity for ${id}`}
        onValueChange={() => console.log("changed")}
      >
        {array.map((x) => (
          <ToggleGroup.Item
            className="data-[state=on]:shadow-[inset_0_0_0_1.5px_#9C9C9C] flex h-[35px] w-[35px] items-center justify-center text-base leading-4 rounded-[2.5px] focus:z-10 focus:shadow-[inset_0_0_0_1.5px_#9C9C9C] focus:outline-none text-grey-text"
            value={x}
            aria-label={`Selected amount of ${x} for ${id}`}
            key={x}
          >
            <p>{x}</p>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};
