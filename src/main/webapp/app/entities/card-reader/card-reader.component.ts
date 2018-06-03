import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardReader } from './card-reader.model';
import { CardReaderService } from './card-reader.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-card-reader',
    templateUrl: './card-reader.component.html'
})
export class CardReaderComponent implements OnInit, OnDestroy {
cardReaders: CardReader[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardReaderService: CardReaderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cardReaderService.query().subscribe(
            (res: HttpResponse<CardReader[]>) => {
                this.cardReaders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCardReaders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CardReader) {
        return item.id;
    }
    registerChangeInCardReaders() {
        this.eventSubscriber = this.eventManager.subscribe('cardReaderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
