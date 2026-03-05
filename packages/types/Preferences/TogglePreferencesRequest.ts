export type TogglePreferencesRequest = {
    value: boolean;
    key: PreferenceRequestKey
}

export type PreferenceRequestKey = "AI" | "AUDIO"