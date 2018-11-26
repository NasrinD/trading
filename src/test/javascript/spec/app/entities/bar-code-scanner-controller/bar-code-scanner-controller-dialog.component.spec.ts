/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { BarCodeScannerControllerDialogComponent } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller-dialog.component';
import { BarCodeScannerControllerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.service';
import { BarCodeScannerController } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.model';
import { BarCodeScannerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner';

describe('Component Tests', () => {

    describe('BarCodeScannerController Management Dialog Component', () => {
        let comp: BarCodeScannerControllerDialogComponent;
        let fixture: ComponentFixture<BarCodeScannerControllerDialogComponent>;
        let service: BarCodeScannerControllerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [BarCodeScannerControllerDialogComponent],
                providers: [
                    BarCodeScannerService,
                    BarCodeScannerControllerService
                ]
            })
            .overrideTemplate(BarCodeScannerControllerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarCodeScannerControllerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarCodeScannerControllerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BarCodeScannerController(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.barCodeScannerController = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'barCodeScannerControllerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BarCodeScannerController();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.barCodeScannerController = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'barCodeScannerControllerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
