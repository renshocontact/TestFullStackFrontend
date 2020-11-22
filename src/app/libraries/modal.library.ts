import { Injectable, NgZone, ViewContainerRef } from '@angular/core';
import {MatDialog} from '@angular/material';

import { CONFIG } from '../config/config';

@Injectable()
export class ModalLibrary {
  private currentModal: any = '';
  private modalObject: any;

  constructor(public dialog: MatDialog) {
  }

  public open(ModalObject: any, options: any = { hasBackdrop: true, disableClose: false, panelClass:'default-theme' }, onDidDismiss: any = null, event: any = null): any {
    console.log('open modal');

    if (this.getCurrentModal() === ModalObject)
      return false;

    if(this.getCurrentModal()!==undefined && this.getCurrentModal()!==null && this.modalObject!== undefined && this.modalObject !== null)
      this.modalObject.close();

    this.setCurrentModal(ModalObject);
    if (event !== undefined && event !== null)
      event.stopPropagation();

    this.modalObject = this.dialog.open(ModalObject, options);

    this.modalObject.afterClosed().subscribe(response => {
      this.setCurrentModal(null);
      if (onDidDismiss !== null)
        onDidDismiss(response);
    });

  }

  private setCurrentModal(currentModal:any):void{
    this.currentModal = currentModal;
  }

  private getCurrentModal():any{
    return this.currentModal;
  }
}
