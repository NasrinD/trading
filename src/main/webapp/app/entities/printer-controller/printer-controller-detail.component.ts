import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PrinterController } from './printer-controller.model';
import { PrinterControllerService } from './printer-controller.service';

@Component({
    selector: 'jhi-printer-controller-detail',
    templateUrl: './printer-controller-detail.component.html'
})
export class PrinterControllerDetailComponent implements OnInit, OnDestroy {

    printerController: PrinterController;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private printerControllerService: PrinterControllerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrinterControllers();
    }

    load(id) {
        this.printerControllerService.find(id)
            .subscribe((printerControllerResponse: HttpResponse<PrinterController>) => {
                this.printerController = printerControllerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrinterControllers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'printerControllerListModification',
            (response) => this.load(this.printerController.id)
        );
    }
}
