import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemEmSharedModule } from '../../shared';
import {
    BarCodeScannerControllerService,
    BarCodeScannerControllerPopupService,
    BarCodeScannerControllerComponent,
    BarCodeScannerControllerDetailComponent,
    BarCodeScannerControllerDialogComponent,
    BarCodeScannerControllerPopupComponent,
    BarCodeScannerControllerDeletePopupComponent,
    BarCodeScannerControllerDeleteDialogComponent,
    barCodeScannerControllerRoute,
    barCodeScannerControllerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...barCodeScannerControllerRoute,
    ...barCodeScannerControllerPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemEmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BarCodeScannerControllerComponent,
        BarCodeScannerControllerDetailComponent,
        BarCodeScannerControllerDialogComponent,
        BarCodeScannerControllerDeleteDialogComponent,
        BarCodeScannerControllerPopupComponent,
        BarCodeScannerControllerDeletePopupComponent,
    ],
    entryComponents: [
        BarCodeScannerControllerComponent,
        BarCodeScannerControllerDialogComponent,
        BarCodeScannerControllerPopupComponent,
        BarCodeScannerControllerDeleteDialogComponent,
        BarCodeScannerControllerDeletePopupComponent,
    ],
    providers: [
        BarCodeScannerControllerService,
        BarCodeScannerControllerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmBarCodeScannerControllerModule {}
