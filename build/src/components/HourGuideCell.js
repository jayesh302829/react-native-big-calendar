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
import { TouchableWithoutFeedback, View } from 'react-native';
import { u } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
var _HourGuideCell = function (_a) {
    var cellHeight = _a.cellHeight, onLongPress = _a.onLongPress, onPress = _a.onPress, date = _a.date, hour = _a.hour, index = _a.index, calendarCellStyle = _a.calendarCellStyle, calendarCellAccessibilityProps = _a.calendarCellAccessibilityProps, timeslots = _a.timeslots;
    var theme = useTheme();
    var getCalendarCellStyle = React.useMemo(function () { return (typeof calendarCellStyle === 'function' ? calendarCellStyle : function () { return calendarCellStyle; }); }, [calendarCellStyle]);
    return (React.createElement(TouchableWithoutFeedback, __assign({ onLongPress: function () { return onLongPress(date.hour(hour).minute(0)); }, onPress: function () { return onPress(date.hour(hour).minute(0)); } }, calendarCellAccessibilityProps),
        React.createElement(View, { style: [
                u['border-l'],
                u['border-b'],
                {
                    borderColor: theme.palette.gray['200'],
                    height: cellHeight,
                    justifyContent: 'space-evenly',
                },
                __assign({}, getCalendarCellStyle(date.toDate(), index)),
            ] }, Array.from({ length: timeslots }, function (_, index) { return (React.createElement(View, { key: "".concat(index, "-").concat(date.toDate()), style: [
                u['border-l'],
                u['border-b'],
                {
                    borderColor: theme.palette.gray['100'],
                    height: 1,
                },
            ] })); }))));
};
export var HourGuideCell = React.memo(_HourGuideCell);
//# sourceMappingURL=HourGuideCell.js.map