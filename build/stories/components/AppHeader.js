import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export var HEADER_HEIGHT = 50;
export function AppHeader() {
    return (React.createElement(View, { style: styles.header },
        React.createElement(Text, null, "Big Calendar")));
}
var styles = StyleSheet.create({
    header: {
        height: HEADER_HEIGHT,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
//# sourceMappingURL=AppHeader.js.map