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
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import React from 'react';
import { Alert, Dimensions, View } from 'react-native';
import { Calendar } from '../src';
import { CONTROL_HEIGHT, Control } from './components/Control';
import { events, customEventRenderer, customHourRenderer, spanningEvents } from './events';
import { useEvents } from './hooks';
import { styles } from './styles';
import { themes } from './themes';
function alert(input) {
    // @ts-ignore React Native + web integration limitation
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.alert(String(input));
    }
    return Alert.alert('', String(input));
}
var SCREEN_HEIGHT = Dimensions.get('window').height;
var meta = {
    title: 'showcase/Desktop',
    component: Calendar,
    decorators: [
        function (Story) { return (React.createElement(View, { style: styles.desktop },
            React.createElement(Story, null))); },
    ],
};
export default meta;
export var DayMode = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        onPressEvent: function (event) { return alert(event.title); },
        onPressCell: function () { return void 0; },
        mode: 'day',
    },
};
export var ThreeDaysMode = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        onPressEvent: function (event) { return alert(event.title); },
        onPressCell: function () { return void 0; },
        mode: '3days',
    },
};
export var WeekMode = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent }));
    },
};
export var MonthMode = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { mode: "month", height: SCREEN_HEIGHT, events: __spreadArray(__spreadArray([], state.events, true), [
                {
                    start: dayjs().add(2, 'days').toDate(),
                    end: dayjs().add(2, 'days').add(5, 'hours').toDate(),
                    title: 'This is sooooo long name event which will be truncated',
                },
            ], false), onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent }));
    },
};
export var MonthModeRTL = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { mode: "month", height: SCREEN_HEIGHT, isRTL: true, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent }));
    },
};
export var MonthModeSpanningEvents = {
    render: function () {
        var state = useEvents(spanningEvents);
        return (React.createElement(Calendar, { mode: "month", height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent }));
    },
};
export var MonthModeSpanningEventsRTL = {
    render: function () {
        var state = useEvents(spanningEvents);
        return (React.createElement(Calendar, { mode: "month", height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, isRTL: true }));
    },
};
export var MonthModeSpanningEventsHideAdjacent = {
    render: function () {
        var state = useEvents(spanningEvents);
        return (React.createElement(Calendar, { mode: "month", height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, showAdjacentMonths: false }));
    },
};
export var EventCellStyle = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        eventCellStyle: function (event) {
            var backgroundColor = event.title.match(/Meeting/) ? 'red' : 'blue';
            return { backgroundColor: backgroundColor };
        },
    },
};
export var WithControls = {
    render: function () {
        var _a = React.useState(dayjs()), date = _a[0], setDate = _a[1];
        var props = {
            onNext: React.useCallback(function () { return setDate(date.add(1, 'week')); }, [date]),
            onPrev: React.useCallback(function () { return setDate(date.add(-1, 'week')); }, [date]),
            onToday: React.useCallback(function () { return setDate(dayjs()); }, []),
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(Control, __assign({}, props)),
            React.createElement(Calendar, { height: SCREEN_HEIGHT - CONTROL_HEIGHT, events: events, date: date.toDate(), swipeEnabled: false })));
    },
};
export var ScrollToTime = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        scrollOffsetMinutes: 300,
    },
};
export var WeekStartsOnMonday = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        weekStartsOn: 1,
    },
};
export var WeekModeWithHourLimits = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        minHour: 5,
        maxHour: 22,
    },
};
export var AllDayEvents = {
    render: function () {
        var monday = dayjs().day(1);
        var _events = [
            {
                title: 'Holiday',
                start: monday.set('hour', 0).set('minute', 0).toDate(),
                end: monday.set('hour', 0).set('minute', 0).toDate(),
            },
            {
                title: 'Vacation',
                start: monday.set('hour', 0).set('minute', 0).toDate(),
                end: monday.add(2, 'day').set('hour', 0).set('minute', 0).toDate(),
            },
            {
                title: 'Vacation Recovery',
                start: monday.add(4, 'day').set('hour', 0).set('minute', 0).toDate(),
                end: monday.add(4, 'day').set('hour', 0).set('minute', 0).toDate(),
            },
        ];
        return React.createElement(Calendar, { height: SCREEN_HEIGHT, events: _events, weekStartsOn: 1 });
    },
};
export var OnPressDateHeader = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        onPressDateHeader: function (date) { return alert(date.toISOString()); },
        mode: '3days',
    },
};
export var LocaleJapanese = {
    args: {
        locale: 'ja',
        height: SCREEN_HEIGHT,
        events: events,
    },
};
export var AMPMFormat = {
    args: {
        ampm: true,
        height: SCREEN_HEIGHT,
        events: events,
    },
};
export var HiddenNowIndicator = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        hideNowIndicator: true,
    },
};
export var MoreOverlapPadding = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        overlapOffset: 70,
    },
};
export var WithTimeslots = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        overlapOffset: 70,
        timeslots: 1,
    },
};
export var RTL = {
    render: function () {
        React.useEffect(function () {
            require('dayjs/locale/he');
        }, []);
        return React.createElement(Calendar, { locale: "he", height: SCREEN_HEIGHT, events: events, isRTL: true });
    },
};
export var CustomEventRenderer = {
    args: {
        height: SCREEN_HEIGHT,
        renderEvent: customEventRenderer,
        events: events,
    },
};
export var CustomHourRenderer = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        hourComponent: customHourRenderer,
        mode: 'custom',
    },
};
export var CustomWeekLength = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        mode: 'custom',
        weekStartsOn: 1,
        weekEndsOn: 5,
    },
};
export var EventSpanningMultipleDays = {
    args: {
        height: SCREEN_HEIGHT,
        events: [
            {
                title: 'Multiple span',
                start: dayjs().toDate(),
                end: dayjs().add(28, 'hour').toDate(),
            },
            {
                title: 'Multiple span longer',
                start: dayjs().add(29, 'hour').toDate(),
                end: dayjs().add(64, 'hour').toDate(),
            },
        ],
        eventCellStyle: function (event) { return (/longer/.test(event.title) ? { backgroundColor: 'green' } : {}); },
        mode: 'week',
    },
};
export var CustomTheme = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, theme: {
                palette: {
                    primary: {
                        main: 'purple',
                        contrastText: '#fff',
                    },
                },
            } }));
    },
};
export var DarkMode = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(View, { style: { backgroundColor: '#333' } },
            React.createElement(Calendar, { height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, theme: themes.dark })));
    },
};
export var WithoutHeader = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, renderHeader: function () { return null; } }));
    },
};
export var WithoutHeaderMonth = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, renderHeaderForMonthView: function () { return null; }, mode: "month" }));
    },
};
export var MultipleStyles = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { height: SCREEN_HEIGHT, events: state.events, eventCellStyle: [{ backgroundColor: 'red' }, { borderWidth: 1, borderColor: 'green' }] }));
    },
};
export var ScheduleMode = {
    args: {
        height: SCREEN_HEIGHT,
        events: events,
        mode: 'schedule',
        eventCellStyle: function (event) {
            var _a;
            return [
                { backgroundColor: (_a = event.color) !== null && _a !== void 0 ? _a : 'red' },
                { borderWidth: 1, borderColor: 'green' },
            ];
        },
        scheduleMonthSeparatorStyle: {
            color: 'grey',
            fontSize: 12,
            paddingVertical: 4,
        },
    },
};
export var WeekModeWithWeekNumber = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, showWeekNumber: true, weekNumberPrefix: 'W' }));
    },
};
export var MonthModeWithWeekNumber = {
    render: function () {
        var state = useEvents(events);
        return (React.createElement(Calendar, { mode: "month", height: SCREEN_HEIGHT, events: state.events, onPressEvent: function (event) { return alert(event.title); }, onPressCell: state.addEvent, showWeekNumber: true, weekNumberPrefix: 'W' }));
    },
};
//# sourceMappingURL=desktop.stories.js.map