/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { InventoryComponent } from '../../../../../../main/webapp/app/entities/inventory/inventory.component';
import { InventoryService } from '../../../../../../main/webapp/app/entities/inventory/inventory.service';
import { Inventory } from '../../../../../../main/webapp/app/entities/inventory/inventory.model';

describe('Component Tests', () => {

    describe('Inventory Management Component', () => {
        let comp: InventoryComponent;
        let fixture: ComponentFixture<InventoryComponent>;
        let service: InventoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [InventoryComponent],
                providers: [
                    InventoryService
                ]
            })
            .overrideTemplate(InventoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Inventory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inventories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
