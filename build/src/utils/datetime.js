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
import calendarize from 'calendarize';
import dayjs from 'dayjs';
import { OVERLAP_PADDING } from '../commonStyles';
export var DAY_MINUTES = 1440;
export var SIMPLE_DATE_FORMAT = 'YYYY-MM-DD';
export function getDatesInMonth(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date);
    var days = Array(subject.daysInMonth())
        .fill(0)
        .map(function (_, i) {
        return subject.date(i + 1).locale(locale);
    });
    return days;
}
export function getDatesInWeek(date, weekStartsOn, locale) {
    if (date === void 0) { date = new Date(); }
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date);
    var subjectDOW = subject.day();
    var days = Array(7)
        .fill(0)
        .map(function (_, i) {
        return subject
            .add(i - (subjectDOW < weekStartsOn ? 7 + subjectDOW : subjectDOW) + weekStartsOn, 'day')
            .locale(locale);
    });
    return days;
}
export function getDatesInNextThreeDays(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date).locale(locale);
    var days = Array(3)
        .fill(0)
        .map(function (_, i) {
        return subject.add(i, 'day');
    });
    return days;
}
export function getDatesInNextOneDay(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date).locale(locale);
    var days = Array(1)
        .fill(0)
        .map(function (_, i) {
        return subject.add(i, 'day');
    });
    return days;
}
export function formatHour(hour, ampm) {
    if (ampm === void 0) { ampm = false; }
    if (ampm) {
        if (hour === 0) {
            return '';
        }
        if (hour === 12) {
            return '12 PM';
        }
        if (hour > 12) {
            return "".concat(hour - 12, " PM");
        }
        return "".concat(hour, " AM");
    }
    return "".concat(hour, ":00");
}
export function isToday(date) {
    var today = dayjs();
    return today.isSame(date, 'day');
}
export function getRelativeTopInDay(date, minHour, hours) {
    if (minHour === void 0) { minHour = 0; }
    if (hours === void 0) { hours = 24; }
    var totalMinutesInRange = (DAY_MINUTES / 24) * hours;
    return (100 * ((date.hour() - minHour) * 60 + date.minute())) / totalMinutesInRange;
}
export function todayInMinutes() {
    var today = dayjs();
    return today.diff(dayjs().startOf('day'), 'minute');
}
export function modeToNum(mode, current, amount) {
    if (amount === void 0) { amount = 1; }
    if (mode === 'month') {
        if (!current) {
            throw new Error('You must specify current date if mode is month');
        }
        var currentDate = current instanceof Date ? dayjs(current) : current;
        return currentDate.add(amount, 'month').diff(currentDate, 'day');
    }
    switch (mode) {
        case 'day':
            return 1 * amount;
        case '3days':
            return 3 * amount;
        case 'week':
        case 'custom':
            return 7 * amount;
        default:
            throw new Error('undefined mode');
    }
}
export function formatStartEnd(start, end, format) {
    return "".concat(dayjs(start).format(format), " - ").concat(dayjs(end).format(format));
}
export function isAllDayEvent(start, end) {
    var _start = dayjs(start);
    var _end = dayjs(end);
    return _start.hour() === 0 && _start.minute() === 0 && _end.hour() === 0 && _end.minute() === 0;
}
export function getCountOfEventsAtEvent(event, sortedEventList) {
    var count = 0;
    // Since the list is sorted, we can stop iterating once the start time exceeds the event's end time
    for (var _i = 0, sortedEventList_1 = sortedEventList; _i < sortedEventList_1.length; _i++) {
        var e = sortedEventList_1[_i];
        // If the current event starts after the end of the event we're checking, no need to proceed further
        if (e.start >= event.end) {
            break;
        }
        // Check for overlap
        if (e.end > event.start && e.start < event.end) {
            count++;
        }
    }
    return count;
}
export function getOrderOfEvent(event, sortedEventList) {
    var eventStart = new Date(event.start).getTime();
    var eventEnd = new Date(event.end).getTime();
    // Helper functions to get start and end times
    var getStartTime = function (e) { return new Date(e.start).getTime(); };
    var getEndTime = function (e) { return new Date(e.end).getTime(); };
    // Binary search to find the first potentially overlapping event
    var left = 0;
    var right = sortedEventList.length - 1;
    var firstOverlapIndex = sortedEventList.length;
    while (left <= right) {
        var mid = Math.floor((left + right) / 2);
        var midEventEnd = getEndTime(sortedEventList[mid]);
        if (midEventEnd <= eventStart) {
            left = mid + 1;
        }
        else {
            firstOverlapIndex = mid;
            right = mid - 1;
        }
    }
    // Collect overlapping events starting from the firstOverlapIndex
    var overlappingEvents = [];
    for (var i = firstOverlapIndex; i < sortedEventList.length; i++) {
        var currentEvent = sortedEventList[i];
        var start = getStartTime(currentEvent);
        var end = getEndTime(currentEvent);
        if (start >= eventEnd) {
            break; // No further events will overlap
        }
        if ((eventStart >= start && eventStart < end) || (start >= eventStart && start < eventEnd)) {
            overlappingEvents.push({ event: currentEvent, start: start, end: end });
        }
    }
    // Sort overlapping events by start time and duration
    overlappingEvents.sort(function (a, b) {
        if (a.start === b.start) {
            return a.end - a.start - (b.end - b.start);
        }
        return a.start - b.start;
    });
    // Find the index of the given event in the sorted overlapping events
    var index = overlappingEvents.findIndex(function (_a) {
        var e = _a.event;
        return e === event;
    });
    return index === -1 ? 0 : index;
}
/**
 * Iterate over a sorted list of events and add the following properties:
 * - overlapPosition: position of the event in the stack of overlapping events
 * - overlapsCount: number of events that overlap with this event
 * @param events Sorted list of events by start time
 * @param eventsAreSorted indicates if the events are already sorted
 */
