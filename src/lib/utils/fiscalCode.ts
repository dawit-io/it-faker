import { ItalianPerson } from "../types/person";
import { Gender } from "../types/types";

export class FiscalCodeGenerator {
  private static MONTH_CODES = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
  // @ts-ignore
  private static ODD_CHARS: { [key: string]: number } = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19,
    '9': 21, 'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17,
    'I': 19, 'J': 21, 'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6,
    'R': 8, 'S': 12, 'T': 14, 'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
  };

  static generate(person: Omit<ItalianPerson, 'fiscalCode'>): string {
    const surname = this.processSurname(person.lastName);
    const name = this.processName(person.firstName);
    const dateCode = this.processDate(person.birthDate, person.gender);
    const cityCode = person.birthPlace.belfioreCode;

    const baseCode = surname + name + dateCode + cityCode;
    const controlChar = this.calculateControlChar(baseCode);

    return baseCode + controlChar;
  }

  private static processSurname(surname: string): string {
    const consonants = surname.toUpperCase().replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, '');
    const vowels = surname.toUpperCase().replace(/[^AEIOU]/g, '');
    const combined = consonants + vowels + 'XXX';
    return combined.slice(0, 3);
  }

  private static processName(name: string): string {
    const consonants = name.toUpperCase().replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, '');
    if (consonants.length > 3) {
      return consonants[0] + consonants[2] + consonants[3];
    }
    const vowels = name.toUpperCase().replace(/[^AEIOU]/g, '');
    const combined = consonants + vowels + 'XXX';
    return combined.slice(0, 3);
  }

  private static processDate(date: Date, gender: Gender): string {
    const year = date.getFullYear().toString().slice(-2);
    const month = this.MONTH_CODES[date.getMonth()];
    let day = date.getDate().toString().padStart(2, '0');
    if (gender === Gender.Female) {
      day = (parseInt(day) + 40).toString();
    }
    return year + month + day;
  }

  // @ts-ignore
  private static calculateControlChar(code: string): string {
    // Implementazione del calcolo del carattere di controllo
    // ... (logica del calcolo del carattere di controllo)
    return 'X'; // Placeholder
  }
}