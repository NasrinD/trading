/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { AcquiringBankComponent } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.component';
import { AcquiringBankService } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.service';
import { AcquiringBank } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.model';

describe('Component Tests', () => {

    describe('AcquiringBank Management Component', () => {
        let comp: AcquiringBankComponent;
        let fixture: ComponentFixture<AcquiringBankComponent>;
        let service: AcquiringBankService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [AcquiringBankComponent],
                providers: [
                    AcquiringBankService
                ]
            })
            .overrideTemplate(AcquiringBankComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcquiringBankComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcquiringBankService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AcquiringBank(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.acquiringBanks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
