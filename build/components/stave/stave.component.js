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
var add_notes_service_1 = require('../../services/add-notes.service');
var select_note_service_1 = require('../../services/select-note.service');
var voice_service_1 = require('../../services/voice.service');
var notes_control_component_1 = require('../notes-control/notes-control.component');
var stave_action_tabs_component_1 = require('../stave-action-tabs/stave-action-tabs.component');
require('./stave.style.scss');
var StaveComponent = (function () {
    function StaveComponent(changePitchService, addNotesService, selectNoteService, renderer, voiceService) {
        this.changePitchService = changePitchService;
        this.addNotesService = addNotesService;
        this.selectNoteService = selectNoteService;
        this.renderer = renderer;
        this.voiceService = voiceService;
        this.selectedNoteIndex = 0;
    }
    ;
    StaveComponent.prototype.ngAfterViewInit = function () {
        this.renderer.setContext(this.canvas.nativeElement, this.stave);
        this.renderer.drawStave();
        var notes = [
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" })
        ];
        var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        voice.addTickables(notes);
        this.voiceService.setVoice(voice);
        this.selectNoteService.selectNote(this.selectedNote());
    };
    ;
    StaveComponent.prototype.goRight = function () {
        if (this.selectedNoteIndex < this.notesCount() - 1) {
            this.selectedNoteIndex += 1;
            this.selectNoteService.selectNote(this.selectedNote());
        }
    };
    ;
    StaveComponent.prototype.goLeft = function () {
        if (this.selectedNoteIndex > 0) {
            this.selectedNoteIndex -= 1;
            this.selectNoteService.selectNote(this.selectedNote());
        }
    };
    ;
    StaveComponent.prototype.raisePitch = function () {
        this.changePitchService.raisePitch();
    };
    ;
    StaveComponent.prototype.lowerPitch = function () {
        this.changePitchService.lowerPitch();
    };
    ;
    StaveComponent.prototype.deleteNote = function () {
        this.changePitchService.deleteNote();
    };
    ;
    StaveComponent.prototype.notesCount = function () {
        return this.voiceService.currentVoice.getTickables().length;
    };
    ;
    StaveComponent.prototype.selectedNote = function () {
        return this.voiceService.currentVoice.getTickables()[this.selectedNoteIndex];
    };
    ;
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
            providers: [
                change_pitch_service_1.ChangePitchService,
                add_notes_service_1.AddNotesService,
                select_note_service_1.SelectNoteService,
                renderer_service_1.RendererService,
                voice_service_1.VoiceService
            ]
        }),
        core_1.View({
            directives: [notes_control_component_1.NotesControlComponent, stave_action_tabs_component_1.StaveActionTabs],
            templateUrl: 'app/components/stave/stave.template.html'
        }), 
        __metadata('design:paramtypes', [change_pitch_service_1.ChangePitchService, add_notes_service_1.AddNotesService, select_note_service_1.SelectNoteService, renderer_service_1.RendererService, voice_service_1.VoiceService])
    ], StaveComponent);
    return StaveComponent;
}());
exports.StaveComponent = StaveComponent;
;
//# sourceMappingURL=stave.component.js.map