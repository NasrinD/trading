import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AcquiringBankComponent } from './acquiring-bank.component';
import { AcquiringBankDetailComponent } from './acquiring-bank-detail.component';
import { AcquiringBankPopupComponent } from './acquiring-bank-dialog.component';
import { AcquiringBankDeletePopupComponent } from './acquiring-bank-delete-dialog.component';

export const acquiringBankRoute: Routes = [
    {
        path: 'acquiring-bank',
        component: AcquiringBankComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.acquiringBank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'acquiring-bank/:id',
        component: AcquiringBankDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.acquiringBank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acquiringBankPopupRoute: Routes = [
    {
        path: 'acquiring-bank-new',
        component: AcquiringBankPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.acquiringBank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'acquiring-bank/:id/edit',
        component: AcquiringBankPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.acquiringBank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'acquiring-bank/:id/delete',
        component: AcquiringBankDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.acquiringBank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
