/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashBoxControllerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller-delete-dialog.component';
import { CashBoxControllerService } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.service';

describe('Component Tests', () => {

    describe('CashBoxController Management Delete Component', () => {
        let comp: CashBoxControllerDeleteDialogComponent;
        let fixture: ComponentFixture<CashBoxControllerDeleteDialogComponent>;
        let service: CashBoxControllerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashBoxControllerDeleteDialogComponent],
                providers: [
                    CashBoxControllerService
                ]
            })
            .overrideTemplate(CashBoxControllerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxControllerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxControllerService);
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
