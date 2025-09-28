import { commandExit } from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import {commandMapBackward, commandMapForward } from "./command_map.js";
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
      callback: commandMapForward,
    },

    mapb: {
      name: "mapb",
      description: "Displays the names of the previous 20 location areas",
      callback: commandMapBackward,
    }
  };
}