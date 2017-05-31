"use strict";
var user_1 = require("./shared/user");
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var users = [
            new user_1.User(1, "PLewis", "Peter Lewis", "Brown Street 23", 0, 0, "London", 234234234, "PLewis@hotmail.com"),
            new user_1.User(2, "MJames", "Mary James", "Green Street 5", 0, 0, "London", 653148596, "MJames@hotmail.com"),
            new user_1.User(3, "BJohan", "Boris Joan", "Yellow Street 51", 0, 0, "Moscow", 668524152, "BJohan@hotmail.com"),
            new user_1.User(4, "DBirchy", "Doris Birchy", "Blue Street 5", 0, 0, "Paris", 669897452, "DBirchy@hotmail.com"),
            new user_1.User(5, "PDechaum", "Pauline Dechaum", "Chocolate Street 5", 0, 0, "Paris", 977415263, "PDechaum@hotmail.com"),
            new user_1.User(6, "GTomasi", "Gianna Tomasi", "Caesar Street 5", 0, 0, "Rome", 963254178, "GTomasi@hotmail.com")
        ];
        return { users: users };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map