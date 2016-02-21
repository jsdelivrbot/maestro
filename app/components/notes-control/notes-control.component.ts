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
}
