/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { StockItemDetailComponent } from '../../../../../../main/webapp/app/entities/stock-item/stock-item-detail.component';
import { StockItemService } from '../../../../../../main/webapp/app/entities/stock-item/stock-item.service';
import { StockItem } from '../../../../../../main/webapp/app/entities/stock-item/stock-item.model';

describe('Component Tests', () => {

    describe('StockItem Management Detail Component', () => {
        let comp: StockItemDetailComponent;
        let fixture: ComponentFixture<StockItemDetailComponent>;
        let service: StockItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [StockItemDetailComponent],
                providers: [
                    StockItemService
                ]
            })
            .overrideTemplate(StockItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StockItem(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stockItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
