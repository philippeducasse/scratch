// h --> short for hyperscript
// these are all the functions needed to create the virtual DOM elements

import { withoutNulls, mapTextNodes } from "./arrays.js";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

// main function to create virtual HTML elements with props (HTML attributes) and children
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}

// creates the simplest element, the text fragment
export function hString(str) {
  return {
    value: str,
    type: DOM_TYPES.TEXT,
  };
}

// used for grouping nodes that don't have a parent but belong togehter
// essentially, a fragment is an array of virtual nodes.
export function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}
