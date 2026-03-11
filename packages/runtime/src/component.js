import { destroyDOM } from "./destroy-dom";
import { DOM_TYPES } from "./h";
import { patchDOM } from "./patch-dom";
import { hasOwnProperty } from "./utils/objects";

export function defineComponent({ render, state, ...methods }) {
  class Component {
    #isMounted = false;
    #vdom = null;
    #hostEl = null;

    constructor(props = {}) {
      this.props = props;
      this.state = state ? state(props) : {};
    }

    updateState(state) {
      this.state = { ...this.state, ...state };
      this.#patch();
    }

    render() {
      // returns components view of the virtual dom
      return render.call(this);
    }

    get elements() {
      if (this.#vdom == null) {
        return [];
      }
      if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
        return extractChildren(this.#vdom).flatMap((child) => {
          if (child.type === DOM_TYPES.COMPONENT) {
            return child.component.elements;
          }
          return [child.el];
        });
      }
      // if vdom top node is a sigle node, return its element
      return [this.#vdom.el];
    }

    get firstElememt() {
      return this.elements[0];
    }

    get offset() {
      if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
        return Array.from(this.#hostEl.children).indexOf(this.firstElememt);
      }
      // if view isn't a fragment offset is 0
      return 0;
    }

    updateState(state) {
      this.state = { ...this.state, ...state };
      this.#patch();
    }
    render() {
      return render.call(this);
    }
    mount(hostEl, index = null) {
      if (this.#isMounted) {
        throw new Error("Component is already mounted");
      }
      this.#vdom = this.render();
      mountDOM(this.#vdom, hostEl, index, this);
      this.#hostEl = hostEl;
      this.#isMounted = true;
    }
    unmount() {
      if (!this.#isMounted) {
        throw new Error("Component is not mounted");
      }
      destroyDOM(this.#vdom);
      this.#vdom = null;
      this.#hostEl = null;
      this.#isMounted = false;
    }

    #patch() {
      if (!this.#isMounted) {
        throw new Error("Component is not mounted!");
      }

      const vdom = this.render();
      this.#vdom = patchDOM(this.#vdom, vdom, this.#hostEl);
    }
  }

  for (const method in methods) {
    if (hasOwnProperty(Component, method)) {
      throw new Error(`Method ${method} already exists on this component`);
    }
    Component.prototype[method] = methods[method];
  }
  return Component;
}
