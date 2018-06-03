import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemEmSharedModule } from '../../shared';
import {
    CardReaderService,
    CardReaderPopupService,
    CardReaderComponent,
    CardReaderDetailComponent,
    CardReaderDialogComponent,
    CardReaderPopupComponent,
    CardReaderDeletePopupComponent,
    CardReaderDeleteDialogComponent,
    cardReaderRoute,
    cardReaderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cardReaderRoute,
    ...cardReaderPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemEmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardReaderComponent,
        CardReaderDetailComponent,
        CardReaderDialogComponent,
        CardReaderDeleteDialogComponent,
        CardReaderPopupComponent,
        CardReaderDeletePopupComponent,
    ],
    entryComponents: [
        CardReaderComponent,
        CardReaderDialogComponent,
        CardReaderPopupComponent,
        CardReaderDeleteDialogComponent,
        CardReaderDeletePopupComponent,
    ],
    providers: [
        CardReaderService,
        CardReaderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmCardReaderModule {}
