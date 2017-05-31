import {  AbstractControl, } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { User } from './user'
import { UserService } from '../user.service';
import { getLocalStorageUsers } from './users-localstorage';

let emailTimeout:any;
// FORM GROUP VALIDATORS
export const AsyncUniqueFieldValidator = (itemId:number,userobjectService:UserService,fieldname:string) => {
    return (control:AbstractControl) => {
      if (control.dirty) {
        control.setErrors({CheckingDuplicatedItem: true});
        clearTimeout(emailTimeout);
        return new Promise((resolve) => {
            emailTimeout = setTimeout(() => {
              userobjectService.getUsers().subscribe((users:User[]) => {
                getLocalStorageUsers(users).subscribe((users:User[]) => 
                  {
                    if (users.some((user:User) => (user.userId!=itemId && user[fieldname].toLowerCase()==control.value.toLowerCase()))) {
                      resolve({DuplicatedItem: true})
                      } else {
                        resolve(null);
                      }
                  });
              });
            }
              , 100);
          })
      } else {
        control.setErrors(null);
        return new Promise(null);
      }
  }
}

