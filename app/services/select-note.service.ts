import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import {Injectable} from 'angular2/core';
import {VoiceService} from './voice.service';

@Injectable()
export class SelectNoteService {
  // selectedNote: Vex.Flow.StaveNote;
  selectedNote: Rx.Subject<Vex.Flow.StaveNote> = new Rx.BehaviorSubject<Vex.Flow.StaveNote>(null);
  voice: Vex.Flow.Voice;

  constructor(private _voice: VoiceService) {
    console.log(this.voice)
    _voice.selectedVoice.subscribe((voice) =>
      this.voice = voice;
      console.log('new voice!');
    );
  }

  selectNote(index: number) {
    this.deselectNotes();
    const note = this.voice.getTickables()[index];
    note.setStyle({strokeStyle: 'blue', fillStyle: 'blue'});
    this.selectedNote.next(note);
    this._voice.setVoice(this.voice);
  };

  private deselectNotes() {
    _.map(this.voice.getTickables(), function(note) {
      note.setStyle({strokeStyle: 'black', fillStyle: 'black'});
    });
  };
};
