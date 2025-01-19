import readAuthConfig from "./actions/readAuthConfig.js";
export class ForumSpark {
    apiToken;
    boardUrl;
    constructor(apiToken, boardUrl) {
        this.apiToken = apiToken;
        this.boardUrl = boardUrl;
    }
    async createTheme(name) {
        return (await this.request("themes", {
            method: "POST",
            body: JSON.stringify({
                name: name,
            }),
        }));
    }
    async updateCss(theme, css) {
        return (await this.request(`themes/${theme}/css`, {
            method: "PATCH",
            body: JSON.stringify({
                css,
            }),
        }));
    }
    async updateLayout(theme, layout) {
        return (await this.request(`themes/${theme}/layout`, {
            method: "PATCH",
            body: JSON.stringify({
                layout,
            }),
        }));
    }
    async request(endpoint, requestConfig) {
        const response = await fetch(`${this.boardUrl}/api/v1/${endpoint}`, {
            ...requestConfig,
            ...{
                headers: {
                    "User-Agent": "Spark Theme CLI 0.1",
                    Authorization: `Bearer ${this.apiToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                redirect: "error",
            },
        });
        if (!response.ok) {
            throw Error("Got bad response from API " + response.status);
        }
        return await response.json();
    }
}
export const createForumSparkClient = () => {
    const config = readAuthConfig();
    return new ForumSpark(config.api_key, config.board);
};
