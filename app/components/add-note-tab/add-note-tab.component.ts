import {Component, View, EventEmitter} from 'angular2/core';
import {TabsManagerService} from '../../services/tabs-manager.service';

@Component({
  selector: 'add-note-tab'
})
@View({
  templateUrl: 'app/components/add-note-tab/add-note-tab.template.html'
})

export class AddNoteTab {
  tabsManager: TabsManagerService;
  active: boolean;

  constructor(tabsManager: TabsManagerService) {
    this.tabsManager = tabsManager;
    this.tabsManager.addTab(this);
    this.active = true; // selected by default
  };

  deselect() {
    this.active = false;
  };

  select() {
    this.tabsManager.deselectTabs();
    this.active = true;
  };
};
