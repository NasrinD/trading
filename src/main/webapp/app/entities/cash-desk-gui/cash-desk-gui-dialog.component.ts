import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashDeskGUI } from './cash-desk-gui.model';
import { CashDeskGUIPopupService } from './cash-desk-gui-popup.service';
import { CashDeskGUIService } from './cash-desk-gui.service';
import { CashDesk, CashDeskService } from '../cash-desk';

@Component({
    selector: 'jhi-cash-desk-gui-dialog',
    templateUrl: './cash-desk-gui-dialog.component.html'
})
export class CashDeskGUIDialogComponent implements OnInit {

    cashDeskGUI: CashDeskGUI;
    isSaving: boolean;

    cashdesks: CashDesk[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashDeskGUIService: CashDeskGUIService,
        private cashDeskService: CashDeskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cashDeskService.query()
            .subscribe((res: HttpResponse<CashDesk[]>) => { this.cashdesks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashDeskGUI.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashDeskGUIService.update(this.cashDeskGUI));
        } else {
            this.subscribeToSaveResponse(
                this.cashDeskGUIService.create(this.cashDeskGUI));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashDeskGUI>>) {
        result.subscribe((res: HttpResponse<CashDeskGUI>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashDeskGUI) {
        this.eventManager.broadcast({ name: 'cashDeskGUIListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCashDeskById(index: number, item: CashDesk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cash-desk-gui-popup',
    template: ''
})
export class CashDeskGUIPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashDeskGUIPopupService: CashDeskGUIPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashDeskGUIPopupService
                    .open(CashDeskGUIDialogComponent as Component, params['id']);
            } else {
                this.cashDeskGUIPopupService
                    .open(CashDeskGUIDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
