import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    commands: Record<string,CLICommand>;
    readline: Interface;
}

export function initState(): State {
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
    }

    return newState;
}