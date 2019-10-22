import {telephone} from '../../src/array/1';

/* eslint-disable no-undef */

test('telephone组合', () => {
    expect(telephone('23')).toBe(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
});
