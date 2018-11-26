/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CashDeskApplicationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application-delete-dialog.component';
import { CashDeskApplicationService } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.service';

describe('Component Tests', () => {

    describe('CashDeskApplication Management Delete Component', () => {
        let comp: CashDeskApplicationDeleteDialogComponent;
        let fixture: ComponentFixture<CashDeskApplicationDeleteDialogComponent>;
        let service: CashDeskApplicationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CashDeskApplicationDeleteDialogComponent],
                providers: [
                    CashDeskApplicationService
                ]
            })
            .overrideTemplate(CashDeskApplicationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskApplicationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskApplicationService);
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
