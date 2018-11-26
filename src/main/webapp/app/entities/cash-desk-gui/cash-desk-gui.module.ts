import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemMoSharedModule } from '../../shared';
import {
    CashDeskGUIService,
    CashDeskGUIPopupService,
    CashDeskGUIComponent,
    CashDeskGUIDetailComponent,
    CashDeskGUIDialogComponent,
    CashDeskGUIPopupComponent,
    CashDeskGUIDeletePopupComponent,
    CashDeskGUIDeleteDialogComponent,
    cashDeskGUIRoute,
    cashDeskGUIPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cashDeskGUIRoute,
    ...cashDeskGUIPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemMoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashDeskGUIComponent,
        CashDeskGUIDetailComponent,
        CashDeskGUIDialogComponent,
        CashDeskGUIDeleteDialogComponent,
        CashDeskGUIPopupComponent,
        CashDeskGUIDeletePopupComponent,
    ],
    entryComponents: [
        CashDeskGUIComponent,
        CashDeskGUIDialogComponent,
        CashDeskGUIPopupComponent,
        CashDeskGUIDeleteDialogComponent,
        CashDeskGUIDeletePopupComponent,
    ],
    providers: [
        CashDeskGUIService,
        CashDeskGUIPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoCashDeskGUIModule {}
