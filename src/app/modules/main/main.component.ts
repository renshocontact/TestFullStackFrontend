import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";

import { HttpGetLibrary } from '../../libraries/http/httpGet.library';
import { HttpDeleteLibrary } from '../../libraries/http/httpDelete.library';
import { MessageLibrary } from '../../libraries/message.library';
import { HeaderLibrary } from '../../libraries/header.library';
import { MenuLibrary } from '../../libraries/menu.library';

import { CONFIG } from '../../config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  loadingMessage: String = '';
  loading: boolean = false;
  page: number = 0;
  quantity: number = CONFIG.PAGINATION.QUANTITY;
  users: Array<object> = [];
  deleteIcon:String = 'delete_outline';
  newIcon:String = 'add';
  
  popUp: object = {
    title: '',
    delete: '',
    cancel: '',
    deleteMessage: '',
    deleteSuccess: '',
    deleteFailed: ''
  };

  constructor(public translate: TranslateService, public httpGetLibrary: HttpGetLibrary,
    public httpDeleteLibrary: HttpDeleteLibrary, public header: HeaderLibrary,
    public messages: MessageLibrary, public router: Router,
    public changeDetectorRefs: ChangeDetectorRef, public zone: NgZone,
    public menu: MenuLibrary) {
    this.header.setValueProgress("10");
    this.translate.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
      }
    );

    this.translate.get('CANCEL').subscribe(
      value => {
        this.popUp['cancel'] = value;
      }
    );

    this.translate.get('DELETE').subscribe(
      value => {
        this.popUp['delete'] = value;
      }
    );


    this.translate.get('CONFIRM').subscribe(
      value => {
        this.popUp['title'] = value;
      }
    );

    this.translate.get('DELETE_USER').subscribe(
      value => {
        this.popUp['deleteMessage'] = value;
      }
    );

    this.translate.get('DELETE_USER_SUCCESS').subscribe(
      value => {
        this.popUp['deleteSuccess'] = value;
      }
    );

    this.translate.get('DELETE_USER_FAILED').subscribe(
      value => {
        this.popUp['deleteFailed'] = value;
      }
    );
  }

  ngOnInit() {
    this.header.setTitle('HOME');
    this.init();
  }

  init() {
    this.getMore();
  }

  getMore(event: any = false): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.loading) {
        console.log('loading');
        this.loading = true;
        this.messages.showMessage({ 'message': this.loadingMessage });
        this.httpGetLibrary.get({
          url: 'users',
          urlParams: [
            this.quantity,
            this.page
          ],
          success: (response) => {
            console.log('success', response);
            this.loading = false;
            this.messages.closeMessage();
            if (response.data.length > 0) {
              this.page++;
              this.users = response.data;
              this.changeDetectorRefs.detectChanges();
              resolve(true);
            }
          },
          error: (error) => {
            console.log('error', error);
            this.loading = false;
            resolve(false);
          },
          context: this
        });
      } else {
        resolve(true);
      }
    });
  }

  new(): void {
    if (!this.loading) {
      this.zone.run(() => {
        this.router.navigate(['insert']);
        this.page = 0;
      });
    }
  }

  edit($event: any, idUser: number): void {
    $event.stopPropagation();
    if (!this.loading) {
      this.zone.run(() => {
        this.router.navigate(['update', idUser]);
        this.page = 0;
      });
    }
  }

  delete($event: any, index: number, idUser: number): void {
    $event.stopPropagation();
    if (!this.loading) {
      this.zone.run(() => {
        this.header.setValueProgress("10");
        this.messages.confirm({
          title: this.popUp['title'],
          message: this.popUp['deleteMessage'],
          accept: this.popUp['delete'],
          cancel: this.popUp['cancel'],
        }).then((result) => {
          this.header.setValueProgress("100");
          if (result === true) {
            this.loading = true;
            this.messages.showMessage({ 'message': this.loadingMessage, 'class': 'loading-message' });
            this.httpDeleteLibrary.delete({
              url: 'users',
              urlParams: [idUser],
              success: function (response) {
                this.loading = false;
                this.users.splice(index, 1);
                this.changeDetectorRefs.detectChanges();
                this.messages.closeMessage();
                this.messages.showMessage({ 'message': this.popUp['deleteSuccess'], 'duration': 3000, 'class': 'loading-message' });
              },
              error: function (res) {
                this.loading = false;
                this.messages.closeMessage();
                this.messages.showMessage({ 'message': this.popUp['deleteFailed'], 'duration': 3000, 'class': 'error' });
              },
              context: this
            });
          }
        });
      });
    }
  }
}
