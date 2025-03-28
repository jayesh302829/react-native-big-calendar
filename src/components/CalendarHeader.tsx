import dayjs from 'dayjs'
import * as React from 'react'
import {
  type AccessibilityProps,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native'
import { eventCellCss, u } from '../commonStyles'
import type { ICalendarEventBase } from '../interfaces'
import { useTheme } from '../theme/ThemeContext'
import { objHasContent } from '../utils/object'
import { typedMemo } from '../utils/react'

export interface CalendarHeaderProps<T extends ICalendarEventBase> {
  dateRange: dayjs.Dayjs[]
  cellHeight: number
  locale: string
  style: ViewStyle
  allDayEventCellStyle: ViewStyle | ((event: T) => ViewStyle)
  allDayEventCellTextColor: string
  allDayEvents: T[]
  onPressDateHeader?: (date: Date) => void
  onPressEvent?: (event: T) => void
  onLongPressEvent?: (event: T) => void
  activeDate?: Date
  headerContentStyle?: ViewStyle
  dayHeaderStyle?: ViewStyle
  weekDayHeaderHighlightColor?: string
  showAllDayEventCell?: boolean
  hideHours?: boolean
  showWeekNumber?: boolean
  weekNumberPrefix?: string
  allDayEventCellAccessibilityProps?: AccessibilityProps
  headerContainerAccessibilityProps?: AccessibilityProps
  headerCellAccessibilityProps?: AccessibilityProps
}

function _CalendarHeader<T extends ICalendarEventBase>({
  dateRange,
  cellHeight,
  style,
  allDayEventCellStyle,
  allDayEventCellTextColor,
  allDayEvents,
  onPressDateHeader,
  onPressEvent,
  onLongPressEvent,
  headerContentStyle = {},
  dayHeaderStyle = {},
  showAllDayEventCell = true,
  hideHours = false,
  showWeekNumber = false,
  weekNumberPrefix = '',
  allDayEventCellAccessibilityProps = {},
  headerContainerAccessibilityProps = {},
  headerCellAccessibilityProps = {},
}: CalendarHeaderProps<T>) {
  const _onPressHeader = React.useCallback(
    (date: Date) => {
      onPressDateHeader?.(date)
    },
    [onPressDateHeader],
  )

  const _onPressEvent = React.useCallback(
    (event: T) => {
      onPressEvent?.(event)
    },
    [onPressEvent],
  )

  const _onLongPressEvent = React.useCallback(
    (event: T) => {
      onLongPressEvent?.(event)
    },
    [onLongPressEvent],
  )
  const theme = useTheme()

  const borderColor = { borderColor: theme.palette.gray['200'] }
  const primaryBg = { backgroundColor: theme.palette.primary.main }

  return (
    <View
      style={[
        showAllDayEventCell ? u['border-b-2'] : {},
        showAllDayEventCell ? borderColor : {},
        theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
        style,
      ]}
      {...headerContainerAccessibilityProps}
    >
      {(!hideHours || showWeekNumber) && (
        <View style={[u['z-10'], u['w-50'], u['pt-2'], borderColor]}>
          {showWeekNumber ? (
            <View
              style={[
                { height: cellHeight },
                objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
              ]}
              {...headerCellAccessibilityProps}
            >
              <Text
                style={[
                  theme.typography.xs,
                  u['text-center'],
                  {
                    color: theme.palette.gray['500'],
                  },
                ]}
              >
                {weekNumberPrefix}
              </Text>
              <View style={objHasContent(dayHeaderStyle) ? dayHeaderStyle : [u['mb-6']]}>
                <Text
                  style={[
                    {
                      color: theme.palette.gray['800'],
                    },
                    theme.typography.xl,
                    u['text-center'],
                  ]}
                >
                  {dateRange.length > 0
                    ? dateRange[0].startOf('week').add(4, 'days').isoWeek()
                    : ''}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      )}
      {dateRange.map((date) => {
        return (
          <TouchableOpacity
            style={[u['flex-1'], u['pt-2']]}
            onPress={() => _onPressHeader(date.toDate())}
            disabled={onPressDateHeader === undefined}
            key={date.toString()}
            {...headerCellAccessibilityProps}
          >
            <View
              style={[
                { height: cellHeight },
                objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
              ]}
            >
              <Text
               style={[
                {
                  color: 'black',
                  fontSize:14,
                  marginTop:5,
                },
                // theme.typography.xl,
                u['text-center'],
              ]}
              >
                {date.format('dddd')}
              </Text>
              <View
                style={
                  objHasContent(dayHeaderStyle)
                    ? dayHeaderStyle
                    : [u['mb-6']]
                }
              >
                <Text
                  style={[
                    {
                      color: 'black',
                      fontSize:14,
                    },
                    // theme.typography.xl,
                    u['text-center'],
                  ]}
                >
                  {date.format('MM/DD/YYYY')}
                </Text>
              </View>
            </View>
            {showAllDayEventCell ? (
              <View
                style={[
                  u['border-l'],
                  { borderColor: theme.palette.gray['200'] },
                  { height: cellHeight },
                ]}
              >
                {allDayEvents.map((event, index) => {
                  if (!dayjs(date).isBetween(event.start, event.end, 'day', '[]')) {
                    return null
                  }

                  const getEventStyle =
                    typeof allDayEventCellStyle === 'function'
                      ? allDayEventCellStyle
                      : () => allDayEventCellStyle

                  return (
                    <TouchableOpacity
                      style={[eventCellCss.style, primaryBg, u['mt-2'], getEventStyle(event)]}
                      key={`${index}-${event.start}-${event.title}-${event.end}`}
                      onPress={() => _onPressEvent(event)}
                      onLongPress={() => {
                       _onLongPressEvent(event)
                      }}
                      {...allDayEventCellAccessibilityProps}
                    >
                      <Text
                        style={{
                          fontSize: theme.typography.sm.fontSize,
                          color: allDayEventCellTextColor || theme.palette.primary.contrastText,
                        }}
                      >
                        {event.title}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            ) : null}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export const CalendarHeader = typedMemo(_CalendarHeader)
