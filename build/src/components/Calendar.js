var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { defaultTheme } from '../theme/defaultTheme';
import { deepMerge } from '../utils/object';
import { typedMemo } from '../utils/react';
import { CalendarContainer } from './CalendarContainer';
dayjs.extend(isBetween);
function _Calendar(_a) {
    var _b = _a.theme, theme = _b === void 0 ? defaultTheme : _b, isRTL = _a.isRTL, props = __rest(_a, ["theme", "isRTL"]);
    var _theme = deepMerge(defaultTheme, theme);
    // TODO: Old prop support. This should be included in custom theme itself.
    if (isRTL !== undefined) {
        _theme.isRTL = isRTL;
    }
    return (React.createElement(ThemeContext.Provider, { value: _theme },
        React.createElement(CalendarContainer, __assign({}, props))));
}
export var Calendar = typedMemo(_Calendar);
//# sourceMappingURL=Calendar.js.map