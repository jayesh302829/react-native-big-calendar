export function objHasContent(obj) {
    return !!Object.keys(obj).length;
}
export function stringHasContent(string) {
    return !!string.length;
}
// biome-ignore lint/suspicious/noExplicitAny: expected
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
function keys(obj) {
    return Object.keys(obj);
}
export function deepMerge(target, source) {
    var _a, _b;
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        for (var _i = 0, _c = keys(source); _i < _c.length; _i++) {
            var key = _c[_i];
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                // @ts-ignore
                else
                    output[key] = deepMerge(target[key], source[key]);
            }
            else {
                Object.assign(output, (_b = {}, _b[key] = source[key], _b));
            }
        }
    }
    return output;
}
//# sourceMappingURL=object.js.map