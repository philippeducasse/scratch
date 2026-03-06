import { h } from "../../packages/runtime/src/h.js";
import { mountDOM } from "../../packages/runtime/src/mount-dom.js";

const vdom = h("section", {}, [h("h1", {}, ["My blog"]), h("p", {}, ["Welcome"])]);

const dom = mountDOM(vdom);

console.log(dom);
