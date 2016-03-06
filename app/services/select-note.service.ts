import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import {Injectable} from 'angular2/core';
import {VoiceService} from './voice.service';

@Injectable()
export class SelectNoteService {
  selectedNoteStream: Rx.Subject<Vex.Flow.StaveNote> = new Rx.BehaviorSubject<Vex.Flow.StaveNote>(null);
  selectedNote: Vex.Flow.StaveNote;
  selectedNoteIndex: number;

  constructor(private _voice: VoiceService) {
    this.selectedNoteIndex = 0;
    this.selectedNoteStream.subscribe((note) => {
      if (note) {
        this.updateNote(note);
      }
    });
    this._voice.voiceStream.subscribe((voice) => {
      if (voice) {
        const note = voice.getTickables()[this.selectedNoteIndex];
        this.updateNote(<Vex.Flow.StaveNote>note);
      }
   });
  };

  selectNote(note: Vex.Flow.StaveNote) {
    this.deselectNotes();
    this.selectedNoteIndex = _.indexOf(this._voice.currentVoice.getTickables(), note);
    const newNote = this._voice.currentVoice.getTickables()[this.selectedNoteIndex];
    this.selectedNoteStream.next(<Vex.Flow.StaveNote>newNote);
    this._voice.setVoice(this._voice.currentVoice);
  };

  selectedIndex() {
    return _.indexOf(this._voice.currentVoice.getTickables(), this.selectedNote);
  }

  private updateNote(note: Vex.Flow.StaveNote) {
    this.selectedNote = note;
    this.highlightNote(note);
  }

  private highlightNote(note: Vex.Flow.StaveNote) {
    if (note) {
      note.setStyle({strokeStyle: 'blue', fillStyle: 'blue'});
    }
  }

  private deselectNotes() {
    _.map(this._voice.currentVoice.getTickables(), function(note: Vex.Flow.StaveNote) {
      note.setStyle({strokeStyle: 'black', fillStyle: 'black'});
    });
  };
};
