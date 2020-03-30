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
import { DecisionComponent } from './decision/decision.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category', component: CategoryTestComponent },
  /* { path: 'page/:firstPageId/:pageId', component: PaginaComponent }, */
  {
    path: 'page/:pageId', component: PaginaComponent, data: { animation: 'Page' },
    children: [{path: 'comments', component: CommentsComponent}]
  },
  /*  { path: 'page/:firstPageId', component: CoverComponent }, */
  { path: 'cover/:pageId', component: CoverComponent, data: { animation: 'Cover' } },
  { path: 'new-branch', component: NewComponent },
  { path: 'new-post', component: NewComponent, data: { animation: 'New' } },
  { path: 'myarea', component: MyAreaComponent },
  { path: 'search', component: BusquedaComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'decision', component: DecisionComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
