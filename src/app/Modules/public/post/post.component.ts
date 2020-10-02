import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PostModel} from '../../../Models/post-model';
import {PostService} from '../../../Services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: PostModel[] = [];
  post: PostModel[] = [];

  cargando = false ;
  constructor(public dialog: MatDialog, public postService: PostService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.postService.getAllPost()
    .then((posts: PostModel) => {
      this.posts = posts['data'];
      this.cargando = false;
    });
  }

  openDialog(post) {
    this.dialog.open(Dialog, {
      data: {
        post: post
      }
    });
  }

}

@Component({
  selector: 'dialog-elements-example',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['./post.component.css']
})
export class Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log("dialog", data['post']);
  }

}