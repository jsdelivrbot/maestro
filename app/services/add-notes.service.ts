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
    if (this.isLonger(newNote, oldNote)) {
      console.log('coming soon...')
    } else {
      let notes = voice.getTickables();
      let newNotes = this.divideNote(newNote, oldNote);
      this.mergeTickables(notes, newNotes, index);
      let newVoice = new Vex.Flow.Voice({num_beats: 4,beat_value: 4,resolution: Vex.Flow.RESOLUTION});
      newVoice.addTickables(notes)

      return newVoice
    }
  }

  private mergeTickables(
    notes: Array<Vex.Flow.Tickable>,
    newNotes: Array<Vex.Flow.Tickable>,
    index: number
  ) {
    Array.prototype.splice.apply(notes, [index, 1].concat(newNotes));
  }

  private duration(note: Vex.Flow.StaveNote) : number {
    return AddNotesService.DURATION_MAP[note.getDuration()]
  }

  private isLonger(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote) {
    return this.duration(newNote) > this.duration(oldNote)
  }

  private divideNote(
    newNote: Vex.Flow.StaveNote,
    oldNote: Vex.Flow.StaveNote
  ) : Array<Vex.Flow.StaveNote> {
    const newNotesCount = this.duration(oldNote) / this.duration(newNote);

    return this.createNotes(newNotesCount, newNote.getDuration());
  }

  private createNotes(newNotesCount: number, duration: string) : Array<Vex.Flow.StaveNote> {
    const newNotes = new Array<Vex.Flow.StaveNote>();
    for (let i of _.range(0, newNotesCount)) {
      let note = new Vex.Flow.StaveNote({keys: ['b/4'], duration: duration})
      newNotes.push(note)
    }

    return newNotes;
  }
}
