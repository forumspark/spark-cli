import * as fs from "fs";
import { ThemeConfig } from "../types/ThemeConfig";

export default () => {
  try {
    const config = fs.readFileSync("config.json", "utf8");
    return JSON.parse(config) as unknown as ThemeConfig;
  } catch (err) {
    throw new Error("Could not log config!");
  }
};
