import * as fs from "fs";
import { homedir } from "os";
import { AuthConfig } from "../types/AuthConfig";

export default () => {
  try {
    const config = fs.readFileSync(
      `${homedir()}/.forumspark_auth.json`,
      "utf8",
    );
    return JSON.parse(config) as unknown as AuthConfig;
  } catch (err) {
    throw new Error("Could not load auth config!");
  }
};
