/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { BarCodeScannerDialogComponent } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner-dialog.component';
import { BarCodeScannerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner.service';
import { BarCodeScanner } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner.model';
import { BarCodeScannerControllerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller';
import { CashDeskService } from '../../../../../../main/webapp/app/entities/cash-desk';

describe('Component Tests', () => {

    describe('BarCodeScanner Management Dialog Component', () => {
        let comp: BarCodeScannerDialogComponent;
        let fixture: ComponentFixture<BarCodeScannerDialogComponent>;
        let service: BarCodeScannerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [BarCodeScannerDialogComponent],
                providers: [
                    BarCodeScannerControllerService,
                    CashDeskService,
                    BarCodeScannerService
                ]
            })
            .overrideTemplate(BarCodeScannerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarCodeScannerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarCodeScannerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BarCodeScanner(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.barCodeScanner = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'barCodeScannerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BarCodeScanner();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.barCodeScanner = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'barCodeScannerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
