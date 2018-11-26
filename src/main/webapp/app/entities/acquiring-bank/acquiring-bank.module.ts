import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemMoSharedModule } from '../../shared';
import {
    AcquiringBankService,
    AcquiringBankPopupService,
    AcquiringBankComponent,
    AcquiringBankDetailComponent,
    AcquiringBankDialogComponent,
    AcquiringBankPopupComponent,
    AcquiringBankDeletePopupComponent,
    AcquiringBankDeleteDialogComponent,
    acquiringBankRoute,
    acquiringBankPopupRoute,
} from './';

const ENTITY_STATES = [
    ...acquiringBankRoute,
    ...acquiringBankPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemMoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AcquiringBankComponent,
        AcquiringBankDetailComponent,
        AcquiringBankDialogComponent,
        AcquiringBankDeleteDialogComponent,
        AcquiringBankPopupComponent,
        AcquiringBankDeletePopupComponent,
    ],
    entryComponents: [
        AcquiringBankComponent,
        AcquiringBankDialogComponent,
        AcquiringBankPopupComponent,
        AcquiringBankDeleteDialogComponent,
        AcquiringBankDeletePopupComponent,
    ],
    providers: [
        AcquiringBankService,
        AcquiringBankPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoAcquiringBankModule {}
