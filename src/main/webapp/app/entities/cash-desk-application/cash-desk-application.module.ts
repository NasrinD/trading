import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemEmSharedModule } from '../../shared';
import {
    CashDeskApplicationService,
    CashDeskApplicationPopupService,
    CashDeskApplicationComponent,
    CashDeskApplicationDetailComponent,
    CashDeskApplicationDialogComponent,
    CashDeskApplicationPopupComponent,
    CashDeskApplicationDeletePopupComponent,
    CashDeskApplicationDeleteDialogComponent,
    cashDeskApplicationRoute,
    cashDeskApplicationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cashDeskApplicationRoute,
    ...cashDeskApplicationPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemEmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashDeskApplicationComponent,
        CashDeskApplicationDetailComponent,
        CashDeskApplicationDialogComponent,
        CashDeskApplicationDeleteDialogComponent,
        CashDeskApplicationPopupComponent,
        CashDeskApplicationDeletePopupComponent,
    ],
    entryComponents: [
        CashDeskApplicationComponent,
        CashDeskApplicationDialogComponent,
        CashDeskApplicationPopupComponent,
        CashDeskApplicationDeleteDialogComponent,
        CashDeskApplicationDeletePopupComponent,
    ],
    providers: [
        CashDeskApplicationService,
        CashDeskApplicationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmCashDeskApplicationModule {}
