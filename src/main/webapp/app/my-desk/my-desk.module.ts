import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDeskComponent } from './my-desk.component';
import { RouterModule } from '@angular/router';
import { myDeskRoute } from './my-desk.route';
import { MyBarcodeScannerComponent } from './my-barcode-scanner/my-barcode-scanner.component';
import { MyCardReaderComponent } from './my-card-reader/my-card-reader.component';
import { MyCashBoxComponent } from './my-cash-box/my-cash-box.component';
import { MyDeskGuiComponent } from './my-desk-gui/my-desk-gui.component';
import { MyPrinterComponent } from './my-printer/my-printer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(myDeskRoute)
  ],
  declarations: [
    MyDeskComponent,
    MyBarcodeScannerComponent,
    MyCardReaderComponent,
    MyCashBoxComponent,
    MyDeskGuiComponent,
    MyPrinterComponent
  ]
})
export class MyDeskModule { }
