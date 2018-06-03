import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BarCodeScanner } from './bar-code-scanner.model';
import { BarCodeScannerService } from './bar-code-scanner.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bar-code-scanner',
    templateUrl: './bar-code-scanner.component.html'
})
export class BarCodeScannerComponent implements OnInit, OnDestroy {
barCodeScanners: BarCodeScanner[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private barCodeScannerService: BarCodeScannerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.barCodeScannerService.query().subscribe(
            (res: HttpResponse<BarCodeScanner[]>) => {
                this.barCodeScanners = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBarCodeScanners();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BarCodeScanner) {
        return item.id;
    }
    registerChangeInBarCodeScanners() {
        this.eventSubscriber = this.eventManager.subscribe('barCodeScannerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
