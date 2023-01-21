import {
    base1,
    base2,
    timedSort1,
    timedSort2,
} from '../TestingConstants/eventSort';
import { eventTiming } from '../eventSort';

const setTimeout = jest.fn(fn => fn());
describe('utils/timeSorting', () => {
    test('Event Sort Works', () => {
        const { visibleSessions } = eventTiming(base1);

        visibleSessions.forEach(({ id = '' }, i) => {
            expect(id.substring(0, 6)).toEqual(timedSort1[i].id.substring(0, 6));
        });
    });
    test('Live Swap Works', () => {
        function doAsync(time, sessions, cb) {
            setTimeout(() => {
                const { visibleSessions: transitionSessions } =
                    eventTiming(sessions);

                const items = transitionSessions.reduce((acc, item, i) => {
                    if (item.id === timedSort2[i].id) {
                        return [].concat(acc, [true]);
                    }

                    return [].concat(acc, [false]);
                }, []);

                cb(items);
            }, time);
        }

        const { nextTransitionMs, visibleSessions } = eventTiming(base2);
        const cb = jest.fn();

        doAsync(nextTransitionMs, visibleSessions, cb);

        expect(setTimeout).toHaveBeenCalled();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(
            expect.any(Function),
            nextTransitionMs,
        );
        expect(cb).toHaveBeenCalled();
        expect(cb).toHaveBeenCalledTimes(1);
    });
});
