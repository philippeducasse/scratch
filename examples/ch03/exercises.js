const { h, hFragment } = require("../../packages/runtime/src/h");

const exercise2 = hFragment([
  h("h1", { class: "title" }, ["My counter"]),
  h("div", { class: "container" }, [
    h("button", {}, ["decrement"]),
    h("span", {}, ["0"]),
    h("button", {}, ["increment"]),
  ]),
]);

// console.log(JSON.stringify(exercise2, null, 2));

// 3.3
function lipsum(number) {
  let i = 0;
  const paragraphs = [];

  while (i <= number) {
    const p = h("p", {}, [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ]);
    paragraphs.push(p);
    i++;
  }

  return hFragment(paragraphs);
}

const l = lipsum(3);

// console.log(JSON.stringify(l, null, 1));

// 3.4

function MessageComponent(level, message) {
  let c = `message--${level}`;
  return h("div", { class: c }, [h("p", {}, [message])]);
}

const info = MessageComponent("error", "this is an error");

console.log(JSON.stringify(info));
