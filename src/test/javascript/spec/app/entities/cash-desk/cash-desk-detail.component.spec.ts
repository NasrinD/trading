/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CashDeskDetailComponent } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk-detail.component';
import { CashDeskService } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk.service';
import { CashDesk } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk.model';

describe('Component Tests', () => {

    describe('CashDesk Management Detail Component', () => {
        let comp: CashDeskDetailComponent;
        let fixture: ComponentFixture<CashDeskDetailComponent>;
        let service: CashDeskService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CashDeskDetailComponent],
                providers: [
                    CashDeskService
                ]
            })
            .overrideTemplate(CashDeskDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashDesk(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashDesk).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
