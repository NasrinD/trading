import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemEmSharedModule } from '../../shared';
import {
    BarCodeScannerService,
    BarCodeScannerPopupService,
    BarCodeScannerComponent,
    BarCodeScannerDetailComponent,
    BarCodeScannerDialogComponent,
    BarCodeScannerPopupComponent,
    BarCodeScannerDeletePopupComponent,
    BarCodeScannerDeleteDialogComponent,
    barCodeScannerRoute,
    barCodeScannerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...barCodeScannerRoute,
    ...barCodeScannerPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemEmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BarCodeScannerComponent,
        BarCodeScannerDetailComponent,
        BarCodeScannerDialogComponent,
        BarCodeScannerDeleteDialogComponent,
        BarCodeScannerPopupComponent,
        BarCodeScannerDeletePopupComponent,
    ],
    entryComponents: [
        BarCodeScannerComponent,
        BarCodeScannerDialogComponent,
        BarCodeScannerPopupComponent,
        BarCodeScannerDeleteDialogComponent,
        BarCodeScannerDeletePopupComponent,
    ],
    providers: [
        BarCodeScannerService,
        BarCodeScannerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmBarCodeScannerModule {}
