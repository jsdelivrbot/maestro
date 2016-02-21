import {Component, View, EventEmitter} from 'angular2/core';
import {AddNoteService} from '../../services/add-note.service';
import {RendererService} from '../../services/renderer.service';

@Component({
  selector: 'notes-control',
  inputs: [
    'voice',
    'selectedNoteIndex',
    'selectedNote'
  ],
  outputs: ['updateVoice']
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

  constructor() {
    this.addNoteService = new AddNoteService;
    this.durations = ['w', 'h', 'q', '8', '16', '32']
    this.selectedDuration = this.durations[0];
  }

  onChange(event) {
    this.selectedDuration = event.target.value;
  }

  addNote() {
    const newVoice = this.addNoteService.addNote(
      this.selectedDuration,
      this.selectedNoteIndex,
      this.selectedNote,
      this.voice
    )
    console.log('new voice --->', newVoice)
    this.updateVoice.emit(newVoice);
  }
}
