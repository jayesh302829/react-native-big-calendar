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
import { Platform, ScrollView, StyleSheet, View, } from 'react-native';
import { u } from '../commonStyles';
import { useNow } from '../hooks/useNow';
import { useTheme } from '../theme/ThemeContext';
import { SIMPLE_DATE_FORMAT, enrichEvents, getCountOfEventsAtEvent, getOrderOfEvent, getRelativeTopInDay, isToday, } from '../utils/datetime';
import { typedMemo } from '../utils/react';
import { CalendarEvent } from './CalendarEvent';
import { HourGuideCell } from './HourGuideCell';
import { HourGuideColumn } from './HourGuideColumn';
var styles = StyleSheet.create({
    nowIndicator: {
        position: 'absolute',
        zIndex: 10000,
        height: 2,
        width: '100%',
    },
});
function _CalendarBody(_a) {
    var containerHeight = _a.containerHeight, cellHeight = _a.cellHeight, dateRange = _a.dateRange, style = _a.style, onLongPressCell = _a.onLongPressCell, onPressCell = _a.onPressCell, events = _a.events, onPressEvent = _a.onPressEvent, eventCellTextColor = _a.eventCellTextColor, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, calendarCellStyle = _a.calendarCellStyle, _c = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _c === void 0 ? {} : _c, ampm = _a.ampm, showTime = _a.showTime, scrollOffsetMinutes = _a.scrollOffsetMinutes, hideNowIndicator = _a.hideNowIndicator, overlapOffset = _a.overlapOffset, renderEvent = _a.renderEvent, _d = _a.headerComponent, headerComponent = _d === void 0 ? null : _d, _e = _a.headerComponentStyle, headerComponentStyle = _e === void 0 ? {} : _e, _f = _a.hourStyle, hourStyle = _f === void 0 ? {} : _f, _g = _a.hideHours, hideHours = _g === void 0 ? false : _g, _h = _a.minHour, minHour = _h === void 0 ? 0 : _h, _j = _a.maxHour, maxHour = _j === void 0 ? 23 : _j, _k = _a.isEventOrderingEnabled, isEventOrderingEnabled = _k === void 0 ? true : _k, _l = _a.showWeekNumber, showWeekNumber = _l === void 0 ? false : _l, _m = _a.showVerticalScrollIndicator, showVerticalScrollIndicator = _m === void 0 ? false : _m, enrichedEventsByDate = _a.enrichedEventsByDate, _o = _a.enableEnrichedEvents, enableEnrichedEvents = _o === void 0 ? false : _o, _p = _a.eventsAreSorted, eventsAreSorted = _p === void 0 ? false : _p, _q = _a.timeslots, timeslots = _q === void 0 ? 0 : _q, hourComponent = _a.hourComponent;
    var scrollView = React.useRef(null);
    var now = useNow(!hideNowIndicator).now;
    var hours = Array.from({ length: maxHour - minHour + 1 }, function (_, i) { return minHour + i; });
    React.useEffect(function () {
        var timeout;
        if (scrollView.current && scrollOffsetMinutes && Platform.OS !== 'ios') {
            // We add delay here to work correct on React Native
            // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
            timeout = setTimeout(function () {
                if (scrollView === null || scrollView === void 0 ? void 0 : scrollView.current) {
                    scrollView.current.scrollTo({
                        y: (cellHeight * scrollOffsetMinutes) / 60,
                        animated: false,
                    });
                }
            }, Platform.OS === 'web' ? 0 : 10);
        }
        return function () {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [scrollOffsetMinutes, cellHeight]);
    var _onPressCell = React.useCallback(function (date) {
        onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date.toDate());
    }, [onPressCell]);
    var _onLongPressCell = React.useCallback(function (date) {
        onLongPressCell === null || onLongPressCell === void 0 ? void 0 : onLongPressCell(date.toDate());
    }, [onLongPressCell]);
    var internalEnrichedEventsByDate = React.useMemo(function () {
        if (enableEnrichedEvents) {
            return enrichedEventsByDate || enrichEvents(events, eventsAreSorted);
        }
        return {};
    }, [enableEnrichedEvents, enrichedEventsByDate, events, eventsAreSorted]);
    var enrichedEvents = React.useMemo(function () {
        if (enableEnrichedEvents)
            return [];
        if (isEventOrderingEnabled) {
            // Events are being sorted once so we dont have to do it on each loop
            var sortedEvents_1 = events.sort(function (a, b) { return a.start.getDate() - b.start.getDate(); });
            return sortedEvents_1.map(function (event) { return (__assign(__assign({}, event), { overlapPosition: getOrderOfEvent(event, sortedEvents_1), overlapCount: getCountOfEventsAtEvent(event, sortedEvents_1) })); });
        }
        return events;
    }, [enableEnrichedEvents, events, isEventOrderingEnabled]);
    var _renderMappedEvent = React.useCallback(function (event, index) {
        return (React.createElement(CalendarEvent, { key: "".concat(index).concat(event.start).concat(event.title).concat(event.end), event: event, onPressEvent: onPressEvent, eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, eventCellTextColor: eventCellTextColor, showTime: showTime, eventCount: event.overlapCount, eventOrder: event.overlapPosition, overlapOffset: overlapOffset, renderEvent: renderEvent, ampm: ampm, maxHour: maxHour, minHour: minHour, hours: hours.length }));
    }, [
        ampm,
        eventCellStyle,
        eventCellTextColor,
        eventCellAccessibilityProps,
        onPressEvent,
        overlapOffset,
        renderEvent,
        showTime,
        maxHour,
        minHour,
        hours.length,
    ]);
    var _renderEvents = React.useCallback(function (date) {
        if (enableEnrichedEvents) {
            return (internalEnrichedEventsByDate[date.format(SIMPLE_DATE_FORMAT)] || []).map(_renderMappedEvent);
        }
        return (React.createElement(React.Fragment, null,
            enrichedEvents
                .filter(function (_a) {
                var start = _a.start;
                return dayjs(start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
            })
                .map(_renderMappedEvent),
            enrichedEvents
                .filter(function (_a) {
                var start = _a.start, end = _a.end;
                return dayjs(start).isBefore(date.startOf('day')) &&
                    dayjs(end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
            })
                .map(function (event) { return (__assign(__assign({}, event), { start: dayjs(event.end).startOf('day') })); })
                .map(_renderMappedEvent),
            enrichedEvents
                .filter(function (_a) {
                var start = _a.start, end = _a.end;
                return dayjs(start).isBefore(date.startOf('day')) && dayjs(end).isAfter(date.endOf('day'));
            })
                .map(function (event) { return (__assign(__assign({}, event), { start: dayjs(event.end).startOf('day'), end: dayjs(event.end).endOf('day') })); })
                .map(_renderMappedEvent)));
    }, [_renderMappedEvent, enableEnrichedEvents, enrichedEvents, internalEnrichedEventsByDate]);
    var theme = useTheme();
    return (React.createElement(React.Fragment, null,
        headerComponent != null ? React.createElement(View, { style: headerComponentStyle }, headerComponent) : null,
        React.createElement(ScrollView, { style: [
                {
                    height: containerHeight - cellHeight * 3,
                },
                style,
            ], ref: scrollView, scrollEventThrottle: 32, showsVerticalScrollIndicator: showVerticalScrollIndicator, nestedScrollEnabled: true, contentOffset: Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 } },
            React.createElement(View, { style: [u['flex-1'], theme.isRTL ? u['flex-row-reverse'] : u['flex-row']] },
                (!hideHours || showWeekNumber) && (React.createElement(View, { style: [u['z-20'], u['w-50']] }, hours.map(function (hour) { return (React.createElement(HourGuideColumn, { key: hour, cellHeight: cellHeight, hour: hour, ampm: ampm, hourStyle: hourStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, hourComponent: hourComponent })); }))),
                dateRange.map(function (date) { return (React.createElement(View, { style: [u['flex-1'], u['overflow-hidden']], key: date.toString() },
                    hours.map(function (hour, index) { return (React.createElement(HourGuideCell, { key: hour, cellHeight: cellHeight, date: date, hour: hour, onLongPress: _onLongPressCell, onPress: _onPressCell, index: index, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, timeslots: timeslots })); }),
                    _renderEvents(date),
                    isToday(date) && !hideNowIndicator && (React.createElement(View, { style: [
                            styles.nowIndicator,
                            { backgroundColor: theme.palette.nowIndicator },
                            {
                                top: "".concat(getRelativeTopInDay(now, minHour, hours.length), "%"),
                            },
                        ] })))); })))));
}
export var CalendarBody = typedMemo(_CalendarBody);
//# sourceMappingURL=CalendarBody.js.map