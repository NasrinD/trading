import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemMoSharedModule } from '../../shared';
import {
    CashBoxService,
    CashBoxPopupService,
    CashBoxComponent,
    CashBoxDetailComponent,
    CashBoxDialogComponent,
    CashBoxPopupComponent,
    CashBoxDeletePopupComponent,
    CashBoxDeleteDialogComponent,
    cashBoxRoute,
    cashBoxPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cashBoxRoute,
    ...cashBoxPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemMoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashBoxComponent,
        CashBoxDetailComponent,
        CashBoxDialogComponent,
        CashBoxDeleteDialogComponent,
        CashBoxPopupComponent,
        CashBoxDeletePopupComponent,
    ],
    entryComponents: [
        CashBoxComponent,
        CashBoxDialogComponent,
        CashBoxPopupComponent,
        CashBoxDeleteDialogComponent,
        CashBoxDeletePopupComponent,
    ],
    providers: [
        CashBoxService,
        CashBoxPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoCashBoxModule {}
