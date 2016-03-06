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
var notes_control_component_1 = require('../notes-control/notes-control.component');
var AddNoteTab = (function () {
    function AddNoteTab(tabsManager) {
        this.tabsManager = tabsManager;
        this.tabsManager.addTab(this);
        this.active = true; // selected by default
    }
    ;
    AddNoteTab.prototype.deselect = function () {
        this.active = false;
    };
    ;
    AddNoteTab.prototype.select = function () {
        this.tabsManager.deselectTabs();
        this.active = true;
    };
    ;
    AddNoteTab = __decorate([
        core_1.Component({
            selector: 'add-note-tab'
        }),
        core_1.View({
            directives: [notes_control_component_1.NotesControlComponent],
            templateUrl: 'app/components/add-note-tab/add-note-tab.template.html'
        }), 
        __metadata('design:paramtypes', [tabs_manager_service_1.TabsManagerService])
    ], AddNoteTab);
    return AddNoteTab;
}());
exports.AddNoteTab = AddNoteTab;
;
//# sourceMappingURL=add-note-tab.component.js.map