import type { ICalendarEventBase } from '../src/interfaces';
export declare function useEvents(defaultEvents: ICalendarEventBase[]): {
    events: ICalendarEventBase[];
    addEvent: (start: Date) => void;
};
