export class AddNoteService {
  static DURATION_MAP : { [key:string]:number; } = {
    'w': 1,
    'h': 0.5,
    'q': 0.25,
    '8': 0.125,
    '16': 0.0625,
    '32': 0.03125
  }

  sayHi() {
    console.log('hi!')
  }

  addNote(duration: string, index: number, oldNote: Vex.Flow.StaveNote, voice: Vex.Flow.Voice) : Vex.Flow.Voice {
    let newNote = new Vex.Flow.StaveNote({keys: ['b/4'], duration: duration})
    if this.isLonger(newNote, oldNote) {
      console.log('coming soon...')
    } else {
      let notes = voice.getTickables();
      console.log('old notes ---->', notes)
      let newNotes = this.divideNote(newNote, oldNote);
      Array.prototype.splice.apply(notes, [index, 1].concat(newNotes));
      let newVoice = new Vex.Flow.Voice({num_beats: 4,beat_value: 4,resolution: Vex.Flow.RESOLUTION});
      newVoice.addTickables(notes)

      return newVoice
    }

  }

  duration(note: Vex.Flow.StaveNote) : number {
    return AddNoteService.DURATION_MAP[note.getDuration()]
  }

  isLonger(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote) {
    return this.duration(newNote) > this.duration(oldNote)
  }

  testMethod(oldNote: Vex.Flow.StaveNote) {
    const newNote = new Vex.Flow.StaveNote({keys: ['b/4'], duration: '8'})

    console.log(this.isLonger(newNote, oldNote))

    newDuration = this.duration(newNote)
    oldDuration = this.duration(oldNote)
    newNotesCount = oldDuration / newDuration

    newNotes = new Array<Vex.Flow.StaveNote>();
    for (let i of _.range(0, newNotesCount)) {
      let note = new Vex.Flow.StaveNote({keys: ['b/4'], duration: newNote.getDuration()})
      newNotes.push(note)
    }
  }

  divideNote(newNote: Vex.Flow.StaveNote, oldNote: Vex.Flow.StaveNote) {
    newDuration = this.duration(newNote)
    oldDuration = this.duration(oldNote)
    newNotesCount = oldDuration / newDuration

    newNotes = new Array<Vex.Flow.StaveNote>();
    for (let i of _.range(0, newNotesCount)) {
      let note = new Vex.Flow.StaveNote({keys: ['b/4'], duration: newNote.getDuration()})
      newNotes.push(note)
    }

    return newNotes;
  }
}
