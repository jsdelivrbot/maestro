import * as _ from 'lodash';

export class ChangePitchService {

  raisePitch(note: Vex.Flow.StaveNote, voice: Vex.Flow.Voice) : { voice: Vex.Flow.Voice; note: Vex.Flow.StaveNote; } {
    let key = note.getKeys()[0];
    let newKey = this.raiseKey(key);
    let index = _.indexOf(voice.getTickables(), note)
    let newNote = this.updateNote(newKey, note.getDuration());

    return { voice: this.updateVoice(voice, newNote, index), note: newNote };
  }

  lowerPitch(note: Vex.Flow.StaveNote, voice: Vex.Flow.Voice) : { voice: Vex.Flow.Voice; note: Vex.Flow.StaveNote; } {
    let key = note.getKeys()[0];
    let newKey = this.lowerKey(key);
    let index = _.indexOf(voice.getTickables(), note);
    let newNote = this.updateNote(newKey, note.getDuration());

    return { voice: this.updateVoice(voice, newNote, index), note: newNote };
  }

  deleteNote(note: Vex.Flow.StaveNote, voice: Vex.Flow.Voice) : { voice: Vex.Flow.Voice; note: Vex.Flow.StaveNote; } {
    let index = _.indexOf(voice.getTickables(), note);
    let newNote = this.updateNote('b/4', 'qr');

    return { voice: this.updateVoice(voice, newNote, index), note: newNote };
  }

  private updateNote(key: string, duration: string) : Vex.Flow.StaveNote {
    return new Vex.Flow.StaveNote({ keys: [key], duration: duration });
  }

  private updateVoice(
    voice: Vex.Flow.Voice,
    note: Vex.Flow.StaveNote,
    index: number
  ) : Vex.Flow.Voice {
    let newVoice = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION
    });
    let notes = voice.getTickables();
    notes[index] = note;

    return newVoice.addTickables(notes);
  }

  private raiseKey(key: string) : string {
    let [noteName, octave] = key.split('/');
    let newNoteName = this.newNoteName(noteName.charCodeAt(0) + 1);
    let raiseOctave = this.shouldRaiseOctave(noteName, newNoteName);
    let newoctave = raiseOctave ? String(+octave + 1) : octave;

    return `${newNoteName}/${newoctave}`;
  }

  private lowerKey(key: string) : string {
    let [noteName, octave] = key.split('/');
    let newNoteName = this.newNoteName(noteName.charCodeAt(0) - 1);
    let lowerOctave = this.shouldLowerOctave(noteName, newNoteName);
    let newoctave = lowerOctave ? String(+octave - 1) : octave;

    return `${newNoteName}/${newoctave}`
  }

  private shouldRaiseOctave(noteName: string, newNoteName: string) : boolean {
    return (noteName == 'b' && newNoteName == 'c')
  }

  private shouldLowerOctave(noteName: string, newNoteName: string) : boolean {
    return (noteName == 'c' && newNoteName == 'b')
  }

  private newNoteName(charCode: number) : string {
    let newCharCode;
    if (charCode > 103) {
      newCharCode = 97;
    } else if (charCode < 97) {
      newCharCode = 103;
    } else {
      newCharCode = charCode;
    }

    return String.fromCharCode(newCharCode);
  }
}
