import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReceiptItemComponent } from './receipt-item.component';
import { ReceiptItemDetailComponent } from './receipt-item-detail.component';
import { ReceiptItemPopupComponent } from './receipt-item-dialog.component';
import { ReceiptItemDeletePopupComponent } from './receipt-item-delete-dialog.component';

export const receiptItemRoute: Routes = [
    {
        path: 'receipt-item',
        component: ReceiptItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receiptItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'receipt-item/:id',
        component: ReceiptItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receiptItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptItemPopupRoute: Routes = [
    {
        path: 'receipt-item-new',
        component: ReceiptItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receiptItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'receipt-item/:id/edit',
        component: ReceiptItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receiptItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'receipt-item/:id/delete',
        component: ReceiptItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receiptItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
