import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardReaderController } from './card-reader-controller.model';
import { CardReaderControllerPopupService } from './card-reader-controller-popup.service';
import { CardReaderControllerService } from './card-reader-controller.service';
import { CardReader, CardReaderService } from '../card-reader';

@Component({
    selector: 'jhi-card-reader-controller-dialog',
    templateUrl: './card-reader-controller-dialog.component.html'
})
export class CardReaderControllerDialogComponent implements OnInit {

    cardReaderController: CardReaderController;
    isSaving: boolean;

    cardreaders: CardReader[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cardReaderControllerService: CardReaderControllerService,
        private cardReaderService: CardReaderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cardReaderService.query()
            .subscribe((res: HttpResponse<CardReader[]>) => { this.cardreaders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cardReaderController.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardReaderControllerService.update(this.cardReaderController));
        } else {
            this.subscribeToSaveResponse(
                this.cardReaderControllerService.create(this.cardReaderController));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardReaderController>>) {
        result.subscribe((res: HttpResponse<CardReaderController>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardReaderController) {
        this.eventManager.broadcast({ name: 'cardReaderControllerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCardReaderById(index: number, item: CardReader) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-card-reader-controller-popup',
    template: ''
})
export class CardReaderControllerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardReaderControllerPopupService: CardReaderControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardReaderControllerPopupService
                    .open(CardReaderControllerDialogComponent as Component, params['id']);
            } else {
                this.cardReaderControllerPopupService
                    .open(CardReaderControllerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
