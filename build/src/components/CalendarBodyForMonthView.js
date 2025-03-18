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
import calendarize from 'calendarize';
import dayjs from 'dayjs';
import * as React from 'react';
import { Animated, Platform, Text, TouchableHighlight, TouchableOpacity, View, } from 'react-native';
import { u } from '../commonStyles';
import { useNow } from '../hooks/useNow';
import { useTheme } from '../theme/ThemeContext';
import { SIMPLE_DATE_FORMAT, getWeeksWithAdjacentMonths } from '../utils/datetime';
import { typedMemo } from '../utils/react';
import { CalendarEventForMonthView } from './CalendarEventForMonthView';
function _CalendarBodyForMonthView(_a) {
    var containerHeight = _a.containerHeight, targetDate = _a.targetDate, style = _a.style, onLongPressCell = _a.onLongPressCell, onPressCell = _a.onPressCell, onPressDateHeader = _a.onPressDateHeader, events = _a.events, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, calendarCellStyle = _a.calendarCellStyle, _c = _a.calendarCellAccessibilityPropsForMonthView, calendarCellAccessibilityPropsForMonthView = _c === void 0 ? {} : _c, _d = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _d === void 0 ? {} : _d, calendarCellTextStyle = _a.calendarCellTextStyle, hideNowIndicator = _a.hideNowIndicator, showAdjacentMonths = _a.showAdjacentMonths, renderEvent = _a.renderEvent, maxVisibleEventCount = _a.maxVisibleEventCount, weekStartsOn = _a.weekStartsOn, eventMinHeightForMonthView = _a.eventMinHeightForMonthView, moreLabel = _a.moreLabel, onPressMoreLabel = _a.onPressMoreLabel, sortedMonthView = _a.sortedMonthView, _e = _a.showWeekNumber, showWeekNumber = _e === void 0 ? false : _e, renderCustomDateForMonth = _a.renderCustomDateForMonth, disableMonthEventCellPress = _a.disableMonthEventCellPress;
    var now = useNow(!hideNowIndicator).now;
    var _f = React.useState(0), calendarWidth = _f[0], setCalendarWidth = _f[1];
    var _g = React.useState(0), calendarCellHeight = _g[0], setCalendarCellHeight = _g[1];
    var weeks = showAdjacentMonths
        ? getWeeksWithAdjacentMonths(targetDate, weekStartsOn)
        : calendarize(targetDate.toDate(), weekStartsOn);
    var minCellHeight = containerHeight / 5 - 30;
    var theme = useTheme();
    var getCalendarCellStyle = React.useMemo(function () { return (typeof calendarCellStyle === 'function' ? calendarCellStyle : function () { return calendarCellStyle; }); }, [calendarCellStyle]);
    var getCalendarCellTextStyle = React.useMemo(function () {
        return typeof calendarCellTextStyle === 'function'
            ? calendarCellTextStyle
            : function () { return calendarCellTextStyle; };
    }, [calendarCellTextStyle]);
    var sortedEvents = React.useCallback(function (day) {
        if (!sortedMonthView) {
            return events.filter(function (_a) {
                var start = _a.start, end = _a.end;
                return day.isBetween(dayjs(start).startOf('day'), dayjs(end).endOf('day'), null, '[)');
            });
        }
        /**
         * Better way to sort overlapping events that spans accross multiple days
         * For example, if you want following events
         * Event 1, start = 01/01 12:00, end = 02/01 12:00
         * Event 2, start = 02/01 12:00, end = 03/01 12:00
         * Event 3, start = 03/01 12:00, end = 04/01 12:00
         *
         * When drawing calendar in month view, event 3 should be placed at 3rd index for 03/01, because Event 2 are placed at 2nd index for 02/01 and 03/01
         *
         */
        var min = day.startOf('day');
        var max = day.endOf('day');
        //filter all events that starts from the current week until the current day, and sort them by reverse starting time
        var filteredEvents = events
            .filter(function (_a) {
            var start = _a.start, end = _a.end;
            return dayjs(end).isAfter(day.startOf('week')) && dayjs(start).isBefore(max);
        })
            .sort(function (a, b) {
            if (dayjs(a.start).isSame(b.start, 'day')) {
                var aDuration = dayjs.duration(dayjs(a.end).diff(dayjs(a.start))).days();
                var bDuration = dayjs.duration(dayjs(b.end).diff(dayjs(b.start))).days();
                return aDuration - bDuration;
            }
            return b.start.getTime() - a.start.getTime();
        });
        /**
         * find the most relevant min date to filter the events
         * in the example:
         * 1. when rendering for 01/01, min date will be 01/01 (start of day for event 1)
         * 2. when rendering for 02/01, min date will be 01/01 (start of day for event 1)
         * 3. when rendering for 03/01, min date will be 01/01 (start of day for event 1)
         * 4. when rendering for 04/01, min date will be 01/01 (start of day for event 1)
         * 5. when rendering for 05/01, min date will be 05/01 (no event overlaps with 05/01)
         */
        for (var _i = 0, filteredEvents_1 = filteredEvents; _i < filteredEvents_1.length; _i++) {
            var _a = filteredEvents_1[_i], start = _a.start, end = _a.end;
            if (dayjs(end).isAfter(min) && dayjs(start).isBefore(min)) {
                min = dayjs(start).startOf('day');
            }
        }
        filteredEvents = filteredEvents
            .filter(function (_a) {
            var start = _a.start, end = _a.end;
            return dayjs(end).endOf('day').isAfter(min) && dayjs(start).isBefore(max);
        })
            .reverse();
        /**
         * We move eligible event to the top
         * For example, when rendering for 03/01, Event 3 should be moved to the top, since there is a gap left by Event 1
         */
        var finalEvents = [];
        var tmpDay = day.startOf('week');
        //re-sort events from the start of week until the calendar cell date
        //optimize sorting of event nodes and make sure that no empty gaps are left on top of calendar cell
        while (!tmpDay.isAfter(day)) {
            for (var _b = 0, filteredEvents_2 = filteredEvents; _b < filteredEvents_2.length; _b++) {
                var event = filteredEvents_2[_b];
                if (dayjs(event.end).isBefore(tmpDay.startOf('day'))) {
                    var eventToMoveUp = filteredEvents.find(function (e) {
                        return dayjs(e.start).startOf('day').isSame(tmpDay.startOf('day'));
                    });
                    if (eventToMoveUp !== undefined) {
                        //remove eventToMoveUp from finalEvents first
                        if (finalEvents.indexOf(eventToMoveUp) > -1) {
                            finalEvents.splice(finalEvents.indexOf(eventToMoveUp), 1);
                        }
                        if (finalEvents.indexOf(event) > -1) {
                            finalEvents.splice(finalEvents.indexOf(event), 1, eventToMoveUp);
                        }
                        else {
                            finalEvents.push(eventToMoveUp);
                        }
                    }
                }
                else if (finalEvents.indexOf(event) === -1) {
                    finalEvents.push(event);
                }
            }
            tmpDay = tmpDay.add(1, 'day');
        }
        return finalEvents;
    }, [events, sortedMonthView]);
    var renderDateCell = function (date, index) {
        if (date && renderCustomDateForMonth) {
            return renderCustomDateForMonth(date.toDate());
        }
        return (React.createElement(Text, { style: [
                { textAlign: 'center' },
                theme.typography.sm,
                {
                    color: (date === null || date === void 0 ? void 0 : date.format(SIMPLE_DATE_FORMAT)) === now.format(SIMPLE_DATE_FORMAT)
                        ? theme.palette.primary.main
                        : (date === null || date === void 0 ? void 0 : date.month()) !== targetDate.month()
                            ? theme.palette.gray['500']
                            : theme.palette.gray['800'],
                },
                __assign({}, getCalendarCellTextStyle(date === null || date === void 0 ? void 0 : date.toDate(), index)),
            ] }, date === null || date === void 0 ? void 0 : date.format('D')));
    };
    return (React.createElement(View, { style: [
            {
                height: containerHeight,
            },
            u['flex-column'],
            u['flex-1'],
            u['border-b'],
            u['border-l'],
            u['border-r'],
            u.rounded,
            { borderColor: theme.palette.gray['200'] },
            style,
        ], onLayout: function (_a) {
            var layout = _a.nativeEvent.layout;
            setCalendarWidth(layout.width);
        } }, weeks.map(function (week, i) { return (React.createElement(View, { key: "".concat(i, "-").concat(week.join('-')), style: [
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            Platform.OS === 'android' && style, // TODO: in Android, backgroundColor is not applied to child components
            {
                minHeight: minCellHeight,
            },
        ] },
        showWeekNumber ? (React.createElement(View, __assign({ style: [
                i > 0 && u['border-t'],
                { borderColor: theme.palette.gray['200'] },
                u['p-2'],
                u['w-20'],
                u['flex-column'],
                {
                    minHeight: minCellHeight,
                },
            ], key: 'weekNumber' }, calendarCellAccessibilityProps),
            React.createElement(Text, { style: [
                    { textAlign: 'center' },
                    theme.typography.sm,
                    {
                        color: theme.palette.gray['800'],
                    },
                ] }, week.length > 0
                ? targetDate.date(week[0]).startOf('week').add(4, 'days').isoWeek()
                : ''))) : null,
        week
            .map(function (d) {
            return showAdjacentMonths ? targetDate.date(d) : d > 0 ? targetDate.date(d) : null;
        })
            .map(function (date, ii) { return (React.createElement(TouchableOpacity, __assign({ onLongPress: function () { return date && onLongPressCell && onLongPressCell(date.toDate()); }, onPress: function () { return date && onPressCell && onPressCell(date.toDate()); }, style: [
                i > 0 && u['border-t'],
                theme.isRTL && (ii > 0 || showWeekNumber) && u['border-r'],
                !theme.isRTL && (ii > 0 || showWeekNumber) && u['border-l'],
                { borderColor: theme.palette.gray['200'] },
                u['p-2'],
                u['flex-1'],
                u['flex-column'],
                {
                    minHeight: minCellHeight,
                    zIndex: ii * -1,
                },
                __assign({}, getCalendarCellStyle(date === null || date === void 0 ? void 0 : date.toDate(), i)),
            ], key: "".concat(ii, "-").concat(date === null || date === void 0 ? void 0 : date.toDate()), onLayout: function (_a) {
                var layout = _a.nativeEvent.layout;
                // Only set calendarCellHeight once because they are all same
                // Only set calendarCellHeight if disableMonthEventCellPress is true, since calendarCellHeihgt is only used when disableMonthEventCellPress is true
                return i === 0 &&
                    ii === 0 &&
                    disableMonthEventCellPress &&
                    setCalendarCellHeight(layout.height);
            } }, calendarCellAccessibilityPropsForMonthView),
            React.createElement(TouchableOpacity, __assign({ onPress: function () {
                    return date &&
                        (onPressDateHeader
                            ? onPressDateHeader(date.toDate())
                            : onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date.toDate()));
                }, onLongPress: function () {
                    return date &&
                        (onPressDateHeader
                            ? onPressDateHeader(date.toDate())
                            : onLongPressCell === null || onLongPressCell === void 0 ? void 0 : onLongPressCell(date.toDate()));
                } }, calendarCellAccessibilityProps), renderDateCell(date, i)),
            //Calendar body will re-render after calendarWidth/calendarCellHeight is set from layout event, prevent expensive operation during first render
            calendarWidth > 0 &&
                (!disableMonthEventCellPress || calendarCellHeight > 0) &&
                date &&
                sortedEvents(date).reduce(function (elements, event, index, events) { return __spreadArray(__spreadArray([], elements, true), [
                    index > maxVisibleEventCount ? null : index === maxVisibleEventCount ? (React.createElement(Text, { key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end), style: [
                            theme.typography.moreLabel,
                            { marginTop: 2, color: theme.palette.moreLabel },
                        ], onPress: function () { return onPressMoreLabel === null || onPressMoreLabel === void 0 ? void 0 : onPressMoreLabel(events, date.toDate()); } }, moreLabel.replace('{moreCount}', "".concat(events.length - maxVisibleEventCount)))) : (React.createElement(CalendarEventForMonthView, { key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end), event: event, eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, onPressEvent: onPressEvent, renderEvent: renderEvent, date: date, dayOfTheWeek: ii, calendarWidth: calendarWidth, isRTL: theme.isRTL, eventMinHeightForMonthView: eventMinHeightForMonthView, showAdjacentMonths: showAdjacentMonths })),
                ], false); }, []),
            disableMonthEventCellPress &&
                calendarCellHeight > 0 && ( //if calendarCellHeight has not been set from layout event, then don't render the element since it will be 0 height
            /* In this case, we render `TouchableGradually` on the date cell to prevent event cell's touch events from being called. */
            React.createElement(TouchableGradually, __assign({ style: {
                    height: calendarCellHeight,
                    width: Math.floor(calendarWidth / 7),
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }, onLongPress: function () { return date && onLongPressCell && onLongPressCell(date.toDate()); }, onPress: function () { return date && onPressCell && onPressCell(date.toDate()); } }, calendarCellAccessibilityProps))))); }))); })));
}
export var CalendarBodyForMonthView = typedMemo(_CalendarBodyForMonthView);
/**
 * A utility component which prevents event cells from being pressed in Month View.
 */
function TouchableGradually(_a) {
    var onLongPress = _a.onLongPress, onPress = _a.onPress, style = _a.style;
    var backgroundColor = React.useRef(new Animated.Value(0)).current;
    var handlePressIn = function () {
        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };
    var handlePressOut = function () {
        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };
    return (React.createElement(TouchableHighlight, { onLongPress: onLongPress, onPressIn: handlePressIn, onPressOut: handlePressOut, onPress: onPress, underlayColor: "transparent", style: style },
        React.createElement(Animated.View, { style: [
                {
                    backgroundColor: backgroundColor.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)'],
                    }),
                },
                style,
            ] })));
}
//# sourceMappingURL=CalendarBodyForMonthView.js.map