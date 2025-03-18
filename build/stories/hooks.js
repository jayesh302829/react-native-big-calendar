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
export function useEvents(defaultEvents) {
    var _a = React.useState(defaultEvents), events = _a[0], setEvents = _a[1];
    var addEvent = React.useCallback(function (start) {
        // @ts-ignore
        var title = prompt('What is the event title?');
        if (title) {
            var end = dayjs(start).add(1, 'hour').toDate();
            setEvents(__spreadArray(__spreadArray([], events, true), [{ start: start, end: end, title: title }], false));
        }
    }, [events]);
    return {
        events: events,
        addEvent: addEvent,
    };
}
//# sourceMappingURL=hooks.js.map