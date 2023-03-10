import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';

const routes: Routes = [
  { path: "usuarios", component: IndexPageComponent },
  { path: "usuarios/crear", component: CreateUserComponent },
  { path: "**", redirectTo: "usuarios/crear"}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
