import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrinterController } from './printer-controller.model';
import { PrinterControllerService } from './printer-controller.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-printer-controller',
    templateUrl: './printer-controller.component.html'
})
export class PrinterControllerComponent implements OnInit, OnDestroy {
printerControllers: PrinterController[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private printerControllerService: PrinterControllerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.printerControllerService.query().subscribe(
            (res: HttpResponse<PrinterController[]>) => {
                this.printerControllers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPrinterControllers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PrinterController) {
        return item.id;
    }
    registerChangeInPrinterControllers() {
        this.eventSubscriber = this.eventManager.subscribe('printerControllerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
