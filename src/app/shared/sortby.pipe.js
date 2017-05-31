"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SortByPipe = (function () {
    function SortByPipe() {
    }
    SortByPipe.prototype.transform = function (values, fieldname, ascendingOrder) {
        if (values != null) {
            return values.sort(function (a, b) {
                var fieldAToCompare, fieldBToCompare;
                if (typeof a[fieldname] == "string") {
                    fieldAToCompare = a[fieldname].toLowerCase();
                    fieldBToCompare = b[fieldname].toLowerCase();
                }
                else {
                    fieldAToCompare = a[fieldname];
                    fieldBToCompare = b[fieldname];
                }
                if (fieldAToCompare < fieldBToCompare) {
                    return (ascendingOrder ? -1 : 1);
                }
                else if (fieldAToCompare > fieldBToCompare) {
                    return (ascendingOrder ? 1 : -1);
                }
                else {
                    return 0;
                }
            });
        }
        else {
            return null;
        }
    };
    return SortByPipe;
}());
SortByPipe = __decorate([
    core_1.Pipe({
        name: 'sortby',
        pure: true
    })
], SortByPipe);
exports.SortByPipe = SortByPipe;
//# sourceMappingURL=sortby.pipe.js.map