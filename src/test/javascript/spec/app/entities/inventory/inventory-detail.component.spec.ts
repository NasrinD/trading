/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { InventoryDetailComponent } from '../../../../../../main/webapp/app/entities/inventory/inventory-detail.component';
import { InventoryService } from '../../../../../../main/webapp/app/entities/inventory/inventory.service';
import { Inventory } from '../../../../../../main/webapp/app/entities/inventory/inventory.model';

describe('Component Tests', () => {

    describe('Inventory Management Detail Component', () => {
        let comp: InventoryDetailComponent;
        let fixture: ComponentFixture<InventoryDetailComponent>;
        let service: InventoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [InventoryDetailComponent],
                providers: [
                    InventoryService
                ]
            })
            .overrideTemplate(InventoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Inventory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inventory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
