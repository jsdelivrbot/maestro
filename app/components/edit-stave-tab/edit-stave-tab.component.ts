import {Component, View} from 'angular2/core';
import {TabsManagerService} from '../../services/tabs-manager.service';

@Component({
  selector: 'edit-stave-tab'
})
@View({
  templateUrl: 'app/components/edit-stave-tab/edit-stave-tab.template.html'
})
export class EditStaveTab {
  tabsManager: TabsManagerService;
  active: boolean;

  constructor(tabsManager: TabsManagerService) {
    this.tabsManager = tabsManager;
    this.tabsManager.addTab(this);
  };

  deselect() {
    this.active = false;
  };

  select() {
    this.tabsManager.deselectTabs();
    this.active = true;
  };
}
