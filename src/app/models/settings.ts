export enum SettingsKeys {
  AlgoliaAppID = "AlgoliaAppID",
  AlgoliaSearchAPIKey = "AlgoliaSearchAPIKey",
  StripePubKey = "StripePubKey"
}

export interface SettingsInfo {
  AlgoliaAppID: string;
  AlgoliaSearchAPIKey: string;
  StripePubKey: string;
}
