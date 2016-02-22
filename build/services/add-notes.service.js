"use strict";
var Vex = require('vexflow');
var _ = require('lodash');
var AddNotesService = (function () {
    function AddNotesService() {
    }
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
    return AddNotesService;
}());
exports.AddNotesService = AddNotesService;
//# sourceMappingURL=add-notes.service.js.map