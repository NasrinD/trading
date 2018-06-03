/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { BankDetailComponent } from '../../../../../../main/webapp/app/entities/bank/bank-detail.component';
import { BankService } from '../../../../../../main/webapp/app/entities/bank/bank.service';
import { Bank } from '../../../../../../main/webapp/app/entities/bank/bank.model';

describe('Component Tests', () => {

    describe('Bank Management Detail Component', () => {
        let comp: BankDetailComponent;
        let fixture: ComponentFixture<BankDetailComponent>;
        let service: BankService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [BankDetailComponent],
                providers: [
                    BankService
                ]
            })
            .overrideTemplate(BankDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Bank(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bank).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
