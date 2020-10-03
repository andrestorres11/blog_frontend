import { Component, OnInit, ViewChild, Inject, Output } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthorModel } from 'src/app/Models/author-model';
import {AuthorService} from '../../../Services/author.service';
import {AuthorDataTable} from '../../../converts/inputConvertAuthor.convert';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { OutputConvertAuthor } from '../../../converts/outputConvertAuthor.conver';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'last_name', 'created_at', 'acciones', 'acciones2'];
  dataSource: MatTableDataSource<any>;
  authors: AuthorDataTable;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cargando = false ;

  constructor(private authorService:AuthorService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.cargando = true;
    this.getAllAuthor();
  }
  
  getAllAuthor(){
    this.authorService.getMediatorsForDataTable(`page=1`).then((authors: AuthorDataTable) => {
      this.authors = authors;
      this.dataSource = new MatTableDataSource(authors.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageIndex = 0;
    });
  }

  editar(author){
    author.acciones = 'editar';
    console.log("accion", author.acciones)
    const dialogRef = this.dialog.open(Dialog, {
      data: {
        author: author
      }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result?.refrescar){
        this.getAllAuthor();
      }
    });
  }

  eliminar(id){
    swal.fire({
      title: 'Esta Seguro?',
      text: "Desea eliminar el autor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.delete(id).then((response:any) =>{
          if (response[0] == true){
            swal.fire(
              'Eliminado!',
              'El autor ha sido eliminado.',
              'success'
            );
            this.getAllAuthor();
          }
        });
      }
    })
  }

  insertar(){
    let acciones = {
        'acciones':'insertar'
    };
    const dialogRef = this.dialog.open(Dialog,{
      data: {
        author: acciones
      }
    });
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
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
  public authorComponent:AuthorComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, public authorService:AuthorService,
  public dialogRef: MatDialogRef<Dialog>) {
    this.author = data;
  }

  public ngOnInit() {
    this.buildForm();
  }

  update(){
    swal.fire({
      title: 'Esta Seguro?',
      text: "Desea Insertar el autor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      let id = this.formGroup.get('id').value;
      let outputConvertAuthor = new OutputConvertAuthor(this.formGroup);
      if (result.isConfirmed) {
        let mediatorForAPI = outputConvertAuthor.convertAuthor();
        this.authorService.update(id, mediatorForAPI).then((response: any) => {
          if (response == true){
            swal.fire(
              'Actualizado!',
              'El autor ha sido Actualizar.',
              'success'
            );
            this.dialogRef.close({"refrescar":true});
            //location.reload();
          }
        });
      } 
    });
  }

  enviar(){
    let acciones = this.formGroup.get('acciones').value;
    if (acciones == 'editar'){
      this.update();
    }else{
      this.insert();
    }
  }

  insert(){
    swal.fire({
      title: 'Esta Seguro?',
      text: "Desea Insertar el autor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      let outputConvertAuthor = new OutputConvertAuthor(this.formGroup);
      if (result.isConfirmed) {
        let mediatorForAPI = outputConvertAuthor.convertAuthor();
        this.authorService.create(mediatorForAPI).then((response: any) => {
          if (response == true){
            swal.fire(
              'Insertado!',
              'El autor ha sido Insertado.',
              'success'
            );
            this.dialogRef.close({"refrescar":true});
          }
        });
      }
    });
  }


  private buildForm(){
    console.log('data2', this.author['author'].acciones);
    this.formGroup = this.formBuilder.group({
      id: [{value:this.author['author'].id, disabled:true}],
      name: this.author['author'].name,
      last_name: this.author['author'].last_name,
      acciones: this.author['author'].acciones
    });
  }

  
}