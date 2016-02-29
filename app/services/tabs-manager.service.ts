import {Injectable} from 'angular2/core';
import * as _ from 'lodash';

@Injectable()
export class TabsManagerService {
  tabs: any[];

  constructor() {
    this.tabs = [];
  };

  selectTab(tabClass: Function) {
    const tab = this.tabs.find(function(tab) {
      return tab.constructor.name === tabClass.name;
    });
    tab.select();
  };

  addTab(tab: any) {
    this.tabs.push(tab);
    console.log('added tab', this.tabs);
  };

  deselectTabs() {
    console.log('deslecting tabs...');
    _.map(this.tabs, function (tab) {
      tab.deselect();
    });
  };
}
