import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemEmSharedModule } from '../../shared';
import {
    DebitService,
    DebitPopupService,
    DebitComponent,
    DebitDetailComponent,
    DebitDialogComponent,
    DebitPopupComponent,
    DebitDeletePopupComponent,
    DebitDeleteDialogComponent,
    debitRoute,
    debitPopupRoute,
} from './';

const ENTITY_STATES = [
    ...debitRoute,
    ...debitPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemEmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DebitComponent,
        DebitDetailComponent,
        DebitDialogComponent,
        DebitDeleteDialogComponent,
        DebitPopupComponent,
        DebitDeletePopupComponent,
    ],
    entryComponents: [
        DebitComponent,
        DebitDialogComponent,
        DebitPopupComponent,
        DebitDeleteDialogComponent,
        DebitDeletePopupComponent,
    ],
    providers: [
        DebitService,
        DebitPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmDebitModule {}
