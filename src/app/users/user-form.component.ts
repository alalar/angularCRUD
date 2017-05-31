import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } from './shared/user'
import { matchingPasswords } from './shared/password.validator';
import { AsyncUniqueFieldValidator } from './shared/async-unique-field.validator';
import { getLocalStorageUsers, saveLocalStorageUser, readFromLocalStorageUser } from './shared/users-localstorage';
import { UserService } from './user.service';
import { UserFormTableService }     from './user-form-table-communication.service';


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{
  public user: User; // our model
  public users: User[];
  public errors: string[] = [];
  public submitting: boolean = false;
  userForm : FormGroup;
  @Output() onSubmitted = new EventEmitter<boolean>();


  constructor(private userService: UserService, private fb: FormBuilder, 
      //private route: ActivatedRoute, private router: Router,
      private userFormTableService: UserFormTableService) { 
        this.user = new User();
        userFormTableService.editingItemInList$.subscribe(
          (userId:number) => {
            this.user = null;
            this.userService.getUser(userId).subscribe(
              (user: User) => {
                if (userId!=null && !isNaN(userId)) {
                  this.user = readFromLocalStorageUser(userId);
                }
                if (this.user==null) {
                  this.user = new User();
                }
                this.revert();
            });
          });
    }

  createForm() {
      this.userForm = this.fb.group({
        userId: [null],
        name: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(90)]) ],
        username: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
        address: [null, Validators.compose([Validators.required, Validators.maxLength(80)])],
        city: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
        phone: [null, Validators.compose([Validators.required, Validators.pattern('^\\d{9}$')])],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null],
        confirmPassword:[null]
      }, {
      validator: matchingPasswords() // your validation method
    });
  }
 
  addNewUser() {
    this.user = new User();
    this.revert();
  }
  revert() {
    this.userForm.reset(
      this.user
    );
    this.userForm.controls['email'].setAsyncValidators(AsyncUniqueFieldValidator(this.user.userId,this.userService,"email"));
    this.userForm.controls['email'].updateValueAndValidity();
    this.userForm.controls['username'].setAsyncValidators(AsyncUniqueFieldValidator(this.user.userId,this.userService,"username"));
    this.userForm.controls['username'].updateValueAndValidity();
    if (this.userForm.controls['password']) {
        if (this.user==null || this.user.userId==null) {
          this.userForm.controls['password'].setValidators(Validators.compose([Validators.required,Validators.pattern('^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$')]))
        } else {
          this.userForm.controls['password'].setValidators(null);
        }
        this.userForm.controls['password'].updateValueAndValidity();
    }
  }
  ngOnInit() {
    this.createForm();
    this.revert();
  }

   onSubmit(): void {
    this.errors = [];
    this.submitting = true;
    if (this.userForm.valid) {
      this.userService.save(this.userForm.value).subscribe(
        (user:User) => {
            saveLocalStorageUser(user);
            this.submitting = false;
            this.userFormTableService.updatedItem();
            this.addNewUser();
            
          },
        (error:any) => {this.errors.push(error),this.submitting=false}
        
      );
    }
  }
}