export function enrichEvents(events, eventsAreSorted) {
    if (!events.length)
        return {};
    var groupEndTime = events[0].end;
    var overlapPosition = 0;
    var overlapCounting = 0;
    var overlapCountingPointers = [];
    // If events are not sorted, sort them by start time
    var baseEvents = eventsAreSorted
        ? events
        : events.sort(function (a, b) { return a.start.getTime() - b.start.getTime(); });
    var eventsWithOverlaps = baseEvents.map(function (event, index) {
        // If the event starts before the group end time, it overlaps
        if (event.start < groupEndTime) {
            // Update the group end time if this overlapping event ends after the current group end time
            if (event.end > groupEndTime) {
                groupEndTime = event.end;
            }
            overlapCounting++;
            // If this is the last event, we need to add the overlap counting to the overlap counting pointers
            if (index === baseEvents.length - 1) {
                overlapCountingPointers.push.apply(overlapCountingPointers, Array(overlapCounting).fill(overlapCounting));
            }
            //  Otherwise, it doesn't overlap and we reset the pointers
        }
        else {
            groupEndTime = event.end;
            overlapCountingPointers.push.apply(overlapCountingPointers, Array(overlapCounting).fill(overlapCounting));
            // If this is the last event, we need to add a "group" of 1 into the overlap counting pointers
            if (index === baseEvents.length - 1) {
                overlapCountingPointers.push(1);
            }
            overlapPosition = 0;
            overlapCounting = 1;
        }
        return __assign(__assign({}, event), { 
            // Add the overlap position to the event and increment by 1 for the next event
            overlapPosition: overlapPosition++ });
    });
    var eventsByDate = {};
    eventsWithOverlaps.forEach(function (event, index) {
        // Add overlap count to the event
        var enrichedEvent = __assign(__assign({}, event), { overlapCount: overlapCountingPointers[index] });
        var startDate = dayjs(enrichedEvent.start).format(SIMPLE_DATE_FORMAT);
        var endDate = dayjs(enrichedEvent.end).format(SIMPLE_DATE_FORMAT);
        if (!eventsByDate[startDate]) {
            eventsByDate[startDate] = [];
        }
        if (!eventsByDate[endDate]) {
            eventsByDate[endDate] = [];
        }
        if (startDate === endDate) {
            eventsByDate[startDate].push(enrichedEvent);
        }
        else {
            /**
             * In case of multi-day events, we need to create an event for each day setting the start
             * and end dates of the middle days to the start and end of the day.
             */
            // Add the event to the bucket of the start date
            eventsByDate[startDate].push(__assign(__assign({}, enrichedEvent), { end: dayjs(enrichedEvent.start).endOf('day').toDate() }));
            // Add events in the bucket of the middle dates
            var amountOfDaysBetweenDates = dayjs(enrichedEvent.start).diff(enrichedEvent.end, 'day');
            for (var i = 1; i <= amountOfDaysBetweenDates; i++) {
                var intermediateDate = dayjs(enrichedEvent.start).add(1, 'day');
                if (!eventsByDate[intermediateDate.format(SIMPLE_DATE_FORMAT)]) {
                    eventsByDate[intermediateDate.format(SIMPLE_DATE_FORMAT)] = [];
                }
                eventsByDate[intermediateDate.format(SIMPLE_DATE_FORMAT)].push(__assign(__assign({}, enrichedEvent), { start: intermediateDate.startOf('day').toDate() }));
            }
            // Add the event to the bucket of the end date
            eventsByDate[endDate].push(__assign(__assign({}, enrichedEvent), { start: dayjs(enrichedEvent.end).startOf('day').toDate() }));
        }
    });
    return eventsByDate;
}
export function getStyleForOverlappingEvent(eventPosition, overlapOffset, palettes) {
    var overlapStyle = {};
    var offset = overlapOffset;
    var start = eventPosition * offset;
    var zIndex = 100 + eventPosition;
    var bgColors = palettes.map(function (p) { return p.main; });
    overlapStyle = {
        start: start + OVERLAP_PADDING,
        end: OVERLAP_PADDING,
        backgroundColor: bgColors[eventPosition % bgColors.length] || bgColors[0],
        zIndex: zIndex,
    };
    return overlapStyle;
}
export function getDatesInNextCustomDays(date, weekStartsOn, weekEndsOn, locale) {
    if (date === void 0) { date = new Date(); }
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    if (weekEndsOn === void 0) { weekEndsOn = 6; }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date);
    var subjectDOW = subject.day();
    var days = Array(weekDaysCount(weekStartsOn, weekEndsOn))
        .fill(0)
        .map(function (_, i) {
        return subject.add(i - subjectDOW + weekStartsOn, 'day').locale(locale);
    });
    return days;
}
// TODO: This method should be unit-tested
function weekDaysCount(weekStartsOn, weekEndsOn) {
    // handle reverse week
    if (weekEndsOn < weekStartsOn) {
        var daysCount = 1;
        var i = weekStartsOn;
        while (i !== weekEndsOn) {
            ++i;
            ++daysCount;
            if (i > 6) {
                i = 0;
            }
            // fallback for infinite
            if (daysCount > 7) {
                break;
            }
        }
        return daysCount;
    }
    // normal week
    if (weekEndsOn > weekStartsOn) {
        return weekEndsOn - weekStartsOn + 1;
    }
    // default
    return 1;
}
export function getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths) {
    var dayWidth = calendarWidth / 7;
    // adding + 1 because durations start at 0
    var eventDuration = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(dayjs(event.start))).asDays()) + 1;
    var eventDaysLeft = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(date)).asDays()) + 1;
    var weekDaysLeft = 7 - dayOfTheWeek;
    var monthDaysLeft = date.endOf('month').date() - date.date();
    var isMultipleDays = eventDuration > 1;
    // This is to determine how many days from the event to show during a week
    var eventWeekDuration = !showAdjacentMonths && monthDaysLeft < 7 && monthDaysLeft < eventDaysLeft
        ? monthDaysLeft + 1
        : eventDaysLeft > weekDaysLeft
            ? weekDaysLeft
            : eventDaysLeft < eventDuration
                ? eventDaysLeft
                : eventDuration;
    var isMultipleDaysStart = isMultipleDays &&
        (date.isSame(event.start, 'day') ||
            (dayOfTheWeek === 0 && date.isAfter(event.start)) ||
            (!showAdjacentMonths && date.get('date') === 1));
    // - 6 to take in account the padding
    var eventWidth = dayWidth * eventWeekDuration - 6;
    return { eventWidth: eventWidth, isMultipleDays: isMultipleDays, isMultipleDaysStart: isMultipleDaysStart, eventWeekDuration: eventWeekDuration };
}
export function getWeeksWithAdjacentMonths(targetDate, weekStartsOn) {
    var weeks = calendarize(targetDate.toDate(), weekStartsOn);
    var firstDayIndex = weeks[0].findIndex(function (d) { return d === 1; });
    var lastDay = targetDate.endOf('month').date();
    var lastDayIndex = weeks[weeks.length - 1].findIndex(function (d) { return d === lastDay; });
    weeks = weeks.map(function (week, iw) {
        return week.map(function (d, id) {
            if (d !== 0) {
                return d;
            }
            if (iw === 0) {
                return d - (firstDayIndex - id - 1);
            }
            return lastDay + (id - lastDayIndex);
        });
    });
    return weeks;
}
//# sourceMappingURL=datetime.js.map