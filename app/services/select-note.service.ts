import * as _ from 'lodash';

export class SelectNoteService {
  selectedNote: Vex.Flow.StaveNote;

  selectNote(note: Vex.Flow.StaveNote, voice: Vex.Flow.Voice) {
    this.deselectNotes(voice);
    this.selectedNote = note;
    note.setStyle({strokeStyle: 'blue', fillStyle: 'blue'});
  };

  private deselectNotes(voice: Vex.Flow.Voice) {
    _.map(voice.getTickables(), function(note) {
      note.setStyle({strokeStyle: 'black', fillStyle: 'black'});
    });
  };
};
