export declare class SettingsDTO {
    _id: string;
    theme: 'light' | 'dark';
    dashboard: {
        showWelcomeMessage: boolean;
    };
    constructor(_id: string, theme?: 'light' | 'dark', dashboard?: {
        showWelcomeMessage: boolean;
    });
    static build(data: any): SettingsDTO;
}
