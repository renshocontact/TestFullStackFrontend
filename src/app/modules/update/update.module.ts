import { NgModule } from '@angular/core';
import { routes } from './update.routing';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { UpdateComponent } from './update.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[],
  declarations: [UpdateComponent]
})
export class UpdateModule { }
