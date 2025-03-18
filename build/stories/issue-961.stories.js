import React, { useCallback } from 'react';
import { Button } from 'react-native';
import { Calendar } from '../src';
var MOBILE_HEIGHT = 736;
var meta = {
    title: 'reproduction-issue-961',
    component: Calendar,
};
export default meta;
export var MyBehaviour = {
    render: function () { return React.createElement(CalendarContainer, { swipeEnabled: false }); },
};
export var Working = {
    render: function () { return React.createElement(CalendarContainer, { swipeEnabled: true }); },
};
var CalendarContainer = function (_a) {
    var swipeEnabled = _a.swipeEnabled;
    var _b = React.useState(new Date()), date = _b[0], setDate = _b[1];
    var toNextWeek = function () {
        var nextWeek = new Date(date);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setDate(nextWeek);
    };
    var toLastWeek = function () {
        var lastWeek = new Date(date);
        lastWeek.setDate(lastWeek.getDate() - 7);
        setDate(lastWeek);
    };
    var onChangeDate = useCallback(function (_a) {
        //here I normally do my event fetching with the given timeframe.
        //this way I dont need to calculate the start and end date by myself
        //but the function is only called if I swipe the calendar
        //not by changing the date prop
        var start = _a[0], end = _a[1];
        console.log(start);
        console.log(end);
    }, []);
    return (React.createElement(React.Fragment, null,
        !swipeEnabled && (React.createElement(React.Fragment, null,
            React.createElement(Button, { onPress: toLastWeek, title: "left" }),
            React.createElement(Button, { onPress: toNextWeek, title: "right" }))),
        React.createElement(Calendar, { events: [], swipeEnabled: swipeEnabled, date: date, onChangeDate: onChangeDate, height: MOBILE_HEIGHT })));
};
//# sourceMappingURL=issue-961.stories.js.map