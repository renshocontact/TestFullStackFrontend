import { NgModule } from '@angular/core';
import { routes } from './list.routing';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[],
  declarations: [MainComponent]
})
export class MainModule { }
