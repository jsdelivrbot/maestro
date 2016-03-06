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
var Vex = require('vexflow');
var _ = require('lodash');
var voice_service_1 = require('./voice.service');
var select_note_service_1 = require('./select-note.service');
var core_1 = require('angular2/core');
var AddNotesService = (function () {
    function AddNotesService(_voiceService, _selectNoteService) {
        this._voiceService = _voiceService;
        this._selectNoteService = _selectNoteService;
    }
    ;
    AddNotesService.prototype.addNote = function (duration, index, voice) {
        var newNote = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: duration });
        var oldNote = voice.getTickables()[index];
        var notes = voice.getTickables();
        if (this.isLonger(newNote, oldNote)) {
            return this.addLongerNote(newNote, oldNote, index, notes);
        }
        else {
            return this.addShorterNotes(newNote, oldNote, index, notes);
        }
    };
    ;
    AddNotesService.prototype.deleteModifiers = function () {
        var newNote = new Vex.Flow.StaveNote({ keys: this._selectNoteService.selectedNote.getKeys(), duration: this._selectNoteService.selectedNote.getDuration() });
        var newVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION });
        var notes = this._voiceService.currentVoice.getTickables();
        notes[this._selectNoteService.selectedIndex()] = newNote;
        newVoice.addTickables(notes);
        this._voiceService.setVoice(newVoice);
    };
    ;
    AddNotesService.prototype.addShorterNotes = function (newNote, oldNote, index, notes) {
        var newNotesCount = this.divideNote(oldNote, newNote);
        var newNotes = this.createNotes(newNotesCount, newNote.getDuration());
        this.mergeTickables(notes, newNotes, index);
        var newVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION });
        newVoice.addTickables(notes);
        return newVoice;
    };
    ;
    AddNotesService.prototype.addLongerNote = function (newNote, oldNote, index, notes) {
        var newNoteLength = this.divideNote(newNote, oldNote) + index;
        var newVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION });
        if (this.noteWithinRange(notes, newNoteLength)) {
            notes = this.deleteNotes(notes, newNoteLength, index);
            notes[index] = newNote;
            newVoice.addTickables(notes);
            return newVoice;
        }
        else {
            newVoice.addTickables(notes);
        }
        return newVoice;
    };
    ;
    AddNotesService.prototype.noteWithinRange = function (notes, newNoteLength) {
        return notes[newNoteLength - 1] !== undefined;
    };
    ;
    AddNotesService.prototype.deleteNotes = function (notes, count, index) {
        for (var _i = 0, _a = _.range(index + 1, count); _i < _a.length; _i++) {
            var i = _a[_i];
            notes[i] = null;
        }
        ;
        notes = _.compact(notes);
        return notes;
    };
    ;
    AddNotesService.prototype.mergeTickables = function (notes, newNotes, index) {
        Array.prototype.splice.apply(notes, [index, 1].concat(newNotes));
    };
    ;
    AddNotesService.prototype.duration = function (note) {
        return AddNotesService.DURATION_MAP[note.getDuration()];
    };
    ;
    AddNotesService.prototype.isLonger = function (newNote, oldNote) {
        return this.duration(newNote) > this.duration(oldNote);
    };
    ;
    AddNotesService.prototype.divideNote = function (dividend, divisor) {
        return this.duration(dividend) / this.duration(divisor);
    };
    ;
    AddNotesService.prototype.createNotes = function (newNotesCount, duration) {
        var newNotes = new Array();
        for (var _i = 0, _a = _.range(0, newNotesCount); _i < _a.length; _i++) {
            var i = _a[_i];
            var note = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: duration });
            newNotes.push(note);
        }
        return newNotes;
    };
    ;
    AddNotesService.DURATION_MAP = {
        'w': 1,
        'h': 0.5,
        'q': 0.25,
        '8': 0.125,
        '16': 0.0625,
        '32': 0.03125
    };
    AddNotesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [voice_service_1.VoiceService, select_note_service_1.SelectNoteService])
    ], AddNotesService);
    return AddNotesService;
}());
exports.AddNotesService = AddNotesService;
//# sourceMappingURL=add-notes.service.js.map