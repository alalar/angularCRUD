import { FormGroup, AbstractControl } from '@angular/forms';

// FORM GROUP VALIDATORS
export function matchingPasswords(): any {
    return (group: FormGroup):any => {
      let passwordControl: AbstractControl = group.controls['password'];
      let confirmPasswordControl: AbstractControl = group.controls['confirmPassword'];
      let password:string = passwordControl.value; // to get value in input tag
      let confirmPassword:string = confirmPasswordControl.value; // to get value in input tag

      if(password != confirmPassword) {
          confirmPasswordControl.setErrors( {MatchPassword: true} );
      } else {
          confirmPasswordControl.setErrors(null);
          return null
      }

  } 
 } 