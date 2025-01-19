#!/usr/bin/env node
import { program } from "commander";
import ThemeInitCommand from "./commands/ThemeInitCommand.js";
import ThemeAuthCommand from "./commands/ThemeAuthCommand.js";
import ThemeDevCommand from "./commands/ThemeDevCommand.js";
program.version("1.0.0").description("ForumSpark Theme Dev Kit");
program.command("theme:init").action(() => {
    ThemeInitCommand().then();
});
program.command("theme:auth").action(() => {
    ThemeAuthCommand().then();
});
// program.command("theme:pull").action(() => {
//   ThemePullCommand();
// });
// program.command("theme:list").action(() => {
//   ThemeListCommand();
// });
program.command("theme:dev").action(() => {
    ThemeDevCommand().then();
});
program.parse(process.argv);
