import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarContrasenasIguales(campo1: string, campo2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass1 = control.get(campo1)?.value;
    const pass2 = control.get(campo2)?.value;

    if (pass1 && pass2 && pass1 !== pass2) {
      return { noCoinciden: true };
    }

    return null;
  };
}