/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { AcquiringBankDetailComponent } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank-detail.component';
import { AcquiringBankService } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.service';
import { AcquiringBank } from '../../../../../../main/webapp/app/entities/acquiring-bank/acquiring-bank.model';

describe('Component Tests', () => {

    describe('AcquiringBank Management Detail Component', () => {
        let comp: AcquiringBankDetailComponent;
        let fixture: ComponentFixture<AcquiringBankDetailComponent>;
        let service: AcquiringBankService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [AcquiringBankDetailComponent],
                providers: [
                    AcquiringBankService
                ]
            })
            .overrideTemplate(AcquiringBankDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcquiringBankDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcquiringBankService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AcquiringBank(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.acquiringBank).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
