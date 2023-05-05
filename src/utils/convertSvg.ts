export default function convertSvg(svgStr: string): string {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgStr, "image/svg+xml");
  const styleElems = svgDoc.getElementsByTagName("style");

  // Handle class-based styles
  for (let i = 0; i < styleElems.length; i++) {
    const styleElem = styleElems[i];
    const cssText = styleElem.textContent;

    // Decode HTML entities in CSS text
    const decodedCssText = decodeEntities(cssText!);

    // Remove redundant styles
    const cleanedCssText = decodedCssText.replace(
      /{[\s\r\n]*stroke-width:\s*2;[\s\r\n]*}/g,
      ""
    );

    const regex = /(\.[^\s]+)\s*\{/g;
    let match;
    while ((match = regex.exec(cleanedCssText))) {
      const selector = match[1];
      const classElems = svgDoc.querySelectorAll(selector);

      for (let j = 0; j < classElems.length; j++) {
        const classElem = classElems[j];

        // Copy over all style properties from class-based style to inline style
        const style = classElem.getAttribute("style") || "";
        classElem.setAttribute(
          "style",
          cleanedCssText
            .substring(
              match.index,
              cleanedCssText.indexOf("}", match.index) + 1
            )
            .replace(selector, "")
            .trim() +
            ";" +
            style
        );
      }
    }

    // Remove style element
    styleElem.parentNode?.removeChild(styleElem);
  }

  // Add missing styles to path and line elements
  const pathElems = svgDoc.getElementsByTagName("path");
  for (let i = 0; i < pathElems.length; i++) {
    const pathElem = pathElems[i];
    const style = pathElem.getAttribute("style") || "";
    pathElem.setAttribute(
      "style",
      "fill: none; stroke: black; stroke-linecap: round;" + style
    );
  }

  const lineElems = svgDoc.getElementsByTagName("line");
  for (let i = 0; i < lineElems.length; i++) {
    const lineElem = lineElems[i];
    const style = lineElem.getAttribute("style") || "";
    lineElem.setAttribute(
      "style",
      "fill: none; stroke: black; stroke-linecap: round;" + style
    );
  }

  // Add missing styles to class-based elements
  const fieldElems = svgDoc.querySelectorAll(".field");
  for (let i = 0; i < fieldElems.length; i++) {
    const fieldElem = fieldElems[i];
    const style = fieldElem.getAttribute("style") || "";
    fieldElem.setAttribute("style", "stroke: none; fill-opacity: 1.0;" + style);
  }

  const slopeElems = svgDoc.querySelectorAll(".slope");
  for (let i = 0; i < slopeElems.length; i++) {
    const slopeElem = slopeElems[i];
    const style = slopeElem.getAttribute("style") || "";
    slopeElem.setAttribute("style", "stroke-width: 1;" + style);
  }

  const riverElems = svgDoc.querySelectorAll(".river");
  for (let i = 0; i < riverElems.length; i++) {
    const riverElem = riverElems[i];
    const style = riverElem.getAttribute("style") || "";
    riverElem.setAttribute("style", "stroke-width: 2;" + style);
  }

  const coastElems = svgDoc.querySelectorAll(".coast");
  for (let i = 0; i < coastElems.length; i++) {
    const coastElem = coastElems[i];
    const style = coastElem.getAttribute("style") || "";
    coastElem.setAttribute("style", "stroke-width: 4;" + style);
  }

  return new XMLSerializer().serializeToString(svgDoc.documentElement).replace(/\n/g, "");
}

function decodeEntities(encodedString: string): string {
  const div = document.createElement("div");
  div.innerHTML = encodedString;
  return div.textContent || "";
}