"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var UserFormTableService = (function () {
    function UserFormTableService() {
        // Observable string sources
        this.updatedItemInList = new Subject_1.Subject();
        // Observable string streams
        this.updatedItemInList$ = this.updatedItemInList.asObservable();
    }
    // Service message commands
    UserFormTableService.prototype.updatedItem = function () {
        this.updatedItemInList.next(true);
    };
    return UserFormTableService;
}());
UserFormTableService = __decorate([
    core_1.Injectable()
], UserFormTableService);
exports.UserFormTableService = UserFormTableService;
//# sourceMappingURL=user-form-communication.service.js.map