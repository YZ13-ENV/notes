import { AppConfig } from "./types/config";

export const config: AppConfig = {
    name: "Keeper",
    version: "0.0.1",
    status: "development",
    app: {
        hasAuthPage: true,
        hasDashboardPage: false,
        hasProfilePageByNickname: false,
        hasHomePage: false,
        hasSearchPage: false
    },
    features: {
        enableLightMode: false,
        enableAppsGrid: false,
        enableNotifications: false
    },
    remote: {
        domain: "https://notes.darkmaterial.space",
        logo: {
            dark: "dm/dm-dark.svg",
            light: "dm/dm-light.svg"
        }
    }
}