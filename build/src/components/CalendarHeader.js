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
import { Platform, Text, TouchableOpacity, View, } from 'react-native';
import { eventCellCss, u } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
import { isToday } from '../utils/datetime';
import { objHasContent, stringHasContent } from '../utils/object';
import { typedMemo } from '../utils/react';
function _CalendarHeader(_a) {
    var dateRange = _a.dateRange, cellHeight = _a.cellHeight, style = _a.style, allDayEventCellStyle = _a.allDayEventCellStyle, allDayEventCellTextColor = _a.allDayEventCellTextColor, allDayEvents = _a.allDayEvents, onPressDateHeader = _a.onPressDateHeader, onPressEvent = _a.onPressEvent, activeDate = _a.activeDate, _b = _a.headerContentStyle, headerContentStyle = _b === void 0 ? {} : _b, _c = _a.dayHeaderStyle, dayHeaderStyle = _c === void 0 ? {} : _c, _d = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _d === void 0 ? '' : _d, _e = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _e === void 0 ? '' : _e, _f = _a.showAllDayEventCell, showAllDayEventCell = _f === void 0 ? true : _f, _g = _a.hideHours, hideHours = _g === void 0 ? false : _g, _h = _a.showWeekNumber, showWeekNumber = _h === void 0 ? false : _h, _j = _a.weekNumberPrefix, weekNumberPrefix = _j === void 0 ? '' : _j, _k = _a.allDayEventCellAccessibilityProps, allDayEventCellAccessibilityProps = _k === void 0 ? {} : _k, _l = _a.headerContainerAccessibilityProps, headerContainerAccessibilityProps = _l === void 0 ? {} : _l, _m = _a.headerCellAccessibilityProps, headerCellAccessibilityProps = _m === void 0 ? {} : _m;
    var _onPressHeader = React.useCallback(function (date) {
        onPressDateHeader === null || onPressDateHeader === void 0 ? void 0 : onPressDateHeader(date);
    }, [onPressDateHeader]);
    var _onPressEvent = React.useCallback(function (event) {
        onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(event);
    }, [onPressEvent]);
    var theme = useTheme();
    var borderColor = { borderColor: theme.palette.gray['200'] };
    var primaryBg = { backgroundColor: theme.palette.primary.main };
    return (React.createElement(View, __assign({ style: [
            showAllDayEventCell ? u['border-b-2'] : {},
            showAllDayEventCell ? borderColor : {},
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            style,
        ] }, headerContainerAccessibilityProps),
        (!hideHours || showWeekNumber) && (React.createElement(View, { style: [u['z-10'], u['w-50'], u['pt-2'], borderColor] }, showWeekNumber ? (React.createElement(View, __assign({ style: [
                { height: cellHeight },
                objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
            ] }, headerCellAccessibilityProps),
            React.createElement(Text, { style: [
                    theme.typography.xs,
                    u['text-center'],
                    {
                        color: theme.palette.gray['500'],
                    },
                ] }, weekNumberPrefix),
            React.createElement(View, { style: objHasContent(dayHeaderStyle) ? dayHeaderStyle : [u['mb-6']] },
                React.createElement(Text, { style: [
                        {
                            color: theme.palette.gray['800'],
                        },
                        theme.typography.xl,
                        u['text-center'],
                    ] }, dateRange.length > 0
                    ? dateRange[0].startOf('week').add(4, 'days').isoWeek()
                    : '')))) : null)),
        dateRange.map(function (date) {
            var shouldHighlight = activeDate ? date.isSame(activeDate, 'date') : isToday(date);
            return (React.createElement(TouchableOpacity, __assign({ style: [u['flex-1'], u['pt-2']], onPress: function () { return _onPressHeader(date.toDate()); }, disabled: onPressDateHeader === undefined, key: date.toString() }, headerCellAccessibilityProps),
                React.createElement(View, { style: [
                        { height: cellHeight },
                        objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
                    ] },
                    React.createElement(Text, { style: [
                            theme.typography.xs,
                            u['text-center'],
                            {
                                color: shouldHighlight
                                    ? stringHasContent(weekDayHeaderHighlightColor)
                                        ? weekDayHeaderHighlightColor
                                        : theme.palette.primary.main
                                    : theme.palette.gray['500'],
                            },
                        ] }, date.format('ddd')),
                    React.createElement(View, { style: objHasContent(dayHeaderStyle)
                            ? dayHeaderStyle
                            : shouldHighlight
                                ? [
                                    primaryBg,
                                    u['h-36'],
                                    u['w-36'],
                                    u['pb-6'],
                                    u['rounded-full'],
                                    u['items-center'],
                                    u['justify-center'],
                                    u['self-center'],
                                    u['z-20'],
                                ]
                                : [u['mb-6']] },
                        React.createElement(Text, { style: [
                                {
                                    color: shouldHighlight
                                        ? stringHasContent(dayHeaderHighlightColor)
                                            ? dayHeaderHighlightColor
                                            : theme.palette.primary.contrastText
                                        : theme.palette.gray['800'],
                                },
                                theme.typography.xl,
                                u['text-center'],
                                Platform.OS === 'web' &&
                                    shouldHighlight &&
                                    !stringHasContent(dayHeaderHighlightColor) &&
                                    u['mt-6'],
                            ] }, date.format('D')))),
                showAllDayEventCell ? (React.createElement(View, { style: [
                        u['border-l'],
                        { borderColor: theme.palette.gray['200'] },
                        { height: cellHeight },
                    ] }, allDayEvents.map(function (event, index) {
                    if (!dayjs(date).isBetween(event.start, event.end, 'day', '[]')) {
                        return null;
                    }
                    var getEventStyle = typeof allDayEventCellStyle === 'function'
                        ? allDayEventCellStyle
                        : function () { return allDayEventCellStyle; };
                    return (React.createElement(TouchableOpacity, __assign({ style: [eventCellCss.style, primaryBg, u['mt-2'], getEventStyle(event)], key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end), onPress: function () { return _onPressEvent(event); } }, allDayEventCellAccessibilityProps),
                        React.createElement(Text, { style: {
                                fontSize: theme.typography.sm.fontSize,
                                color: allDayEventCellTextColor || theme.palette.primary.contrastText,
                            } }, event.title)));
                }))) : null));
        })));
}
export var CalendarHeader = typedMemo(_CalendarHeader);
//# sourceMappingURL=CalendarHeader.js.map