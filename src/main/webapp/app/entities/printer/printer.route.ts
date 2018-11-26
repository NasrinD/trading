import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PrinterComponent } from './printer.component';
import { PrinterDetailComponent } from './printer-detail.component';
import { PrinterPopupComponent } from './printer-dialog.component';
import { PrinterDeletePopupComponent } from './printer-delete-dialog.component';

export const printerRoute: Routes = [
    {
        path: 'printer',
        component: PrinterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'printer/:id',
        component: PrinterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const printerPopupRoute: Routes = [
    {
        path: 'printer-new',
        component: PrinterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'printer/:id/edit',
        component: PrinterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'printer/:id/delete',
        component: PrinterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.printer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
