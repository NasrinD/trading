/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashBoxComponent } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.component';
import { CashBoxService } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.service';
import { CashBox } from '../../../../../../main/webapp/app/entities/cash-box/cash-box.model';

describe('Component Tests', () => {

    describe('CashBox Management Component', () => {
        let comp: CashBoxComponent;
        let fixture: ComponentFixture<CashBoxComponent>;
        let service: CashBoxService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashBoxComponent],
                providers: [
                    CashBoxService
                ]
            })
            .overrideTemplate(CashBoxComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBoxComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBoxService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashBox(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashBoxes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
