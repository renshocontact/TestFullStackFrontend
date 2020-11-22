import { NgModule } from '@angular/core';
import { routes } from './insert.routing';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { InsertComponent } from './insert.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[],
  declarations: [InsertComponent]
})
export class InsertModule { }
