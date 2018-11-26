/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CashBoxControllerDialogComponent } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller-dialog.component';
import { CashBoxControllerService } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.service';
import { CashBoxController } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.model';
import { CashBoxService } from '../../../../../../main/webapp/app/entities/cash-box';

describe('Component Tests', () => {

    describe('CashBoxController Management Dialog Component', () => {
        let comp: CashBoxControllerDialogComponent;
        let fixture: ComponentFixture<CashBoxControllerDialogComponent>;
        let service: CashBoxControllerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CashBoxControllerDialogComponent],
                providers: [
                    CashBoxService,
                    CashBoxControllerService
                ]
            })
            .overrideTemplate(CashBoxControllerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxControllerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxControllerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashBoxController(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashBoxController = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashBoxControllerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashBoxController();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashBoxController = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashBoxControllerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
