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
var voice_service_1 = require('../../services/voice.service');
var select_note_service_1 = require('../../services/select-note.service');
var NotesControlComponent = (function () {
    function NotesControlComponent(_addNotesService, _voiceService, _selectNoteService) {
        this._addNotesService = _addNotesService;
        this._voiceService = _voiceService;
        this._selectNoteService = _selectNoteService;
        this.updateVoice = new core_1.EventEmitter();
        this.durations = ['w', 'h', 'q', '8', '16', '32'];
        this.selectedDuration = this.durations[0];
    }
    NotesControlComponent.prototype.onChange = function (event) {
        this.selectedDuration = event.target.value;
    };
    NotesControlComponent.prototype.addNote = function () {
        var newVoice = this._addNotesService.addNote(this.selectedDuration, this._selectNoteService.selectedNoteIndex, this._voiceService.currentVoice);
        this._voiceService.setVoice(newVoice);
        this._selectNoteService.selectNote(this._selectNoteService.selectedNote);
    };
    NotesControlComponent.prototype.addSharp = function () {
        this.resetSelectedNote().addAccidental(0, new Vex.Flow.Accidental('#'));
        this._voiceService.setVoice(this._voiceService.currentVoice);
    };
    NotesControlComponent.prototype.addFlat = function () {
        this.resetSelectedNote().addAccidental(0, new Vex.Flow.Accidental('b'));
        this._voiceService.setVoice(this._voiceService.currentVoice);
    };
    NotesControlComponent.prototype.resetSelectedNote = function () {
        this._addNotesService.deleteModifiers();
        return this._voiceService.currentVoice.getTickables()[this._selectNoteService.selectedNoteIndex];
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
        __metadata('design:paramtypes', [add_notes_service_1.AddNotesService, voice_service_1.VoiceService, select_note_service_1.SelectNoteService])
    ], NotesControlComponent);
    return NotesControlComponent;
}());
exports.NotesControlComponent = NotesControlComponent;
//# sourceMappingURL=notes-control.component.js.map