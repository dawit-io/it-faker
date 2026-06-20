import type { Faker } from "@faker-js/faker";
import { LastNameModule } from "./lastName.module";
import { WeightedRandomSelector } from "../utils/weightedRandom";
import type { WeightedItem } from "../types/types";
import { type Observable, of, forkJoin, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CompanyNameOptions {
    /** Append a legal form (S.r.l., S.p.A., ...). Defaults to true. */
    withLegalForm?: boolean;
}

/**
 * Lookup table for the Italian IBAN national check character (CIN).
 * Maps each character at an ODD position (1-indexed) of the BBAN body to its
 * weight. Characters at EVEN positions use their plain value (digits 0-9,
 * letters A-Z → 0-25), computed inline.
 */
const CIN_ODD_VALUES: Record<string, number> = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21,
    K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14,
    U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
};

/**
 * Generates Italian B2B identifiers and legal entities (Partita IVA, IBAN,
 * ragioni sociali) whose checksums and formats are actually valid — Faker's
 * built-in `iban`/`company.name` are not Italy-conformant.
 */
export class CompanyModule {
    private readonly lastNameModule: LastNameModule;
    private readonly legalFormSelector: WeightedRandomSelector<string>;

    // Forme giuridiche pesate per frequenza reale nel registro imprese
    private readonly legalForms: WeightedItem<string>[] = [
        { value: 'S.r.l.', weight: 50 },     // di gran lunga la più diffusa
        { value: 'S.r.l.s.', weight: 12 },   // semplificata
        { value: 'S.n.c.', weight: 12 },
        { value: 'S.a.s.', weight: 10 },
        { value: 'S.p.A.', weight: 9 },
        { value: 'Soc. Coop.', weight: 7 }
    ];

    private readonly sectorPrefixes = [
        'Costruzioni', 'Impianti', 'Trasporti', 'Servizi', 'Logistica',
        'Officine', 'Industrie', 'Autotrasporti', 'Edilizia', 'Forniture',
        'Gruppo', 'Nuova', 'Italiana'
    ];

    private readonly fantasyPrefixes = [
        'Tecno', 'Info', 'Edil', 'Termo', 'Idro', 'Eco', 'Bio', 'Euro',
        'Italia', 'Elettro', 'Meccano', 'Agri'
    ];

    private readonly fantasySuffixes = [
        'service', 'sistemi', 'impianti', 'group', 'net', 'data', 'tech',
        'logic', 'point', 'lab', 'time'
    ];

    constructor(private readonly faker: Faker) {
        this.lastNameModule = new LastNameModule(faker);
        this.legalFormSelector = new WeightedRandomSelector(this.legalForms, faker);
    }

    /**
     * Generates a valid 11-digit Partita IVA (7-digit serial + 3-digit office
     * code + Luhn check digit).
     */
    vatNumber(): string {
        const serial = this.faker.string.numeric(7);
        const office = this.faker.number.int({ min: 1, max: 100 }).toString().padStart(3, '0');
        const first10 = serial + office;
        return first10 + CompanyModule.vatCheckDigit(first10);
    }

    /** Generates a valid Italian IBAN (IT + check + CIN + ABI + CAB + account). */
    iban(): string {
        const abi = this.faker.string.numeric(5);
        const cab = this.faker.string.numeric(5);
        const account = this.faker.string.numeric(12);
        const cin = CompanyModule.ibanCin(abi + cab + account);
        const bban = `${cin}${abi}${cab}${account}`;
        const check = CompanyModule.ibanCheckDigits(bban);
        return `IT${check}${bban}`;
    }

    /** Returns a weighted legal form (S.r.l. most common). */
    legalForm(): string {
        return this.legalFormSelector.select();
    }

    vatNumber$(): Observable<string> {
        return of(this.vatNumber());
    }

    iban$(): Observable<string> {
        return of(this.iban());
    }

    legalForm$(): Observable<string> {
        return of(this.legalForm());
    }

    /** Generates a plausible Italian company name (ragione sociale). */
    companyName$(options?: CompanyNameOptions): Observable<string> {
        const withLegalForm = options?.withLegalForm ?? true;
        return forkJoin({
            s1: this.lastNameModule.lastName$(),
            s2: this.lastNameModule.lastName$()
        }).pipe(
            map(({ s1, s2 }) => {
                const base = this.buildBaseName(s1, s2);
                return withLegalForm ? `${base} ${this.legalForm()}` : base;
            })
        );
    }

    async companyName(options?: CompanyNameOptions): Promise<string> {
        return lastValueFrom(this.companyName$(options));
    }

    private buildBaseName(s1: string, s2: string): string {
        const pattern = this.faker.number.int({ min: 1, max: 6 });
        switch (pattern) {
            case 1: return `${this.faker.helpers.arrayElement(this.sectorPrefixes)} ${s1}`;
            case 2: return `${s1} & ${s2}`;
            case 3: return `${s1} e Figli`;
            case 4: return `F.lli ${s1}`;
            case 5: return `${this.faker.helpers.arrayElement(this.fantasyPrefixes)}${this.faker.helpers.arrayElement(this.fantasySuffixes)}`;
            default: return s1;
        }
    }

    /** Luhn-style check digit for the first 10 digits of a Partita IVA. */
    private static vatCheckDigit(first10: string): number {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            let n = first10.charCodeAt(i) - 48;
            if (i % 2 === 1) {        // even position (1-indexed) → double
                n *= 2;
                if (n > 9) n -= 9;
            }
            sum += n;
        }
        return (10 - (sum % 10)) % 10;
    }

    /** Computes the IBAN CIN letter from the 22-char BBAN body (ABI+CAB+account). */
    private static ibanCin(bbanBody: string): string {
        let sum = 0;
        for (let i = 0; i < bbanBody.length; i++) {
            const ch = bbanBody[i];
            if (i % 2 === 0) {
                sum += CIN_ODD_VALUES[ch];
            } else {
                sum += ch >= '0' && ch <= '9' ? ch.charCodeAt(0) - 48 : ch.charCodeAt(0) - 65;
            }
        }
        return String.fromCharCode(65 + (sum % 26));
    }

    /** ISO 7064 MOD 97-10 check digits for the IBAN (BBAN = CIN+ABI+CAB+account). */
    private static ibanCheckDigits(bban: string): string {
        const remainder = CompanyModule.mod97(`${bban}IT00`);
        return (98 - remainder).toString().padStart(2, '0');
    }

    private static mod97(input: string): number {
        let remainder = 0;
        for (const ch of input) {
            const code = ch >= '0' && ch <= '9' ? ch.charCodeAt(0) - 48 : ch.charCodeAt(0) - 55;
            remainder = code > 9 ? (remainder * 100 + code) % 97 : (remainder * 10 + code) % 97;
        }
        return remainder;
    }

    /** Validates an 11-digit Partita IVA via its Luhn checksum. */
    static isValidVatNumber(vat: string): boolean {
        if (!/^\d{11}$/.test(vat)) return false;
        let sum = 0;
        for (let i = 0; i < 11; i++) {
            let n = vat.charCodeAt(i) - 48;
            if (i % 2 === 1) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            sum += n;
        }
        return sum % 10 === 0;
    }

    /** Validates an Italian IBAN: format + ISO 7064 MOD 97-10 == 1. */
    static isValidIban(iban: string): boolean {
        const value = iban.replace(/\s/g, '').toUpperCase();
        if (!/^IT\d{2}[A-Z]\d{22}$/.test(value)) return false;
        return CompanyModule.mod97(value.slice(4) + value.slice(0, 4)) === 1;
    }
}
