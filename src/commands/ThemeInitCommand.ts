import inquirer from "inquirer";
import select from "@inquirer/select";
import * as fs from "fs";
import { execSync } from "child_process";
import chalk from "chalk";
import { Theme } from "../types/Theme";
import { createForumSparkClient } from "../client.js";
import writeThemeConfig from "../actions/writeThemeConfig.js";
import ora from "ora";

export default async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's the name of your new theme?",
    },
  ]);

  const template = await select({
    message: "Which template would you like to start from?",
    choices: [
      {
        name: "Empty",
        value: "empty",
        description:
          "Start from an empty project, you can configure your own tools.",
      },
      {
        name: "Default Theme",
        value: "default",
        description: "Start from the ForumSpark default theme with tailwindcss",
      },
    ],
  });

  const config = {
    ...answers,
    version: "0.0.1",
    build_dir: "build",
  };

  try {
    const fsClient = createForumSparkClient();

    const theme: Theme = await fsClient.createTheme(config.name);

    if (template === "default") {
      const spinner = ora(`Cloning template`).start();
      execSync(
        `git clone --depth=1 --branch=main git@github.com:forumspark/default-theme.git ${config.name} && rm -rf ./${config.name}/.git`,
      );
      spinner.info("Installing dependencies");
      execSync(`npm install`, { cwd: config.name });
    } else {
      execSync(`npm init -y`, { cwd: config.name });
    }

    fs.mkdirSync(`${config.name}/build`, { recursive: true });
    const buildDir = `${config.name}/${config.build_dir}/`;
    try {
      fs.mkdirSync(buildDir);
    } catch (e) {}

    console.log(`Writing ${buildDir}theme.css`);
    fs.writeFileSync(`${buildDir}theme.css`, theme.css || "");
    console.log(`Writing ${buildDir}layout.html`);
    fs.writeFileSync(`${buildDir}layout.html`, theme.layout || "");

    writeThemeConfig(`${config.name}/`, {
      ...config,
      theme_id: theme.id,
    });

    console.log("\n\n");
    console.log(chalk.green(`Theme created! Start developing`));
    console.log(chalk.bgCyan(`cd ${config.name} && spark theme:dev`));
  } catch (e) {
    console.error(e);
  }
};
