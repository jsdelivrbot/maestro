import {Component, View, EventEmitter} from 'angular2/core';
import {AddNotesService} from '../../services/add-notes.service';
import {RendererService} from '../../services/renderer.service';

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
  addNotesService: AddNotesService;

  constructor(addNotesService: AddNotesService) {
    this.addNotesService = addNotesService;
    this.durations = ['w', 'h', 'q', '8', '16', '32'];
    this.selectedDuration = this.durations[0];
  }

  onChange(event) {
    this.selectedDuration = event.target.value;
  }

  addNote() {
    const newVoice = this.addNotesService.addNote(
      this.selectedDuration,
      this.selectedNoteIndex,
      this.voice
    )
    this.updateVoice.emit(newVoice);
  }
  
  addSharp() {
    this.resetSelectedNote().addAccidental(0, new Vex.Flow.Accidental('#'));
    this.updateVoice.emit(this.voice);
  }
  
  addFlat() {
    this.resetSelectedNote().addAccidental(0, new Vex.Flow.Accidental('b'));
    this.updateVoice.emit(this.voice);
  }
  
  private resetSelectedNote() : Vex.Flow.StaveNote { 
    this.updateVoice.emit(this.addNotesService.deleteModifiers(this.selectedNote, this.selectedNoteIndex, this.voice));
    return this.voice.getTickables()[this.selectedNoteIndex];
  }
}
