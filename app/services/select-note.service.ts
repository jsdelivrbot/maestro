import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import {Injectable} from 'angular2/core';
import {VoiceService} from './voice.service';

@Injectable()
export class SelectNoteService {
  selectedNote: Rx.Subject<Vex.Flow.StaveNote> = new Rx.BehaviorSubject<Vex.Flow.StaveNote>(null);
  note: Vex.Flow.StaveNote;
  voice: Vex.Flow.Voice;
  subscription: any;

  constructor(private _voice: VoiceService) {
    _voice.selectedVoice.subscribe((voice) =>
      this.updateVoice(voice);
    );
    this.selectedNote.subscribe((note) =>
      if (note) {
        this.updateNote(note);
      }
    )
  };

  selectNote(index: number) {
    this.deselectNotes();
    const note = this.voice.getTickables()[index];
    this.selectedNote.next(note);
    this._voice.setVoice(this.voice);
  };

  private updateVoice(voice: Vex.Flow.Voice) {
    this.voice = voice;
  };

  private updateNote(note: Vex.Flow.StaveNote) {
    this.note = note;
    this.highlightNote(note);
  }

  private highlightNote(note: Vex.Flow.StaveNote) {
    if (note) {
      note.setStyle({strokeStyle: 'blue', fillStyle: 'blue'});
    }
  }

  private deselectNotes() {
    _.map(this.voice.getTickables(), function(note) {
      note.setStyle({strokeStyle: 'black', fillStyle: 'black'});
    });
  };
};
