import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import {Injectable} from 'angular2/core';
import {VoiceService} from './voice.service';

@Injectable()
export class SelectNoteService {
  selectedNote: Rx.Subject<Vex.Flow.StaveNote> = new Rx.BehaviorSubject<Vex.Flow.StaveNote>(null);
  selectedNoteIndex: Rx.Subject<number> = new Rx.BehaviorSubject<number>(null);
  note: Vex.Flow.StaveNote;

  constructor(private _voice: VoiceService) {
    this.selectedNote.subscribe((note) =>
      if (note) {
        this.updateNote(note);
      }
    )
    this.selectedNoteIndex.subscribe((index) =>

    )
    this.selectedNoteIndex.next(0);
  };

  selectNote(note: Vex.Flow.StaveNote) {
    this.deselectNotes();
    let index = _.indexOf(this._voice.currentVoice.getTickables(), note);
    const note = this._voice.currentVoice.getTickables()[index];
    this.selectedNote.next(note);
    this._voice.setVoice(this._voice.currentVoice);
  };

  setIndex(index: number) {
    this.selectedNoteIndex.next(index)
  }

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
    _.map(this._voice.currentVoice.getTickables(), function(note) {
      note.setStyle({strokeStyle: 'black', fillStyle: 'black'});
    });
  };
};
