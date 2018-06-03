import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashDeskGUI } from './cash-desk-gui.model';
import { CashDeskGUIService } from './cash-desk-gui.service';

@Component({
    selector: 'jhi-cash-desk-gui-detail',
    templateUrl: './cash-desk-gui-detail.component.html'
})
export class CashDeskGUIDetailComponent implements OnInit, OnDestroy {

    cashDeskGUI: CashDeskGUI;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashDeskGUIService: CashDeskGUIService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashDeskGUIS();
    }

    load(id) {
        this.cashDeskGUIService.find(id)
            .subscribe((cashDeskGUIResponse: HttpResponse<CashDeskGUI>) => {
                this.cashDeskGUI = cashDeskGUIResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashDeskGUIS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashDeskGUIListModification',
            (response) => this.load(this.cashDeskGUI.id)
        );
    }
}
