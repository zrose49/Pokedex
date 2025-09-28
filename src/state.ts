import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
    commands: Record<string,CLICommand>;
    readline: Interface;
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
}

export function initState() {
    //create readline interface
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Enter your prompt ",
    });

    //create commands registry
    const commands = getCommands();

    const newState: State = {
        commands: commands,
        readline: rl,
        pokeapi: new PokeAPI(),
        nextLocationsURL: "",
        prevLocationsURL: "",
    };

    return newState;
}