import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemMoSharedModule } from '../../shared';
import {
    CashDeskService,
    CashDeskPopupService,
    CashDeskComponent,
    CashDeskDetailComponent,
    CashDeskDialogComponent,
    CashDeskPopupComponent,
    CashDeskDeletePopupComponent,
    CashDeskDeleteDialogComponent,
    cashDeskRoute,
    cashDeskPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cashDeskRoute,
    ...cashDeskPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemMoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashDeskComponent,
        CashDeskDetailComponent,
        CashDeskDialogComponent,
        CashDeskDeleteDialogComponent,
        CashDeskPopupComponent,
        CashDeskDeletePopupComponent,
    ],
    entryComponents: [
        CashDeskComponent,
        CashDeskDialogComponent,
        CashDeskPopupComponent,
        CashDeskDeleteDialogComponent,
        CashDeskDeletePopupComponent,
    ],
    providers: [
        CashDeskService,
        CashDeskPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoCashDeskModule {}
