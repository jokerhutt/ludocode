//This is for external runtimes provided by the pistonAPI

export type PistonRuntime = {
  language: string;
  version: string;
  aliases: string[];
  runtime?: string;
};
