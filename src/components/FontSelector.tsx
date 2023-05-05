import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as React from "react";
import { useState } from "react";
import { FontSizeScale } from "./FontSizeScale";

export const FontSelector = () => {
  const [first, setfirst] = useState(0);
  const max = 10;
  const step = 0;
  return (
    <div className="flex flex-col gap-4 w-full">
      <p>Font size</p>
      <div>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          defaultValue={[5]}
          max={max}
          step={1}
          aria-label="Volume"
        >
          <Slider.Track className="bg-brown-light relative grow rounded-full h-[4px]">
            <Slider.Range className="absolute bg-brown rounded-full h-full" />
          </Slider.Track>

          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <Slider.Thumb className="block w-3.5 h-3.5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-white select-none rounded-[5px] bg-brown px-[10px] py-[5px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                  sideOffset={5}
                >
                  5
                  <Tooltip.Arrow className="fill-brown" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </Slider.Root>
        <FontSizeScale size={max} {...{ step }} />
      </div>
    </div>
  );
};
