/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashDeskDialogComponent } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk-dialog.component';
import { CashDeskService } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk.service';
import { CashDesk } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk.model';
import { PrinterService } from '../../../../../../main/webapp/app/entities/printer';
import { CashBoxService } from '../../../../../../main/webapp/app/entities/cash-box';
import { CashDeskGUIService } from '../../../../../../main/webapp/app/entities/cash-desk-gui';
import { BarCodeScannerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner';
import { CardReaderService } from '../../../../../../main/webapp/app/entities/card-reader';
import { CashDeskApplicationService } from '../../../../../../main/webapp/app/entities/cash-desk-application';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { StoreService } from '../../../../../../main/webapp/app/entities/store';

describe('Component Tests', () => {

    describe('CashDesk Management Dialog Component', () => {
        let comp: CashDeskDialogComponent;
        let fixture: ComponentFixture<CashDeskDialogComponent>;
        let service: CashDeskService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashDeskDialogComponent],
                providers: [
                    PrinterService,
                    CashBoxService,
                    CashDeskGUIService,
                    BarCodeScannerService,
                    CardReaderService,
                    CashDeskApplicationService,
                    UserService,
                    StoreService,
                    CashDeskService
                ]
            })
            .overrideTemplate(CashDeskDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashDesk(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashDesk = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashDeskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashDesk();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashDesk = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashDeskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
