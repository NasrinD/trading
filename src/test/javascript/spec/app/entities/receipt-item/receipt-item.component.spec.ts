/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { ReceiptItemComponent } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item.component';
import { ReceiptItemService } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item.service';
import { ReceiptItem } from '../../../../../../main/webapp/app/entities/receipt-item/receipt-item.model';

describe('Component Tests', () => {

    describe('ReceiptItem Management Component', () => {
        let comp: ReceiptItemComponent;
        let fixture: ComponentFixture<ReceiptItemComponent>;
        let service: ReceiptItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [ReceiptItemComponent],
                providers: [
                    ReceiptItemService
                ]
            })
            .overrideTemplate(ReceiptItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReceiptItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReceiptItem(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.receiptItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
