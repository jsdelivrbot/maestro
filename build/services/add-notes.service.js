"use strict";
var AddNotesService = (function () {
    function AddNotesService() {
    }
    AddNotesService.prototype.addNote = function (duration, index, voice) {
        var newNote = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: duration });
        var oldNote = voice.getTickables()[index];
        if (this.isLonger(newNote, oldNote)) {
            console.log('coming soon...');
        }
        else {
            var notes = voice.getTickables();
            var newNotes = this.divideNote(newNote, oldNote);
            this.mergeTickables(notes, newNotes, index);
            var newVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION });
            newVoice.addTickables(notes);
            return newVoice;
        }
    };
    AddNotesService.prototype.mergeTickables = function (notes, newNotes, index) {
        Array.prototype.splice.apply(notes, [index, 1].concat(newNotes));
    };
    AddNotesService.prototype.duration = function (note) {
        return AddNoteService.DURATION_MAP[note.getDuration()];
    };
    AddNotesService.prototype.isLonger = function (newNote, oldNote) {
        return this.duration(newNote) > this.duration(oldNote);
    };
    AddNotesService.prototype.divideNote = function (newNote, oldNote) {
        var newNotesCount = this.duration(oldNote) / this.duration(newNote);
        return this.createNotes(newNotesCount, newNote.getDuration());
    };
    AddNotesService.prototype.createNotes = function (newNotesCount, duration) {
        var newNotes = new Array();
        for (var _i = 0, _a = _.range(0, newNotesCount); _i < _a.length; _i++) {
            var i = _a[_i];
            var note = new Vex.Flow.StaveNote({ keys: ['b/4'], duration: duration });
            newNotes.push(note);
        }
        return newNotes;
    };
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