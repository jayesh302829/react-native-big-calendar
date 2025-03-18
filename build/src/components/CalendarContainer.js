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
import React, { useRef } from 'react';
import InfinitePager from 'react-native-infinite-pager';
import { MIN_HEIGHT } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
import { getDatesInMonth, getDatesInNextCustomDays, getDatesInNextOneDay, getDatesInNextThreeDays, getDatesInWeek, isAllDayEvent, modeToNum, } from '../utils/datetime';
import { typedMemo } from '../utils/react';
import { CalendarBody } from './CalendarBody';
import { CalendarBodyForMonthView } from './CalendarBodyForMonthView';
import { CalendarHeader } from './CalendarHeader';
import { CalendarHeaderForMonthView } from './CalendarHeaderForMonthView';
import { Schedule } from './Schedule';
function _CalendarContainer(_a) {
    var events = _a.events, height = _a.height, hourRowHeight = _a.hourRowHeight, _b = _a.ampm, ampm = _b === void 0 ? false : _b, date = _a.date, _c = _a.allDayEventCellStyle, allDayEventCellStyle = _c === void 0 ? {} : _c, _d = _a.allDayEventCellTextColor, allDayEventCellTextColor = _d === void 0 ? '' : _d, _e = _a.allDayEventCellAccessibilityProps, allDayEventCellAccessibilityProps = _e === void 0 ? {} : _e, eventCellStyle = _a.eventCellStyle, _f = _a.eventCellTextColor, eventCellTextColor = _f === void 0 ? '' : _f, _g = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _g === void 0 ? {} : _g, _h = _a.calendarCellAccessibilityPropsForMonthView, calendarCellAccessibilityPropsForMonthView = _h === void 0 ? {} : _h, calendarCellStyle = _a.calendarCellStyle, calendarCellTextStyle = _a.calendarCellTextStyle, _j = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _j === void 0 ? {} : _j, _k = _a.locale, locale = _k === void 0 ? 'en' : _k, _l = _a.hideNowIndicator, hideNowIndicator = _l === void 0 ? false : _l, _m = _a.mode, mode = _m === void 0 ? 'week' : _m, overlapOffset = _a.overlapOffset, _o = _a.scrollOffsetMinutes, scrollOffsetMinutes = _o === void 0 ? 0 : _o, _p = _a.showTime, showTime = _p === void 0 ? true : _p, _q = _a.headerContainerStyle, headerContainerStyle = _q === void 0 ? {} : _q, _r = _a.headerContainerAccessibilityProps, headerContainerAccessibilityProps = _r === void 0 ? {} : _r, _s = _a.headerContentStyle, headerContentStyle = _s === void 0 ? {} : _s, _t = _a.headerCellAccessibilityProps, headerCellAccessibilityProps = _t === void 0 ? {} : _t, _u = _a.dayHeaderStyle, dayHeaderStyle = _u === void 0 ? {} : _u, _v = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _v === void 0 ? '' : _v, _w = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _w === void 0 ? '' : _w, _x = _a.bodyContainerStyle, bodyContainerStyle = _x === void 0 ? {} : _x, _y = _a.swipeEnabled, swipeEnabled = _y === void 0 ? true : _y, _z = _a.weekStartsOn, weekStartsOn = _z === void 0 ? 0 : _z, onChangeDate = _a.onChangeDate, onLongPressCell = _a.onLongPressCell, onPressCell = _a.onPressCell, onPressDateHeader = _a.onPressDateHeader, onPressEvent = _a.onPressEvent, renderEvent = _a.renderEvent, _0 = _a.renderHeader, HeaderComponent = _0 === void 0 ? CalendarHeader : _0, _1 = _a.renderHeaderForMonthView, HeaderComponentForMonthView = _1 === void 0 ? CalendarHeaderForMonthView : _1, _2 = _a.weekEndsOn, weekEndsOn = _2 === void 0 ? 6 : _2, _3 = _a.maxVisibleEventCount, maxVisibleEventCount = _3 === void 0 ? 3 : _3, _4 = _a.eventMinHeightForMonthView, eventMinHeightForMonthView = _4 === void 0 ? 22 : _4, activeDate = _a.activeDate, _5 = _a.headerComponent, headerComponent = _5 === void 0 ? null : _5, _6 = _a.headerComponentStyle, headerComponentStyle = _6 === void 0 ? {} : _6, _7 = _a.hourStyle, hourStyle = _7 === void 0 ? {} : _7, _8 = _a.showAllDayEventCell, showAllDayEventCell = _8 === void 0 ? true : _8, _9 = _a.moreLabel, moreLabel = _9 === void 0 ? '{moreCount} More' : _9, _10 = _a.showAdjacentMonths, showAdjacentMonths = _10 === void 0 ? true : _10, _11 = _a.sortedMonthView, sortedMonthView = _11 === void 0 ? true : _11, _12 = _a.hideHours, hideHours = _12 === void 0 ? false : _12, _13 = _a.minHour, minHour = _13 === void 0 ? 0 : _13, _14 = _a.maxHour, maxHour = _14 === void 0 ? 23 : _14, isEventOrderingEnabled = _a.isEventOrderingEnabled, _15 = _a.showWeekNumber, showWeekNumber = _15 === void 0 ? false : _15, _16 = _a.weekNumberPrefix, weekNumberPrefix = _16 === void 0 ? '' : _16, onPressMoreLabel = _a.onPressMoreLabel, renderCustomDateForMonth = _a.renderCustomDateForMonth, _17 = _a.disableMonthEventCellPress, disableMonthEventCellPress = _17 === void 0 ? false : _17, _18 = _a.showVerticalScrollIndicator, showVerticalScrollIndicator = _18 === void 0 ? false : _18, _19 = _a.itemSeparatorComponent, itemSeparatorComponent = _19 === void 0 ? null : _19, enrichedEventsByDate = _a.enrichedEventsByDate, _20 = _a.enableEnrichedEvents, enableEnrichedEvents = _20 === void 0 ? false : _20, _21 = _a.eventsAreSorted, eventsAreSorted = _21 === void 0 ? false : _21, onSwipeEnd = _a.onSwipeEnd, _22 = _a.timeslots, timeslots = _22 === void 0 ? 0 : _22, hourComponent = _a.hourComponent, _23 = _a.scheduleMonthSeparatorStyle, scheduleMonthSeparatorStyle = _23 === void 0 ? {} : _23;
    // To ensure we have proper effect callback, use string to date comparision.
    var dateString = date === null || date === void 0 ? void 0 : date.toString();
    var calendarRef = useRef(null);
    var _24 = React.useState(function () { return dayjs(date); }), targetDate = _24[0], setTargetDate = _24[1];
    React.useEffect(function () {
        if (dateString) {
            setTargetDate(dayjs(dateString));
        }
    }, [dateString]); // if setting `[date]`, it will triggered twice
    React.useEffect(function () {
        var _a;
        (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.setPage(0, { animated: false });
    }, []);
    var allDayEvents = React.useMemo(function () { return events.filter(function (event) { return isAllDayEvent(event.start, event.end); }); }, [events]);
    var daytimeEvents = React.useMemo(function () { return events.filter(function (event) { return !isAllDayEvent(event.start, event.end); }); }, [events]);
    var getDateRange = React.useCallback(function (date) {
        switch (mode) {
            case 'month':
                return getDatesInMonth(date, locale);
            case 'week':
                return getDatesInWeek(date, weekStartsOn, locale);
            case '3days':
                return getDatesInNextThreeDays(date, locale);
            case 'day':
                return getDatesInNextOneDay(date, locale);
            case 'custom':
                return getDatesInNextCustomDays(date, weekStartsOn, weekEndsOn, locale);
            case 'schedule': // TODO: this will update
                return getDatesInMonth(date, locale);
            default:
                throw new Error("[react-native-big-calendar] The mode which you specified \"".concat(mode, "\" is not supported."));
        }
    }, [mode, locale, weekEndsOn, weekStartsOn]);
    if (minHour < 0) {
        throw new Error('minHour should be 0 or greater');
    }
    if (maxHour > 23) {
        throw new Error('maxHour should be less that 24');
    }
    if (minHour >= maxHour) {
        throw new Error('minHour should be less than maxHour');
    }
    var cellHeight = React.useMemo(function () { return hourRowHeight || Math.max(height - 30, MIN_HEIGHT) / 24; }, [height, hourRowHeight]);
    var theme = useTheme();
    var onSwipeHorizontal = React.useCallback(function (direction) {
        if (!swipeEnabled) {
            return;
        }
        var nextTargetDate;
        if ((direction === 'LEFT' && !theme.isRTL) || (direction === 'RIGHT' && theme.isRTL)) {
            nextTargetDate = targetDate.add(modeToNum(mode, targetDate), 'day');
        }
        else {
            if (mode === 'month') {
                nextTargetDate = targetDate.add(targetDate.date() * -1, 'day');
            }
            else {
                nextTargetDate = targetDate.add(modeToNum(mode, targetDate) * -1, 'day');
            }
        }
        setTargetDate(nextTargetDate);
        onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd(nextTargetDate.toDate());
    }, [swipeEnabled, theme.isRTL, onSwipeEnd, targetDate, mode]);
    React.useEffect(function () {
        if (dateString && onChangeDate) {
            var dateRange = getDateRange(dateString);
            onChangeDate([dateRange[0].toDate(), dateRange[dateRange.length - 1].toDate()]);
        }
    }, [dateString, onChangeDate, getDateRange]);
    var getCurrentDate = React.useCallback(function (page) {
        return targetDate.add(modeToNum(mode, targetDate, page), 'day');
    }, [mode, targetDate]);
    var commonProps = {
        cellHeight: cellHeight,
        dateRange: getDateRange(targetDate),
        mode: mode,
        onPressEvent: onPressEvent,
        hideHours: hideHours,
        showWeekNumber: showWeekNumber,
    };
    if (mode === 'month') {
        var headerProps_1 = {
            style: headerContainerStyle,
            headerContainerAccessibilityProps: headerContainerAccessibilityProps,
            locale: locale,
            weekStartsOn: weekStartsOn,
            headerContentStyle: headerContentStyle,
            headerCellAccessibilityProps: headerCellAccessibilityProps,
            dayHeaderStyle: dayHeaderStyle,
            dayHeaderHighlightColor: dayHeaderHighlightColor,
            weekDayHeaderHighlightColor: weekDayHeaderHighlightColor,
            showAllDayEventCell: showAllDayEventCell,
            showWeekNumber: showWeekNumber,
            weekNumberPrefix: weekNumberPrefix,
        };
        return (React.createElement(InfinitePager, { ref: calendarRef, style: { flex: 1 }, pageWrapperStyle: { flex: 1 }, renderPage: function (_a) {
                var index = _a.index;
                return (React.createElement(React.Fragment, null,
                    React.createElement(HeaderComponentForMonthView, __assign({}, headerProps_1, { dateRange: getDateRange(getCurrentDate(index)) })),
                    React.createElement(CalendarBodyForMonthView, __assign({}, commonProps, { style: bodyContainerStyle, containerHeight: height, events: __spreadArray(__spreadArray([], daytimeEvents, true), allDayEvents, true), eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, calendarCellAccessibilityPropsForMonthView: calendarCellAccessibilityPropsForMonthView, calendarCellTextStyle: calendarCellTextStyle, weekStartsOn: weekStartsOn, hideNowIndicator: hideNowIndicator, showAdjacentMonths: showAdjacentMonths, onLongPressCell: onLongPressCell, onPressCell: function (date) {
                            var _a;
                            onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date);
                            (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.setPage(0, { animated: true });
                        }, onPressDateHeader: onPressDateHeader, onPressEvent: onPressEvent, renderEvent: renderEvent, targetDate: getCurrentDate(index), maxVisibleEventCount: maxVisibleEventCount, eventMinHeightForMonthView: eventMinHeightForMonthView, sortedMonthView: sortedMonthView, moreLabel: moreLabel, onPressMoreLabel: onPressMoreLabel, renderCustomDateForMonth: renderCustomDateForMonth, disableMonthEventCellPress: disableMonthEventCellPress }))));
            }, onPageChange: function (page) { return onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd(getCurrentDate(page).toDate()); }, pageBuffer: 2 }));
    }
    var headerProps = __assign(__assign({}, commonProps), { style: headerContainerStyle, headerContainerAccessibilityProps: headerContainerAccessibilityProps, locale: locale, allDayEventCellStyle: allDayEventCellStyle, allDayEventCellTextColor: allDayEventCellTextColor, allDayEvents: allDayEvents, allDayEventCellAccessibilityProps: allDayEventCellAccessibilityProps, onPressDateHeader: onPressDateHeader, activeDate: activeDate, headerContentStyle: headerContentStyle, headerCellAccessibilityProps: headerCellAccessibilityProps, dayHeaderStyle: dayHeaderStyle, dayHeaderHighlightColor: dayHeaderHighlightColor, weekDayHeaderHighlightColor: weekDayHeaderHighlightColor, showAllDayEventCell: showAllDayEventCell, weekNumberPrefix: weekNumberPrefix });
    if (mode === 'schedule') {
        return (React.createElement(Schedule, __assign({ events: __spreadArray(__spreadArray([], daytimeEvents, true), allDayEvents, true) }, headerProps, { style: bodyContainerStyle, containerHeight: height, eventCellStyle: eventCellStyle, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, hideNowIndicator: hideNowIndicator, overlapOffset: overlapOffset, scrollOffsetMinutes: scrollOffsetMinutes, ampm: ampm, showTime: showTime, onLongPressCell: onLongPressCell, onPressCell: onPressCell, onPressEvent: onPressEvent, onSwipeHorizontal: onSwipeHorizontal, renderEvent: renderEvent, headerComponent: headerComponent, headerComponentStyle: headerComponentStyle, hourStyle: hourStyle, isEventOrderingEnabled: isEventOrderingEnabled, showVerticalScrollIndicator: showVerticalScrollIndicator, itemSeparatorComponent: itemSeparatorComponent, scheduleMonthSeparatorStyle: scheduleMonthSeparatorStyle })));
    }
    return (React.createElement(InfinitePager, { ref: calendarRef, renderPage: function (_a) {
            var index = _a.index;
            return (React.createElement(React.Fragment, null,
                React.createElement(HeaderComponent, __assign({}, headerProps, { dateRange: getDateRange(getCurrentDate(index)) })),
                React.createElement(CalendarBody, __assign({}, commonProps, { dateRange: getDateRange(getCurrentDate(index)), style: bodyContainerStyle, containerHeight: height, events: daytimeEvents, eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, eventCellTextColor: eventCellTextColor, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, hideNowIndicator: hideNowIndicator, overlapOffset: overlapOffset, scrollOffsetMinutes: scrollOffsetMinutes, ampm: ampm, minHour: minHour, maxHour: maxHour, showTime: showTime, onLongPressCell: onLongPressCell, onPressCell: function (date) {
                        var _a;
                        onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date);
                        if (mode !== 'day') {
                            (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.setPage(0, { animated: true });
                        }
                    }, onPressEvent: onPressEvent, renderEvent: renderEvent, headerComponent: headerComponent, headerComponentStyle: headerComponentStyle, hourStyle: hourStyle, isEventOrderingEnabled: isEventOrderingEnabled, showVerticalScrollIndicator: showVerticalScrollIndicator, enrichedEventsByDate: enrichedEventsByDate, enableEnrichedEvents: enableEnrichedEvents, eventsAreSorted: eventsAreSorted, timeslots: timeslots, hourComponent: hourComponent }))));
        }, onPageChange: function (page) { return onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd(getCurrentDate(page).toDate()); }, pageBuffer: 2 }));
}
export var CalendarContainer = typedMemo(_CalendarContainer);
//# sourceMappingURL=CalendarContainer.js.map