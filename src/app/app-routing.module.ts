import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"", children:[
                      {path:"admin",loadChildren:()=>import('./Modules/admin/admin.module').then(m=>m.AdminModule)},
                      {path:"public",loadChildren:()=>import('./Modules/public/public.module').then(m=>m.PublicModule)},
                      {path:"", pathMatch:"full",redirectTo:"public"}
                     ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
