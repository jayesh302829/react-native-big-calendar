import { deepMerge } from '../object';
test('deepMerge', function () {
    var obj1 = {
        a: 1,
        b: {
            c: 2,
            d: 3,
            e: 4,
        },
        array: [1, 2, 3],
    };
    var obj2 = {
        a: 2,
        b: {
            c: 2,
            d: 3,
        },
        array: [4, 5],
    };
    expect(deepMerge(obj1, obj2)).toEqual({
        a: 2,
        b: {
            c: 2,
            d: 3,
            e: 4,
        },
        array: [4, 5],
    });
});
//# sourceMappingURL=object.test.js.map