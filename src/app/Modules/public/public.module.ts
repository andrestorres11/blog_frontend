import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PostComponent } from './post/post.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[
    PostComponent,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule
  ]
})
export class PublicModule { }
