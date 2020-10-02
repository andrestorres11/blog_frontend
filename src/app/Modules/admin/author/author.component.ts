import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthorModel } from 'src/app/Models/author-model';
import {AuthorService} from '../../../Services/author.service';
import {AuthorDataTable} from '../../../converts/inputConvertAuthor.convert';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'last_name', 'created_at', 'acciones', 'acciones2'];
  dataSource: MatTableDataSource<any>;
  authors: AuthorDataTable;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cargando = false ;

  constructor(private authorService:AuthorService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.cargando = true;
    
    this.authorService.getMediatorsForDataTable(`page=1`).then((authors: AuthorDataTable) => {
      this.authors = authors;
      this.dataSource = new MatTableDataSource(authors.data)
      this.paginator.pageIndex = 0;
    });
    
  }

  editar(author){
    this.dialog.open(Dialog, {
      data: {
        author: author
      }
    });
  }

  eliminar(id){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  insertar(){
    this.dialog.open(Dialog);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'dialog-elements-example',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['./author.component.css']
})
export class Dialog {
  public formGroup: FormGroup;
  author: AuthorModel;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder) {
    this.author = data;
  }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      id: [{value:this.author['author'].id, disabled:true}],
      name: this.author['author'].name,
      last_name: this.author['author'].last_name
    });
  }
  
}