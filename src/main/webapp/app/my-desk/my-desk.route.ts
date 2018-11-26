import { MyDeskComponent } from './my-desk.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../shared';

export const myDeskRoute: Routes = [
    {
        path: 'my-desk',
        component: MyDeskComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tradingsystemEmApp.myDesk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
