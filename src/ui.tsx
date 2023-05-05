import * as Tabs from "@radix-ui/react-tabs";
import * as d3 from "d3";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { CitiesTab } from "./containers/CitiesTab";
import { TerritoriesTab } from "./containers/TerritoriesTab";
import { TownsTab } from "./containers/TownsTab";
import "./ui.css";
import convertSvg from "./utils/convertSvg";
// @ts-ignore
import TerrainMaker from "./static/terrainMaker.js";

const App = () => {
  const [mapsComplete, setMapsComplete] = useState(false);
  const [font, setFont] = useState({
    cities: "",
    territories: "",
    towns: "",
  });
  const [amount, setAmount] = useState({
    cities: "",
    territories: "",
    towns: "",
  });
  const svgRef = useRef<any>(null);

  useEffect(() => {
    console.log("Maps complete:", mapsComplete);
  }, [mapsComplete]);

  const handleGenerateMap = () => {
    setMapsComplete(false);
    d3.select("svg").remove();

    let svg = d3
      .select("#terrainContainer")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

    let terrain = new TerrainMaker(setMapsComplete);
    let defaultParams = terrain.getDefaultParams();

    let width = 800;
    let height = width;

    terrain.doMap(svg, defaultParams, width, height);
  };

  const sendMessage = (type: string, data: any) => {
    parent.postMessage(
      {
        pluginMessage: {
          type,
          data,
        },
      },
      "*"
    );
  };

  useEffect(() => {
    if (!svgRef.current) return;
    const svgString = svgRef.current?.innerHTML;
    const convertedSvgString = convertSvg(svgString);
    sendMessage("import-svg", convertedSvgString);
  }, [mapsComplete, parent]);

  useEffect(() => {
    window.onmessage = (msg) => {
      const { type } = msg.data.pluginMessage;
      if (type === "svg-imported") {
        // alert("called");
      }
    };
  }, [window]);

  return (
    <Tabs.Root
      className="flex flex-col items-start gap-4 pt-4 pb-0 px-4"
      defaultValue="cities"
    >
      <Tabs.List
        className="shrink-0 flex justify-between items-center justify-between items-center bg-grey-light p-1.5 rounded-md self-stretch"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="rounded-[2.5px] px-6 py-2.5 flex items-center justify-center text-[15px] leading-none text-gray-text select-none hover:text-violet11 data-[state=active]:bg-brown data-[state=active]:text-white data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="cities"
        >
          Cities
        </Tabs.Trigger>
        <Tabs.Trigger
          className="rounded-[2.5px] px-6 py-2.5 flex items-center justify-center text-[15px] leading-none text-gray-text select-none hover:text-violet11 data-[state=active]:bg-brown data-[state=active]:text-white data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="territories"
        >
          Territories
        </Tabs.Trigger>
        <Tabs.Trigger
          className="rounded-[2.5px] px-6 py-2.5 flex items-center justify-center text-[15px] leading-none text-gray-text select-none hover:text-violet11 data-[state=active]:bg-brown data-[state=active]:text-white data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="towns"
        >
          Towns
        </Tabs.Trigger>
      </Tabs.List>
      <CitiesTab {...{ handleGenerateMap }} />
      <TerritoriesTab {...{ handleGenerateMap }} />
      <TownsTab {...{ handleGenerateMap }} />
      <div hidden ref={svgRef} id="terrainContainer"></div>
    </Tabs.Root>
  );
};

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("root");

  if (container) {
    const root = createRoot(container!);
    root.render(<App />);
  }
});
