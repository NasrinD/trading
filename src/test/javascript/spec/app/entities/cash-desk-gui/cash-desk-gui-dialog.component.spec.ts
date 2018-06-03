/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashDeskGUIDialogComponent } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui-dialog.component';
import { CashDeskGUIService } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.service';
import { CashDeskGUI } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.model';
import { CashDeskService } from '../../../../../../main/webapp/app/entities/cash-desk';

describe('Component Tests', () => {

    describe('CashDeskGUI Management Dialog Component', () => {
        let comp: CashDeskGUIDialogComponent;
        let fixture: ComponentFixture<CashDeskGUIDialogComponent>;
        let service: CashDeskGUIService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashDeskGUIDialogComponent],
                providers: [
                    CashDeskService,
                    CashDeskGUIService
                ]
            })
            .overrideTemplate(CashDeskGUIDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskGUIDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskGUIService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashDeskGUI(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashDeskGUI = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashDeskGUIListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashDeskGUI();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashDeskGUI = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashDeskGUIListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
