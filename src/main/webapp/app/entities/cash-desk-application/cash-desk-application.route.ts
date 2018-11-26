import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashDeskApplicationComponent } from './cash-desk-application.component';
import { CashDeskApplicationDetailComponent } from './cash-desk-application-detail.component';
import { CashDeskApplicationPopupComponent } from './cash-desk-application-dialog.component';
import { CashDeskApplicationDeletePopupComponent } from './cash-desk-application-delete-dialog.component';

export const cashDeskApplicationRoute: Routes = [
    {
        path: 'cash-desk-application',
        component: CashDeskApplicationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashDeskApplication.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-desk-application/:id',
        component: CashDeskApplicationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashDeskApplication.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashDeskApplicationPopupRoute: Routes = [
    {
        path: 'cash-desk-application-new',
        component: CashDeskApplicationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashDeskApplication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-desk-application/:id/edit',
        component: CashDeskApplicationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashDeskApplication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-desk-application/:id/delete',
        component: CashDeskApplicationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cashDeskApplication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
