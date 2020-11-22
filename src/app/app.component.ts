import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { HeaderLibrary } from './libraries/header.library';
import { MessageLibrary } from './libraries/message.library';
import { MenuLibrary } from './libraries/menu.library';

import { CONFIG } from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService, public header: HeaderLibrary, private menu: MenuLibrary, private message: MessageLibrary) {
    translate.setDefaultLang(CONFIG.GENERAL.LANGUAGE);
    this.menu.updateCurrentMenu();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
