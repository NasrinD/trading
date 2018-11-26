/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CashDeskGUIDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui-delete-dialog.component';
import { CashDeskGUIService } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.service';

describe('Component Tests', () => {

    describe('CashDeskGUI Management Delete Component', () => {
        let comp: CashDeskGUIDeleteDialogComponent;
        let fixture: ComponentFixture<CashDeskGUIDeleteDialogComponent>;
        let service: CashDeskGUIService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CashDeskGUIDeleteDialogComponent],
                providers: [
                    CashDeskGUIService
                ]
            })
            .overrideTemplate(CashDeskGUIDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskGUIDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskGUIService);
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
