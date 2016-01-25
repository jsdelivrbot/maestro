import {Component, View} from 'angular2/core';
import {StaveComponent} from './../stave/stave.component';
import 'vexflow'

@Component({
  selector: 'sheet'
})
@View({
  directives: [StaveComponent],
  template: `
    <button (click)="addStave()">Add Stave</button>
    <div>
      <stave *ngFor="#stave of staves" [stave]="stave"></stave>
    </div>
  `
})
export class SheetComponent {
  staves: Array<Vex.Flow.Stave>;

  constructor() {
    let stave = new Vex.Flow.Stave(0, 0, 300);
    let stave2 = new Vex.Flow.Stave(0, 0, 300);
    this.staves = [stave, stave2];
  }

  addStave() {
    let stave = new Vex.Flow.Stave(0, 0, 300);
    this.staves.push(stave);
  }
}
