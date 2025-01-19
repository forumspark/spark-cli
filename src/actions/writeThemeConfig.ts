import * as fs from "fs";
import { ThemeConfig } from "../types/ThemeConfig";

export default (path: string, config: ThemeConfig) => {
  fs.writeFileSync(`${path}config.json`, JSON.stringify(config));
};
