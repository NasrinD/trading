import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PrinterControllerComponent } from './printer-controller.component';
import { PrinterControllerDetailComponent } from './printer-controller-detail.component';
import { PrinterControllerPopupComponent } from './printer-controller-dialog.component';
import { PrinterControllerDeletePopupComponent } from './printer-controller-delete-dialog.component';

export const printerControllerRoute: Routes = [
    {
        path: 'printer-controller',
        component: PrinterControllerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printerController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'printer-controller/:id',
        component: PrinterControllerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printerController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const printerControllerPopupRoute: Routes = [
    {
        path: 'printer-controller-new',
        component: PrinterControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printerController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'printer-controller/:id/edit',
        component: PrinterControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printerController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'printer-controller/:id/delete',
        component: PrinterControllerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printerController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
