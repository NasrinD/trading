/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { BankComponent } from '../../../../../../main/webapp/app/entities/bank/bank.component';
import { BankService } from '../../../../../../main/webapp/app/entities/bank/bank.service';
import { Bank } from '../../../../../../main/webapp/app/entities/bank/bank.model';

describe('Component Tests', () => {

    describe('Bank Management Component', () => {
        let comp: BankComponent;
        let fixture: ComponentFixture<BankComponent>;
        let service: BankService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [BankComponent],
                providers: [
                    BankService
                ]
            })
            .overrideTemplate(BankComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Bank(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.banks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
