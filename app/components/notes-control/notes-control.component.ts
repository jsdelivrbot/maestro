import {Component, View, EventEmitter} from 'angular2/core';
import {AddNotesService} from '../../services/add-notes.service';
import {RendererService} from '../../services/renderer.service';
import {VoiceService} from '../../services/voice.service';
import {SelectNoteService} from '../../services/select-note.service';

@Component({
  selector: 'notes-control',
  inputs: [
    'voice',
    'selectedNoteIndex',
    'selectedNote'
  ],
  outputs: ['updateVoice'],
  providers: [AddNotesService]
})
@View({
  templateUrl: 'app/components/notes-control/notes-control.template.html'
})
export class NotesControlComponent {
  voice: Vex.Flow.Voice;
  durations: Array<string>;
  selectedDuration: string;
  selectedNoteIndex: number;
  selectedNote: Vex.Flow.StaveNote;
  updateVoice: EventEmitter<Vex.Flow.Voice> = new EventEmitter();

  constructor(
    private _addNotesService: AddNotesService,
    private _voiceService: VoiceService,
    private _selectNoteService: SelectNoteService
    ) {
    this.durations = ['w', 'h', 'q', '8', '16', '32'];
    this.selectedDuration = this.durations[0];
  }

  onChange(event) {
    this.selectedDuration = event.target.value;
  }

  addNote() {
    const newVoice = this._addNotesService.addNote(
      this.selectedDuration,
      this._selectNoteService.selectedNoteIndex,
      this._voiceService.currentVoice
    );

    this._voiceService.setVoice(newVoice);
    this._selectNoteService.selectNote(this._selectNoteService.selectedNote);
  }

  addSharp() {
    this.resetSelectedNote().addAccidental(0, new Vex.Flow.Accidental('#'));
    this._voiceService.setVoice(this._voiceService.currentVoice);
  }

  addFlat() {
    this.resetSelectedNote().addAccidental(0, new Vex.Flow.Accidental('b'));
    this._voiceService.setVoice(this._voiceService.currentVoice);
  }

  private resetSelectedNote() : Vex.Flow.StaveNote {
    this._addNotesService.deleteModifiers()
    return this._selectNoteService.selectedNote;
  }
}
