import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import { MenuLibrary } from '../../libraries/menu.library';

import { CONFIG } from '../../config/config';
import { ROUTES } from '../../config/routes';

@Component({
  selector: 'menu-list',
  templateUrl: './menu_list.component.html',
  styleUrls: ['./menu_list.component.css']
})
export class MenuListComponent implements OnInit {
  @Output() public sidenavClose = new EventEmitter();
  iconSections: {
    'MENU':'apps'
  };
  constructor(private router: Router,  public menu: MenuLibrary) {}

  ngOnInit() { }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  selection(item: object, i: number) {
    item['click'](item['id'], i);
    this.onSidenavClose();
  }

  subSelection(subItem: object, i: number, i2: number) {
    subItem['click'](subItem['id'], i, i2);
    this.onSidenavClose();
  }

}
