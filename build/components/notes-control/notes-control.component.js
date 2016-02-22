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
var add_notes_service_1 = require('../../services/add-notes.service');
var NotesControlComponent = (function () {
    function NotesControlComponent(addNotesService) {
        this.updateVoice = new core_1.EventEmitter();
        this.addNotesService = addNotesService;
        this.durations = ['w', 'h', 'q', '8', '16', '32'];
        this.selectedDuration = this.durations[0];
    }
    NotesControlComponent.prototype.onChange = function (event) {
        this.selectedDuration = event.target.value;
    };
    NotesControlComponent.prototype.addNote = function () {
        var newVoice = this.addNotesService.addNote(this.selectedDuration, this.selectedNoteIndex, this.voice);
        this.updateVoice.emit(newVoice);
    };
    NotesControlComponent = __decorate([
        core_1.Component({
            selector: 'notes-control',
            inputs: [
                'voice',
                'selectedNoteIndex',
                'selectedNote'
            ],
            outputs: ['updateVoice'],
            providers: [add_notes_service_1.AddNotesService]
        }),
        core_1.View({
            templateUrl: 'app/components/notes-control/notes-control.template.html'
        }), 
        __metadata('design:paramtypes', [add_notes_service_1.AddNotesService])
    ], NotesControlComponent);
    return NotesControlComponent;
}());
exports.NotesControlComponent = NotesControlComponent;
//# sourceMappingURL=notes-control.component.js.map