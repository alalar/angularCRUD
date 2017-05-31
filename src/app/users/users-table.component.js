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
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var user_service_1 = require("./user.service");
var users_localstorage_1 = require("./shared/users-localstorage");
var user_form_table_communication_service_1 = require("./user-form-table-communication.service");
var modal_component_1 = require("../shared/modal.component");
var UsersTableComponent = (function () {
    function UsersTableComponent(userService, 
        //private router: Router, 
        userFormTableService) {
        var _this = this;
        this.userService = userService;
        this.userFormTableService = userFormTableService;
        this.showFilterBox = false;
        this.sortedByFieldName = "userId";
        this.ascendingOrder = true;
        userFormTableService.updatedItemInList$.subscribe(function (isDone) {
            if (isDone) {
                _this.ngOnInit();
            }
        });
    }
    UsersTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.users = null;
        this.userService.getUsers().subscribe(function (users) {
            _this.users = users_localstorage_1.getLocalStorageUsers(users);
        });
    };
    UsersTableComponent.prototype.sortingByColumn = function (fieldName) {
        if (this.sortedByFieldName == fieldName) {
            this.ascendingOrder = !this.ascendingOrder;
        }
        else {
            this.ascendingOrder = true;
        }
        this.sortedByFieldName = fieldName;
    };
    UsersTableComponent.prototype.showRemoveModalDlg = function (userToRemove) {
        var _this = this;
        var infoTemplate = "\n            Do you want to remove user <strong> " + userToRemove.username + " </strong> ?\n             <dl class=\"dl-horizontal\">\n                    <dt><span class=\"glyphicon glyphicon glyphicon-user\" ></span></dt>\n                    <dd>" + userToRemove.name + "</dd>\n                    <dt><span class=\"glyphicon glyphicon glyphicon-map-marker\" ></span></dt>\n                    <dd>" + userToRemove.address + " , " + userToRemove.city + "</dd>\n                    <dt><span class=\"glyphicon glyphicon glyphicon-phone\" ></span></dt>\n                    <dd>" + userToRemove.phone + "</dd>\n                    <dt><span>@</span></dt>\n                    <dd>" + userToRemove.email + "</dd>\n            </dl>";
        this.modal.show('Removing users', infoTemplate);
        this.subscription = this.modal.blnResult.subscribe(function (blnRemove) {
            if (blnRemove) {
                _this.userService.delete(userToRemove.userId).subscribe(function (user) { users_localstorage_1.removeLocalStorageUser(userToRemove.userId); _this.ngOnInit(); }, function (error) { console.log(error); });
            }
            // unsubscribe is necessary such that the observable doesn't keep racking up listeners
            _this.subscription.unsubscribe();
        });
    };
    return UsersTableComponent;
}());
__decorate([
    core_1.ViewChild(modal_component_1.ModalComponent),
    __metadata("design:type", modal_component_1.ModalComponent)
], UsersTableComponent.prototype, "modal", void 0);
UsersTableComponent = __decorate([
    core_1.Component({
        selector: 'user-table',
        templateUrl: './users-table.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_form_table_communication_service_1.UserFormTableService])
], UsersTableComponent);
exports.UsersTableComponent = UsersTableComponent;
//# sourceMappingURL=users-table.component.js.map