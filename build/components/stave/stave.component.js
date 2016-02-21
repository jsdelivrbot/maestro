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
var change_pitch_service_1 = require('../../services/change-pitch.service');
var add_note_service_1 = require('../../services/add-note.service');
var notes_control_component_1 = require('../notes-control/notes-control.component');
var _ = require('lodash');
require('./stave.style.scss');
var StaveComponent = (function () {
    function StaveComponent() {
        this.changePitchService = new change_pitch_service_1.ChangePitchService;
        this.addNoteService = new add_note_service_1.AddNoteService;
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
        this.voice = voice.addTickables(notes);
        var voiceWithNotes = { voice: voice, notes: notes };
        this.selectedNoteIndex = 0;
    }
    StaveComponent.prototype.ngAfterViewInit = function () {
        this.renderer = new renderer_service_1.RendererService(this.canvas.nativeElement);
        this.renderer.drawStave(this.stave);
        this.updateVoice(this.voice);
    };
    StaveComponent.prototype.updateVoice = function (voice) {
        this.voice = voice;
        this.renderer.drawVoice(this.stave, this.voice);
    };
    StaveComponent.prototype.goRight = function () {
        if (this.selectedNoteIndex < 3) {
            this.deselectNotes(this.voice.getTickables());
            this.selectedNoteIndex += 1;
            this.selectNote(this.voice.getTickables()[this.selectedNoteIndex]);
            this.updateVoice(this.voice);
        }
    };
    StaveComponent.prototype.goLeft = function () {
        if (this.selectedNoteIndex > 0) {
            this.deselectNotes(this.voice.getTickables());
            this.selectedNoteIndex -= 1;
            this.selectNote(this.voice.getTickables()[this.selectedNoteIndex]);
            this.updateVoice(this.voice);
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
        return this.voice.getTickables()[this.selectedNoteIndex];
    };
    StaveComponent.prototype.deleteNote = function () {
        var updates = this.changePitchService.deleteNote(this.selectedNote(), this.voice);
        this.selectNote(updates.note);
        this.updateVoice(updates.voice);
    };
    StaveComponent.prototype.raisePitch = function () {
        var updates = this.changePitchService.raisePitch(this.selectedNote(), this.voice);
        this.selectNote(updates.note);
        this.updateVoice(updates.voice);
    };
    StaveComponent.prototype.lowerPitch = function () {
        var updates = this.changePitchService.lowerPitch(this.selectedNote(), this.voice);
        this.selectNote(updates.note);
        this.updateVoice(updates.voice);
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
            inputs: ['stave'],
            providers: [change_pitch_service_1.ChangePitchService, add_note_service_1.AddNoteService]
        }),
        core_1.View({
            directives: [notes_control_component_1.NotesControlComponent],
            templateUrl: 'app/components/stave/stave.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], StaveComponent);
    return StaveComponent;
}());
exports.StaveComponent = StaveComponent;
//# sourceMappingURL=stave.component.js.map