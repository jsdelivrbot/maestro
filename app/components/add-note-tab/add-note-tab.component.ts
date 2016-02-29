import {Component, View, EventEmitter} from 'angular2/core';
import {TabsManagerService} from '../../services/tabs-manager.service';

@Component({
  selector: 'add-note-tab',
  inputs: ['tabsManager']
})
@View({
  templateUrl: 'app/components/add-note-tab/add-note-tab.template.html'
})

export class AddNoteTab {
  tabsManager: TabsManagerService;
  active: boolean;
  updateTab: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.active = true;
  };

  ngAfterViewInit() {
    this.tabsManager.addTab(this);
  };

  deselect() {
    this.active = false;
  };

  select() {
    this.tabsManager.deselectTabs();
    this.active = true;
  };
};
