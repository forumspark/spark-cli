import * as fs from "fs";
export default () => {
    try {
        const config = fs.readFileSync("config.json", "utf8");
        return JSON.parse(config);
    }
    catch (err) {
        throw new Error("Could not log config!");
    }
};
