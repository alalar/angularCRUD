"use strict";
require("rxjs/add/observable/of");
var users_localstorage_1 = require("./users-localstorage");
var emailTimeout;
// FORM GROUP VALIDATORS
exports.AsyncUniqueFieldValidator = function (itemId, userobjectService, fieldname) {
    return function (control) {
        if (control.dirty) {
            control.setErrors({ CheckingDuplicatedItem: true });
            clearTimeout(emailTimeout);
            return new Promise(function (resolve) {
                emailTimeout = setTimeout(function () {
                    userobjectService.getUsers().subscribe(function (users) {
                        users_localstorage_1.getLocalStorageUsers(users).subscribe(function (users) {
                            if (users.some(function (user) { return (user.userId != itemId && user[fieldname].toLowerCase() == control.value.toLowerCase()); })) {
                                resolve({ DuplicatedItem: true });
                            }
                            else {
                                resolve(null);
                            }
                        });
                    });
                }, 100);
            });
        }
        else {
            control.setErrors(null);
            return new Promise(null);
        }
    };
};
//# sourceMappingURL=async-unique-field.validator.js.map