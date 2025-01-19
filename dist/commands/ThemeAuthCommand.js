import inquirer from "inquirer";
import confirm from "@inquirer/confirm";
import chalk from "chalk";
import writeAuthConfig from "../actions/writeAuthConfig.js";
import readAuthConfig from "../actions/readAuthConfig.js";
export default async () => {
    try {
        readAuthConfig();
        const confirmation = await confirm({
            message: "A ForumSpark auth config already exists, continue?",
            default: false,
        });
        if (!confirmation) {
            return;
        }
    }
    catch (err) {
        // do nothing
    }
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "board",
            message: "ForumSpark URL:",
        },
        {
            type: "input",
            name: "api_key",
            message: "API key:",
        },
    ]);
    writeAuthConfig({
        board: answers.board.trim(),
        api_key: answers.api_key.trim(),
    });
    console.log(chalk.green("Board URL and API Key set"));
};
