import dayjs from 'dayjs';
import React from 'react';
import { Calendar } from '../src';
var MOBILE_HEIGHT = 736;
var meta = {
    title: 'reproduction-issue-1138',
    component: Calendar,
};
export default meta;
export var EventDurationsWhenHideAdjacentMonths = {
    render: function () { return React.createElement(CalendarContainer, null); },
};
var events = [
    {
        title: 'event3',
        start: dayjs('2025-02-13').toDate(),
        end: dayjs('2025-02-23').toDate(),
    },
];
var CalendarContainer = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(Calendar, { events: events, swipeEnabled: true, date: new Date('2025-02-01'), height: MOBILE_HEIGHT, mode: "month", showAdjacentMonths: false })));
};
//# sourceMappingURL=issue-1138.stories.js.map