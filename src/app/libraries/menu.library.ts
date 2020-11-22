import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { ModalLibrary } from './modal.library';

import { CONFIG } from '../config/config';

@Injectable()
export class MenuLibrary {
  private menuPosition: string = '0';
  private verifyRoute: any;
  private currentSection: string = '';
  private menuOpened: boolean = false;
  private menu: Array<object> = [
    {
      'id': 'main',
      'click': (section, selected, subSelected = -1) => { this.updateMenu(section, selected, subSelected) },
      'icon': 'home',
      'label': 'HOME',
      'level': '*'
    },
    {
      'id': 'insert',
      'click': (section, selected, subSelected = -1) => { this.updateMenu(section, selected, subSelected) },
      'icon': 'home',
      'label': 'NEW',
      'level': '*'
    }];

  constructor(private modal: ModalLibrary, private zone: NgZone, private router: Router) {
    this.menu[this.menuPosition]['class'] = 'current';
  }

  public setMenuPosition(modal: string): void {
    this.menuPosition = modal;
  }

  public getMenuPosition(): string {
    return this.menuPosition;
  }

  public getMenuOpened(): boolean {
    return this.menuOpened;
  }

  public setMenuOpened(status: boolean): void {
    this.menuOpened = status;
  }

  public getMenu(): Array<Object> {
    return this.menu;
  }

  private updateMenu(destiny: string, selected: number = -1, subSelected: number = -1, params = null): void {
    this.setCurrentMenu(selected, subSelected);
    this.setCurrentSection(destiny);
    if (params !== null)
      this.router.navigate([destiny, params]);
    else
      this.router.navigate([destiny]);
  }

  public setCurrentMenu(selected: number = -1, subSelected: number = -1): void {
    this.zone.run(() => {
      if (subSelected !== -1) {
        let current_split = this.getMenuPosition().split('_');
        if (current_split.length > 1) {
          this.menu[parseInt(current_split[0])]['content'][parseInt(current_split[1])]['class'] = null;
        } else {
          this.menu[parseInt(current_split[0])]['class'] = null;
        }

        this.setMenuPosition(selected + '_' + subSelected);
        this.menu[selected]['content'][subSelected]['class'] = 'current';
      } else {
        let current_split = this.getMenuPosition().split('_');
        if (current_split.length > 1) {
          this.menu[parseInt(current_split[0])]['content'][parseInt(current_split[1])]['class'] = null;
        } else {
          this.menu[parseInt(current_split[0])]['class'] = null;
        }
        this.setMenuPosition(selected.toString());
        this.menu[selected]['class'] = 'current';
      }
    });
  }

  public updateCurrentMenu(): void {
    this.verifyRoute = this.router.events.subscribe((event: any) => {
      if (event['url'] !== undefined) {
        this.verifyRoute.unsubscribe();
        let currentRoute: Array<string> = event['url'].split('/');
        console.log(currentRoute);
        if (currentRoute.length > 1 && currentRoute[1] !== '') {
          this.setCurrentSection(currentRoute[1]);
        } else {
          this.setCurrentSection(CONFIG.GENERAL.DEFAULT_MODULE);
        }
      }
    });
  }

  public findCurrentMenu(destiny: any): void {
    menuLoop:
    for (let index in this.menu) {
      if (destiny === this.menu[index]['id']) {
        this.setCurrentMenu(parseInt(index), -1);
        break menuLoop;
      } else {
        if (this.menu[index]['content'] !== undefined) {
          for (let contentIndex in this.menu[index]['content']) {
            if (destiny === this.menu[index]['content'][contentIndex]['id']) {
              this.setCurrentMenu(parseInt(index), parseInt(contentIndex));
              break menuLoop;
            }
          }
        }
      }
    }
  }

  public findMenu(menu: string): boolean | string {
    for (let index in this.menu) {
      console.log('buscando en el menu a ', menu, 'en ', this.menu[index]);
      if ((menu === this.menu[index]['id']) || (this.menu[index]['alias'] !== undefined && this.menu[index]['alias'] == menu)) {
        if (this.menu[index]['alias'] !== undefined && this.menu[index]['alias'] == menu) {
          this.setCurrentSection(this.menu[index]['id']);
        }
        return this.menu[index]['level'];
      } else {
        if (this.menu[index]['content'] !== undefined) {
          console.log('buscando en el submdulo', this.menu[index]['content']);
          for (let contentIndex in this.menu[index]['content']) {
            if ((menu === this.menu[index]['content'][contentIndex]['id']) || (this.menu[index]['content'][contentIndex]['alias'] !== undefined && this.menu[index]['content'][contentIndex]['alias'] == menu)) {
              if (this.menu[index]['content'][contentIndex]['alias'] !== undefined && this.menu[index]['content'][contentIndex]['alias'] == menu) {
                this.setCurrentSection(this.menu[index]['content'][contentIndex]['id']);
              }
              return this.menu[index]['content'][contentIndex]['level'];
            }
          }
        }
      }
    }

    return false;
  }

  public setCurrentSection(section: string): void {
    console.log('setCurrentSection', section);
    this.currentSection = section;
  }

  public getCurrentSection(): string {
    return this.currentSection;
  }

}