/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { ReceiptDetailComponent } from '../../../../../../main/webapp/app/entities/receipt/receipt-detail.component';
import { ReceiptService } from '../../../../../../main/webapp/app/entities/receipt/receipt.service';
import { Receipt } from '../../../../../../main/webapp/app/entities/receipt/receipt.model';

describe('Component Tests', () => {

    describe('Receipt Management Detail Component', () => {
        let comp: ReceiptDetailComponent;
        let fixture: ComponentFixture<ReceiptDetailComponent>;
        let service: ReceiptService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [ReceiptDetailComponent],
                providers: [
                    ReceiptService
                ]
            })
            .overrideTemplate(ReceiptDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReceiptDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Receipt(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.receipt).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
