import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { CONFIG } from '../../config/config';

@Component({
  selector: 'confirm-component',
  templateUrl: 'confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent  implements OnInit {
  title: string = '';
  message: string = '';
  accept: string = '';
  cancel: string = '';

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit() {
    if(this.data['title'] !== undefined && this.data['title'] !== null)
      this.title = this.data['title'];

    if(this.data['message'] !== undefined && this.data['message'] !== null)
      this.message = this.data['message'];

    if(this.data['accept'] !== undefined && this.data['accept'] !== null)
      this.accept = this.data['accept'];

    if(this.data['cancel'] !== undefined && this.data['cancel'] !== null)
      this.cancel = this.data['cancel'];
  }

  public choice(response:boolean): void {
    this.dialogRef.close(response);
  }
}
