import { describe, it, expect } from 'vitest';
import { ItFaker } from '../../src/lib/ItFaker';

async function sample(seed: number, n: number) {
    const f = new ItFaker();
    f.seed(seed);
    await f.itFirstName.preloadData();
    await f.itPlace.preloadData();
    const out: string[] = [];
    for (let i = 0; i < n; i++) {
        out.push(await f.itFirstName.firstName({ gender: 'male' }));
        const city = await f.itPlace.randomCity();
        out.push(city.name);
    }
    return out;
}

describe('seeded determinism', () => {
    it('same seed produces identical weighted output', async () => {
        const a = await sample(42, 25);
        const b = await sample(42, 25);
        expect(a).toEqual(b);
    });

    it('different seeds diverge', async () => {
        const a = await sample(1, 25);
        const b = await sample(2, 25);
        expect(a).not.toEqual(b);
    });
});
