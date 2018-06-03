import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BarCodeScanner } from './bar-code-scanner.model';
import { BarCodeScannerService } from './bar-code-scanner.service';

@Component({
    selector: 'jhi-bar-code-scanner-detail',
    templateUrl: './bar-code-scanner-detail.component.html'
})
export class BarCodeScannerDetailComponent implements OnInit, OnDestroy {

    barCodeScanner: BarCodeScanner;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private barCodeScannerService: BarCodeScannerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBarCodeScanners();
    }

    load(id) {
        this.barCodeScannerService.find(id)
            .subscribe((barCodeScannerResponse: HttpResponse<BarCodeScanner>) => {
                this.barCodeScanner = barCodeScannerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBarCodeScanners() {
        this.eventSubscriber = this.eventManager.subscribe(
            'barCodeScannerListModification',
            (response) => this.load(this.barCodeScanner.id)
        );
    }
}
