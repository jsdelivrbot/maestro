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
var tabs_manager_service_1 = require('../../services/tabs-manager.service');
var EditStaveTab = (function () {
    function EditStaveTab(tabsManager) {
        this.tabsManager = tabsManager;
        this.tabsManager.addTab(this);
    }
    ;
    EditStaveTab.prototype.deselect = function () {
        this.active = false;
    };
    ;
    EditStaveTab.prototype.select = function () {
        this.tabsManager.deselectTabs();
        this.active = true;
    };
    ;
    EditStaveTab = __decorate([
        core_1.Component({
            selector: 'edit-stave-tab'
        }),
        core_1.View({
            templateUrl: 'app/components/edit-stave-tab/edit-stave-tab.template.html'
        }), 
        __metadata('design:paramtypes', [tabs_manager_service_1.TabsManagerService])
    ], EditStaveTab);
    return EditStaveTab;
}());
exports.EditStaveTab = EditStaveTab;
//# sourceMappingURL=edit-stave-tab.component.js.map