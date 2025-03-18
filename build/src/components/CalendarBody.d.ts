import dayjs from 'dayjs';
import * as React from 'react';
import { type AccessibilityProps, type TextStyle, type ViewStyle } from 'react-native';
import type { CalendarCellStyle, EventCellStyle, EventRenderer, HourRenderer, ICalendarEventBase } from '../interfaces';
interface CalendarBodyProps<T extends ICalendarEventBase> {
    cellHeight: number;
    containerHeight: number;
    dateRange: dayjs.Dayjs[];
    events: T[];
    scrollOffsetMinutes: number;
    ampm: boolean;
    showTime: boolean;
    style: ViewStyle;
    eventCellTextColor?: string;
    eventCellStyle?: EventCellStyle<T>;
    eventCellAccessibilityProps?: AccessibilityProps;
    calendarCellStyle?: CalendarCellStyle;
    calendarCellAccessibilityProps?: AccessibilityProps;
    hideNowIndicator?: boolean;
    overlapOffset?: number;
    onLongPressCell?: (date: Date) => void;
    onPressCell?: (date: Date) => void;
    onPressEvent?: (event: T) => void;
    renderEvent?: EventRenderer<T>;
    headerComponent?: React.ReactElement | null;
    headerComponentStyle?: ViewStyle;
    hourStyle?: TextStyle;
    hideHours?: boolean;
    minHour?: number;
    maxHour?: number;
    isEventOrderingEnabled?: boolean;
    showWeekNumber?: boolean;
    showVerticalScrollIndicator?: boolean;
    enrichedEventsByDate?: Record<string, T[]>;
    enableEnrichedEvents?: boolean;
    eventsAreSorted?: boolean;
    timeslots?: number;
    hourComponent?: HourRenderer;
}
declare function _CalendarBody<T extends ICalendarEventBase>({ containerHeight, cellHeight, dateRange, style, onLongPressCell, onPressCell, events, onPressEvent, eventCellTextColor, eventCellStyle, eventCellAccessibilityProps, calendarCellStyle, calendarCellAccessibilityProps, ampm, showTime, scrollOffsetMinutes, hideNowIndicator, overlapOffset, renderEvent, headerComponent, headerComponentStyle, hourStyle, hideHours, minHour, maxHour, isEventOrderingEnabled, showWeekNumber, showVerticalScrollIndicator, enrichedEventsByDate, enableEnrichedEvents, eventsAreSorted, timeslots, hourComponent, }: CalendarBodyProps<T>): React.JSX.Element;
export declare const CalendarBody: typeof _CalendarBody;
export {};
