import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Network } from './network.model';
import { NetworkPopupService } from './network-popup.service';
import { NetworkService } from './network.service';

@Component({
    selector: 'jhi-network-delete-dialog',
    templateUrl: './network-delete-dialog.component.html'
})
export class NetworkDeleteDialogComponent {

    network: Network;

    constructor(
        private networkService: NetworkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.networkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'networkListModification',
                content: 'Deleted an network'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-network-delete-popup',
    template: ''
})
export class NetworkDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private networkPopupService: NetworkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.networkPopupService
                .open(NetworkDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
