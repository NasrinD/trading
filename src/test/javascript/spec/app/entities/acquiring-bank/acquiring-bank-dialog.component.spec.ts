/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { AcquiringBankDialogComponent } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank-dialog.component';
import { AcquiringBankService } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.service';
import { AcquiringBank } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.model';
import { NetworkService } from '../../../../../../main/webapp/app/entities/network';

describe('Component Tests', () => {

    describe('AcquiringBank Management Dialog Component', () => {
        let comp: AcquiringBankDialogComponent;
        let fixture: ComponentFixture<AcquiringBankDialogComponent>;
        let service: AcquiringBankService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [AcquiringBankDialogComponent],
                providers: [
                    NetworkService,
                    AcquiringBankService
                ]
            })
            .overrideTemplate(AcquiringBankDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcquiringBankDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcquiringBankService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AcquiringBank(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.acquiringBank = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'acquiringBankListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AcquiringBank();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.acquiringBank = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'acquiringBankListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
