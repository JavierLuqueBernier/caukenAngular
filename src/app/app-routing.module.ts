import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoryTestComponent } from './category-test/category-test.component';
import { PaginaComponent } from './pagina/pagina.component';
import { NewComponent } from './new/new.component';
import { MyAreaComponent } from './my-area/my-area.component';
import { CommentsComponent } from './comments/comments.component';
import { CoverComponent } from './cover/cover.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category', component: CategoryTestComponent },
  /* { path: 'page/:firstPageId/:pageId', component: PaginaComponent }, */
  { path: 'page/:pageId', component: PaginaComponent },
 /*  { path: 'page/:firstPageId', component: CoverComponent }, */
  { path: 'cover/:pageId', component: CoverComponent },
  { path: 'new-branch', component: NewComponent },
  { path: 'new-post', component: NewComponent },
  { path: 'myarea', component: MyAreaComponent },
  { path: 'comments', component: CommentsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
