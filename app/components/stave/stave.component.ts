import {Component, View, Inject, ViewChild} from 'angular2/core';
import {RendererService} from '../../services/renderer.service';
import {ChangePitchService} from '../../services/change-pitch.service';
import {AddNoteService} from '../../services/add-note.service';
import {NotesControlComponent} from '../notes-control/notes-control.component'
import * as _ from 'lodash';
import './stave.style.scss';

@Component({
  selector: 'stave',
  inputs: ['stave'],
  providers: [ChangePitchService, AddNoteService]
})
@View({
  directives: [NotesControlComponent],
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
  addNoteService: AddNoteService;
  voice: Vex.Flow.Voice;
  notes: Array<Vex.Flow.Note>;
  selectedNoteIndex: number;

  constructor() {
    this.changePitchService = new ChangePitchService;
    this.addNoteService = new AddNoteService;

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
    var voiceWithNotes = {voice: voice, notes: notes}
    this.selectedNoteIndex = 0;
    // this.addNoteService.addNote('8', 0, notes[0], this.voice)
  }

  ngAfterViewInit() {
    this.renderer = new RendererService(this.canvas.nativeElement);
    this.renderer.drawStave(this.stave);
    this.drawVoices();
  }

  drawVoices() {
    this.renderer.drawVoice(this.stave, this.voice);
  }

  goRight() {
    if (this.selectedNoteIndex < 3) {
      this.deselectNotes(this.voice.getTickables())
      this.selectedNoteIndex += 1;
      this.selectNote(this.voice.getTickables()[this.selectedNoteIndex])
      this.renderer.drawVoice(this.stave, this.voice)
    }
  }

  goLeft() {
    if (this.selectedNoteIndex > 0) {
      this.deselectNotes(this.voice.getTickables())
      this.selectedNoteIndex -= 1;
      this.selectNote(this.voice.getTickables()[this.selectedNoteIndex]);
      this.renderer.drawVoice(this.stave, this.voice);
    }
  }

  selectNote(note: Vex.Flow.StaveNote) {
    note.setStyle({strokeStyle: 'blue', fillStyle: 'blue'});
  }

  deselectNotes(notes: Array<Vex.Flow.StaveNote>) {
    _.map(notes, function(note) {
      note.setStyle({strokeStyle: 'black', fillStyle: 'black'});
    });
  }

  selectedNote() : Vex.Flow.StaveNote {
    return this.voice.getTickables()[this.selectedNoteIndex];
  }

  deleteNote() {
    let updates = this.changePitchService.deleteNote(this.selectedNote(), this.voice);
    this.voice = updates.voice;
    this.selectNote(updates.note);
    this.renderer.drawVoice(this.stave, this.voice);
  }

  raisePitch() {
    let updates = this.changePitchService.raisePitch(this.selectedNote(), this.voice);
    this.addNoteService.isShorter(this.selectedNote())
    this.voice = updates.voice;
    this.selectNote(updates.note);
    this.renderer.drawVoice(this.stave, this.voice);
  }

  lowerPitch() {
    let updates = this.changePitchService.lowerPitch(this.selectedNote(), this.voice);
    this.voice = updates.voice;
    this.selectNote(updates.note);
    this.renderer.drawVoice(this.stave, this.voice);
  }
}
