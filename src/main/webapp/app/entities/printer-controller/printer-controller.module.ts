import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemMoSharedModule } from '../../shared';
import {
    PrinterControllerService,
    PrinterControllerPopupService,
    PrinterControllerComponent,
    PrinterControllerDetailComponent,
    PrinterControllerDialogComponent,
    PrinterControllerPopupComponent,
    PrinterControllerDeletePopupComponent,
    PrinterControllerDeleteDialogComponent,
    printerControllerRoute,
    printerControllerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...printerControllerRoute,
    ...printerControllerPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemMoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrinterControllerComponent,
        PrinterControllerDetailComponent,
        PrinterControllerDialogComponent,
        PrinterControllerDeleteDialogComponent,
        PrinterControllerPopupComponent,
        PrinterControllerDeletePopupComponent,
    ],
    entryComponents: [
        PrinterControllerComponent,
        PrinterControllerDialogComponent,
        PrinterControllerPopupComponent,
        PrinterControllerDeleteDialogComponent,
        PrinterControllerDeletePopupComponent,
    ],
    providers: [
        PrinterControllerService,
        PrinterControllerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoPrinterControllerModule {}
