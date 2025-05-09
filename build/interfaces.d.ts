import type { ReactElement } from 'react';
import type { RecursiveArray, TextStyle, ViewStyle } from 'react-native';
import type { CalendarHeaderProps } from './components/CalendarHeader';
import type { CalendarHeaderForMonthViewProps } from './components/CalendarHeaderForMonthView';
export interface ICalendarEventBase {
    start: Date;
    end: Date;
    title: string;
    children?: ReactElement | null;
    hideHours?: boolean;
    disabled?: boolean;
    /**
     * overlapping position of event starting from 0 (optional)
     */
    overlapPosition?: number;
    /**
     * number of events overlapping with this event (optional)
     */
    overlapCount?: number;
}
export type CalendarTouchableOpacityProps = {
    delayPressIn: number;
    key: string;
    style: RecursiveArray<ViewStyle | undefined> | ViewStyle;
    onPress: () => void;
    onLongPress: () => void;
    disabled: boolean;
};
export type Mode = '3days' | 'week' | 'day' | 'custom' | 'month' | 'schedule';
export type EventCellStyle<T extends ICalendarEventBase> = ViewStyle | ViewStyle[] | ((event: T) => ViewStyle | ViewStyle[]);
export type AllDayEventCellStyle<T extends ICalendarEventBase> = ViewStyle | ((event: T) => ViewStyle);
export type CalendarCellStyle = ViewStyle | ((date?: Date, hourRowIndex?: number) => ViewStyle);
export type CalendarCellTextStyle = TextStyle | ((date?: Date, hourRowIndex?: number) => TextStyle);
export type WeekNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HasDateRange = [Date, Date];
export type DateRangeHandler = ([start, end]: HasDateRange) => void;
export type HorizontalDirection = 'RIGHT' | 'LEFT';
export type EventRenderer<T extends ICalendarEventBase = ICalendarEventBase> = (event: T, touchableOpacityProps: CalendarTouchableOpacityProps) => JSX.Element;
export type HeaderRenderer<T extends ICalendarEventBase> = React.ComponentType<CalendarHeaderProps<T> & {
    mode: Mode;
}>;
export type MonthHeaderRenderer = React.ComponentType<CalendarHeaderForMonthViewProps>;
export type HourRenderer = React.ComponentType<{
    ampm: boolean;
    hour: number;
}>;
