import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorComponent } from './Modules/admin/author/author.component';
import { PostsComponent } from './Modules/admin/posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PublicModule} from './Modules/public/public.module';
import {TransversalModule} from './Modules/transversal/transversal.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicModule,
    TransversalModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
