import { AbstractControl, ValidatorFn } from "@angular/forms";

export class NameValidators {

    static validateVariableName() : ValidatorFn {
        return (c : AbstractControl) : { [key : string] : boolean } | null => {
            // Variable name should not start with digit
            if (c.value && !isNaN(c.value.charAt(0))) {
                return { 'invalidVariableName' : true };
            }
            return null;
        }
    }
}
