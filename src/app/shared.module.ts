import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChartsModule } from 'ng2-charts';
import { SignaturePadModule } from 'angular2-signaturepad';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatInputModule,
  MatDatepickerModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatListModule,
  MatSelectModule,
  MatCardModule,
  MatSidenavModule,
  MatBottomSheetModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';


import { CommonModule } from '@angular/common';

import { HttpGetLibrary } from './libraries/http/httpGet.library';
import { HttpPostLibrary } from './libraries/http/httpPost.library';
import { HttpPutLibrary } from './libraries/http/httpPut.library';
import { HttpDeleteLibrary } from './libraries/http/httpDelete.library';
import { HeaderLibrary } from './libraries/header.library';
import { ModalLibrary } from './libraries/modal.library';
import { IntervalLibrary } from './libraries/interval.library';
import { MenuLibrary } from './libraries/menu.library';

import { ConfirmComponent } from './components/confirm/confirm.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [ConfirmComponent],
  entryComponents: [ConfirmComponent],
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatPaginatorModule,
    RouterModule,
    TranslateModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollDispatchModule,
    NgxMaterialTimepickerModule,
    ChartsModule,
    SignaturePadModule,
    DragDropModule,
    PerfectScrollbarModule
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatPaginatorModule,
    RouterModule,
    TranslateModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollDispatchModule,
    NgxMaterialTimepickerModule,
    ChartsModule,
    SignaturePadModule,
    DragDropModule,
    PerfectScrollbarModule
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        JwtHelperService,
        HttpGetLibrary,
        HttpPostLibrary,
        HttpPutLibrary,
        HttpDeleteLibrary,
        HeaderLibrary,
        ModalLibrary,
        IntervalLibrary,
        NgxMaterialTimepickerModule,
        MenuLibrary,
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
      ]
    }
  }
}
