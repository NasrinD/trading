import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardReaderControllerComponent } from './card-reader-controller.component';
import { CardReaderControllerDetailComponent } from './card-reader-controller-detail.component';
import { CardReaderControllerPopupComponent } from './card-reader-controller-dialog.component';
import { CardReaderControllerDeletePopupComponent } from './card-reader-controller-delete-dialog.component';

export const cardReaderControllerRoute: Routes = [
    {
        path: 'card-reader-controller',
        component: CardReaderControllerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReaderController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'card-reader-controller/:id',
        component: CardReaderControllerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReaderController.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardReaderControllerPopupRoute: Routes = [
    {
        path: 'card-reader-controller-new',
        component: CardReaderControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReaderController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-reader-controller/:id/edit',
        component: CardReaderControllerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReaderController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-reader-controller/:id/delete',
        component: CardReaderControllerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReaderController.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
