import 'dayjs/locale/ja';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../src';
declare const meta: Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof Calendar>;
export declare const DayMode: Story;
export declare const ThreeDaysMode: Story;
export declare const WeekMode: Story;
export declare const MonthMode: Story;
export declare const MonthModeRTL: Story;
export declare const MonthModeSpanningEvents: Story;
export declare const MonthModeSpanningEventsRTL: Story;
export declare const MonthModeSpanningEventsHideAdjacent: Story;
export declare const EventCellStyle: Story;
export declare const WithControls: Story;
export declare const ScrollToTime: Story;
export declare const WeekStartsOnMonday: Story;
export declare const WeekModeWithHourLimits: Story;
export declare const AllDayEvents: Story;
export declare const OnPressDateHeader: Story;
export declare const LocaleJapanese: Story;
export declare const AMPMFormat: Story;
export declare const HiddenNowIndicator: Story;
export declare const MoreOverlapPadding: Story;
export declare const WithTimeslots: Story;
export declare const RTL: Story;
export declare const CustomEventRenderer: Story;
export declare const CustomHourRenderer: Story;
export declare const CustomWeekLength: Story;
export declare const EventSpanningMultipleDays: Story;
export declare const CustomTheme: Story;
export declare const DarkMode: Story;
export declare const WithoutHeader: Story;
export declare const WithoutHeaderMonth: Story;
export declare const MultipleStyles: Story;
export declare const ScheduleMode: Story;
export declare const WeekModeWithWeekNumber: Story;
export declare const MonthModeWithWeekNumber: Story;
