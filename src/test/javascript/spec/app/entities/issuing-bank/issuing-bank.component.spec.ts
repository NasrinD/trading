/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { IssuingBankComponent } from '../../../../../../main/webapp/app/entities/issuing-bank/issuing-bank.component';
import { IssuingBankService } from '../../../../../../main/webapp/app/entities/issuing-bank/issuing-bank.service';
import { IssuingBank } from '../../../../../../main/webapp/app/entities/issuing-bank/issuing-bank.model';

describe('Component Tests', () => {

    describe('IssuingBank Management Component', () => {
        let comp: IssuingBankComponent;
        let fixture: ComponentFixture<IssuingBankComponent>;
        let service: IssuingBankService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [IssuingBankComponent],
                providers: [
                    IssuingBankService
                ]
            })
            .overrideTemplate(IssuingBankComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IssuingBankComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IssuingBankService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IssuingBank(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.issuingBanks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
