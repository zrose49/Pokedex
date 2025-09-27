import { commandExit } from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import {commandMap } from "./command_map.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
        name: "help",
        description: "Prints helpful information about each command",
        callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the names of the next 20 location areas",
      callback: commandMap,
    }
  };
}