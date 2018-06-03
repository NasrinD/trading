import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashDeskComponent } from './cash-desk.component';
import { CashDeskDetailComponent } from './cash-desk-detail.component';
import { CashDeskPopupComponent } from './cash-desk-dialog.component';
import { CashDeskDeletePopupComponent } from './cash-desk-delete-dialog.component';

export const cashDeskRoute: Routes = [
    {
        path: 'cash-desk',
        component: CashDeskComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDesk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-desk/:id',
        component: CashDeskDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDesk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashDeskPopupRoute: Routes = [
    {
        path: 'cash-desk-new',
        component: CashDeskPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDesk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-desk/:id/edit',
        component: CashDeskPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDesk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-desk/:id/delete',
        component: CashDeskDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDesk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
