import { describe, it, expect, vi } from 'vitest';
import type { Faker } from '@faker-js/faker';
import { WeightedRandomSelector } from '../../../src/lib/utils/weightedRandom';

/**
 * Builds a minimal Faker stub whose `number.int` returns the provided indices
 * in order. The small-dataset path of `select()` resolves an item by indexing
 * into the expanded fast-access array, so controlling `number.int` lets us
 * assert the exact item returned for a given draw.
 */
function fakerStubWithIndices(...indices: number[]): Faker {
    const int = vi.fn();
    indices.forEach(index => int.mockReturnValueOnce(index));
    return {
        number: {
            int,
            float: vi.fn(),
        },
    } as unknown as Faker;
}

describe('WeightedRandomSelector', () => {
    const items = [
        { value: 'A', weight: 1 },
        { value: 'B', weight: 2 },
        { value: 'C', weight: 3 },
        { value: 'D', weight: 4 }
    ];

    // Expanded fast-access array (small dataset): A B B C C C D D D D
    //                                   index:     0 1 2 3 4 5 6 7 8 9

    describe('select', () => {
        it('should return the correct item based on the PRNG-drawn index', () => {
            const selector = new WeightedRandomSelector(items, fakerStubWithIndices(0, 2, 5, 8));

            expect(selector.select()).toBe('A');
            expect(selector.select()).toBe('B');
            expect(selector.select()).toBe('C');
            expect(selector.select()).toBe('D');
        });
    });

    describe('selectMultiple', () => {
        it('should return the correct distribution of items', () => {
            const selector = new WeightedRandomSelector(
                items,
                fakerStubWithIndices(0, 1, 3, 6, 2, 4, 7, 5, 8, 9)
            );

            const selectedItems = selector.selectMultiple(10);
            expect(selectedItems).toEqual(['A', 'B', 'C', 'D', 'B', 'C', 'D', 'C', 'D', 'D']);
        });
    });
});
