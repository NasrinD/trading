/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { StockItemComponent } from '../../../../../../main/webapp/app/entities/stock-item/stock-item.component';
import { StockItemService } from '../../../../../../main/webapp/app/entities/stock-item/stock-item.service';
import { StockItem } from '../../../../../../main/webapp/app/entities/stock-item/stock-item.model';

describe('Component Tests', () => {

    describe('StockItem Management Component', () => {
        let comp: StockItemComponent;
        let fixture: ComponentFixture<StockItemComponent>;
        let service: StockItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [StockItemComponent],
                providers: [
                    StockItemService
                ]
            })
            .overrideTemplate(StockItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StockItem(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stockItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
