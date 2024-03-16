"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsDTO = void 0;
var SettingsDTO = /** @class */ (function () {
    function SettingsDTO(_id, theme, dashboard) {
        if (theme === void 0) { theme = 'light'; }
        if (dashboard === void 0) { dashboard = { showWelcomeMessage: true }; }
        this._id = _id;
        this.theme = theme;
        this.dashboard = dashboard;
    }
    SettingsDTO.build = function (data) {
        return new SettingsDTO(data._id, data.theme, data.dashboard);
    };
    return SettingsDTO;
}());
exports.SettingsDTO = SettingsDTO;
