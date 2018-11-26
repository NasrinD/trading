import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BarCodeScannerControllerComponent } from './bar-code-scanner-controller.component';
import { BarCodeScannerControllerDetailComponent } from './bar-code-scanner-controller-detail.component';
import { BarCodeScannerControllerPopupComponent } from './bar-code-scanner-controller-dialog.component';
import { BarCodeScannerControllerDeletePopupComponent } from './bar-code-scanner-controller-delete-dialog.component';

export const barCodeScannerControllerRoute: Routes = [
    {
        path: 'bar-code-scanner-controller',
        component: BarCodeScannerControllerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.barCodeScannerController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bar-code-scanner-controller/:id',
        component: BarCodeScannerControllerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.barCodeScannerController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const barCodeScannerControllerPopupRoute: Routes = [
    {
        path: 'bar-code-scanner-controller-new',
        component: BarCodeScannerControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.barCodeScannerController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar-code-scanner-controller/:id/edit',
        component: BarCodeScannerControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.barCodeScannerController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar-code-scanner-controller/:id/delete',
        component: BarCodeScannerControllerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.barCodeScannerController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
