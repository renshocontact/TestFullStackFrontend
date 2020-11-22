import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/main/main.module#MainModule',
  },
  {
    path: 'main',
    loadChildren: './modules/main/main.module#MainModule',
  },
  {
    path: 'insert',
    loadChildren: './modules/insert/insert.module#InsertModule',
  },
  {
    path: 'update/:id',
    loadChildren: './modules/update/update.module#UpdateModule',
  },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
