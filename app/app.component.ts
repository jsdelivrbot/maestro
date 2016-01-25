import {Component} from 'angular2/core';
import {SheetComponent} from './components/sheet/sheet.component';

@Component({
  directives: [SheetComponent],
  selector: 'maestro-app',
  template: `
    <h1>hello maestro</h1>
    <sheet></sheet>
  `
})
export class AppComponent {

}
