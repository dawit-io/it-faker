import type { Faker } from "@faker-js/faker";
import { WeightedRandomSelector } from "../utils/weightedRandom";
import type { WeightedItem } from "../types/types";
import { type Observable, of, lastValueFrom } from 'rxjs';

/** CCNL macro-category, used to drive a plausible RAL distribution. */
export type EmploymentLevel = 'operaio' | 'impiegato' | 'quadro' | 'dirigente';

export interface JobPosition {
    title: string;
    level: EmploymentLevel;
}

export interface EmploymentRecord {
    jobTitle: string;
    level: EmploymentLevel;
    /** Retribuzione Annua Lorda in EUR. */
    ral: number;
    contractType: string;
}

/**
 * Generates plausible Italian employment data: weighted job titles (many
 * "Impiegato"/"Operaio", few "Dirigente"), RAL ranges per CCNL level, and a
 * closed vocabulary of contract types. Distributions — not exact values — are
 * tuned so that aggregations (GROUP BY level, AVG ral) read realistically.
 */
export class EmploymentModule {
    // Mansioni pesate; ogni voce porta il proprio livello CCNL per coerenza.
    private readonly jobPositions: WeightedItem<JobPosition>[] = [
        { value: { title: 'Operaio generico', level: 'operaio' }, weight: 16 },
        { value: { title: 'Operaio specializzato', level: 'operaio' }, weight: 10 },
        { value: { title: 'Magazziniere', level: 'operaio' }, weight: 7 },
        { value: { title: 'Autista', level: 'operaio' }, weight: 5 },
        { value: { title: 'Impiegato amministrativo', level: 'impiegato' }, weight: 16 },
        { value: { title: 'Addetto alle vendite', level: 'impiegato' }, weight: 10 },
        { value: { title: 'Contabile', level: 'impiegato' }, weight: 7 },
        { value: { title: 'Tecnico', level: 'impiegato' }, weight: 7 },
        { value: { title: 'Impiegato commerciale', level: 'impiegato' }, weight: 6 },
        { value: { title: 'Sviluppatore software', level: 'impiegato' }, weight: 5 },
        { value: { title: 'Infermiere', level: 'impiegato' }, weight: 4 },
        { value: { title: 'Insegnante', level: 'impiegato' }, weight: 4 },
        { value: { title: 'Responsabile di reparto', level: 'quadro' }, weight: 5 },
        { value: { title: 'Capo progetto', level: 'quadro' }, weight: 3 },
        { value: { title: 'Consulente senior', level: 'quadro' }, weight: 3 },
        { value: { title: 'Dirigente', level: 'dirigente' }, weight: 3 },
        { value: { title: 'Direttore generale', level: 'dirigente' }, weight: 1 }
    ];

    // Tipi contratto — vocabolario chiuso, pesato per diffusione.
    private readonly contractTypes: WeightedItem<string>[] = [
        { value: 'Tempo Indeterminato', weight: 60 },
        { value: 'Tempo Determinato', weight: 22 },
        { value: 'Apprendistato', weight: 8 },
        { value: 'Partita IVA', weight: 6 },
        { value: 'Somministrazione', weight: 3 },
        { value: 'Stage/Tirocinio', weight: 1 }
    ];

    // Distribuzione livelli quando non se ne fornisce uno esplicito.
    private readonly levels: WeightedItem<EmploymentLevel>[] = [
        { value: 'operaio', weight: 35 },
        { value: 'impiegato', weight: 45 },
        { value: 'quadro', weight: 15 },
        { value: 'dirigente', weight: 5 }
    ];

    // Range RAL (EUR) per livello — fasce, non valori puntuali.
    private readonly ralRanges: Record<EmploymentLevel, { min: number; max: number }> = {
        operaio: { min: 18000, max: 28000 },
        impiegato: { min: 22000, max: 42000 },
        quadro: { min: 42000, max: 70000 },
        dirigente: { min: 70000, max: 150000 }
    };

    private readonly jobPositionSelector: WeightedRandomSelector<JobPosition>;
    private readonly contractTypeSelector: WeightedRandomSelector<string>;
    private readonly levelSelector: WeightedRandomSelector<EmploymentLevel>;

    constructor(private readonly faker: Faker) {
        this.jobPositionSelector = new WeightedRandomSelector(this.jobPositions, faker);
        this.contractTypeSelector = new WeightedRandomSelector(this.contractTypes, faker);
        this.levelSelector = new WeightedRandomSelector(this.levels, faker);
    }

    /** A weighted job title (e.g. "Impiegato amministrativo"). */
    jobTitle(): string {
        return this.jobPositionSelector.select().title;
    }

    /** A weighted CCNL level. */
    level(): EmploymentLevel {
        return this.levelSelector.select();
    }

    /** A weighted contract type from a closed vocabulary. */
    contractType(): string {
        return this.contractTypeSelector.select();
    }

    /**
     * A plausible RAL (annual gross salary, EUR) rounded to the nearest 1.000.
     * Defaults to a weighted level when none is provided.
     */
    salary(options?: { level?: EmploymentLevel }): number {
        const level = options?.level ?? this.level();
        const { min, max } = this.ralRanges[level];
        return this.faker.number.int({ min, max, multipleOf: 1000 });
    }

    /** A coherent employment record: title, level, RAL and contract type. */
    employment(): EmploymentRecord {
        const position = this.jobPositionSelector.select();
        return {
            jobTitle: position.title,
            level: position.level,
            ral: this.salary({ level: position.level }),
            contractType: this.contractType()
        };
    }

    jobTitle$(): Observable<string> {
        return of(this.jobTitle());
    }

    level$(): Observable<EmploymentLevel> {
        return of(this.level());
    }

    contractType$(): Observable<string> {
        return of(this.contractType());
    }

    salary$(options?: { level?: EmploymentLevel }): Observable<number> {
        return of(this.salary(options));
    }

    employment$(): Observable<EmploymentRecord> {
        return of(this.employment());
    }

    async employmentAsync(): Promise<EmploymentRecord> {
        return lastValueFrom(this.employment$());
    }
}
