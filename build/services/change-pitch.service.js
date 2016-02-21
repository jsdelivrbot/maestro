"use strict";
var _ = require('lodash');
var ChangePitchService = (function () {
    function ChangePitchService() {
    }
    ChangePitchService.prototype.raisePitch = function (note, voice) {
        var key = note.getKeys()[0];
        var newKey = this.raiseKey(key);
        var index = _.indexOf(voice.getTickables(), note);
        var newNote = this.updateNote(newKey, note.getDuration());
        return { voice: this.updateVoice(voice, newNote, index), note: newNote };
    };
    ChangePitchService.prototype.lowerPitch = function (note, voice) {
        var key = note.getKeys()[0];
        var newKey = this.lowerKey(key);
        var index = _.indexOf(voice.getTickables(), note);
        var newNote = this.updateNote(newKey, note.getDuration());
        return { voice: this.updateVoice(voice, newNote, index), note: newNote };
    };
    ChangePitchService.prototype.deleteNote = function (note, voice) {
        var index = _.indexOf(voice.getTickables(), note);
        var newNote = this.updateNote('b/4', 'qr');
        return { voice: this.updateVoice(voice, newNote, index), note: newNote };
    };
    ChangePitchService.prototype.updateNote = function (key, duration) {
        return new Vex.Flow.StaveNote({ keys: [key], duration: duration });
    };
    ChangePitchService.prototype.updateVoice = function (voice, note, index) {
        var newVoice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        var notes = voice.getTickables();
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
    return ChangePitchService;
}());
exports.ChangePitchService = ChangePitchService;
//# sourceMappingURL=change-pitch.service.js.map