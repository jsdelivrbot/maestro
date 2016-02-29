import {Component, View} from 'angular2/core';
import {TabsManagerService} from '../../services/tabs-manager.service';

@Component({
  selector: 'edit-note-tab',
  inputs: ['tabsManager']
})
@View({
  templateUrl: 'app/components/edit-note-tab/edit-note-tab.template.html'
})
export class EditNoteTab {
  tabsManager: TabsManagerService;
  active: boolean;

  ngAfterViewInit() {
    this.tabsManager.addTab(this);
  };

  deselect() {
    console.log('deselecting');
    this.active = false;
  };

  select() {
    console.log('selecting');
    this.tabsManager.deselectTabs();
    this.active = true;
  };
};
