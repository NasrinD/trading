import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BarCodeScannerController } from './bar-code-scanner-controller.model';
import { BarCodeScannerControllerService } from './bar-code-scanner-controller.service';

@Component({
    selector: 'jhi-bar-code-scanner-controller-detail',
    templateUrl: './bar-code-scanner-controller-detail.component.html'
})
export class BarCodeScannerControllerDetailComponent implements OnInit, OnDestroy {

    barCodeScannerController: BarCodeScannerController;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private barCodeScannerControllerService: BarCodeScannerControllerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBarCodeScannerControllers();
    }

    load(id) {
        this.barCodeScannerControllerService.find(id)
            .subscribe((barCodeScannerControllerResponse: HttpResponse<BarCodeScannerController>) => {
                this.barCodeScannerController = barCodeScannerControllerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBarCodeScannerControllers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'barCodeScannerControllerListModification',
            (response) => this.load(this.barCodeScannerController.id)
        );
    }
}
