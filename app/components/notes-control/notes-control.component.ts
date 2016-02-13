import {Component, View} from 'angular2/core';
import {AddNoteService} from '../../services/add-note.service';

@Component({
  selector: 'notes-control',
  inputs: ['voice']
})
@View({
  templateUrl: 'app/components/notes-control/notes-control.template.html'
})
export class NotesControlComponent {
  voice: Vex.Flow.Voice;
  durations: Array<string>;
  selectedDuration: string;

  constructor() {
    this.durations = ['w', 'h', 'q', '8', '16', '32']
    this.selectedDuration = this.durations[0];
  }

  onChange(event) {
    this.selectedDuration = event.target.value;
  }

  addNote() {
    console.log('yeeee', this.selectedDuration)
  }
}
