import { ItalianCity } from "./city";
import { Gender } from "./types";

export interface ItalianPerson {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthDate: Date;
    birthPlace: ItalianCity;
    fiscalCode: string;
  }