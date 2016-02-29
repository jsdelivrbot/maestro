import {Component, View} from 'angular2/core';
import {AddNoteTab} from '../add-note-tab/add-note-tab.component';
import {EditNoteTab} from '../edit-note-tab/edit-note-tab.component';
import {EditStaveTab} from '../edit-stave-tab/edit-stave-tab.component';

@Component({
  selector: 'stave-action-tabs'
})
@View({
  directives: [AddNoteTab, EditNoteTab, EditStaveTab],
  templateUrl: 'app/components/stave-action-tabs/stave-action-tabs.template.html'
})
export class StaveActionTabs {
  addNoteTabActive: boolean;
  editNoteTabActive: boolean;
  editStaveTabActive: boolean;

  constructor() {
    this.addNoteTabActive = false;
    this.editNoteTabActive = false;
    this.editStaveTabActive = true;
  }
};
