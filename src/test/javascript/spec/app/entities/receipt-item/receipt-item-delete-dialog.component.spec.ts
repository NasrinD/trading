/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemMoTestModule } from '../../../test.module';
import { ReceiptItemDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item-delete-dialog.component';
import { ReceiptItemService } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item.service';

describe('Component Tests', () => {

    describe('ReceiptItem Management Delete Component', () => {
        let comp: ReceiptItemDeleteDialogComponent;
        let fixture: ComponentFixture<ReceiptItemDeleteDialogComponent>;
        let service: ReceiptItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [ReceiptItemDeleteDialogComponent],
                providers: [
                    ReceiptItemService
                ]
            })
            .overrideTemplate(ReceiptItemDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReceiptItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptItemService);
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
