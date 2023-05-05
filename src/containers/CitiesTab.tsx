import * as React from "react";
import { useState } from "react";
import { Content } from "@radix-ui/react-tabs";
import { QuantitySelector } from "../components/QuantitySelector";
import { FontSelector } from "../components/FontSelector";
import { Button } from "../components/Button";

export interface Tab {
  handleGenerateMap: () => void;
}

export const CitiesTab = ({ handleGenerateMap }: Tab) => {
  return (
    <Content className="flex flex-col self-stretch gap-4" value="cities">
      <QuantitySelector id={"cities"} array={[10, 20, 30, 40, 50, 60]} />
      <FontSelector />
      <Button {...{ handleGenerateMap }} />
    </Content>
  );
};
