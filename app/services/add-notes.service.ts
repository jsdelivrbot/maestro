import * as Vex from 'vexflow';
import * as _ from 'lodash';

export class AddNotesService {
  static DURATION_MAP : { [key:string]:number; } = {
    'w': 1,
    'h': 0.5,
    'q': 0.25,
    '8': 0.125,
    '16': 0.0625,
    '32': 0.03125
  }

  addNote(duration: string, index: number, voice: Vex.Flow.Voice) : Vex.Flow.Voice {
    let newNote = new Vex.Flow.StaveNote({keys: ['b/4'], duration: duration})
    let oldNote = <Vex.Flow.StaveNote>voice.getTickables()[index];
    let notes = voice.getTickables(); 
    if (this.isLonger(newNote, oldNote)) {
      return this.addLongerNote(newNote, oldNote, index, <Array<Vex.Flow.StaveNote>>notes);
    } else {
      return this.addShorterNotes(newNote, oldNote, index,  <Array<Vex.Flow.StaveNote>>notes);
    }
  };
  
  private addShorterNotes(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote, index: number, notes: Array<Vex.Flow.StaveNote>) : Vex.Flow.Voice {
    const newNotesCount = this.divideNote(oldNote, newNote);
    const newNotes = this.createNotes(newNotesCount, newNote.getDuration())
    this.mergeTickables(notes, newNotes, index);
    const newVoice = new Vex.Flow.Voice({num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION});
    newVoice.addTickables(notes)
    
    return newVoice;
  };
  
  private addLongerNote(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote, index: number, notes: Array<Vex.Flow.StaveNote>) : Vex.Flow.Voice {
     const newNoteLength = this.divideNote(newNote, oldNote) + index;
     const newVoice = new Vex.Flow.Voice({num_beats: 4,beat_value: 4,resolution: Vex.Flow.RESOLUTION});
    if (this.noteWithinRange(notes, newNoteLength)) {
      notes = this.deleteNotes(notes, newNoteLength, index);
      notes[index] = newNote
      newVoice.addTickables(notes); 
      return newVoice;
    } else {
      newVoice.addTickables(notes);
    } 
      
    return newVoice;
  };
  
  private noteWithinRange(notes: Array<Vex.Flow.StaveNote>, newNoteLength: number) : boolean {
    return notes[newNoteLength - 1] !== undefined;
  };
  
  private deleteNotes(notes: Array<Vex.Flow.StaveNote>, count: number, index: number) : Array<Vex.Flow.StaveNote> {
    for (let i of _.range(index + 1, count)) {
      notes[i] = null;
    };
    notes = _.compact(notes);
    return notes;
  };

  private mergeTickables(
    notes: Array<Vex.Flow.Tickable>,
    newNotes: Array<Vex.Flow.Tickable>,
    index: number
  ) {
    Array.prototype.splice.apply(notes, [index, 1].concat(newNotes));
  };

  private duration(note: Vex.Flow.StaveNote) : number {
    return AddNotesService.DURATION_MAP[note.getDuration()]
  };

  private isLonger(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote) {
    return this.duration(newNote) > this.duration(oldNote)
  };
  
  private divideNote(
    dividend: Vex.Flow.StaveNote,
    divisor: Vex.Flow.StaveNote
  ) : number {
    return this.duration(dividend) / this.duration(divisor);
  };
  
  private createNotes(newNotesCount: number, duration: string) : Array<Vex.Flow.StaveNote> {
    const newNotes = new Array<Vex.Flow.StaveNote>();
    for (let i of _.range(0, newNotesCount)) {
      let note = new Vex.Flow.StaveNote({keys: ['b/4'], duration: duration})
      newNotes.push(note)
    }

    return newNotes;
  };
}
