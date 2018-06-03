import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BarCodeScannerComponent } from './bar-code-scanner.component';
import { BarCodeScannerDetailComponent } from './bar-code-scanner-detail.component';
import { BarCodeScannerPopupComponent } from './bar-code-scanner-dialog.component';
import { BarCodeScannerDeletePopupComponent } from './bar-code-scanner-delete-dialog.component';

export const barCodeScannerRoute: Routes = [
    {
        path: 'bar-code-scanner',
        component: BarCodeScannerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.barCodeScanner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bar-code-scanner/:id',
        component: BarCodeScannerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.barCodeScanner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const barCodeScannerPopupRoute: Routes = [
    {
        path: 'bar-code-scanner-new',
        component: BarCodeScannerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.barCodeScanner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar-code-scanner/:id/edit',
        component: BarCodeScannerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.barCodeScanner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar-code-scanner/:id/delete',
        component: BarCodeScannerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.barCodeScanner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
