import {Component, View, Inject, ViewChild} from 'angular2/core';
import {RendererService} from '../../services/renderer.service';
import {ChangePitchService} from '../../services/change-pitch.service';
import {AddNotesService} from '../../services/add-notes.service';
import {SelectNoteService} from '../../services/select-note.service';
import {NotesControlComponent} from '../notes-control/notes-control.component';
import {StaveActionTabs} from '../stave-action-tabs/stave-action-tabs.component';
import * as _ from 'lodash';
import './stave.style.scss';

@Component({
  selector: 'stave',
  inputs: ['stave'],
  providers: [
    ChangePitchService,
    AddNotesService,
    SelectNoteService,
    RendererService
  ]
})
@View({
  directives: [NotesControlComponent, StaveActionTabs],
  templateUrl: 'app/components/stave/stave.template.html'
})
export class StaveComponent {
  static WIDTH : number = 300;
  static HEIGHT : number = 100;

  @ViewChild('canvas') canvas;

  stave: Vex.Flow.Stave;
  canvasSelector: string;
  renderer: RendererService;
  changePitchService: ChangePitchService;
  voice: Vex.Flow.Voice;
  selectedNoteIndex: number;
  addNotesService: AddNotesService;

  constructor(
    changePitchService: ChangePitchService,
    addNotesService: AddNotesService,
    selectNoteService: SelectNoteService,
    renderer: RendererService
  ) {
    this.changePitchService = changePitchService;
    this.addNotesService = addNotesService;
    this.selectNoteService = selectNoteService;
    this.renderer = renderer;

    var notes = [
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q" })
    ];

    notes[0].setStyle({strokeStyle: "blue", fillStyle: 'blue'});

    var voice = new Vex.Flow.Voice({
        num_beats: 4,
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION
    });

    this.voice = voice.addTickables(notes);
    this.selectedNoteIndex = 0;
  }

  ngAfterViewInit() {
    this.renderer.setContext(this.canvas.nativeElement);
    this.renderer.drawStave(this.stave);
    this.updateVoice(this.voice);
  }

  updateVoice(voice: Vex.Flow.Voice) {
    this.voice = voice;
    this.selectNoteService.selectNote(this.selectedNote(), this.voice);
    this.renderer.drawVoice(this.stave, this.voice);
  }

  goRight() {
    if (this.selectedNoteIndex < this.notesCount() - 1) {
      this.selectedNoteIndex += 1;
      this.updateVoice(this.voice);
    }
  }

  goLeft() {
    if (this.selectedNoteIndex > 0) {
      this.selectedNoteIndex -= 1;
      this.updateVoice(this.voice)
    }
  }

  notesCount() : number {
    return this.voice.getTickables().length;
  }

  selectNote(note: Vex.Flow.StaveNote) {
    this.selectNoteService.selectNote(note this.voice);
  }

  selectedNote() : Vex.Flow.StaveNote {
    return <Vex.Flow.StaveNote>this.voice.getTickables()[this.selectedNoteIndex];
  }

  deleteNote() {
    let updates = this.changePitchService.deleteNote(this.selectedNote(), this.voice);
    this.updateVoice(updates.voice);
  }

  raisePitch() {
    let updates = this.changePitchService.raisePitch(this.selectedNote(), this.voice);
    this.updateVoice(updates.voice);
  }

  lowerPitch() {
    let updates = this.changePitchService.lowerPitch(this.selectedNote(), this.voice);
    this.updateVoice(updates.voice);
  }
}
