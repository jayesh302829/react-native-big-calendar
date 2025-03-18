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
import * as React from 'react';
import { OVERLAP_OFFSET, u } from '../commonStyles';
import { useCalendarTouchableOpacityProps } from '../hooks/useCalendarTouchableOpacityProps';
import { useTheme } from '../theme/ThemeContext';
import { DAY_MINUTES, getRelativeTopInDay, getStyleForOverlappingEvent } from '../utils/datetime';
import { typedMemo } from '../utils/react';
import { DefaultCalendarEventRenderer } from './DefaultCalendarEventRenderer';
var getEventCellPositionStyle = function (start, end, minHour, hours) {
    var totalMinutesInRange = (DAY_MINUTES / 24) * hours;
    var durationInMinutes = dayjs(end).diff(start, 'minute');
    var relativeHeight = 100 * (1 / totalMinutesInRange) * durationInMinutes;
    var relativeTop = getRelativeTopInDay(dayjs(start), minHour, hours);
    var relativeTopOffset = (minHour * 60) / DAY_MINUTES;
    return {
        height: "".concat(relativeHeight, "%"),
        top: "".concat(relativeTop - relativeTopOffset, "%"),
    };
};
function _CalendarEvent(_a) {
    var event = _a.event, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, eventCellTextColor = _a.eventCellTextColor, showTime = _a.showTime, _c = _a.eventCount, eventCount = _c === void 0 ? 1 : _c, _d = _a.eventOrder, eventOrder = _d === void 0 ? 0 : _d, _e = _a.overlapOffset, overlapOffset = _e === void 0 ? OVERLAP_OFFSET : _e, renderEvent = _a.renderEvent, ampm = _a.ampm, mode = _a.mode, _f = _a.minHour, minHour = _f === void 0 ? 0 : _f, _g = _a.hours, hours = _g === void 0 ? 24 : _g;
    var theme = useTheme();
    var palettes = React.useMemo(function () { return __spreadArray([theme.palette.primary], theme.eventCellOverlappings, true); }, [theme]);
    var touchableOpacityProps = useCalendarTouchableOpacityProps({
        event: event,
        eventCellStyle: eventCellStyle,
        eventCellAccessibilityProps: eventCellAccessibilityProps,
        onPressEvent: onPressEvent,
        injectedStyles: mode === 'schedule'
            ? [getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes)]
            : [
                getEventCellPositionStyle(event.start, event.end, minHour, hours),
                getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes),
                u.absolute,
                u['mt-2'],
                u['mx-3'],
            ],
    });
    var textColor = React.useMemo(function () {
        var fgColors = palettes.map(function (p) { return p.contrastText; });
        return fgColors[eventCount % fgColors.length] || fgColors[0];
    }, [eventCount, palettes]);
    if (renderEvent) {
        return renderEvent(event, touchableOpacityProps);
    }
    return (React.createElement(DefaultCalendarEventRenderer, { event: event, showTime: showTime, ampm: ampm, touchableOpacityProps: touchableOpacityProps, textColor: eventCellTextColor || textColor }));
}
export var CalendarEvent = typedMemo(_CalendarEvent);
//# sourceMappingURL=CalendarEvent.js.map