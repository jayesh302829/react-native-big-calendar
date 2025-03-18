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
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { u } from '../commonStyles';
import { useCalendarTouchableOpacityProps } from '../hooks/useCalendarTouchableOpacityProps';
import { useTheme } from '../theme/ThemeContext';
import { getEventSpanningInfo } from '../utils/datetime';
import { typedMemo } from '../utils/react';
function _CalendarEventForMonthView(_a) {
    var event = _a.event, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, renderEvent = _a.renderEvent, date = _a.date, dayOfTheWeek = _a.dayOfTheWeek, calendarWidth = _a.calendarWidth, isRTL = _a.isRTL, eventMinHeightForMonthView = _a.eventMinHeightForMonthView, showAdjacentMonths = _a.showAdjacentMonths;
    var theme = useTheme();
    var _c = React.useMemo(function () { return getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths); }, [date, dayOfTheWeek, event, calendarWidth, showAdjacentMonths]), eventWidth = _c.eventWidth, isMultipleDays = _c.isMultipleDays, isMultipleDaysStart = _c.isMultipleDaysStart, eventWeekDuration = _c.eventWeekDuration;
    var touchableOpacityProps = useCalendarTouchableOpacityProps({
        event: event,
        eventCellStyle: eventCellStyle,
        eventCellAccessibilityProps: eventCellAccessibilityProps,
        onPressEvent: onPressEvent,
        injectedStyles: [
            { backgroundColor: theme.palette.primary.main },
            isMultipleDaysStart && eventWeekDuration > 1
                ? {
                    position: 'absolute',
                    width: eventWidth,
                    zIndex: 10000,
                }
                : {},
            isRTL ? { right: 0 } : { left: 0 },
        ],
    });
    return (React.createElement(TouchableOpacity, { style: [{ minHeight: eventMinHeightForMonthView }, u['mt-2']], onPress: function () { return !event.disabled && (onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(event)); } }, (!isMultipleDays && date.isSame(event.start, 'day')) ||
        (isMultipleDays && isMultipleDaysStart) ? (renderEvent ? (renderEvent(event, touchableOpacityProps)) : (React.createElement(View, __assign({}, touchableOpacityProps),
        React.createElement(Text, { style: [
                { color: theme.palette.primary.contrastText },
                theme.typography.xs,
                u.truncate,
                isRTL && { textAlign: 'right' },
            ], numberOfLines: 1 }, event.title)))) : null));
}
export var CalendarEventForMonthView = typedMemo(_CalendarEventForMonthView);
//# sourceMappingURL=CalendarEventForMonthView.js.map