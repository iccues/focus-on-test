import { formatTime } from './timeFormatter';

describe('formatTime', () => {
    test('应该正确格式化秒数', () => {
        expect(formatTime(0)).toBe('0:00');
        expect(formatTime(30)).toBe('0:30');
        expect(formatTime(60)).toBe('1:00');
        expect(formatTime(90)).toBe('1:30');
        expect(formatTime(125)).toBe('2:05');
    });

    test('应该正确格式化包含小时的时间', () => {
        expect(formatTime(3600)).toBe('1:00:00');
        expect(formatTime(3661)).toBe('1:01:01');
        expect(formatTime(7325)).toBe('2:02:05');
        expect(formatTime(10800)).toBe('3:00:00');
    });

    test('应该处理小数秒数', () => {
        expect(formatTime(30.7)).toBe('0:30');
        expect(formatTime(61.3)).toBe('1:01');
        expect(formatTime(125.9)).toBe('2:05');
        expect(formatTime(3661.8)).toBe('1:01:01');
    });

    test('应该处理负数', () => {
        expect(formatTime(-30)).toBe('0:30');
        expect(formatTime(-3661)).toBe('1:01:01');
        expect(formatTime(-125)).toBe('2:05');
    });

    test('应该处理边界值', () => {
        expect(formatTime(59)).toBe('0:59');
        expect(formatTime(3599)).toBe('59:59');
        expect(formatTime(3600)).toBe('1:00:00');
        expect(formatTime(3601)).toBe('1:00:01');
    });

    test('应该处理零值', () => {
        expect(formatTime(0)).toBe('0:00');
        expect(formatTime(0.1)).toBe('0:00');
        expect(formatTime(-0)).toBe('0:00');
    });

    test('应该处理大数值', () => {
        expect(formatTime(99999)).toBe('27:46:39');
        expect(formatTime(86400)).toBe('24:00:00');
        expect(formatTime(123456)).toBe('34:17:36');
    });
});