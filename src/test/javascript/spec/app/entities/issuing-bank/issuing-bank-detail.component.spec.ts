/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { IssuingBankDetailComponent } from '../../../../../../main/webapp/app/entities/issuing-bank/issuing-bank-detail.component';
import { IssuingBankService } from '../../../../../../main/webapp/app/entities/issuing-bank/issuing-bank.service';
import { IssuingBank } from '../../../../../../main/webapp/app/entities/issuing-bank/issuing-bank.model';

describe('Component Tests', () => {

    describe('IssuingBank Management Detail Component', () => {
        let comp: IssuingBankDetailComponent;
        let fixture: ComponentFixture<IssuingBankDetailComponent>;
        let service: IssuingBankService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [IssuingBankDetailComponent],
                providers: [
                    IssuingBankService
                ]
            })
            .overrideTemplate(IssuingBankDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IssuingBankDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IssuingBankService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IssuingBank(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.issuingBank).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
