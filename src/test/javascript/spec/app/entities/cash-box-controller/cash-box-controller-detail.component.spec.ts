/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashBoxControllerDetailComponent } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller-detail.component';
import { CashBoxControllerService } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.service';
import { CashBoxController } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.model';

describe('Component Tests', () => {

    describe('CashBoxController Management Detail Component', () => {
        let comp: CashBoxControllerDetailComponent;
        let fixture: ComponentFixture<CashBoxControllerDetailComponent>;
        let service: CashBoxControllerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashBoxControllerDetailComponent],
                providers: [
                    CashBoxControllerService
                ]
            })
            .overrideTemplate(CashBoxControllerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxControllerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxControllerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashBoxController(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashBoxController).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
