import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarRUT: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const rutRegex = /^\d{7,8}-[0-9kK]$/;
  const value = control.value;

  if (!value) return null; // No validar si está vacío
  if (!rutRegex.test(value)) {
    return { invalidRUT: 'El formato del RUT no es válido' };
  }

  // Validar dígito verificador
  const [rut, dv] = value.split('-');
  let suma = 0;
  let multiplo = 2;

  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvCalculado = 11 - (suma % 11);
  const dvFinal = dvCalculado === 10 ? 'k' : dvCalculado === 11 ? '0' : dvCalculado.toString();

  return dv.toLowerCase() === dvFinal ? null : { invalidDV: 'Dígito verificador inválido' };
};
