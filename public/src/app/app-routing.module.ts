import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NewQuestionComponent } from './new-question/new-question.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'new-question', component:NewQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
