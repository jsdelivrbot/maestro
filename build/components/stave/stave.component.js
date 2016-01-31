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
var renderer_service_1 = require('../../services/renderer.service');
var voice_decorator_1 = require('../../models/voice.decorator');
var _ = require('lodash');
require('./stave.style.scss');
var StaveComponent = (function () {
    function StaveComponent() {
        var notes = [
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" })
        ];
        notes[0].setStyle({ strokeStyle: "blue", fillStyle: 'blue' });
        var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        voice.addTickables(notes);
        var voiceWithNotes = { voice: voice, notes: notes };
        this.voice = new voice_decorator_1.VoiceDecorator(voice, notes);
        this.selectedNoteIndex = 0;
    }
    StaveComponent.prototype.ngAfterViewInit = function () {
        this.renderer = new renderer_service_1.RendererService(this.canvas.nativeElement);
        this.renderer.drawStave(this.stave);
        this.drawVoices();
    };
    StaveComponent.prototype.drawVoices = function () {
        this.renderer.drawVoice(this.stave, this.voice.vfVoice);
    };
    StaveComponent.prototype.goRight = function () {
        if (this.selectedNoteIndex < 3) {
            this.deselectNotes(this.voice.vfNotes);
            this.selectedNoteIndex += 1;
            this.selectNote(this.voice.vfNotes[this.selectedNoteIndex]);
            this.renderer.drawVoice(this.stave, this.voice.vfVoice);
        }
    };
    StaveComponent.prototype.goLeft = function () {
        if (this.selectedNoteIndex > 0) {
            this.deselectNotes(this.voice.vfNotes);
            this.selectedNoteIndex -= 1;
            this.selectNote(this.voice.vfNotes[this.selectedNoteIndex]);
            this.renderer.drawVoice(this.stave, this.voice.vfVoice);
        }
    };
    StaveComponent.prototype.selectNote = function (note) {
        note.setStyle({ strokeStyle: 'blue', fillStyle: 'blue' });
    };
    StaveComponent.prototype.deselectNotes = function (notes) {
        _.map(notes, function (note) {
            note.setStyle({ strokeStyle: 'black', fillStyle: 'black' });
        });
    };
    StaveComponent.prototype.selectedNote = function () {
        return this.voice.vfNotes[this.selectedNoteIndex];
    };
    StaveComponent.prototype.raisePitch = function () {
        var selected = this.selectedNote();
        var key = selected.getKeys()[0];
        var newKey = this.raiseKey(key);
        this.updateNote(newKey);
        var voice = this.updateVoice(this.voice.vfNotes);
        this.voice.vfVoice = voice;
        this.renderer.drawVoice(this.stave, voice);
    };
    StaveComponent.prototype.lowerPitch = function () {
        var selected = this.selectedNote();
        var key = selected.getKeys()[0];
        var newKey = this.lowerKey(key);
        this.updateNote(newKey);
        var voice = this.updateVoice(this.voice.vfNotes);
        this.voice.vfVoice = voice;
        this.renderer.drawVoice(this.stave, voice);
    };
    StaveComponent.prototype.raiseKey = function (key) {
        var _a = key.split('/'), noteName = _a[0], octave = _a[1];
        var newNoteName = this.newNoteName(noteName.charCodeAt(0) + 1);
        var raiseOctave = this.shouldRaiseOctave(noteName, newNoteName);
        var newoctave = raiseOctave ? String(+octave + 1) : octave;
        return newNoteName + "/" + newoctave;
    };
    StaveComponent.prototype.lowerKey = function (key) {
        var _a = key.split('/'), noteName = _a[0], octave = _a[1];
        var newNoteName = this.newNoteName(noteName.charCodeAt(0) - 1);
        var lowerOctave = this.shouldLowerOctave(noteName, newNoteName);
        var newoctave = lowerOctave ? String(+octave - 1) : octave;
        return newNoteName + "/" + newoctave;
    };
    StaveComponent.prototype.shouldRaiseOctave = function (noteName, newNoteName) {
        return (noteName == 'b' && newNoteName == 'c');
    };
    StaveComponent.prototype.shouldLowerOctave = function (noteName, newNoteName) {
        return (noteName == 'c' && newNoteName == 'b');
    };
    StaveComponent.prototype.newNoteName = function (charCode) {
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
    StaveComponent.prototype.updateNote = function (key) {
        var note = new Vex.Flow.StaveNote({ keys: [key], duration: "q" });
        this.voice.vfNotes[this.selectedNoteIndex] = note;
        this.selectNote(note);
    };
    StaveComponent.prototype.updateVoice = function (notes) {
        var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        return voice.addTickables(notes);
    };
    StaveComponent.WIDTH = 300;
    StaveComponent.HEIGHT = 100;
    __decorate([
        core_1.ViewChild('canvas'), 
        __metadata('design:type', Object)
    ], StaveComponent.prototype, "canvas", void 0);
    StaveComponent = __decorate([
        core_1.Component({
            selector: 'stave',
            inputs: ['stave']
        }),
        core_1.View({
            templateUrl: 'app/components/stave/stave.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], StaveComponent);
    return StaveComponent;
}());
exports.StaveComponent = StaveComponent;
//# sourceMappingURL=stave.component.js.map