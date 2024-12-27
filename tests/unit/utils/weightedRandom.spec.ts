import { describe, it, expect, vi } from 'vitest';
import { WeightedRandomSelector } from '../../../src/lib/utils/weightedRandom';

describe('WeightedRandomSelector', () => {
    const items = [
        { value: 'A', weight: 1 },
        { value: 'B', weight: 2 },
        { value: 'C', weight: 3 },
        { value: 'D', weight: 4 }
    ];

    describe('select', () => {
        it('should return the correct item based on the provided random value', () => {
            const selector = new WeightedRandomSelector(items);

            // Mock Math.random to return specific values
            const mockMath = Object.create(global.Math);
            mockMath.random = vi.fn()
                .mockReturnValueOnce(0.09)  // Should return 'A'
                .mockReturnValueOnce(0.29)  // Should return 'B'
                .mockReturnValueOnce(0.59)  // Should return 'C'
                .mockReturnValueOnce(0.89); // Should return 'D'
            global.Math = mockMath;

            expect(selector.select()).toBe('A');
            expect(selector.select()).toBe('B');
            expect(selector.select()).toBe('C');
            expect(selector.select()).toBe('D');
        });
    });

    describe('selectMultiple', () => {
        it('should return the correct distribution of items', () => {
            const selector = new WeightedRandomSelector(items);

            // Mock Math.random to return a sequence of values
            const mockMath = Object.create(global.Math);
            mockMath.random = vi.fn()
                .mockReturnValueOnce(0.09)  // 'A'
                .mockReturnValueOnce(0.29)  // 'B'
                .mockReturnValueOnce(0.59)  // 'C'
                .mockReturnValueOnce(0.89)  // 'D'
                .mockReturnValueOnce(0.19)  // 'B'
                .mockReturnValueOnce(0.49)  // 'C'
                .mockReturnValueOnce(0.79)  // 'D'
                .mockReturnValueOnce(0.39)  // 'C'
                .mockReturnValueOnce(0.69)  // 'D'
                .mockReturnValueOnce(0.99); // 'D'
            global.Math = mockMath;

            const selectedItems = selector.selectMultiple(10);
            expect(selectedItems).toEqual(['A', 'B', 'C', 'D', 'B', 'C', 'D', 'C', 'D', 'D']);
        });
    });
});