import { createApp, h, hFragment } from "https://unpkg.com/philo-scratch@1";

const state = {
  currentTodo: "",
  edit: { idx: null, original: null, edited: null },
  todos: ["Water the plants", "Take the bins out", "Wipe the counters"],
};

const reducers = {
  "update-current-todo": (state, currentTodo) => ({
    ...state,
    currentTodo,
  }),

  "add-todo": (state) => ({
    ...state,
    currentTodo: "",
    todos: [...state.todos, state.currentTodo],
  }),

  "start-editing-todo": (state, idx) => ({
    ...state,
    edit: {
      idx,
      original: state.todos[idx],
      edited: state.todos[idx],
    },
  }),

  "edit-todo": (state, edited) => ({
    ...state,
    edit: { ...state.edit, edited },
  }),

  "save-edited-todo": (state) => {
    const todos = [...state.todos];
    todos[state.edit.idx] = state.edit.edited;

    return { ...state, edit: { idx: null, original: null, edited: null }, todos };
  },

  "cancelediting-todo": (state) => ({
    ...state,
    edit: { idx: null, original: null, edited: null },
  }),

  "remove-todo": (state, idx) => ({
    ...state,
    todos: state.todos.filter((_, i) => i !== idx),
  }),
};
