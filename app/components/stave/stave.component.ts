import {Component, View, Inject, ViewChild} from 'angular2/core';
import {RendererService} from '../../services/renderer.service';
import {ChangePitchService} from '../../services/change-pitch.service';
import {VoiceDecorator} from '../../models/voice.decorator';
import * as _ from 'lodash';
import './stave.style.scss';

@Component({
  selector: 'stave',
  inputs: ['stave'],
  providers: [ChangePitchService]
})
@View({
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
  voice: VoiceDecorator;
  notes: Array<Vex.Flow.Note>;
  selectedNoteIndex: number;

  constructor() {
    this.changePitchService = new ChangePitchService

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

    voice.addTickables(notes);
    var voiceWithNotes = {voice: voice, notes: notes}
    this.voice = new VoiceDecorator(voice, notes);
    this.selectedNoteIndex = 0;
  }

  ngAfterViewInit() {
    this.renderer = new RendererService(this.canvas.nativeElement);
    this.renderer.drawStave(this.stave);
    this.drawVoices();
  }

  drawVoices() {
    this.renderer.drawVoice(this.stave, this.voice.vfVoice);
  }

  goRight() {
    if (this.selectedNoteIndex < 3) {
      this.deselectNotes(this.voice.vfNotes)
      this.selectedNoteIndex += 1;
      this.selectNote(this.voice.vfNotes[this.selectedNoteIndex])
      this.renderer.drawVoice(this.stave, this.voice.vfVoice)
    }
  }

  goLeft() {
    if (this.selectedNoteIndex > 0) {
      this.deselectNotes(this.voice.vfNotes)
      this.selectedNoteIndex -= 1;
      this.selectNote(this.voice.vfNotes[this.selectedNoteIndex]);
      this.renderer.drawVoice(this.stave, this.voice.vfVoice);
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
    return this.voice.vfNotes[this.selectedNoteIndex];
  }

  deleteNote() {
    this.updateNote('b/4', 'qr');
    this.updateVoice(this.voice.vfNotes);
  }

  raisePitch() {
    let updates = this.changePitchService.raisePitch(this.selectedNote(), this.voice.vfVoice);
    this.voice.vfVoice = updates.voice;
    this.voice.vfNotes = updates.voice.getTickables()
    this.selectNote(updates.note);
    this.renderer.drawVoice(this.stave, updates.voice);
  }

  lowerPitch() {
    let updates = this.changePitchService.lowerPitch(this.selectedNote(), this.voice.vfVoice);
    this.voice.vfVoice = updates.voice;
    this.voice.vfNotes = updates.voice.getTickables()
    this.selectNote(updates.note);
    this.renderer.drawVoice(this.stave, updates.voice);
  }
}
