import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { MessageLibrary } from '../../libraries/message.library';
import { HttpPostLibrary } from '../../libraries/http/httpPost.library';
import { HeaderLibrary } from '../../libraries/header.library';

import { CONFIG } from '../../config/config';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {
  insertForm: FormGroup;
  validate: any = CONFIG.FORM.USERS;
  loadingMessage: string = '';
  loading: boolean = false;
  successMessage: string = '';
  failedMessage: string = '';

  constructor(private formBuilder: FormBuilder, private translate: TranslateService,
    private messages: MessageLibrary, private location: Location,
    private header: HeaderLibrary, private httpPostLibrary: HttpPostLibrary) {
    this.buildValidations();
    this.header.setDisplay(true);
    this.loading = false;

    this.translate.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
      }
    );

    this.translate.get('REGISTER_SUCCESS').subscribe(
      value => {
        this.successMessage = value;
      }
    );

    this.translate.get('REGISTER_FAILED').subscribe(
      value => {
        this.failedMessage = value;
      }
    );
  }

  ngOnInit() {
    this.header.setTitle('SECTIONS.NEW');
  }

  private buildValidations() {
    this.insertForm = this.formBuilder.group({
      user: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.USER.MIN), Validators.maxLength(this.validate.USER.MAX)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.EMAIL.MIN), Validators.maxLength(this.validate.EMAIL.MAX), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.FIRST_NAME.MIN), Validators.maxLength(this.validate.FIRST_NAME.MAX)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.LAST_NAME.MIN), Validators.maxLength(this.validate.LAST_NAME.MAX)])]
    });
  }

  public register(): void {
    this.loading = true;
    this.messages.showMessage({
      'message': this.loadingMessage
    });

    this.httpPostLibrary.post({
      url: 'users',
      inputs: {
        'user': this.insertForm.controls.user.value,
        'email': this.insertForm.controls.email.value,
        'first_name': this.insertForm.controls.first_name.value,
        'last_name': this.insertForm.controls.last_name.value
      },
      success: function (response) {
        this.loading = false;
        if (response.status === 'error') {
          this.messages.showMessage({
            'message': response.data.message,
            'class': 'error'
          });
        } else {
          this.back();
        }
      },
      error: function (res) {
        this.loading = false;
        this.messages.showMessage({
          'message': res,
          'class': 'error'
        });
      },
      context: this
    });
  }

  back(): void {
    this.location.back();
  }
}
