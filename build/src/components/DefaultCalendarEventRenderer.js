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
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { formatStartEnd } from '../utils/datetime';
export function DefaultCalendarEventRenderer(_a) {
    var touchableOpacityProps = _a.touchableOpacityProps, event = _a.event, _b = _a.showTime, showTime = _b === void 0 ? true : _b, textColor = _a.textColor, ampm = _a.ampm;
    var theme = useTheme();
    var eventTimeStyle = { fontSize: theme.typography.xs.fontSize, color: textColor };
    var eventTitleStyle = { fontSize: theme.typography.sm.fontSize, color: textColor };
    return (React.createElement(TouchableOpacity, __assign({}, touchableOpacityProps), dayjs(event.end).diff(event.start, 'minute') < 32 && showTime ? (React.createElement(Text, { style: eventTitleStyle },
        event.title,
        ",",
        React.createElement(Text, { style: eventTimeStyle }, dayjs(event.start).format(ampm ? 'hh:mm a' : 'HH:mm')))) : (React.createElement(React.Fragment, null,
        React.createElement(Text, { style: eventTitleStyle }, event.title),
        showTime && (React.createElement(Text, { style: eventTimeStyle }, formatStartEnd(event.start, event.end, ampm ? 'h:mm a' : 'HH:mm'))),
        event.children && event.children))));
}
//# sourceMappingURL=DefaultCalendarEventRenderer.js.map