import { createApp, h, hString } from "../../node_modules/philo-scratch/dist/philo-scratch";

createApp({
  state: 0,
  reducers: {
    add: (state, amount) => state + amount,
  },
  view: (state, emit) => {
    h("button", { on: { click: () => emit("add", 1) } }, [hString(state)]);
  },
}).mount(document.body);
