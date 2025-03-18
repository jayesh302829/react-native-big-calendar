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
import { eventCellCss } from '../commonStyles';
export function useCalendarTouchableOpacityProps(_a) {
    var event = _a.event, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessiblityProps = _b === void 0 ? {} : _b, _c = _a.injectedStyles, injectedStyles = _c === void 0 ? [] : _c, onPressEvent = _a.onPressEvent;
    var getEventStyle = React.useMemo(function () { return (typeof eventCellStyle === 'function' ? eventCellStyle : function () { return eventCellStyle; }); }, [eventCellStyle]);
    var plainJsEvent = React.useMemo(function () { return (__assign(__assign({}, event), { start: dayjs(event.start).toDate(), end: dayjs(event.end).toDate() })); }, [event]);
    var _onPress = React.useCallback(function () {
        onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(plainJsEvent);
    }, [onPressEvent, plainJsEvent]);
    var touchableOpacityProps = __assign({ delayPressIn: 20, key: "".concat(event.start.toISOString(), "_").concat(event.title), style: __spreadArray(__spreadArray([eventCellCss.style], injectedStyles, true), [getEventStyle(plainJsEvent)], false), onPress: _onPress, disabled: !onPressEvent || !!event.disabled }, eventCellAccessiblityProps);
    return touchableOpacityProps;
}
//# sourceMappingURL=useCalendarTouchableOpacityProps.js.map