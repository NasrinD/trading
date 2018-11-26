/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CashBoxDetailComponent } from '../../../../../../main/webapp/app/entities/cash-box/cash-box-detail.component';
import { CashBoxService } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.service';
import { CashBox } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.model';

describe('Component Tests', () => {

    describe('CashBox Management Detail Component', () => {
        let comp: CashBoxDetailComponent;
        let fixture: ComponentFixture<CashBoxDetailComponent>;
        let service: CashBoxService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CashBoxDetailComponent],
                providers: [
                    CashBoxService
                ]
            })
            .overrideTemplate(CashBoxDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashBox(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashBox).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
