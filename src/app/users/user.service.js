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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.usersUrl = 'api/users'; // URL to web api
    }
    UserService.prototype.getUsers1 = function () {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.getUser1 = function (id) {
        var url = this.usersUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.delete1 = function (userId) {
        var url = this.usersUrl + "/" + userId;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    UserService.prototype.getUsers = function () {
        return this.http.get(this.usersUrl)
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        //const url = `${this.usersUrl}/${id}`;
        var url = "" + this.usersUrl;
        return this.http
            .get(url)
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (userId) {
        //const url = `${this.usersUrl}/${userId}`;
        var url = "" + this.usersUrl;
        return this.http.post(url, { headers: this.headers })
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.save = function (user) {
        if (user.userId) {
            return this.update(user);
        }
        else {
            return this.create(user);
        }
    };
    UserService.prototype.create = function (user) {
        var url = this.usersUrl + "/" + user.userId;
        return this.http
            .post(url, JSON.stringify(user), { headers: this.headers })
            .map(function (res) {
            if (res.json())
                return res.json().data;
            else
                return user;
        })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        var url = this.usersUrl + "/" + user.userId;
        return this.http
            .post(url, JSON.stringify(user), { headers: this.headers })
            .map(function (res) {
            if (res.json())
                return res.json().data;
            else
                return user;
        })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable_1.Observable.throw(errMsg);
        //return errMsg;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map