import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args:string[] ) => Promise<void>;
};

export type State = {
    commands: Record<string,CLICommand>;
    readline: Interface;
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    pokedex: Record<string,Pokemon>
}

export function initState(cacheInterval: number) {
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
        pokeapi: new PokeAPI(cacheInterval),
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {},
    };

    return newState;
}