import { FormControl, FormGroup } from '@angular/forms';
export function automateAge(ageControl: string) {
  return function (c: FormControl) {
    let v = c.value;
    let e = c.root.get(ageControl);
    if (e && v) {
      var timestamp=Date.parse(v)
      if (isNaN(timestamp)==false){
        var timeDiff = Math.abs(Date.now() - timestamp);
        var age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        e.setValue(age);
      }
    }
    return null;
  };
} 