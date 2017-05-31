"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
//import { Router, ActivatedRoute, Params } from '@angular/router';
require("rxjs/add/operator/switchMap");
var user_1 = require("./shared/user");
var password_validator_1 = require("./shared/password.validator");
var async_unique_field_validator_1 = require("./shared/async-unique-field.validator");
var users_localstorage_1 = require("./shared/users-localstorage");
var user_service_1 = require("./user.service");
var user_form_table_communication_service_1 = require("./user-form-table-communication.service");
var UserFormComponent = (function () {
    function UserFormComponent(userService, fb, 
        //private route: ActivatedRoute, private router: Router,
        userFormTableService) {
        var _this = this;
        this.userService = userService;
        this.fb = fb;
        this.userFormTableService = userFormTableService;
        this.errors = [];
        this.submitting = false;
        this.onSubmitted = new core_1.EventEmitter();
        this.user = new user_1.User();
        userFormTableService.editingItemInList$.subscribe(function (userId) {
            _this.user = null;
            _this.userService.getUser(userId).subscribe(function (user) {
                if (userId != null && !isNaN(userId)) {
                    _this.user = users_localstorage_1.readFromLocalStorageUser(userId);
                }
                if (_this.user == null) {
                    _this.user = new user_1.User();
                }
                _this.revert();
            });
        });
    }
    UserFormComponent.prototype.createForm = function () {
        this.userForm = this.fb.group({
            userId: [null],
            name: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(90)])],
            username: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(25)])],
            address: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(80)])],
            city: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            phone: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^\\d{9}$')])],
            email: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            password: [null],
            confirmPassword: [null]
        }, {
            validator: password_validator_1.matchingPasswords() // your validation method
        });
    };
    UserFormComponent.prototype.addNewUser = function () {
        this.user = new user_1.User();
        this.revert();
    };
    UserFormComponent.prototype.revert = function () {
        this.userForm.reset(this.user);
        this.userForm.controls['email'].setAsyncValidators(async_unique_field_validator_1.AsyncUniqueFieldValidator(this.user.userId, this.userService, "email"));
        this.userForm.controls['email'].updateValueAndValidity();
        this.userForm.controls['username'].setAsyncValidators(async_unique_field_validator_1.AsyncUniqueFieldValidator(this.user.userId, this.userService, "username"));
        this.userForm.controls['username'].updateValueAndValidity();
        if (this.userForm.controls['password']) {
            if (this.user == null || this.user.userId == null) {
                this.userForm.controls['password'].setValidators(forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$')]));
            }
            else {
                this.userForm.controls['password'].setValidators(null);
            }
            this.userForm.controls['password'].updateValueAndValidity();
        }
    };
    UserFormComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.revert();
    };
    UserFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.errors = [];
        this.submitting = true;
        if (this.userForm.valid) {
            this.userService.save(this.userForm.value).subscribe(function (user) {
                users_localstorage_1.saveLocalStorageUser(user);
                _this.submitting = false;
                _this.userFormTableService.updatedItem();
                _this.addNewUser();
            }, function (error) { _this.errors.push(error), _this.submitting = false; });
        }
    };
    return UserFormComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserFormComponent.prototype, "onSubmitted", void 0);
UserFormComponent = __decorate([
    core_1.Component({
        selector: 'user-form',
        templateUrl: './user-form.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, forms_1.FormBuilder,
        user_form_table_communication_service_1.UserFormTableService])
], UserFormComponent);
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map