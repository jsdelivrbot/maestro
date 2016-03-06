import {Injectable} from 'angular2/core';
import * as _ from 'lodash';

@Injectable()
export class TabsManagerService {
  tabs: any[];

  constructor() {
    this.tabs = [];
  };

  selectTab(tabClass: Function) {
    this.tabs.find(function(tab) {
      return tab.constructor.name === tabClass.name;
    }).select();
  };

  addTab(tab: any) {
    this.tabs.push(tab);
  };

  deselectTabs() {
    _.map(this.tabs, function (tab) {
      tab.deselect();
    });
  };
};
