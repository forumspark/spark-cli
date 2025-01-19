import * as fs from "fs";
export default (path, config) => {
    fs.writeFileSync(`${path}config.json`, JSON.stringify(config));
};
