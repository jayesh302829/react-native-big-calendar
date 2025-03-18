import React from 'react';
import { PanResponder } from 'react-native';
var SWIPE_THRESHOLD = 50;
export function usePanResponder(_a) {
    var onSwipeHorizontal = _a.onSwipeHorizontal;
    var panHandledRef = React.useRef(false);
    var panResponder = React.useMemo(function () {
        return PanResponder.create({
            // see https://stackoverflow.com/questions/47568850/touchableopacity-with-parent-panresponder
            onMoveShouldSetPanResponder: function (_, _a) {
                var dx = _a.dx, dy = _a.dy;
                return dx > 2 || dx < -2 || dy > 2 || dy < -2;
            },
            onPanResponderMove: function (_, _a) {
                var dy = _a.dy, dx = _a.dx;
                if (dy < -1 * SWIPE_THRESHOLD || SWIPE_THRESHOLD < dy || panHandledRef.current) {
                    return;
                }
                if (dx < -1 * SWIPE_THRESHOLD) {
                    onSwipeHorizontal === null || onSwipeHorizontal === void 0 ? void 0 : onSwipeHorizontal('LEFT');
                    panHandledRef.current = true;
                    return;
                }
                if (dx > SWIPE_THRESHOLD) {
                    onSwipeHorizontal === null || onSwipeHorizontal === void 0 ? void 0 : onSwipeHorizontal('RIGHT');
                    panHandledRef.current = true;
                    return;
                }
            },
            onPanResponderEnd: function () {
                panHandledRef.current = false;
            },
        });
    }, [onSwipeHorizontal]);
    return panResponder;
}
//# sourceMappingURL=usePanResponder.js.map