import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { ListaCoversComponent } from './lista-covers/lista-covers.component';
import { CoverComponent } from './cover/cover.component';
import { FooterComponent } from './footer/footer.component';
import { PaginaComponent } from './pagina/pagina.component';
import { NavComponent } from './nav/nav.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { NavReaderComponent } from './nav-reader/nav-reader.component';
import { CommentsComponent } from './comments/comments.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { MyAreaComponent } from './my-area/my-area.component';
import { CategoryTestComponent } from './category-test/category-test.component';
import { ConfigComponent } from './config/config.component';
import { DecisionComponent } from './decision/decision.component';
import { SinopsisComponent } from './sinopsis/sinopsis.component';
import { LikesComponent } from './likes/likes.component';
import { ShareComponent } from './share/share.component';
import { CoversListComponent } from './covers-list/covers-list.component';
import { NewComponent } from './new/new.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeroComponent,
    ListaCoversComponent,
    CoverComponent,
    FooterComponent,
    PaginaComponent,
    NavComponent,
    NavHomeComponent,
    NavReaderComponent,
    CommentsComponent,
    RegisterComponent,
    UserComponent,
    MyAreaComponent,
    CategoryTestComponent,
    ConfigComponent,
    DecisionComponent,
    SinopsisComponent,
    LikesComponent,
    ShareComponent,
    CoversListComponent,
    NewComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
