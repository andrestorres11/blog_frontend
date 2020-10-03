import { Component, OnInit, ViewChild, Inject, Output } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PostModel } from 'src/app/Models/post-model';
import {PostService} from '../../../Services/post.service';
import {PostDataTable} from '../../../converts/inputConvertPost.convert';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { OutputConvertPost } from '../../../converts/outputConvertPost.conver';
import {Observable} from 'rxjs';
import { AuthorService } from 'src/app/Services/author.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tittle','created_at', 'acciones', 'acciones2'];
  dataSource: MatTableDataSource<any>;
  posts: PostDataTable;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cargando = false ;

  constructor(private postService:PostService, public dialog: MatDialog) {    
  }

  ngOnInit(): void {
    this.cargando = true;
    this.getAllPost();
  }

  getAllPost(){
    this.postService.getPostForDataTable().then((posts: PostDataTable) => {
      this.posts = posts;
      console.log("posts",posts);
      this.dataSource = new MatTableDataSource(posts.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageIndex = 0;
    });
  }

  editar(post){
    post.acciones = 'editar';
    console.log("accion", post.acciones)
    const dialogRef = this.dialog.open(DialogPost, {
      data: {
        post: post
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
        this.postService.delete(id).then((response:any) =>{
          if (response[0] == true){
            swal.fire(
              'Eliminado!',
              'El autor ha sido eliminado.',
              'success'
            );
            this.getAllPost();
          }
        });
      }
    })
  }

  insertar(){
    let acciones = {
        'acciones':'insertar'
    };
    const dialogRef = this.dialog.open(DialogPost,{
      data: {
        post: acciones
      }
    });
  }
  ngAfterViewInit() {
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
  selector: 'dialog-post-elements-example',
  templateUrl: 'dialog-post-data-example-dialog.html',
  styleUrls: ['./posts.component.css']
})
export class DialogPost {
  public formGroup: FormGroup;
  post: PostModel;
  public postComponent:PostsComponent;
  filteredOptions: Observable<string[]>;
  authors:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, public postService:PostService,
  public dialogRef: MatDialogRef<DialogPost>,
  public authorService:AuthorService) {
    console.log("data",data);
    this.post = data;
  }

  getAllAuthor(){
    this.authorService.getMediatorsForDataTable(`page=1`).then((authors: any) => {
      this.authors = authors;
    });
  }

  public ngOnInit() {
    // this.filteredOptions = this.formGroup.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    this.buildForm();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.authors.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
      let outputConvertpost = new OutputConvertPost(this.formGroup);
      if (result.isConfirmed) {
        let postForAPI = outputConvertpost.convertPost();
        this.postService.update(id, postForAPI).then((response: any) => {
          if (response == true){
            swal.fire(
              'Actualizado!',
              'El autor ha sido Actualizado.',
              'success'
            );
            this.dialogRef.close();
            this.dialogRef.close({"refrescar":true});
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
      text: "Desea Insertar el post",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      let outputConvertPost = new OutputConvertPost(this.formGroup);
      if (result.isConfirmed) {
        let postForAPI = outputConvertPost.convertPost();
        this.postService.create(postForAPI).then((response: any) => {
          if (response == true){
            swal.fire(
              'Insertado!',
              'El post ha sido Insertado.',
              'success'
            );
            this.dialogRef.close({"refrescar":true});
          }
        });
      }
    });
  }


  private buildForm(){

    this.formGroup = this.formBuilder.group({
      id: [{value:this.post['post'].id, disabled:true}],
      tittle: this.post['post'].tittle,
      content: this.post['post'].content,
      author: this.post['post'].author,
      image: this.post['post'].image,
      imageBase64: this['post'].image,
      acciones: this.post['post'].acciones
    });

    this.formGroup.get('imageBase64').valueChanges.subscribe(
      value => {
        let readAsArrayBuffer = new FileReader();
        readAsArrayBuffer.onloadend = (e) =>{
          this.formGroup.patchValue(
            {'image':readAsArrayBuffer.result}
          );
        }
        readAsArrayBuffer.readAsDataURL(value);
      }
    );
  }

  
}