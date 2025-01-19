import * as fs from "fs";
import { homedir } from "os";
export default () => {
    try {
        const config = fs.readFileSync(`${homedir()}/.forumspark_auth.json`, "utf8");
        return JSON.parse(config);
    }
    catch (err) {
        throw new Error("Could not load auth config!");
    }
};
