/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { ReceiptItemDetailComponent } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item-detail.component';
import { ReceiptItemService } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item.service';
import { ReceiptItem } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item.model';

describe('Component Tests', () => {

    describe('ReceiptItem Management Detail Component', () => {
        let comp: ReceiptItemDetailComponent;
        let fixture: ComponentFixture<ReceiptItemDetailComponent>;
        let service: ReceiptItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [ReceiptItemDetailComponent],
                providers: [
                    ReceiptItemService
                ]
            })
            .overrideTemplate(ReceiptItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReceiptItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReceiptItem(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.receiptItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
