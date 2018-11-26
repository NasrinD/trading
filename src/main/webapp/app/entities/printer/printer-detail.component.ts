import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Printer } from './printer.model';
import { PrinterService } from './printer.service';

@Component({
    selector: 'jhi-printer-detail',
    templateUrl: './printer-detail.component.html'
})
export class PrinterDetailComponent implements OnInit, OnDestroy {

    printer: Printer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private printerService: PrinterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrinters();
    }

    load(id) {
        this.printerService.find(id)
            .subscribe((printerResponse: HttpResponse<Printer>) => {
                this.printer = printerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrinters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'printerListModification',
            (response) => this.load(this.printer.id)
        );
    }
}
