import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
export var CONTROL_HEIGHT = 100;
export function Control(_a) {
    var onNext = _a.onNext, onPrev = _a.onPrev, onToday = _a.onToday;
    return (React.createElement(View, { style: styles.control },
        React.createElement(Button, { title: "Prev", onPress: onPrev }),
        React.createElement(Button, { title: "Today", onPress: onToday }),
        React.createElement(Button, { title: "Next", onPress: onNext })));
}
var styles = StyleSheet.create({
    control: {
        height: CONTROL_HEIGHT,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
//# sourceMappingURL=Control.js.map