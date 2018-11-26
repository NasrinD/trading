import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StoreComponent } from './store.component';
import { StoreDetailComponent } from './store-detail.component';
import { StorePopupComponent } from './store-dialog.component';
import { StoreDeletePopupComponent } from './store-delete-dialog.component';

export const storeRoute: Routes = [
    {
        path: 'store',
        component: StoreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.store.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'store/:id',
        component: StoreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.store.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storePopupRoute: Routes = [
    {
        path: 'store-new',
        component: StorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.store.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store/:id/edit',
        component: StorePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.store.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store/:id/delete',
        component: StoreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.store.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
