import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDeskComponent } from './my-desk.component';
import { RouterModule } from '@angular/router';
import { myDeskRoute } from './my-desk.route';
import { MyCashBoxComponent } from './my-cash-box/my-cash-box.component';
import { MyCardReaderComponent } from './my-card-reader/my-card-reader.component';
import { MyDeskGuiComponent } from './my-desk-gui/my-desk-gui.component';
import { MyPrinterComponent } from './my-printer/my-printer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(myDeskRoute),
    FormsModule
  ],
  declarations: [
    MyDeskComponent,
    MyCashBoxComponent,
    MyCardReaderComponent,
    MyDeskGuiComponent,
    MyPrinterComponent
  ]
})
export class MyDeskModule { }
