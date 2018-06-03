import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashBoxComponent } from './cash-box.component';
import { CashBoxDetailComponent } from './cash-box-detail.component';
import { CashBoxPopupComponent } from './cash-box-dialog.component';
import { CashBoxDeletePopupComponent } from './cash-box-delete-dialog.component';

export const cashBoxRoute: Routes = [
    {
        path: 'cash-box',
        component: CashBoxComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashBox.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-box/:id',
        component: CashBoxDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashBox.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashBoxPopupRoute: Routes = [
    {
        path: 'cash-box-new',
        component: CashBoxPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashBox.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-box/:id/edit',
        component: CashBoxPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashBox.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-box/:id/delete',
        component: CashBoxDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashBox.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
