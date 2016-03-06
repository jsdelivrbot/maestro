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
var voice_service_1 = require('./voice.service');
var select_note_service_1 = require('./select-note.service');
var _ = require('lodash');
var Vex = require('vexflow');
var ChangePitchService = (function () {
    function ChangePitchService(_voiceService, _selectNoteService) {
        this._voiceService = _voiceService;
        this._selectNoteService = _selectNoteService;
    }
    ;
    ChangePitchService.prototype.raisePitch = function () {
        var key = this._selectNoteService.selectedNote.getKeys()[0];
        var newKey = this.raiseKey(key);
        var newNote = this.updateNote(newKey, this._selectNoteService.selectedNote.getDuration());
        var newVoice = this.updateVoice(newNote);
        this._voiceService.setVoice(newVoice);
        this._selectNoteService.selectNote(newNote);
    };
    ChangePitchService.prototype.lowerPitch = function () {
        var key = this._selectNoteService.selectedNote.getKeys()[0];
        var newKey = this.lowerKey(key);
        var newNote = this.updateNote(newKey, this._selectNoteService.selectedNote.getDuration());
        var newVoice = this.updateVoice(newNote);
        this._voiceService.setVoice(newVoice);
        this._selectNoteService.selectNote(newNote);
    };
    ChangePitchService.prototype.deleteNote = function () {
        var newNote = this.updateNote('b/4', this._selectNoteService.selectedNote.getDuration() + 'r');
        var newVoice = this.updateVoice(newNote);
        this._voiceService.setVoice(newVoice);
        this._selectNoteService.selectNote(newNote);
    };
    ChangePitchService.prototype.updateNote = function (key, duration) {
        return new Vex.Flow.StaveNote({ keys: [key], duration: duration });
    };
    ChangePitchService.prototype.updateVoice = function (note) {
        var newVoice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        var notes = this._voiceService.currentVoice.getTickables();
        var index = _.indexOf(this._voiceService.currentVoice.getTickables(), this._selectNoteService.selectedNote);
        notes[index] = note;
        return newVoice.addTickables(notes);
    };
    ChangePitchService.prototype.raiseKey = function (key) {
        var _a = key.split('/'), noteName = _a[0], octave = _a[1];
        var newNoteName = this.newNoteName(noteName.charCodeAt(0) + 1);
        var raiseOctave = this.shouldRaiseOctave(noteName, newNoteName);
        var newoctave = raiseOctave ? String(+octave + 1) : octave;
        return newNoteName + "/" + newoctave;
    };
    ChangePitchService.prototype.lowerKey = function (key) {
        var _a = key.split('/'), noteName = _a[0], octave = _a[1];
        var newNoteName = this.newNoteName(noteName.charCodeAt(0) - 1);
        var lowerOctave = this.shouldLowerOctave(noteName, newNoteName);
        var newoctave = lowerOctave ? String(+octave - 1) : octave;
        return newNoteName + "/" + newoctave;
    };
    ChangePitchService.prototype.shouldRaiseOctave = function (noteName, newNoteName) {
        return (noteName == 'b' && newNoteName == 'c');
    };
    ChangePitchService.prototype.shouldLowerOctave = function (noteName, newNoteName) {
        return (noteName == 'c' && newNoteName == 'b');
    };
    ChangePitchService.prototype.newNoteName = function (charCode) {
        var newCharCode;
        if (charCode > 103) {
            newCharCode = 97;
        }
        else if (charCode < 97) {
            newCharCode = 103;
        }
        else {
            newCharCode = charCode;
        }
        return String.fromCharCode(newCharCode);
    };
    ChangePitchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [voice_service_1.VoiceService, select_note_service_1.SelectNoteService])
    ], ChangePitchService);
    return ChangePitchService;
}());
exports.ChangePitchService = ChangePitchService;
//# sourceMappingURL=change-pitch.service.js.map