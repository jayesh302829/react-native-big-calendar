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
import { Text, TouchableOpacity, View } from 'react-native';
import { formatStartEnd } from '../src/utils/datetime';
var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
var eventNotes = (React.createElement(View, { style: { marginTop: 3 } },
    React.createElement(Text, { style: { fontSize: 10, color: 'white' } }, " Phone number: 555-123-4567 "),
    React.createElement(Text, { style: { fontSize: 10, color: 'white' } }, " Arrive 15 minutes early ")));
export var events = [
    {
        title: 'Watch Boxing',
        start: dayjs().set('hour', 0).set('minute', 0).set('second', 0).toDate(),
        end: dayjs().set('hour', 1).set('minute', 30).toDate(),
        color: '#02edda',
    },
    {
        title: 'Meeting',
        start: dayjs().set('hour', 10).set('minute', 0).toDate(),
        end: dayjs().set('hour', 10).set('minute', 30).toDate(),
    },
    {
        title: 'Coffee break',
        start: dayjs().set('hour', 14).set('minute', 30).toDate(),
        end: dayjs().set('hour', 15).set('minute', 30).toDate(),
    },
    {
        title: 'with color prop',
        start: dayjs().set('hour', 16).set('minute', 0).toDate(),
        end: dayjs().set('hour', 18).set('minute', 30).toDate(),
        color: 'purple',
    },
    {
        title: 'Repair my car',
        start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
        end: dayjs().add(1, 'day').set('hour', 13).set('minute', 30).toDate(),
    },
    {
        title: 'Meet Realtor',
        start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
        end: dayjs().add(1, 'day').set('hour', 9).set('minute', 55).toDate(),
    },
    {
        title: 'Laundry',
        start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
        end: dayjs().add(1, 'day').set('hour', 11).set('minute', 0).toDate(),
    },
    {
        title: "Doctor's appointment",
        start: dayjs().set('hour', 13).set('minute', 0).toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).toDate(),
        children: eventNotes,
    },
    {
        title: 'Plan a holiday',
        start: dayjs().set('hour', 13).set('minute', 0).add(1, 'month').toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).add(1, 'month').toDate(),
    },
    {
        title: 'Go on holiday',
        start: dayjs().set('hour', 13).set('minute', 0).add(3, 'month').toDate(),
        end: dayjs().set('hour', 14).set('minute', 15).add(3, 'month').toDate(),
    },
];
export var tonsOfEvents = new Array(10)
    .fill(undefined)
    .map(function (_) {
    var day = getRandomInt(dayjs().startOf('week').get('day'), dayjs().endOf('week').get('day'));
    var startHour = getRandomInt(0, 23);
    var endHour = getRandomInt(startHour + 2, 24);
    var startMinute = getRandomInt(0, 59);
    var endMinute = getRandomInt(0, 59);
    return {
        title: 'Watch Boxing',
        start: dayjs()
            .set('day', day)
            .set('hour', startHour)
            .set('minute', startMinute)
            .set('second', 0)
            .toDate(),
        end: dayjs()
            .set('day', day)
            .set('hour', endHour)
            .set('minute', endMinute)
            .set('second', 0)
            .toDate(),
    };
});
// Add an event that spans multiple days
tonsOfEvents.push({
    title: 'Overlapping event',
    start: dayjs().set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().set('hour', 10).set('minute', 0).add(1, 'day').toDate(),
});
export var tonsOfEventsSorted = tonsOfEvents.sort(function (a, b) { return a.start.getTime() - b.start.getTime(); });
export var spanningEvents = [
    {
        title: 'Watch Boxing',
        start: dayjs().subtract(1, 'week').set('hour', 14).set('minute', 30).toDate(),
        end: dayjs().subtract(1, 'week').set('hour', 15).set('minute', 30).toDate(),
    },
    {
        title: 'Laundry',
        start: dayjs().subtract(1, 'week').set('hour', 1).set('minute', 30).toDate(),
        end: dayjs().subtract(1, 'week').set('hour', 2).set('minute', 30).toDate(),
    },
    {
        title: 'Meeting',
        start: dayjs().subtract(1, 'week').set('hour', 10).set('minute', 0).toDate(),
        end: dayjs().add(1, 'week').set('hour', 10).set('minute', 30).toDate(),
    },
    {
        title: 'Coffee break',
        start: dayjs().set('hour', 14).set('minute', 30).toDate(),
        end: dayjs().add(1, 'week').set('hour', 15).set('minute', 30).toDate(),
    },
    {
        title: 'Repair my car',
        start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
        end: dayjs().add(4, 'day').set('hour', 13).set('minute', 30).toDate(),
    },
    {
        title: 'Vacation',
        start: dayjs().subtract(1, 'month').set('hour', 7).set('minute', 45).toDate(),
        end: dayjs().add(1, 'month').set('hour', 13).set('minute', 30).toDate(),
    },
];
export var customEventRenderer = function (event, touchableOpacityProps) {
    return (React.createElement(TouchableOpacity, __assign({}, touchableOpacityProps, { style: __spreadArray(__spreadArray([], touchableOpacityProps.style, true), [
            {
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderLeftColor: event.color ? event.color : 'green',
                borderLeftWidth: 10,
                borderStyle: 'solid',
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
            },
        ], false) }), dayjs(event.end).diff(event.start, 'minute') < 32 ? (React.createElement(Text, { style: [{ color: 'black' }] },
        event.title,
        ",",
        React.createElement(Text, { style: [{ color: 'black' }] }, dayjs(event.start).format('HH:mm')))) : (React.createElement(React.Fragment, null,
        React.createElement(Text, { style: [{ color: 'black' }] }, event.title),
        React.createElement(Text, { style: [{ color: 'black' }] }, formatStartEnd(event.start, event.end, 'HH:mm')),
        event.children && event.children))));
};
export var customHourRenderer = function (_a) {
    var hour = _a.hour;
    return (React.createElement(Text, { style: {
            textAlign: 'right',
            paddingRight: 5,
        } }, hour));
};
//# sourceMappingURL=events.js.map