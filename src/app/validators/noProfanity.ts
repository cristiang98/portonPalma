import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noProfanityValidator(prohibitedWords: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No hay valor, así que no hay error
    }

    const hasProfanity = prohibitedWords.some(word => control.value.toLowerCase().includes(word.toLowerCase()));
    return hasProfanity ? { profanity: true } : null;
  };
}