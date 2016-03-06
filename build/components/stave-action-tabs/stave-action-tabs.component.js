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
var add_note_tab_component_1 = require('../add-note-tab/add-note-tab.component');
var edit_note_tab_component_1 = require('../edit-note-tab/edit-note-tab.component');
var edit_stave_tab_component_1 = require('../edit-stave-tab/edit-stave-tab.component');
var tabs_manager_service_1 = require('../../services/tabs-manager.service');
require('./stave-action-tabs.style.scss');
var StaveActionTabs = (function () {
    function StaveActionTabs(tabsManager) {
        this.addNoteTabActive = true;
        this.editNoteTabActive = false;
        this.editStaveTabActive = false;
        this.tabsManager = tabsManager;
    }
    StaveActionTabs.prototype.showAddNoteTab = function () {
        this.tabsManager.selectTab(add_note_tab_component_1.AddNoteTab);
    };
    ;
    StaveActionTabs.prototype.showEditNoteTab = function () {
        this.tabsManager.selectTab(edit_note_tab_component_1.EditNoteTab);
    };
    ;
    StaveActionTabs.prototype.showEditStaveTab = function () {
        this.tabsManager.selectTab(edit_stave_tab_component_1.EditStaveTab);
    };
    ;
    StaveActionTabs.prototype.deselectTabs = function () {
        this.tabsManager.deselectTabs();
    };
    ;
    StaveActionTabs = __decorate([
        core_1.Component({
            selector: 'stave-action-tabs',
            providers: [tabs_manager_service_1.TabsManagerService]
        }),
        core_1.View({
            directives: [add_note_tab_component_1.AddNoteTab, edit_note_tab_component_1.EditNoteTab, edit_stave_tab_component_1.EditStaveTab],
            templateUrl: 'app/components/stave-action-tabs/stave-action-tabs.template.html'
        }), 
        __metadata('design:paramtypes', [tabs_manager_service_1.TabsManagerService])
    ], StaveActionTabs);
    return StaveActionTabs;
}());
exports.StaveActionTabs = StaveActionTabs;
;
//# sourceMappingURL=stave-action-tabs.component.js.map