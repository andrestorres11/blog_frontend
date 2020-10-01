import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PostComponent } from './post/post.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatGridListModule
  ],
  exports:[
    PostComponent,
    MatGridListModule
  ]
})
export class PublicModule { }
