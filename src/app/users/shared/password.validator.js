"use strict";
// FORM GROUP VALIDATORS
function matchingPasswords() {
    return function (group) {
        var passwordControl = group.controls['password'];
        var confirmPasswordControl = group.controls['confirmPassword'];
        var password = passwordControl.value; // to get value in input tag
        var confirmPassword = confirmPasswordControl.value; // to get value in input tag
        if (password != confirmPassword) {
            confirmPasswordControl.setErrors({ MatchPassword: true });
        }
        else {
            confirmPasswordControl.setErrors(null);
            return null;
        }
    };
}
exports.matchingPasswords = matchingPasswords;
//# sourceMappingURL=password.validator.js.map