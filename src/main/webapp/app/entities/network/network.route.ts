import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NetworkComponent } from './network.component';
import { NetworkDetailComponent } from './network-detail.component';
import { NetworkPopupComponent } from './network-dialog.component';
import { NetworkDeletePopupComponent } from './network-delete-dialog.component';

export const networkRoute: Routes = [
    {
        path: 'network',
        component: NetworkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.network.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'network/:id',
        component: NetworkDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.network.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const networkPopupRoute: Routes = [
    {
        path: 'network-new',
        component: NetworkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.network.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'network/:id/edit',
        component: NetworkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.network.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'network/:id/delete',
        component: NetworkDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.network.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
