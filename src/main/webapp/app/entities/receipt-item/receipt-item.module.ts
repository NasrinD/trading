import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TradingsystemEmSharedModule } from '../../shared';
import {
    ReceiptItemService,
    ReceiptItemPopupService,
    ReceiptItemComponent,
    ReceiptItemDetailComponent,
    ReceiptItemDialogComponent,
    ReceiptItemPopupComponent,
    ReceiptItemDeletePopupComponent,
    ReceiptItemDeleteDialogComponent,
    receiptItemRoute,
    receiptItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...receiptItemRoute,
    ...receiptItemPopupRoute,
];

@NgModule({
    imports: [
        TradingsystemEmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReceiptItemComponent,
        ReceiptItemDetailComponent,
        ReceiptItemDialogComponent,
        ReceiptItemDeleteDialogComponent,
        ReceiptItemPopupComponent,
        ReceiptItemDeletePopupComponent,
    ],
    entryComponents: [
        ReceiptItemComponent,
        ReceiptItemDialogComponent,
        ReceiptItemPopupComponent,
        ReceiptItemDeleteDialogComponent,
        ReceiptItemDeletePopupComponent,
    ],
    providers: [
        ReceiptItemService,
        ReceiptItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmReceiptItemModule {}
