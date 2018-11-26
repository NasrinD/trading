import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StockItemComponent } from './stock-item.component';
import { StockItemDetailComponent } from './stock-item-detail.component';
import { StockItemPopupComponent } from './stock-item-dialog.component';
import { StockItemDeletePopupComponent } from './stock-item-delete-dialog.component';

export const stockItemRoute: Routes = [
    {
        path: 'stock-item',
        component: StockItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.stockItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stock-item/:id',
        component: StockItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.stockItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockItemPopupRoute: Routes = [
    {
        path: 'stock-item-new',
        component: StockItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.stockItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-item/:id/edit',
        component: StockItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.stockItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-item/:id/delete',
        component: StockItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.stockItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
