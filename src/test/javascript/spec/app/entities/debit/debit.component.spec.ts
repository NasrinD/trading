/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { DebitComponent } from '../../../../../../main/webapp/app/entities/debit/debit.component';
import { DebitService } from '../../../../../../main/webapp/app/entities/debit/debit.service';
import { Debit } from '../../../../../../main/webapp/app/entities/debit/debit.model';

describe('Component Tests', () => {

    describe('Debit Management Component', () => {
        let comp: DebitComponent;
        let fixture: ComponentFixture<DebitComponent>;
        let service: DebitService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [DebitComponent],
                providers: [
                    DebitService
                ]
            })
            .overrideTemplate(DebitComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DebitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DebitService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Debit(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.debits[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
