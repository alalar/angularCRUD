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
var Subject_1 = require("rxjs/Subject");
//import {Observable} from 'rxjs/Observable';
var ModalComponent = (function () {
    function ModalComponent() {
        this.clickStream = new Subject_1.Subject();
        //private clickStream = new Observable<boolean>();
        this.blnResult = this.clickStream.asObservable();
        //@Output() observable = this.clickStream;
        this.visible = false;
        this.visibleAnimate = true;
    }
    ModalComponent.prototype.show = function (strHeader, strBody) {
        var _this = this;
        this.modalHeader = strHeader;
        this.modalBody = strBody;
        this.visible = true;
        setTimeout(function () { return _this.visibleAnimate = true; }, 100);
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    ModalComponent.prototype.doit = function () {
        //this.clickStream = new Observable((observer:any)  => observer.next(true));
        this.clickStream.next(true);
        this.hide();
    };
    ModalComponent.prototype.nodoit = function () {
        this.clickStream.next(false);
        //this.clickStream = new Observable((observer:any)  => observer.next(false));
        this.hide();
    };
    ModalComponent.prototype.onContainerClicked = function (event) {
        if (event.target.classList.contains('modal')) {
            this.hide();
        }
    };
    return ModalComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "blnResult", void 0);
ModalComponent = __decorate([
    core_1.Component({
        selector: 'app-modal',
        template: "\n  <div (click)=\"onContainerClicked($event)\" class=\"modal fade\" tabindex=\"-1\" [ngClass]=\"{'in': visibleAnimate}\"\n       [ngStyle]=\"{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\" >\n        <div class=\"modal-header\" >\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" (click)=\"hide()\">&times;</button>\n          <h4 >{{modalHeader}}</h4>\n        </div>\n        <div class=\"modal-body\" [innerHTML]=modalBody>\n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" (click)=\"nodoit()\">No</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"doit()\">Yes</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  "
    })
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map