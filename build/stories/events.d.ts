import type { EventRenderer, HourRenderer, ICalendarEventBase } from '../src/interfaces';
export declare const events: Array<ICalendarEventBase & {
    color?: string;
}>;
export declare const tonsOfEvents: Array<ICalendarEventBase & {
    color?: string;
}>;
export declare const tonsOfEventsSorted: (ICalendarEventBase & {
    color?: string;
})[];
export declare const spanningEvents: Array<ICalendarEventBase & {
    color?: string;
}>;
export interface MyCustomEventType extends ICalendarEventBase {
    color?: string;
}
export declare const customEventRenderer: EventRenderer<MyCustomEventType>;
export declare const customHourRenderer: HourRenderer;
