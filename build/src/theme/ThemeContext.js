import { createContext, useContext } from 'react';
import { defaultTheme } from './defaultTheme';
export var ThemeContext = createContext(defaultTheme);
export var useTheme = function () {
    var customTheme = useContext(ThemeContext);
    if (!customTheme) {
        return defaultTheme;
    }
    return customTheme;
};
//# sourceMappingURL=ThemeContext.js.map