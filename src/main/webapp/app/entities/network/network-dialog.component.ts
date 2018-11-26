import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Network } from './network.model';
import { NetworkPopupService } from './network-popup.service';
import { NetworkService } from './network.service';

@Component({
    selector: 'jhi-network-dialog',
    templateUrl: './network-dialog.component.html'
})
export class NetworkDialogComponent implements OnInit {

    network: Network;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private networkService: NetworkService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.network.id !== undefined) {
            this.subscribeToSaveResponse(
                this.networkService.update(this.network));
        } else {
            this.subscribeToSaveResponse(
                this.networkService.create(this.network));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Network>>) {
        result.subscribe((res: HttpResponse<Network>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Network) {
        this.eventManager.broadcast({ name: 'networkListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-network-popup',
    template: ''
})
export class NetworkPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private networkPopupService: NetworkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.networkPopupService
                    .open(NetworkDialogComponent as Component, params['id']);
            } else {
                this.networkPopupService
                    .open(NetworkDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
