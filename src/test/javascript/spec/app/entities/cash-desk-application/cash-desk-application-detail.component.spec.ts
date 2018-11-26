/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CashDeskApplicationDetailComponent } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application-detail.component';
import { CashDeskApplicationService } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.service';
import { CashDeskApplication } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.model';

describe('Component Tests', () => {

    describe('CashDeskApplication Management Detail Component', () => {
        let comp: CashDeskApplicationDetailComponent;
        let fixture: ComponentFixture<CashDeskApplicationDetailComponent>;
        let service: CashDeskApplicationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CashDeskApplicationDetailComponent],
                providers: [
                    CashDeskApplicationService
                ]
            })
            .overrideTemplate(CashDeskApplicationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskApplicationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskApplicationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashDeskApplication(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashDeskApplication).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
