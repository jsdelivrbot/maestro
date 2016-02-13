"use strict";
var AddNoteService = (function () {
    function AddNoteService() {
    }
    AddNoteService.prototype.sayHi = function () {
        console.log('hi!');
    };
    AddNoteService.prototype.addNote = function (duration, index, oldNote, voice) {
        var newNote = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: duration });
        if (this.isLonger(newNote, oldNote)) {
            console.log('coming soon...');
        }
        else {
            var notes = voice.getTickables();
            var newNotes = this.divideNote(newNote, oldNote);
            Array.prototype.splice.apply(notes, [index, 1].concat(newNotes));
            var newVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION });
            newVoice.addTickables(notes);
            return newVoice;
        }
    };
    AddNoteService.prototype.duration = function (note) {
        return AddNoteService.DURATION_MAP[note.getDuration()];
    };
    AddNoteService.prototype.isLonger = function (newNote, oldNote) {
        return this.duration(newNote) > this.duration(oldNote);
    };
    AddNoteService.prototype.testMethod = function (oldNote) {
        var newNote = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: '8' });
        console.log(this.isLonger(newNote, oldNote));
        var newDuration = this.duration(newNote);
        var oldDuration = this.duration(oldNote);
        var newNotesCount = oldDuration / newDuration;
        var newNotes = new Array();
        for (var _i = 0, _a = _.range(0, newNotesCount); _i < _a.length; _i++) {
            var i = _a[_i];
            var note = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: newNote.getDuration() });
            newNotes.push(note);
        }
    };
    AddNoteService.prototype.divideNote = function (newNote, oldNote) {
        var newDuration = this.duration(newNote);
        var oldDuration = this.duration(oldNote);
        var newNotesCount = oldDuration / newDuration;
        var newNotes = new Array();
        for (var _i = 0, _a = _.range(0, newNotesCount); _i < _a.length; _i++) {
            var i = _a[_i];
            var note = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: newNote.getDuration() });
            newNotes.push(note);
        }
        return newNotes;
    };
    AddNoteService.DURATION_MAP = {
        'w': 1,
        'h': 0.5,
        'q': 0.25,
        '8': 0.125,
        '16': 0.0625,
        '32': 0.03125
    };
    return AddNoteService;
}());
exports.AddNoteService = AddNoteService;
//# sourceMappingURL=add-note.service.js.map