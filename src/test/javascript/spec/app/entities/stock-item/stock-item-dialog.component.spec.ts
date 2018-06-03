/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TradingsystemEmTestModule } from '../../../test.module';
import { StockItemDialogComponent } from '../../../../../../main/webapp/app/entities/stock-item/stock-item-dialog.component';
import { StockItemService } from '../../../../../../main/webapp/app/entities/stock-item/stock-item.service';
import { StockItem } from '../../../../../../main/webapp/app/entities/stock-item/stock-item.model';
import { ProductService } from '../../../../../../main/webapp/app/entities/product';
import { InventoryService } from '../../../../../../main/webapp/app/entities/inventory';

describe('Component Tests', () => {

    describe('StockItem Management Dialog Component', () => {
        let comp: StockItemDialogComponent;
        let fixture: ComponentFixture<StockItemDialogComponent>;
        let service: StockItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [StockItemDialogComponent],
                providers: [
                    ProductService,
                    InventoryService,
                    StockItemService
                ]
            })
            .overrideTemplate(StockItemDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockItemDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StockItem(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stockItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stockItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StockItem();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stockItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stockItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
