import { expect, test } from "vitest";
import { objectsDiff } from "../utils/objects";

test("same object, no change", () => {
  const oldObj = { foo: "bar" };
  const newObj = { foo: "bar" };

  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual([]);
  expect(removed).toEqual([]);
  expect(updated).toEqual([]);
});

test("add key", () => {
  const oldObj = { foo: "bar" };
  const newObj = { foo: "bar", baz: "batch" };

  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual(["baz"]);
  expect(removed).toEqual([]);
  expect(updated).toEqual([]);
});

test("remove key", () => {
  const oldObj = { foo: "bar" };
  const newObj = {};

  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual([]);
  expect(removed).toEqual(["foo"]);
  expect(updated).toEqual([]);
});

test("updad key", () => {
  const oldObj = { foo: "bar" };
  const newObj = { foo: "baz" };

  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual([]);
  expect(removed).toEqual([]);
  expect(updated).toEqual(["foo"]);
});

test("multiple changes to keys", () => {
  const oldObj = { foo: "bar", pop: "whizz" };
  const newObj = { foo: "baz", bob: "burr" };

  const { added, removed, updated } = objectsDiff(oldObj, newObj);

  expect(added).toEqual(["bob"]);
  expect(removed).toEqual(["pop"]);
  expect(updated).toEqual(["foo"]);
});
