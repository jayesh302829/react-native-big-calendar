import dayjs from 'dayjs';
import React from 'react';
import { Alert, View } from 'react-native';
import { Calendar } from '../src';
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
var events = [
    {
        title: 'RX-1003',
        start: dayjs().hour(0).minute(0).second(0).toDate(),
        end: dayjs().hour(0).minute(0).second(0).toDate(),
    },
];
var meta = {
    title: 'reproduction-issue-575',
    component: Calendar,
};
export default meta;
export var MonthMode = {
    render: function () { return (React.createElement(View, { style: styles.mobile },
        React.createElement(Calendar, { height: MOBILE_HEIGHT, events: events, mode: "month", onPressEvent: function (event) { return alert(event.title); } }))); },
};
export var WeekMode = {
    render: function () { return (React.createElement(View, { style: styles.mobile },
        React.createElement(Calendar, { height: MOBILE_HEIGHT, events: events, mode: "week", onPressEvent: function (event) { return alert(event.title); } }))); },
};
//# sourceMappingURL=issue-575.stories.js.map