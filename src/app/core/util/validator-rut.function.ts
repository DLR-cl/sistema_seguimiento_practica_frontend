import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkRunValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = checkRun(control.value);
    return isValid ? null : { invalidRun: true };
  };
}

function checkRun(run: string): boolean {
  // Eliminar el guion del RUN
  if(!run){
    return false
  }
  run = run.replace(/-/g, '');

  // Extraer el dígito verificador y el número
  const cdEntered = run.slice(-1).toUpperCase();
  const number = run.slice(0, -1);

  // Calcular el dígito verificador esperado
  let add = 0;
  let factor = 2;
  for (let i = number.length - 1; i >= 0; i--) {
    add += parseInt(number.charAt(i)) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const cdExpected = 11 - (add % 11);
  const cdCalculated =
    cdExpected === 11 ? '0' : cdExpected === 10 ? 'K' : cdExpected.toString();

  // Comparar el dígito verificador ingresado con el calculado
  return cdEntered === cdCalculated;
}
