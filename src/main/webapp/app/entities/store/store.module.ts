import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemMoSharedModule } from '../../shared';
import { TradingsystemMoAdminModule } from '../../admin/admin.module';
import {
    StoreService,
    StorePopupService,
    StoreComponent,
    StoreDetailComponent,
    StoreDialogComponent,
    StorePopupComponent,
    StoreDeletePopupComponent,
    StoreDeleteDialogComponent,
    storeRoute,
    storePopupRoute,
} from './';

const ENTITY_STATES = [
    ...storeRoute,
    ...storePopupRoute,
];

@NgModule({
    imports: [
        TradingsystemMoSharedModule,
        TradingsystemMoAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StoreComponent,
        StoreDetailComponent,
        StoreDialogComponent,
        StoreDeleteDialogComponent,
        StorePopupComponent,
        StoreDeletePopupComponent,
    ],
    entryComponents: [
        StoreComponent,
        StoreDialogComponent,
        StorePopupComponent,
        StoreDeleteDialogComponent,
        StoreDeletePopupComponent,
    ],
    providers: [
        StoreService,
        StorePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoStoreModule {}
