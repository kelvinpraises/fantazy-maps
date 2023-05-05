import * as React from "react";
import { createRoot } from "react-dom/client";
import "./ui.css";

interface Props {}

interface State {
  colors: string[];
  isItemSelected: boolean;
  isColorGenerated: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      colors: ["#fff", "#fff", "#fff"],
      isItemSelected: false,
      isColorGenerated: false,
    };
  }

  componentDidMount() {
    window.onmessage = (msg) => {
      const { type } = msg.data.pluginMessage;
      if (type === "ITEM_SELECTED") {
        this.setState({ isItemSelected: true });
      } else if (type === "ITEM_NOT_SELECTED") {
        this.setState({ isItemSelected: false });
      }
    };
  }

  sendMessage = (type: string, data: { r: number; g: number; b: number }) => {
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

  mapValues = (x: number) => {
    return ((x - 0) * (1 - 0)) / (255 - 0) + 0;
  };

  getRGBValues = (str: string) => {
    var vals = str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");
    return {
      r: this.mapValues(parseInt(vals[0])),
      g: this.mapValues(parseInt(vals[1])),
      b: this.mapValues(parseInt(vals[2])),
    };
  };

  generateColors = () => {
    // const colors = randomColor({ count: 3, format: "rgb", hue: "random" });
    const colors = ["rgb(122, 60, 60)", "rgb(96, 130, 0)", "rgb(255, 0, 0)"];
    this.setState({ colors, isColorGenerated: true });
  };

  assignColor = (color: string) => {
    this.sendMessage("ASSIGN_COLOR", this.getRGBValues(color));
  };

  render() {
    const { isItemSelected, isColorGenerated, colors } = this.state;
    return (
      <div className="app">
        <div className="colors">
          {colors.map((color, i) => (
            <button
              key={`${i}-${color}`}
              type="button"
              className="color"
              onClick={
                isItemSelected && isColorGenerated
                  ? () => this.assignColor(color)
                  : () => null
              }
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <button type="button" onClick={this.generateColors}>
          Generate Buttons
        </button>
        {!isItemSelected && <div className="alert">Select an Item!</div>}
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("root");

  if (container) {
    const root = createRoot(container!);
    root.render(<App />);
  }
});
