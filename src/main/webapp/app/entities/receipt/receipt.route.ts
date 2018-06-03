import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReceiptComponent } from './receipt.component';
import { ReceiptDetailComponent } from './receipt-detail.component';
import { ReceiptPopupComponent } from './receipt-dialog.component';
import { ReceiptDeletePopupComponent } from './receipt-delete-dialog.component';

export const receiptRoute: Routes = [
    {
        path: 'receipt',
        component: ReceiptComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'receipt/:id',
        component: ReceiptDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptPopupRoute: Routes = [
    {
        path: 'receipt-new',
        component: ReceiptPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'receipt/:id/edit',
        component: ReceiptPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'receipt/:id/delete',
        component: ReceiptDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.receipt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
