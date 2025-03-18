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
import dayjs from 'dayjs';
import * as React from 'react';
import { Text, View } from 'react-native';
import { u } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
import { getDatesInWeek } from '../utils/datetime';
import { typedMemo } from '../utils/react';
function _CalendarHeaderForMonthView(_a) {
    var locale = _a.locale, weekStartsOn = _a.weekStartsOn, style = _a.style, _b = _a.showWeekNumber, showWeekNumber = _b === void 0 ? false : _b, _c = _a.weekNumberPrefix, weekNumberPrefix = _c === void 0 ? '' : _c, _d = _a.headerContainerAccessibilityProps, headerContainerAccessibilityProps = _d === void 0 ? {} : _d, _e = _a.headerCellAccessibilityProps, headerCellAccessibilityProps = _e === void 0 ? {} : _e;
    var dates = getDatesInWeek(new Date(), weekStartsOn, locale);
    var todayWeekNum = dayjs().day();
    var theme = useTheme();
    return (React.createElement(View, __assign({ style: [
            u['border-b'],
            { borderColor: theme.palette.gray['100'] },
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            style,
        ] }, headerContainerAccessibilityProps),
        showWeekNumber ? (React.createElement(View, __assign({ style: [u['w-20'], { paddingTop: 2 }], key: 'weekNumber' }, headerCellAccessibilityProps),
            React.createElement(View, { style: { flex: 1, height: 30 } },
                React.createElement(Text, { style: [
                        u['text-center'],
                        {
                            color: theme.palette.gray['800'],
                        },
                    ] }, weekNumberPrefix !== undefined ? weekNumberPrefix : '')))) : null,
        dates.map(function (date) { return (React.createElement(View, __assign({ style: { flex: 1, paddingTop: 2 }, key: date.toISOString() }, headerCellAccessibilityProps),
            React.createElement(View, { style: { height: 30 } },
                React.createElement(Text, { style: [
                        u['text-center'],
                        {
                            color: todayWeekNum === date.day()
                                ? theme.palette.primary.main
                                : theme.palette.gray['800'],
                        },
                    ] }, date.format('ddd'))))); })));
}
export var CalendarHeaderForMonthView = typedMemo(_CalendarHeaderForMonthView);
//# sourceMappingURL=CalendarHeaderForMonthView.js.map