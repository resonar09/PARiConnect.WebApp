import { FormControl } from '@angular/forms';

export function validateStarts(control: FormControl) {
  if (!control.value.startsWith('B')) {
    return { validateStarts:{valid: true }};
  }
  return null;
}