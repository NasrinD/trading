/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CardReaderControllerDialogComponent } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller-dialog.component';
import { CardReaderControllerService } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller.service';
import { CardReaderController } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller.model';
import { CardReaderService } from '../../../../../../main/webapp/app/entities/card-reader';

describe('Component Tests', () => {

    describe('CardReaderController Management Dialog Component', () => {
        let comp: CardReaderControllerDialogComponent;
        let fixture: ComponentFixture<CardReaderControllerDialogComponent>;
        let service: CardReaderControllerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CardReaderControllerDialogComponent],
                providers: [
                    CardReaderService,
                    CardReaderControllerService
                ]
            })
            .overrideTemplate(CardReaderControllerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardReaderControllerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardReaderControllerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardReaderController(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cardReaderController = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardReaderControllerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardReaderController();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cardReaderController = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardReaderControllerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
