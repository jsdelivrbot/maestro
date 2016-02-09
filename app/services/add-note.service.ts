export class AddNoteService {
  static DURATION_MAP : { [key:string]:number; } = {
    'w': 1,
    'h': 0.5,
    'q': 0.25,
    '8': 0.125,
    '16': 0.0625,
    '32': 0.03125
  }

  addNote(duration: string, oldNote: Vex.Flow.StaveNote, voice: Vex.Flow.Voice) : Vex.Flow.Voice {

  }

  duration(note: Vex.Flow.StaveNote) : number {
    return AddNoteService.DURATION_MAP[note.getDuration()]
  }

  isShorter(oldNote: Vex.Flow.StaveNote, newNote: Vex.Flow.StaveNote) {
    return this.duration(oldNote) > this.duration(newNote)
  }

  testMethod(oldNote: Vex.Flow.StaveNote) {
    const newNote = new Vex.Flow.StaveNote({keys: ['b/4'], duration: 'h'})
    console.log(this.isShorter(oldNote, newNote))
  }
}
