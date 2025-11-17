# AOC Framework

A tool for bootstrapping and running your Advent Of Code solutions in typescript, inspired by vitest.

## Features

- out of the box typescript support
- switching between test data and real data without restarting the process
- automatic restarting on code changes

## How to use

Clone the repo and then run

```sh
pnpm install # Installs dependecies
pnpm -C framework build # Builds internal framework
```

Take a look at `aoc.config.ts`. All of the possible configuration options are described with JSDoc. Also be sure to set your token in `.env` file.

Run `pnpm aoc bootstrap <day>` to download input and create files. You can then execute the code by running `pnpm aoc dev <day> <part>`. There are keyboard shortcuts available during the develeopment command.

| Key | Function                                          |
| --- | ------------------------------------------------- |
| `r` | Restarts the execution                            |
| `t` | Switches between `input.txt` and `input.test.txt` |
| `q` | Exits the program                                 |
