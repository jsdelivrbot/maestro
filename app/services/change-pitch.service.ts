import {Injectable} from 'angular2/core';
import {VoiceService} from './voice.service';
import {SelectNoteService} from './select-note.service';
import * as _ from 'lodash';
import * as Vex from 'vexflow';

@Injectable()
export class ChangePitchService {
  constructor(private _voiceService: VoiceService, private _selectNoteService: SelectNoteService) {
  };

  raisePitch() {
    let key = this._selectNoteService.selectedNote.getKeys()[0];
    let newKey = this.raiseKey(key);
    let newNote = this.updateNote(newKey, this._selectNoteService.selectedNote.getDuration());
    let newVoice = this.updateVoice(newNote);
    this._voiceService.setVoice(newVoice);
    this._selectNoteService.selectNote(newNote);
  }

  lowerPitch() {
    let key = this._selectNoteService.selectedNote.getKeys()[0];
    let newKey = this.lowerKey(key);
    let newNote = this.updateNote(newKey, this._selectNoteService.selectedNote.getDuration());
    let newVoice = this.updateVoice(newNote);
    this._voiceService.setVoice(newVoice);
    this._selectNoteService.selectNote(newNote)
  }

  deleteNote() {
    let newNote = this.updateNote('b/4', this._selectNoteService.selectedNote.getDuration() + 'r');
    let newVoice = this.updateVoice(newNote);
    this._voiceService.setVoice(newVoice);
    this._selectNoteService.selectNote(newNote)
  }

  private updateNote(key: string, duration: string) : Vex.Flow.StaveNote {
    return new Vex.Flow.StaveNote({ keys: [key], duration: duration });
  }

  private updateVoice(note: Vex.Flow.StaveNote) : Vex.Flow.Voice {
    let newVoice = new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION
    });
    let notes = this._voiceService.currentVoice.getTickables();
    let index = _.indexOf(this._voiceService.currentVoice.getTickables(), this._selectNoteService.selectedNote);
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
