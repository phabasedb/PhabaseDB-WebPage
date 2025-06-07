import { XMLParser } from "fast-xml-parser";

export function parseXMLtoJSON(xmlString) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });
  return parser.parse(xmlString);
}
