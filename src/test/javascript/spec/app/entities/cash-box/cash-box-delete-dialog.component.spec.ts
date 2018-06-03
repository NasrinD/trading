/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashBoxDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-box/cash-box-delete-dialog.component';
import { CashBoxService } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.service';

describe('Component Tests', () => {

    describe('CashBox Management Delete Component', () => {
        let comp: CashBoxDeleteDialogComponent;
        let fixture: ComponentFixture<CashBoxDeleteDialogComponent>;
        let service: CashBoxService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashBoxDeleteDialogComponent],
                providers: [
                    CashBoxService
                ]
            })
            .overrideTemplate(CashBoxDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxService);
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
