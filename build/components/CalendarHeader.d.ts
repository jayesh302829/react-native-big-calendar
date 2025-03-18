import dayjs from 'dayjs';
import * as React from 'react';
import { type AccessibilityProps, type ViewStyle } from 'react-native';
import type { ICalendarEventBase } from '../interfaces';
export interface CalendarHeaderProps<T extends ICalendarEventBase> {
    dateRange: dayjs.Dayjs[];
    cellHeight: number;
    locale: string;
    style: ViewStyle;
    allDayEventCellStyle: ViewStyle | ((event: T) => ViewStyle);
    allDayEventCellTextColor: string;
    allDayEvents: T[];
    onPressDateHeader?: (date: Date) => void;
    onPressEvent?: (event: T) => void;
    activeDate?: Date;
    headerContentStyle?: ViewStyle;
    dayHeaderStyle?: ViewStyle;
    weekDayHeaderHighlightColor?: string;
    showAllDayEventCell?: boolean;
    hideHours?: boolean;
    showWeekNumber?: boolean;
    weekNumberPrefix?: string;
    allDayEventCellAccessibilityProps?: AccessibilityProps;
    headerContainerAccessibilityProps?: AccessibilityProps;
    headerCellAccessibilityProps?: AccessibilityProps;
}
declare function _CalendarHeader<T extends ICalendarEventBase>({ dateRange, cellHeight, style, allDayEventCellStyle, allDayEventCellTextColor, allDayEvents, onPressDateHeader, onPressEvent, activeDate, headerContentStyle, dayHeaderStyle, weekDayHeaderHighlightColor, showAllDayEventCell, hideHours, showWeekNumber, weekNumberPrefix, allDayEventCellAccessibilityProps, headerContainerAccessibilityProps, headerCellAccessibilityProps, }: CalendarHeaderProps<T>): React.JSX.Element;
export declare const CalendarHeader: typeof _CalendarHeader;
export {};
