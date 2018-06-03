import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BarCodeScannerController } from './bar-code-scanner-controller.model';
import { BarCodeScannerControllerService } from './bar-code-scanner-controller.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bar-code-scanner-controller',
    templateUrl: './bar-code-scanner-controller.component.html'
})
export class BarCodeScannerControllerComponent implements OnInit, OnDestroy {
barCodeScannerControllers: BarCodeScannerController[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private barCodeScannerControllerService: BarCodeScannerControllerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.barCodeScannerControllerService.query().subscribe(
            (res: HttpResponse<BarCodeScannerController[]>) => {
                this.barCodeScannerControllers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBarCodeScannerControllers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BarCodeScannerController) {
        return item.id;
    }
    registerChangeInBarCodeScannerControllers() {
        this.eventSubscriber = this.eventManager.subscribe('barCodeScannerControllerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
