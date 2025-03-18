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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import dayjs from 'dayjs';
import React from 'react';
import { FlatList, Platform, Text, View, } from 'react-native';
import { u } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
import { SIMPLE_DATE_FORMAT, getCountOfEventsAtEvent, getOrderOfEvent, isToday, } from '../utils/datetime';
import { stringHasContent } from '../utils/object';
import { typedMemo } from '../utils/react';
import { CalendarEvent } from './CalendarEvent';
function _Schedule(_a) {
    var events = _a.events, ampm = _a.ampm, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, showTime = _a.showTime, isEventOrderingEnabled = _a.isEventOrderingEnabled, overlapOffset = _a.overlapOffset, renderEvent = _a.renderEvent, containerHeight = _a.containerHeight, style = _a.style, activeDate = _a.activeDate, _c = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _c === void 0 ? '' : _c, _d = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _d === void 0 ? '' : _d, itemSeparatorComponent = _a.itemSeparatorComponent, locale = _a.locale, _e = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _e === void 0 ? {} : _e, scheduleMonthSeparatorStyle = _a.scheduleMonthSeparatorStyle;
    var theme = useTheme();
    /**
     * Bind default style for eventCellStyle.
     */
    var eventStyles = React.useCallback(function (event) {
        // This default style  need for Schedule view
        var defaultEventStyle = __assign(__assign({}, u['flex-column']), u['h-50']);
        if (Array.isArray(eventCellStyle)) {
            return __spreadArray(__spreadArray([], [defaultEventStyle], false), eventCellStyle, true);
        }
        if (typeof eventCellStyle === 'object') {
            return __assign(__assign({}, defaultEventStyle), eventCellStyle);
        }
        if (typeof eventCellStyle === 'function') {
            var output = eventCellStyle(event);
            if (Array.isArray(output)) {
                return __spreadArray(__spreadArray([], [defaultEventStyle], false), output, true);
            }
            if (typeof output === 'object') {
                return __assign(__assign({}, defaultEventStyle), output);
            }
        }
        return defaultEventStyle;
    }, [eventCellStyle]);
    /**
     * Group by events by start date.
     */
    var getItem = React.useMemo(function () {
        var groupedData = events
            .sort(function (a, b) { return dayjs(a.start).diff(b.start); })
            .reduce(function (result, item) {
            var startDate = dayjs(item.start).format(SIMPLE_DATE_FORMAT);
            if (!result[startDate]) {
                result[startDate] = [];
            }
            result[startDate].push(item);
            return result;
        }, {});
        return Object.values(groupedData);
    }, [events]);
    var renderMonthSeparator = function (date) { return (React.createElement(View, { style: { width: '100%' } },
        React.createElement(Text, { style: [
                { color: theme.palette.primary.main, textAlign: 'center', paddingVertical: 6 },
                scheduleMonthSeparatorStyle,
            ] }, date.format('MMMM YYYY')))); };
    var renderFlatListItem = function (eventGroup, index) {
        var date = dayjs(eventGroup[0].start).locale(locale);
        var shouldHighlight = activeDate ? date.isSame(activeDate, 'date') : isToday(date);
        var isNewMonth = index === 0 || !dayjs(eventGroup[0].start).isSame(getItem[index - 1][0].start, 'month');
        return (React.createElement(View, { style: [u.flex, { padding: 2, flexWrap: 'wrap' }] },
            isNewMonth && renderMonthSeparator(date),
            React.createElement(View, { style: [u.flex, u['justify-center'], { width: '20%' }] },
                React.createElement(View, __assign({ style: [
                        { width: 60, height: 60, borderRadius: 30 },
                        u.flex,
                        u['justify-center'],
                        u['items-center'],
                        u['flex-column-reverse'],
                    ] }, calendarCellAccessibilityProps),
                    React.createElement(Text, { style: [
                            {
                                color: shouldHighlight
                                    ? stringHasContent(dayHeaderHighlightColor)
                                        ? dayHeaderHighlightColor
                                        : theme.palette.primary.main
                                    : theme.palette.gray['800'],
                            },
                            theme.typography.xl,
                            u['text-center'],
                            Platform.OS === 'web' &&
                                shouldHighlight &&
                                !stringHasContent(dayHeaderHighlightColor) &&
                                u['mt-6'],
                        ] }, date.format('D')),
                    React.createElement(Text, { style: [
                            theme.typography.xs,
                            {
                                color: shouldHighlight
                                    ? stringHasContent(weekDayHeaderHighlightColor)
                                        ? weekDayHeaderHighlightColor
                                        : theme.palette.primary.main
                                    : theme.palette.gray['500'],
                            },
                        ] }, date.format('ddd')))),
            React.createElement(View, { style: [u.flex, u['flex-column'], { width: '75%' }] }, eventGroup.map(function (event, index) {
                return (React.createElement(View, { style: [u['flex-1'], u['overflow-hidden'], { marginTop: 2, marginBottom: 2 }], key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end) },
                    React.createElement(CalendarEvent, { key: "".concat(index).concat(event.start).concat(event.title).concat(event.end), event: event, onPressEvent: onPressEvent, eventCellStyle: eventStyles, eventCellAccessibilityProps: eventCellAccessibilityProps, showTime: showTime, eventCount: isEventOrderingEnabled ? getCountOfEventsAtEvent(event, events) : undefined, eventOrder: isEventOrderingEnabled ? getOrderOfEvent(event, events) : undefined, overlapOffset: overlapOffset, renderEvent: renderEvent, ampm: ampm, mode: "schedule" })));
            }))));
    };
    return (React.createElement(View, { style: __assign(__assign({}, style), { height: containerHeight }) },
        React.createElement(FlatList, { data: getItem, renderItem: function (_a) {
                var item = _a.item;
                return renderFlatListItem(item, getItem.indexOf(item));
            }, ItemSeparatorComponent: itemSeparatorComponent, keyExtractor: function (_, index) { return index.toString(); } })));
}
export var Schedule = typedMemo(_Schedule);
//# sourceMappingURL=Schedule.js.map