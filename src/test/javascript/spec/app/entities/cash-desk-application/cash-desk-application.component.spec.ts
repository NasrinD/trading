/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CashDeskApplicationComponent } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.component';
import { CashDeskApplicationService } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.service';
import { CashDeskApplication } from '../../../../../../main/webapp/app/entities/cash-desk-application/cash-desk-application.model';

describe('Component Tests', () => {

    describe('CashDeskApplication Management Component', () => {
        let comp: CashDeskApplicationComponent;
        let fixture: ComponentFixture<CashDeskApplicationComponent>;
        let service: CashDeskApplicationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CashDeskApplicationComponent],
                providers: [
                    CashDeskApplicationService
                ]
            })
            .overrideTemplate(CashDeskApplicationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskApplicationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskApplicationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashDeskApplication(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashDeskApplications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
