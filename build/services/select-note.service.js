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
var Rx = require('rxjs/Rx');
var _ = require('lodash');
var core_1 = require('angular2/core');
var voice_service_1 = require('./voice.service');
var SelectNoteService = (function () {
    function SelectNoteService(_voice) {
        var _this = this;
        this._voice = _voice;
        this.selectedNoteStream = new Rx.BehaviorSubject(null);
        this.selectedNoteIndex = 0;
        this.selectedNoteStream.subscribe(function (note) {
            if (note) {
                _this.updateNote(note);
            }
        });
        this._voice.voiceStream.subscribe(function (voice) {
            if (voice) {
                var note = voice.getTickables()[_this.selectedNoteIndex];
                _this.updateNote(note);
            }
        });
    }
    ;
    SelectNoteService.prototype.selectNote = function (note) {
        this.deselectNotes();
        this.selectedNoteIndex = _.indexOf(this._voice.currentVoice.getTickables(), note);
        var newNote = this._voice.currentVoice.getTickables()[this.selectedNoteIndex];
        this.selectedNoteStream.next(newNote);
        this._voice.setVoice(this._voice.currentVoice);
    };
    ;
    SelectNoteService.prototype.selectedIndex = function () {
        return _.indexOf(this._voice.currentVoice.getTickables(), this.selectedNote);
    };
    SelectNoteService.prototype.updateNote = function (note) {
        this.selectedNote = note;
        this.highlightNote(note);
    };
    SelectNoteService.prototype.highlightNote = function (note) {
        if (note) {
            note.setStyle({ strokeStyle: 'blue', fillStyle: 'blue' });
        }
    };
    SelectNoteService.prototype.deselectNotes = function () {
        _.map(this._voice.currentVoice.getTickables(), function (note) {
            note.setStyle({ strokeStyle: 'black', fillStyle: 'black' });
        });
    };
    ;
    SelectNoteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [voice_service_1.VoiceService])
    ], SelectNoteService);
    return SelectNoteService;
}());
exports.SelectNoteService = SelectNoteService;
;
//# sourceMappingURL=select-note.service.js.map