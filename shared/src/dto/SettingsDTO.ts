export class SettingsDTO {
    constructor(
        public _id: string,
        public theme: 'light' | 'dark' = 'light',
        public dashboard: { showWelcomeMessage: boolean } = { showWelcomeMessage: true }
    ) { }

    public static build(data: any): SettingsDTO {
        return new SettingsDTO(data._id, data.theme, data.dashboard);
    }
}