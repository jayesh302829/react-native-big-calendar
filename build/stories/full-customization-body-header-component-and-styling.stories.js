import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { Calendar, modeToNum } from '../src';
import { events } from './events';
import { useEvents } from './hooks';
import { styles } from './styles';
import { themes } from './themes';
var SCREEN_HEIGHT = Dimensions.get('window').height;
var today = new Date();
var meta = {
    title: 'showcase/Full Customization',
    component: Calendar,
};
export default meta;
export var BodyHeaderComponentAndStyling = {
    render: function () {
        var _a = useEvents(events), calendarEvents = _a.events, addEvent = _a.addEvent;
        var _b = React.useState('week'), mode = _b[0], setMode = _b[1];
        var _c = React.useState(today), date = _c[0], setDate = _c[1];
        var _d = React.useState('default'), theme = _d[0], setTheme = _d[1];
        var _onPrevDate = function () {
            if (mode === 'month') {
                setDate(dayjs(date)
                    .add(dayjs(date).date() * -1, 'day')
                    .toDate());
            }
            else {
                setDate(dayjs(date)
                    .add(modeToNum(mode, date) * -1, 'day')
                    .toDate());
            }
        };
        var _onNextDate = function () {
            setDate(dayjs(date).add(modeToNum(mode, date), 'day').toDate());
        };
        var _onToday = function () {
            setDate(today);
        };
        var textStyle = theme === 'dark' ? tailwind('text-white') : tailwind('text-gray-800');
        var Button = function (_a) {
            var onPress = _a.onPress, title = _a.title;
            return (React.createElement(TouchableOpacity, { onPress: onPress, style: [tailwind('px-4 py-2 border border-gray-200 mx-2 rounded')] },
                React.createElement(Text, { style: textStyle }, title)));
        };
        var pickerStyle = [
            tailwind('border-gray-300 py-1 px-2 rounded text-gray-700 text-base'),
            theme === 'dark' ? tailwind('bg-gray-800 text-white') : tailwind('bg-white text-gray-700'),
        ];
        return (React.createElement(View, { style: [styles.desktop, theme === 'dark' && tailwind('bg-gray-900')] },
            React.createElement(View, { style: tailwind('flex flex-1 flex-row items-center justify-between border-gray-200 border-b py-4') },
                React.createElement(View, { style: tailwind('flex-1 flex-row items-center') },
                    React.createElement(Button, { title: "Today", onPress: _onToday }),
                    React.createElement(Button, { title: "<", onPress: _onPrevDate }),
                    React.createElement(Button, { title: ">", onPress: _onNextDate }),
                    React.createElement(View, { style: tailwind('ml-4') },
                        React.createElement(Text, { style: textStyle }, dayjs(date).format('MMMM YYYY')))),
                React.createElement(Picker, { style: pickerStyle, selectedValue: theme, onValueChange: setTheme },
                    React.createElement(Picker.Item, { value: "default", label: "default theme" }),
                    React.createElement(Picker.Item, { value: "dark", label: "dark" }),
                    React.createElement(Picker.Item, { value: "green", label: "green" }),
                    React.createElement(Picker.Item, { value: "green_bg", label: "green-rows bg" })),
                React.createElement(Picker, { style: [pickerStyle, tailwind('mx-4')], selectedValue: mode, onValueChange: setMode },
                    React.createElement(Picker.Item, { value: "day", label: "day" }),
                    React.createElement(Picker.Item, { value: "3days", label: "3days" }),
                    React.createElement(Picker.Item, { value: "week", label: "week" }),
                    React.createElement(Picker.Item, { value: "month", label: "month" }))),
            React.createElement(View, { style: { marginTop: 16 } },
                React.createElement(Calendar, { date: date, height: SCREEN_HEIGHT - 80, events: calendarEvents, onPressCell: addEvent, mode: mode, theme: themes[theme], headerContentStyle: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, dayHeaderStyle: {
                        marginLeft: 10,
                        backgroundColor: '#f1f1f1',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 12,
                    }, dayHeaderHighlightColor: '#000', weekDayHeaderHighlightColor: '#aaa', headerComponent: React.createElement(Text, { style: { color: '#aaa', fontSize: 25 } }, "CalendarBody's headerComponent"), headerComponentStyle: {
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }, hourStyle: { color: '#355070', fontSize: 15 }, showAllDayEventCell: false }))));
    },
};
//# sourceMappingURL=full-customization-body-header-component-and-styling.stories.js.map