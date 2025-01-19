import * as fs from "fs";
import { homedir } from "os";
import { AuthConfig } from "../types/AuthConfig";

export default (config: AuthConfig) => {
  fs.writeFileSync(
    `${homedir()}/.forumspark_auth.json`,
    JSON.stringify(config),
  );
};
