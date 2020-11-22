import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { MessageLibrary } from '../../libraries/message.library';
import { HttpGetLibrary } from '../../libraries/http/httpGet.library';
import { HttpPutLibrary } from '../../libraries/http/httpPut.library';
import { HeaderLibrary } from '../../libraries/header.library';

import { CONFIG } from '../../config/config';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  validate: any = CONFIG.FORM.USERS;
  loadingMessage: string = '';
  loading: boolean = false;
  successMessage: string = '';
  failedMessage: string = '';
  user: object = {};
  id: number;

  constructor(private formBuilder: FormBuilder, private translate: TranslateService,
    private messages: MessageLibrary, private location: Location,
    private header: HeaderLibrary, private changeDetectorRefs: ChangeDetectorRef,
    private activateRoute: ActivatedRoute, private httpGetLibrary: HttpGetLibrary,
    private httpPutLibrary: HttpPutLibrary) {
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
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = parseFloat(paramMap['params']['id']);
      console.log('param', this.id);
    });
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit', this.id);
    if (this.id !== undefined && this.id !== null) {
      this.header.setTitle('SECTIONS.UPDATE', { id: this.id });
      this.messages.showMessage({ 'message': this.loadingMessage, 'class': 'loading-message' });
      this.loading = true;

      this.httpGetLibrary.get({
        url: 'users/' + this.id,
        success: (response) => {
          this.loading = false;
          this.messages.closeMessage();
          if (response !== undefined && response !== null && response.data !== undefined && response.data !== null) {
            this.user = response.data;
            this.updateForm.controls.user.setValue(this.user['user']);
            this.updateForm.controls.email.setValue(this.user['email']);
            this.updateForm.controls.first_name.setValue(this.user['first_name']);
            this.updateForm.controls.last_name.setValue(this.user['last_name']);
            this.changeDetectorRefs.detectChanges();
          } else {
            this.back();
          }
        },
        error: (res) => {
          this.loading = false;
          this.back();
        },
        context: this
      });
    }
  }

  buildValidations() {
    this.updateForm = this.formBuilder.group({
      user: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.USER.MIN), Validators.maxLength(this.validate.USER.MAX)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.EMAIL.MIN), Validators.maxLength(this.validate.EMAIL.MAX), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.FIRST_NAME.MIN), Validators.maxLength(this.validate.FIRST_NAME.MAX)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(this.validate.LAST_NAME.MIN), Validators.maxLength(this.validate.LAST_NAME.MAX)])]
    });
  }

  update(): void {
    this.loading = true;
    this.messages.showMessage({
      'message': this.loadingMessage
    });

    this.httpPutLibrary.put({
      url: 'users',
      inputs: {
        'user': this.updateForm.controls.user.value,
        'email': this.updateForm.controls.email.value,
        'first_name': this.updateForm.controls.first_name.value,
        'last_name': this.updateForm.controls.last_name.value
      },
      urlParams: [this.id],
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
