import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDeskComponent } from './my-desk.component';
import { RouterModule } from '@angular/router';
import { myDeskRoute } from './my-desk.route';
import { MyCashBoxComponent } from './my-cash-box/my-cash-box.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(myDeskRoute),
    FormsModule
  ],
  declarations: [
    MyDeskComponent,
    MyCashBoxComponent
  ]
})
export class MyDeskModule { }
