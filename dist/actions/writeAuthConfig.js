import * as fs from "fs";
import { homedir } from "os";
export default (config) => {
    fs.writeFileSync(`${homedir()}/.forumspark_auth.json`, JSON.stringify(config));
};
