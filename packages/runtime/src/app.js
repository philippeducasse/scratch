import { destroyDOM } from "./destroy-dom";
import { mountDOM } from "./mount-dom";
import { Dispatcher } from "./dispatcher";
import { patchDOM } from "./patch-dom";

export function createApp(RootComponent, props = {}) {
  let parentEl = null;
  let vdom = null;
  let isMounted = false;

  function reset() {
    parentEl = null;
    vdom = null;
    isMounted = false;
  }

  return {
    mount(_parentEl) {
      if (isMounted) {
        throw new Error("App has already been mounted");
      }

      parentEl = _parentEl;
      vdom = h(RootComponent, props);
      mountDOM(vdom, parentEl);
      isMounted = true;
    },
    unmount() {
      if (!isMounted) {
        throw new Error("The application is not mounted");
      }
      destroyDOM(vdom);
      reset();
    },
  };
}
