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
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from '../src';
import { AppHeader, HEADER_HEIGHT } from './components/AppHeader';
import { events, tonsOfEvents, tonsOfEventsSorted } from './events';
import { useEvents } from './hooks';
import { styles } from './styles';
function alert(input) {
    // @ts-ignore
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.alert(String(input));
    }
    return Alert.alert('', String(input));
}
var MOBILE_HEIGHT = 736;
var meta = {
    title: 'showcase/Mobile',
    component: Calendar,
    decorators: [function (Story) { return React.createElement(View, { style: styles.mobile }, Story()); }],
};
export default meta;
export var DayMode = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'day',
        onPressEvent: function (event) { return alert(event.title); },
    },
};
export var ThreeDaysMode = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: '3days',
        onPressEvent: function (event) { return alert(event.title); },
    },
};
export var WeekMode = {
    args: {
        hideHours: true,
        height: MOBILE_HEIGHT,
        events: events,
    },
};
export var TonsOfEvents = {
    args: {
        height: MOBILE_HEIGHT,
        events: tonsOfEvents,
        mode: 'week',
        onPressEvent: function (event) { return alert(event.title); },
    },
};
export var TonsOfSortedEvents = {
    args: {
        height: MOBILE_HEIGHT,
        events: tonsOfEventsSorted,
        mode: 'week',
        onPressEvent: function (event) { return alert(event.title); },
        enableEnrichedEvents: true,
        eventsAreSorted: true,
    },
};
export var MonthMode = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { mode: "month", height: MOBILE_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent }));
    },
};
export var WithAppHeader = {
    render: function () { return (React.createElement(React.Fragment, null,
        React.createElement(AppHeader, null),
        React.createElement(Calendar, { height: MOBILE_HEIGHT - HEADER_HEIGHT, events: events }))); },
};
export var DoNotShowTime = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        showTime: false,
    },
};
export var OnDateChanged = {
    render: function () {
        var onChangeDate = React.useCallback(function (_a) {
            var start = _a[0], end = _a[1];
            alert("".concat(start, " - ").concat(end));
        }, []);
        var renderEvent = function (event, touchableOpacityProps) { return (React.createElement(TouchableOpacity, __assign({}, touchableOpacityProps),
            React.createElement(Text, null, "".concat(event.title)))); };
        return (React.createElement(Calendar, { height: MOBILE_HEIGHT, events: events, onChangeDate: onChangeDate, renderEvent: renderEvent }));
    },
};
export var HiddenNowIndicator = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        hideNowIndicator: true,
    },
};
export var RTL = {
    render: function () {
        React.useEffect(function () {
            require('dayjs/locale/he');
        }, []);
        return React.createElement(Calendar, { isRTL: true, locale: "he", height: MOBILE_HEIGHT, events: events });
    },
};
export var CustomWeekLength = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'custom',
        weekStartsOn: 1,
        weekEndsOn: 5,
    },
};
export var MonthCalendarCellStyle = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'month',
        calendarCellStyle: function (date) {
            var cellStyles = {
                backgroundColor: 'white',
                color: 'white',
            };
            var now = dayjs();
            var isBefore = dayjs(date).startOf('day').isBefore(now.startOf('day'));
            var isToday = dayjs(date).startOf('day').isSame(now.startOf('day'));
            var isAfter = dayjs(date).startOf('day').isAfter(now.startOf('day'));
            if (isBefore) {
                cellStyles = __assign(__assign({}, cellStyles), { backgroundColor: 'red' });
            }
            else if (isToday) {
                cellStyles = __assign(__assign({}, cellStyles), { backgroundColor: 'blue' });
            }
            else if (isAfter) {
                cellStyles = __assign(__assign({}, cellStyles), { backgroundColor: 'green' });
            }
            return cellStyles;
        },
        calendarCellTextStyle: { color: 'white' },
    },
};
export var MonthEventCellEvenOddRowBgColor = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'month',
        calendarCellStyle: function (_, index) {
            if (index === void 0) { index = 0; }
            var isEvenRow = index % 2 === 0;
            return {
                backgroundColor: isEvenRow ? 'red' : 'green',
            };
        },
    },
};
export var WeekCalendarCellStyle = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'week',
        calendarCellStyle: function (date) {
            var cellStyles = {
                backgroundColor: 'white',
                color: 'black',
            };
            var now = dayjs();
            var isBefore = dayjs(date).startOf('day').isBefore(now.startOf('day'));
            var isToday = dayjs(date).startOf('day').isSame(now.startOf('day'));
            var isAfter = dayjs(date).startOf('day').isAfter(now.startOf('day'));
            if (isBefore) {
                cellStyles = __assign(__assign({}, cellStyles), { backgroundColor: 'red' });
            }
            else if (isToday) {
                cellStyles = __assign(__assign({}, cellStyles), { backgroundColor: 'blue' });
            }
            else if (isAfter) {
                cellStyles = __assign(__assign({}, cellStyles), { backgroundColor: 'green' });
            }
            return cellStyles;
        },
    },
};
export var WeekCalendarCellEvenOddRowBgColor = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'week',
        calendarCellStyle: function (_, index) {
            if (index === void 0) { index = 0; }
            var isEvenRow = index % 2 === 0;
            return {
                backgroundColor: isEvenRow ? 'red' : 'green',
            };
        },
    },
};
export var MonthCalendarCellCustomDateRenderer = {
    render: function () {
        var renderCustomDate = function (_date) {
            return (React.createElement(View, { style: { justifyContent: 'center', alignItems: 'center' } },
                React.createElement(View, { style: {
                        backgroundColor: '#D4E0FE',
                        borderRadius: 20,
                        width: 15,
                        height: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    } },
                    React.createElement(Text, null, _date.getDay()))));
        };
        return (React.createElement(Calendar, { height: MOBILE_HEIGHT, events: events, mode: "month", renderCustomDateForMonth: renderCustomDate }));
    },
};
export var MonthCalendarCellDisabledPressing = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'month',
        disableMonthEventCellPress: true,
        onPressCell: function (_date) {
            alert("You can only press Date Cell. Not Event Cell ".concat(_date.getDay()));
        },
    },
};
export var ScheduleMode = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { height: MOBILE_HEIGHT, events: state.events, mode: "schedule", eventCellStyle: function (event) {
                var _a;
                return [
                    { backgroundColor: (_a = event.color) !== null && _a !== void 0 ? _a : 'red' },
                    { borderWidth: 1, borderColor: 'green' },
                ];
            }, scheduleMonthSeparatorStyle: {
                color: 'grey',
                fontSize: 12,
                paddingVertical: 4,
            } }));
    },
};
export var WithOnSwipeHandler = {
    args: {
        height: MOBILE_HEIGHT,
        events: events,
        mode: 'day',
        onPressEvent: function (event) { return alert(event.title); },
        onSwipeEnd: function (date) { return alert("You swiped to ".concat(date.toUTCString())); },
    },
};
//# sourceMappingURL=mobile.stories.js.map