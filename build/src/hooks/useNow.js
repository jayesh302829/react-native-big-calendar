import dayjs from 'dayjs';
import React from 'react';
export function useNow(enabled) {
    var _a = React.useState(dayjs()), now = _a[0], setNow = _a[1];
    React.useEffect(function () {
        if (!enabled) {
            return function () { };
        }
        var pid = setInterval(function () { return setNow(dayjs()); }, 60 * 1000);
        return function () { return clearInterval(pid); };
    }, [enabled]);
    return {
        now: now,
    };
}
//# sourceMappingURL=useNow.js.map