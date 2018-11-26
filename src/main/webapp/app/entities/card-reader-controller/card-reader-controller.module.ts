import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemMoSharedModule } from '../../shared';
import {
    CardReaderControllerService,
    CardReaderControllerPopupService,
    CardReaderControllerComponent,
    CardReaderControllerDetailComponent,
    CardReaderControllerDialogComponent,
    CardReaderControllerPopupComponent,
    CardReaderControllerDeletePopupComponent,
    CardReaderControllerDeleteDialogComponent,
    cardReaderControllerRoute,
    cardReaderControllerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cardReaderControllerRoute,
    ...cardReaderControllerPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemMoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardReaderControllerComponent,
        CardReaderControllerDetailComponent,
        CardReaderControllerDialogComponent,
        CardReaderControllerDeleteDialogComponent,
        CardReaderControllerPopupComponent,
        CardReaderControllerDeletePopupComponent,
    ],
    entryComponents: [
        CardReaderControllerComponent,
        CardReaderControllerDialogComponent,
        CardReaderControllerPopupComponent,
        CardReaderControllerDeleteDialogComponent,
        CardReaderControllerDeletePopupComponent,
    ],
    providers: [
        CardReaderControllerService,
        CardReaderControllerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoCardReaderControllerModule {}
