/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { DebitDetailComponent } from '../../../../../../main/webapp/app/entities/debit/debit-detail.component';
import { DebitService } from '../../../../../../main/webapp/app/entities/debit/debit.service';
import { Debit } from '../../../../../../main/webapp/app/entities/debit/debit.model';

describe('Component Tests', () => {

    describe('Debit Management Detail Component', () => {
        let comp: DebitDetailComponent;
        let fixture: ComponentFixture<DebitDetailComponent>;
        let service: DebitService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [DebitDetailComponent],
                providers: [
                    DebitService
                ]
            })
            .overrideTemplate(DebitDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DebitDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DebitService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Debit(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.debit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
