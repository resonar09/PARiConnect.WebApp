import { FormControl } from "@angular/forms";

export function validateContainsString(chars: string) {
  return function(input: FormControl) {
    return input.value.indexOf(chars) >= 0 ?
        null :
        { validateContainsString: {valid: true } };
  };
}

