import chalk from "chalk";
import chokidar from "chokidar";
import { basename } from "path";
import ora from "ora";
import readConfig from "../actions/readThemeConfig.js";
import { createForumSparkClient } from "../client.js";
import * as fs from "fs";

export default async () => {
  const config = readConfig();
  const client = createForumSparkClient();

  console.log(
    chalk.cyan("⚡️ Spark Theme Dev is ready and waiting for changes...\n"),
  );

  chokidar
    .watch(config.build_dir, { ignoreInitial: true })
    .on("all", async (event, filePath) => {
      if (basename(filePath) === "theme.css") {
        const spinner = ora(`Synchronising theme stylesheet...`).start();
        try {
          await client.updateCss(
            config.theme_id,
            fs.readFileSync(filePath, "utf8"),
          );
          spinner.succeed("Synchronised stylesheet!");
        } catch (e) {
          spinner.fail("Error syncing stylesheet");
          console.error(e);
        }
        return;
      }

      if (basename(filePath) === "layout.html") {
        const spinner = ora(`Synchronising theme layout...`).start();
        try {
          await client.updateLayout(
            config.theme_id,
            fs.readFileSync(filePath, "utf8"),
          );
          spinner.succeed("Synchronised layout!");
        } catch (e) {
          spinner.fail("Error syncing layout");
        }
        return;
      }
    });
};
