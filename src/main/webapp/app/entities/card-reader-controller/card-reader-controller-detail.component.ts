import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CardReaderController } from './card-reader-controller.model';
import { CardReaderControllerService } from './card-reader-controller.service';

@Component({
    selector: 'jhi-card-reader-controller-detail',
    templateUrl: './card-reader-controller-detail.component.html'
})
export class CardReaderControllerDetailComponent implements OnInit, OnDestroy {

    cardReaderController: CardReaderController;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardReaderControllerService: CardReaderControllerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCardReaderControllers();
    }

    load(id) {
        this.cardReaderControllerService.find(id)
            .subscribe((cardReaderControllerResponse: HttpResponse<CardReaderController>) => {
                this.cardReaderController = cardReaderControllerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCardReaderControllers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardReaderControllerListModification',
            (response) => this.load(this.cardReaderController.id)
        );
    }
}
