/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashDeskComponent } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk.component';
import { CashDeskService } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk.service';
import { CashDesk } from '../../../../../../main/webapp/app/entities/cash-desk/cash-desk.model';

describe('Component Tests', () => {

    describe('CashDesk Management Component', () => {
        let comp: CashDeskComponent;
        let fixture: ComponentFixture<CashDeskComponent>;
        let service: CashDeskService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashDeskComponent],
                providers: [
                    CashDeskService
                ]
            })
            .overrideTemplate(CashDeskComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashDesk(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashDesks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
