import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CardReader } from './card-reader.model';
import { CardReaderService } from './card-reader.service';

@Component({
    selector: 'jhi-card-reader-detail',
    templateUrl: './card-reader-detail.component.html'
})
export class CardReaderDetailComponent implements OnInit, OnDestroy {

    cardReader: CardReader;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardReaderService: CardReaderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCardReaders();
    }

    load(id) {
        this.cardReaderService.find(id)
            .subscribe((cardReaderResponse: HttpResponse<CardReader>) => {
                this.cardReader = cardReaderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCardReaders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardReaderListModification',
            (response) => this.load(this.cardReader.id)
        );
    }
}
