import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardReader } from './card-reader.model';
import { CardReaderPopupService } from './card-reader-popup.service';
import { CardReaderService } from './card-reader.service';
import { CardReaderController, CardReaderControllerService } from '../card-reader-controller';
import { CashDesk, CashDeskService } from '../cash-desk';
import { AcquiringBank, AcquiringBankService } from '../acquiring-bank';

@Component({
    selector: 'jhi-card-reader-dialog',
    templateUrl: './card-reader-dialog.component.html'
})
export class CardReaderDialogComponent implements OnInit {

    cardReader: CardReader;
    isSaving: boolean;

    controllers: CardReaderController[];

    cashdesks: CashDesk[];

    acquiringbanks: AcquiringBank[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cardReaderService: CardReaderService,
        private cardReaderControllerService: CardReaderControllerService,
        private cashDeskService: CashDeskService,
        private acquiringBankService: AcquiringBankService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cardReaderControllerService
            .query({filter: 'cardreader-is-null'})
            .subscribe((res: HttpResponse<CardReaderController[]>) => {
                if (!this.cardReader.controller || !this.cardReader.controller.id) {
                    this.controllers = res.body;
                } else {
                    this.cardReaderControllerService
                        .find(this.cardReader.controller.id)
                        .subscribe((subRes: HttpResponse<CardReaderController>) => {
                            this.controllers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cashDeskService.query()
            .subscribe((res: HttpResponse<CashDesk[]>) => { this.cashdesks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.acquiringBankService.query()
            .subscribe((res: HttpResponse<AcquiringBank[]>) => { this.acquiringbanks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cardReader.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardReaderService.update(this.cardReader));
        } else {
            this.subscribeToSaveResponse(
                this.cardReaderService.create(this.cardReader));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardReader>>) {
        result.subscribe((res: HttpResponse<CardReader>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardReader) {
        this.eventManager.broadcast({ name: 'cardReaderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCardReaderControllerById(index: number, item: CardReaderController) {
        return item.id;
    }

    trackCashDeskById(index: number, item: CashDesk) {
        return item.id;
    }

    trackAcquiringBankById(index: number, item: AcquiringBank) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-card-reader-popup',
    template: ''
})
export class CardReaderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardReaderPopupService: CardReaderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardReaderPopupService
                    .open(CardReaderDialogComponent as Component, params['id']);
            } else {
                this.cardReaderPopupService
                    .open(CardReaderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
