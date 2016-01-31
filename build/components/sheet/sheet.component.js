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
var core_1 = require('angular2/core');
var stave_component_1 = require('./../stave/stave.component');
// import * as Vex from 'vexflow';
var SheetComponent = (function () {
    function SheetComponent() {
        var stave = new Vex.Flow.Stave(0, 0, 300);
        var stave2 = new Vex.Flow.Stave(0, 0, 300);
        this.staves = [stave, stave2];
    }
    SheetComponent.prototype.addStave = function () {
        var stave = new Vex.Flow.Stave(0, 0, 300);
        this.staves.push(stave);
    };
    SheetComponent = __decorate([
        core_1.Component({
            selector: 'sheet'
        }),
        core_1.View({
            directives: [stave_component_1.StaveComponent],
            templateUrl: 'app/components/sheet/sheet.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SheetComponent);
    return SheetComponent;
}());
exports.SheetComponent = SheetComponent;
//# sourceMappingURL=sheet.component.js.map