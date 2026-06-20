import { describe, it, expect } from 'vitest';
import { ItFaker } from '../../../src/lib/ItFaker';
import type { EmploymentLevel } from '../../../src/lib/modules/employment.module';

const KNOWN_TITLES = new Set([
    'Operaio generico', 'Operaio specializzato', 'Magazziniere', 'Autista',
    'Impiegato amministrativo', 'Addetto alle vendite', 'Contabile', 'Tecnico',
    'Impiegato commerciale', 'Sviluppatore software', 'Infermiere', 'Insegnante',
    'Responsabile di reparto', 'Capo progetto', 'Consulente senior',
    'Dirigente', 'Direttore generale'
]);

const KNOWN_CONTRACTS = new Set([
    'Tempo Indeterminato', 'Tempo Determinato', 'Apprendistato',
    'Partita IVA', 'Somministrazione', 'Stage/Tirocinio'
]);

const RAL_BOUNDS: Record<EmploymentLevel, { min: number; max: number }> = {
    operaio: { min: 18000, max: 28000 },
    impiegato: { min: 22000, max: 42000 },
    quadro: { min: 42000, max: 70000 },
    dirigente: { min: 70000, max: 150000 }
};

describe('EmploymentModule', () => {
    const faker = new ItFaker();

    it('draws job titles only from the known vocabulary', () => {
        for (let i = 0; i < 100; i++) {
            expect(KNOWN_TITLES.has(faker.itEmployment.jobTitle())).toBe(true);
        }
    });

    it('draws contract types only from the closed vocabulary', () => {
        for (let i = 0; i < 100; i++) {
            expect(KNOWN_CONTRACTS.has(faker.itEmployment.contractType())).toBe(true);
        }
    });

    it('keeps RAL within the requested level band and rounded to 1.000', () => {
        (Object.keys(RAL_BOUNDS) as EmploymentLevel[]).forEach(level => {
            for (let i = 0; i < 50; i++) {
                const ral = faker.itEmployment.salary({ level });
                expect(ral).toBeGreaterThanOrEqual(RAL_BOUNDS[level].min);
                expect(ral).toBeLessThanOrEqual(RAL_BOUNDS[level].max);
                expect(ral % 1000).toBe(0);
            }
        });
    });

    it('produces coherent employment records (RAL fits the title level)', () => {
        for (let i = 0; i < 100; i++) {
            const rec = faker.itEmployment.employment();
            expect(KNOWN_TITLES.has(rec.jobTitle)).toBe(true);
            expect(KNOWN_CONTRACTS.has(rec.contractType)).toBe(true);
            expect(rec.ral).toBeGreaterThanOrEqual(RAL_BOUNDS[rec.level].min);
            expect(rec.ral).toBeLessThanOrEqual(RAL_BOUNDS[rec.level].max);
        }
    });

    it('weights common roles above rare ones', () => {
        const counts: Record<string, number> = {};
        for (let i = 0; i < 3000; i++) {
            const t = faker.itEmployment.jobTitle();
            counts[t] = (counts[t] ?? 0) + 1;
        }
        // "Impiegato amministrativo" (weight 16) must clearly beat "Direttore generale" (weight 1)
        expect(counts['Impiegato amministrativo'] ?? 0).toBeGreaterThan(counts['Direttore generale'] ?? 0);
    });

    it('is reproducible under the same seed', () => {
        const a = new ItFaker();
        a.seed(99);
        const b = new ItFaker();
        b.seed(99);
        for (let i = 0; i < 20; i++) {
            expect(a.itEmployment.employment()).toEqual(b.itEmployment.employment());
        }
    });
});
