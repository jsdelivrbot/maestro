import {Component, View} from 'angular2/core';

@Component({
  selector: 'edit-stave-tab',
  inputs: ['tabsManager']
})
@View({
  templateUrl: 'app/components/edit-stave-tab/edit-stave-tab.template.html'
})
export class EditStaveTab {
  tabsManager: TabsManagerService;
  active: boolean;

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
}
