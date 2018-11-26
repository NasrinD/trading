import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardReaderComponent } from './card-reader.component';
import { CardReaderDetailComponent } from './card-reader-detail.component';
import { CardReaderPopupComponent } from './card-reader-dialog.component';
import { CardReaderDeletePopupComponent } from './card-reader-delete-dialog.component';

export const cardReaderRoute: Routes = [
    {
        path: 'card-reader',
        component: CardReaderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReader.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'card-reader/:id',
        component: CardReaderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReader.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardReaderPopupRoute: Routes = [
    {
        path: 'card-reader-new',
        component: CardReaderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReader.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-reader/:id/edit',
        component: CardReaderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReader.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-reader/:id/delete',
        component: CardReaderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemMoApp.cardReader.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
