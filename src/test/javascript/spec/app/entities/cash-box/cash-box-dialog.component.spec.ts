/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashBoxDialogComponent } from '../../../../../../main/webapp/app/entities/cash-box/cash-box-dialog.component';
import { CashBoxService } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.service';
import { CashBox } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.model';
import { CashBoxControllerService } from '../../../../../../main/webapp/app/entities/cash-box-controller';
import { CashDeskService } from '../../../../../../main/webapp/app/entities/cash-desk';

describe('Component Tests', () => {

    describe('CashBox Management Dialog Component', () => {
        let comp: CashBoxDialogComponent;
        let fixture: ComponentFixture<CashBoxDialogComponent>;
        let service: CashBoxService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashBoxDialogComponent],
                providers: [
                    CashBoxControllerService,
                    CashDeskService,
                    CashBoxService
                ]
            })
            .overrideTemplate(CashBoxDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashBox(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashBox = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashBoxListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashBox();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashBox = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashBoxListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
