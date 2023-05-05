import * as React from "react";

export const Button = ({
  handleGenerateMap,
}: {
  handleGenerateMap: () => void;
}) => {
  return (
    <button
      onClick={handleGenerateMap}
      className="flex bg-brown text-white flex-row justify-center items-center gap-4 px-0 py-[7px] rounded-[5px]"
    >
      Generate
    </button>
  );
};
