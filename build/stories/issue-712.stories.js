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
import React, { useCallback, useState } from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { Calendar } from '../src';
var SCREEN_HEIGHT = Dimensions.get('window').height;
var meta = {
    title: 'reproduction-issue-712',
    component: Calendar,
};
export default meta;
export var Basic = {
    render: function () {
        var _a = useState(new Date()), selectedDate = _a[0], changeSelectedDate = _a[1];
        var onChangeDate = useCallback(function (_a) {
            var end = _a[1];
            changeSelectedDate(end);
        }, []);
        var onPressEvent = useCallback(function (event) {
            console.log(event);
        }, []);
        var renderEvent = useCallback(function (event, touchableOpacityProps) { return (React.createElement(TouchableOpacity, __assign({}, touchableOpacityProps),
            React.createElement(Text, null, "".concat(event.title)))); }, []);
        return (React.createElement(Calendar, { events: events, height: SCREEN_HEIGHT, ampm: true, mode: 'month', date: selectedDate, scrollOffsetMinutes: new Date().getHours() * 60, swipeEnabled: true, renderEvent: renderEvent, onChangeDate: onChangeDate, onPressEvent: onPressEvent }));
    },
};
var events = [
    {
        title: 'RX-1003',
        start: dayjs().hour(0).minute(0).second(0).toDate(),
        end: dayjs().hour(0).minute(0).second(0).toDate(),
    },
];
//# sourceMappingURL=issue-712.stories.js.map