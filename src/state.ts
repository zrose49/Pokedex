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
    prevLocationsURL: string | null;
}

export async function initState(): Promise<State> {
    //create readline interface
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Enter your prompt ",
    });

    //create commands registry
    const commands = getCommands();

    const poke = new PokeAPI;
    const locations = await poke.fetchLocations();
    const nextLocationsURL = locations.next;
    const prevLocationsURL = locations.previous;

    const newState: State = {
        commands: commands,
        readline: rl,
        pokeapi: poke,
        nextLocationsURL: nextLocationsURL,
        prevLocationsURL: prevLocationsURL,
    };

    return newState;
}