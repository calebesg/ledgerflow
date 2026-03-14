import { AbstractControl } from '@angular/forms';

export function dateValidator(control: AbstractControl) {
  const value = control.value;

  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (regex.test(value) == false) {
    return { invalidDate: true };
  }

  return null;
}
