import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IssuingBankComponent } from './issuing-bank.component';
import { IssuingBankDetailComponent } from './issuing-bank-detail.component';
import { IssuingBankPopupComponent } from './issuing-bank-dialog.component';
import { IssuingBankDeletePopupComponent } from './issuing-bank-delete-dialog.component';

export const issuingBankRoute: Routes = [
    {
        path: 'issuing-bank',
        component: IssuingBankComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.issuingBank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'issuing-bank/:id',
        component: IssuingBankDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.issuingBank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const issuingBankPopupRoute: Routes = [
    {
        path: 'issuing-bank-new',
        component: IssuingBankPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.issuingBank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'issuing-bank/:id/edit',
        component: IssuingBankPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.issuingBank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'issuing-bank/:id/delete',
        component: IssuingBankDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.issuingBank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
