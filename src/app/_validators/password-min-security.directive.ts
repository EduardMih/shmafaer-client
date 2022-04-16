import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordPatternCheck(regex: RegExp, error: ValidationErrors): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const result = regex.test(control.value);
    return result ? null : error;

  };

}
