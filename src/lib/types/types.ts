export interface WeightedData {
    type: string;
    lastUpdate: string;
    items: Array<{
        value: string;
        weight: number;
    }>;
}

export interface WeightedItem<T> {
    value: T;
    weight: number;
}

export interface RegionalLastName {
    region: string;
    province: string;
    surnames: string[];
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export interface Province {
    name: string;
    code: string;
}

export interface BirthPlace {
    name: string;
    belfioreCode: string;
    province: string;
    region: string;
    provinceCode: string;
}

export interface PersonOptions {
    gender?: Gender;
    minAge?: number;
    maxAge?: number;
    withTitle?: boolean;
    region?: string;
    province?: string;
  }