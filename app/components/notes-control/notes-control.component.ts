import {Component, View} from 'angular2/core';
import {AddNoteService} from '../../services/add-note.service';
import {RendererService} from '../../services/renderer.service';

@Component({
  selector: 'notes-control',
  inputs: [
    'voice',
    'selectedNoteIndex',
    'selectedNote',
    'stave',
    'renderer'
  ]
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
  stave: Vex.Flow.Stave;
  renderer: RendererService;

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

    this.voice = newVoice;
    this.renderer.drawVoice(this.stave, this.voice);

    console.log('new voice --->', newVoice)
  }
}
