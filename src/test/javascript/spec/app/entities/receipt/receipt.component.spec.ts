/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { ReceiptComponent } from '../../../../../../main/webapp/app/entities/receipt/receipt.component';
import { ReceiptService } from '../../../../../../main/webapp/app/entities/receipt/receipt.service';
import { Receipt } from '../../../../../../main/webapp/app/entities/receipt/receipt.model';

describe('Component Tests', () => {

    describe('Receipt Management Component', () => {
        let comp: ReceiptComponent;
        let fixture: ComponentFixture<ReceiptComponent>;
        let service: ReceiptService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [ReceiptComponent],
                providers: [
                    ReceiptService
                ]
            })
            .overrideTemplate(ReceiptComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReceiptComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Receipt(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.receipts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
