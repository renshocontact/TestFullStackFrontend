import { Injectable, NgZone } from '@angular/core';
import { ConfirmComponent } from "../components/confirm/confirm.component";
import { BarMessagesLibrary } from "./bar_message.library";
import { ModalLibrary } from './modal.library';

@Injectable()
export class MessageLibrary {
  private timeOut: any = null;
  private isLoading: boolean = false;
  private action: any = false;
  private dismissed: any = false;

  constructor(private modal: ModalLibrary, private zone: NgZone) { }

  public showMessage(params: any): void {
    this.isLoading = true;
    if(this.timeOut !==null)
      this.timeOut = null;
    let message: string;
    let close: string;
    let duration: number;
    let options: object = {};
    options['panelClass'] = 'default-message';

    (params.message !== undefined && params.message !== null) ? message = params.message : message = '';

    (params.close !== undefined && params.close !== null) ? close = params.close : close = '';

    (params.action !== undefined && params.action !== null && typeof params.action == 'function') ? this.action = params.action : this.action = false;

    (params.dismissed !== undefined && params.dismissed !== null && typeof params.dismissed == 'function') ? this.dismissed = params.dismissed : this.dismissed = false;

    if (params.class !== undefined && params.class !== null && params.class !== '') {
      options['panelClass'] = options['panelClass'] + ' ' + params.class;
      if (params.class === 'error')
        options['duration'] = 3000;
    } else {
      options['duration'] = -1;
    }

    if (params.duration !== undefined && params.duration !== null && !isNaN(params.duration))
      options['duration'] = params.duration;

    setTimeout(() => {
      this.zone.run(() => {
        BarMessagesLibrary.addMessage(message, options['panelClass']);
      });
    });

    if (options['duration'] !== -1) {
      this.timeOut = setTimeout(() => {
        this.timeOut = null;
        this.closeMessage();
      }, options['duration']);
    }
  }

  public confirm(options): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.modal.open(ConfirmComponent, {
        showBackDrop: true,
        enableBackdropDismiss: false,
        data: options
      }, (choice) => {
        if (choice !== undefined) {
          resolve(choice)
        } else {
          resolve(false);
        }
      }
      );
    });
  }

  public closeMessage(): void {
    if (this.isLoading) {
      //al ser mas simple la barra debemos manejar ambas acciones asi qie hacemos los dos if de abajo por si acaso
      if (this.action !== false)
        this.action();

      if (this.dismissed !== false)
        this.dismissed();

      this.action = false;
      this.dismissed = false;

      BarMessagesLibrary.closeMessage();
      this.isLoading = false;
    }
  }
}
