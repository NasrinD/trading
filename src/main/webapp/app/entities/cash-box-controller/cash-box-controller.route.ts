import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashBoxControllerComponent } from './cash-box-controller.component';
import { CashBoxControllerDetailComponent } from './cash-box-controller-detail.component';
import { CashBoxControllerPopupComponent } from './cash-box-controller-dialog.component';
import { CashBoxControllerDeletePopupComponent } from './cash-box-controller-delete-dialog.component';

export const cashBoxControllerRoute: Routes = [
    {
        path: 'cash-box-controller',
        component: CashBoxControllerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashBoxController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-box-controller/:id',
        component: CashBoxControllerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashBoxController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashBoxControllerPopupRoute: Routes = [
    {
        path: 'cash-box-controller-new',
        component: CashBoxControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashBoxController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-box-controller/:id/edit',
        component: CashBoxControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashBoxController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-box-controller/:id/delete',
        component: CashBoxControllerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashBoxController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
