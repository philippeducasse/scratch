import { hString } from "../h.js";

export function withoutNulls(children) {
  return children.filter((child) => child != null); // removes both null and undefined. !== would remove just null
}

export function mapTextNodes(children) {
  return children.map((child) => (typeof child === "string" ? hString(child) : child));
}
