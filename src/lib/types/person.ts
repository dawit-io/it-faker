import type { ItalianCity } from "./city";
import type { Gender } from "./types";

export interface ItalianPerson {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  birthPlace: ItalianCity;
  fiscalCode: string;
}