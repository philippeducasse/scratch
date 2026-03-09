import { mountDOM } from "./mount-dom";
import { destroyDOM } from "./destroy-dom";
import { patchDOM } from "./patch-dom";

export function defineComponent({ render, state }) {
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

    mount(hostEl, index = null) {
      if (this.#isMounted) {
        throw new Error("Component is already mounted");
      }
      this.#vdom = this.render();
      mountDOM(this.#vdom, hostEl, index);
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
  return Component;
}
