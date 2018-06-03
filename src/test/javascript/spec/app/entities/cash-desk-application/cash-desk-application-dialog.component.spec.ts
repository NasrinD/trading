/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashDeskApplicationDialogComponent } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application-dialog.component';
import { CashDeskApplicationService } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.service';
import { CashDeskApplication } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.model';
import { InventoryService } from '../../../../../../main/webapp/app/entities/inventory';
import { BankService } from '../../../../../../main/webapp/app/entities/bank';

describe('Component Tests', () => {

    describe('CashDeskApplication Management Dialog Component', () => {
        let comp: CashDeskApplicationDialogComponent;
        let fixture: ComponentFixture<CashDeskApplicationDialogComponent>;
        let service: CashDeskApplicationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashDeskApplicationDialogComponent],
                providers: [
                    InventoryService,
                    BankService,
                    CashDeskApplicationService
                ]
            })
            .overrideTemplate(CashDeskApplicationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskApplicationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskApplicationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashDeskApplication(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashDeskApplication = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashDeskApplicationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashDeskApplication();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashDeskApplication = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashDeskApplicationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
