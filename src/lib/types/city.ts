export interface RawItalianCity {
    nome: string;
    codice: string;
    zona: {
        codice: string;
        nome: string;
    };
    regione: {
        codice: string;
        nome: string;
    };
    provincia: {
        codice: string;
        nome: string;
    };
    sigla: string;
    codiceCatastale: string;
    cap: string[];
    popolazione: number;
}

export interface ItalianCity {
    name: string;           // nome
    code: string;          // codice
    zone: {
        code: string;      // zona.codice
        name: string;      // zona.nome
    };
    region: {
        code: string;      // regione.codice
        name: string;      // regione.nome
    };
    province: {
        code: string;      // provincia.codice
        name: string;      // provincia.nome
    };
    provinceCode: string;  // sigla
    belfioreCode: string; // codiceCatastale
    postalCodes: string[]; // cap
    population: number;    // popolazione
}