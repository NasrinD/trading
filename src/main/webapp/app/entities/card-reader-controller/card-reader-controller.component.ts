import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardReaderController } from './card-reader-controller.model';
import { CardReaderControllerService } from './card-reader-controller.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-card-reader-controller',
    templateUrl: './card-reader-controller.component.html'
})
export class CardReaderControllerComponent implements OnInit, OnDestroy {
cardReaderControllers: CardReaderController[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardReaderControllerService: CardReaderControllerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cardReaderControllerService.query().subscribe(
            (res: HttpResponse<CardReaderController[]>) => {
                this.cardReaderControllers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCardReaderControllers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CardReaderController) {
        return item.id;
    }
    registerChangeInCardReaderControllers() {
        this.eventSubscriber = this.eventManager.subscribe('cardReaderControllerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
