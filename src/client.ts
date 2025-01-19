import { Theme } from "./types/Theme";
import readAuthConfig from "./actions/readAuthConfig.js";

export class ForumSpark {
  constructor(
    private apiToken: string,
    private boardUrl: string,
  ) {}

  async createTheme(name: string): Promise<Theme> {
    return (await this.request("themes", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
    })) as unknown as Theme;
  }

  async updateCss(theme: number, css: string): Promise<Theme> {
    return (await this.request(`themes/${theme}/css`, {
      method: "PATCH",
      body: JSON.stringify({
        css,
      }),
    })) as unknown as Theme;
  }

  async updateLayout(theme: number, layout: string): Promise<Theme> {
    return (await this.request(`themes/${theme}/layout`, {
      method: "PATCH",
      body: JSON.stringify({
        layout,
      }),
    })) as unknown as Theme;
  }

  private async request(endpoint: string, requestConfig: RequestInit) {
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
