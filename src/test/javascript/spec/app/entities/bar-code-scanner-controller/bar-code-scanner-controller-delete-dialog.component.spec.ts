/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { BarCodeScannerControllerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller-delete-dialog.component';
import { BarCodeScannerControllerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.service';

describe('Component Tests', () => {

    describe('BarCodeScannerController Management Delete Component', () => {
        let comp: BarCodeScannerControllerDeleteDialogComponent;
        let fixture: ComponentFixture<BarCodeScannerControllerDeleteDialogComponent>;
        let service: BarCodeScannerControllerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [BarCodeScannerControllerDeleteDialogComponent],
                providers: [
                    BarCodeScannerControllerService
                ]
            })
            .overrideTemplate(BarCodeScannerControllerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarCodeScannerControllerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarCodeScannerControllerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
