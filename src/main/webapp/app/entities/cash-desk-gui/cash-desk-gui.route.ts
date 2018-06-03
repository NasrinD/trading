import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashDeskGUIComponent } from './cash-desk-gui.component';
import { CashDeskGUIDetailComponent } from './cash-desk-gui-detail.component';
import { CashDeskGUIPopupComponent } from './cash-desk-gui-dialog.component';
import { CashDeskGUIDeletePopupComponent } from './cash-desk-gui-delete-dialog.component';

export const cashDeskGUIRoute: Routes = [
    {
        path: 'cash-desk-gui',
        component: CashDeskGUIComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDeskGUI.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-desk-gui/:id',
        component: CashDeskGUIDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDeskGUI.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashDeskGUIPopupRoute: Routes = [
    {
        path: 'cash-desk-gui-new',
        component: CashDeskGUIPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDeskGUI.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-desk-gui/:id/edit',
        component: CashDeskGUIPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDeskGUI.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-desk-gui/:id/delete',
        component: CashDeskGUIDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.cashDeskGUI.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
