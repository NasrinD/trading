import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemEmSharedModule } from '../../shared';
import {
    PrinterService,
    PrinterPopupService,
    PrinterComponent,
    PrinterDetailComponent,
    PrinterDialogComponent,
    PrinterPopupComponent,
    PrinterDeletePopupComponent,
    PrinterDeleteDialogComponent,
    printerRoute,
    printerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...printerRoute,
    ...printerPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemEmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrinterComponent,
        PrinterDetailComponent,
        PrinterDialogComponent,
        PrinterDeleteDialogComponent,
        PrinterPopupComponent,
        PrinterDeletePopupComponent,
    ],
    entryComponents: [
        PrinterComponent,
        PrinterDialogComponent,
        PrinterPopupComponent,
        PrinterDeleteDialogComponent,
        PrinterDeletePopupComponent,
    ],
    providers: [
        PrinterService,
        PrinterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmPrinterModule {}
