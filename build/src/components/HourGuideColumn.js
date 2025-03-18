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
import { Text, View } from 'react-native';
import { u } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
import { formatHour } from '../utils/datetime';
import { objHasContent } from '../utils/object';
var _HourGuideColumn = function (_a) {
    var cellHeight = _a.cellHeight, hour = _a.hour, ampm = _a.ampm, _b = _a.hourStyle, hourStyle = _b === void 0 ? {} : _b, _c = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _c === void 0 ? {} : _c, HourComponent = _a.hourComponent;
    var theme = useTheme();
    var textStyle = React.useMemo(function () { return ({ color: theme.palette.gray[500], fontSize: theme.typography.xs.fontSize }); }, [theme]);
    return (React.createElement(View, __assign({ style: { height: cellHeight } }, calendarCellAccessibilityProps), HourComponent ? (React.createElement(HourComponent, { hour: hour, ampm: ampm })) : (React.createElement(Text, { style: [objHasContent(hourStyle) ? hourStyle : textStyle, u['text-center']] }, formatHour(hour, ampm)))));
};
export var HourGuideColumn = React.memo(_HourGuideColumn, function () { return true; });
//# sourceMappingURL=HourGuideColumn.js.map