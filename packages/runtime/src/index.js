import { h } from "./h.js";

const test = h("form,", { class: "login-form,", action: "login" }, [
  h("input", { type: "text", name: "user" }),
  h("input", { type: "password", name: "pass" }),
  //   h("button", { on: { click: login } }, ["Log in"]),
  h("button", {}, ["Log in"]),
]);

console.log(JSON.stringify(test, null, 2));
