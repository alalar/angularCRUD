"use strict";
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
function getUsersFromLocalStorage() {
    try {
        if (localStorage.getItem("users")) {
            return JSON.parse(localStorage.getItem("users"));
        }
    }
    catch (e) {
        return null;
    }
}
function setUsersToLocalStorage(users) {
    try {
        localStorage.setItem("users", JSON.stringify(users));
    }
    catch (e) {
    }
}
function getHighestId(users) {
    return Math.max.apply(Math, users.map(function (user) { return user.userId; }));
}
function getLocalStorageUsers(users) {
    var localUsers = getUsersFromLocalStorage();
    if (localUsers != null) {
        return Observable_1.Observable.of(localUsers);
    }
    else {
        setUsersToLocalStorage(users);
        return Observable_1.Observable.of(users);
    }
}
exports.getLocalStorageUsers = getLocalStorageUsers;
function saveLocalStorageUser(user) {
    var localUsers = getUsersFromLocalStorage();
    if (localUsers != null) {
        if (user.userId != null) {
            var userIndex = localUsers.map(function (user) { return user.userId; }).indexOf(user.userId);
            localUsers[userIndex] = user;
        }
        else {
            user.userId = getHighestId(localUsers) + 1;
            localUsers.push(user);
        }
        setUsersToLocalStorage(localUsers);
    }
}
exports.saveLocalStorageUser = saveLocalStorageUser;
function removeLocalStorageUser(userId) {
    var localUsers = getUsersFromLocalStorage();
    if (localUsers != null) {
        if (userId != null) {
            var userIndex = localUsers.map(function (user) { return user.userId; }).indexOf(userId);
            if (userIndex > -1) {
                localUsers.splice(userIndex, 1);
                setUsersToLocalStorage(localUsers);
            }
        }
    }
}
exports.removeLocalStorageUser = removeLocalStorageUser;
function readFromLocalStorageUser(userId) {
    if (localStorage.getItem("users")) {
        var currentUsers = JSON.parse(localStorage.getItem("users"));
        return currentUsers.filter(function (user) { return user.userId === userId; })[0];
    }
    return null;
}
exports.readFromLocalStorageUser = readFromLocalStorageUser;
//# sourceMappingURL=users-localstorage.js.map