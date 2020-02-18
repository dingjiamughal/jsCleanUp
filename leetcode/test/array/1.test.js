import {tele} from '../../src/array/1';

/* eslint-disable no-undef */

test('telephone组合', () => {
    expect(tele('23')).toEqual(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
});
