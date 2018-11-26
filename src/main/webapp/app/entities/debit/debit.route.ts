import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DebitComponent } from './debit.component';
import { DebitDetailComponent } from './debit-detail.component';
import { DebitPopupComponent } from './debit-dialog.component';
import { DebitDeletePopupComponent } from './debit-delete-dialog.component';

export const debitRoute: Routes = [
    {
        path: 'debit',
        component: DebitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.debit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'debit/:id',
        component: DebitDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.debit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const debitPopupRoute: Routes = [
    {
        path: 'debit-new',
        component: DebitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.debit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'debit/:id/edit',
        component: DebitPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.debit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'debit/:id/delete',
        component: DebitDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.debit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
