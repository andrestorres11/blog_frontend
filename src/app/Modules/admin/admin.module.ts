import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransversalModule } from '../transversal/transversal.module';
import { AuthorComponent, Dialog } from './author/author.component';
import { DialogPost, PostsComponent } from '../admin/posts/posts.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [AuthorComponent, PostsComponent, Dialog, DialogPost],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
	MatSortModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	TransversalModule,
	MatGridListModule,
	ReactiveFormsModule,
	FormsModule,
	MatButtonModule,
	NgxMatFileInputModule,
	MatAutocompleteModule
  ],
  exports:[
    MatTableModule,
    MatPaginatorModule,
	MatSortModule,
	MatFormFieldModule,
	MatInputModule,
	TransversalModule,
	MatGridListModule,
	MatIconModule,
	ReactiveFormsModule,
	FormsModule,
	MatButtonModule,
	NgxMatFileInputModule,
	MatAutocompleteModule
  ]
})
export class AdminModule { }
