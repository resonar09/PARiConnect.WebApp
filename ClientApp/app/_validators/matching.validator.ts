import { FormControl,FormGroup } from '@angular/forms';
export function validateMatching(matchingControl: string) {
  return function(c: FormControl) {
    let v = c.value;
    let e = c.root.get(matchingControl);
 
    return (e && v !== e.value) ?
        { validateMatching: {valid: true } } : null;
  };
} 