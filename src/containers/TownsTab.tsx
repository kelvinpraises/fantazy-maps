import { Content } from "@radix-ui/react-tabs";
import * as React from "react";
import { Button } from "../components/Button";
import { FontSelector } from "../components/FontSelector";
import { QuantitySelector } from "../components/QuantitySelector";
import { Tab } from "./CitiesTab";

export const TownsTab = ({ handleGenerateMap }: Tab) => {
  return (
    <Content className="flex flex-col self-stretch gap-4" value="towns">
      <QuantitySelector id={"towns"} array={[6, 8, 10, 12, 14, 16]} />
      <FontSelector />
      <Button {...{ handleGenerateMap }} />
    </Content>
  );
};
