import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'question/:qid', component:SinglePostComponent},
  {path: 'ask', component:NewQuestionComponent},
  {path: 'user', component:UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
