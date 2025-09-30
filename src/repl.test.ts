import { cleanInput } from "./repl";
import { describe,test,expect } from "vitest";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
     {
        input: "  test  HELLO SIRRRR, HAHaaaa  ",
        expected: ["test", "hello","sirrrr,","hahaaaa"],
    }, 
    {
        input: "     Pikachu          Charmander Charazard bulBBYSAURkid ",
        expected: ["pikachu", "charmander","charazard","bulbbysaurkid"],
    }, 
]

)("cleanInput($input)", ({ input, expected }) => {
  test(`Expected1: ${expected}`, () => {
    let actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
  test(`Expected2: ${expected}`, () => {
    let actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});