"use strict";
var User = (function () {
    function User(userId, username, name, address, lat, long, city, phone, email) {
        if (userId === void 0) { userId = null; }
        if (username === void 0) { username = null; }
        if (name === void 0) { name = null; }
        if (address === void 0) { address = null; }
        if (lat === void 0) { lat = null; }
        if (long === void 0) { long = null; }
        if (city === void 0) { city = null; }
        if (phone === void 0) { phone = null; }
        if (email === void 0) { email = null; }
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.city = city;
        this.phone = phone;
        this.email = email;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map