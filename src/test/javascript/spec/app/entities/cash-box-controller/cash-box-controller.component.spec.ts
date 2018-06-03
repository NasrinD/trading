/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashBoxControllerComponent } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.component';
import { CashBoxControllerService } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.service';
import { CashBoxController } from '../../../../../../main/webapp/app/entities/cash-box-controller/cash-box-controller.model';

describe('Component Tests', () => {

    describe('CashBoxController Management Component', () => {
        let comp: CashBoxControllerComponent;
        let fixture: ComponentFixture<CashBoxControllerComponent>;
        let service: CashBoxControllerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashBoxControllerComponent],
                providers: [
                    CashBoxControllerService
                ]
            })
            .overrideTemplate(CashBoxControllerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxControllerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxControllerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashBoxController(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashBoxControllers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
