/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CardReaderDetailComponent } from '../../../../../../main/webapp/app/entities/card-reader/card-reader-detail.component';
import { CardReaderService } from '../../../../../../main/webapp/app/entities/card-reader/card-reader.service';
import { CardReader } from '../../../../../../main/webapp/app/entities/card-reader/card-reader.model';

describe('Component Tests', () => {

    describe('CardReader Management Detail Component', () => {
        let comp: CardReaderDetailComponent;
        let fixture: ComponentFixture<CardReaderDetailComponent>;
        let service: CardReaderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CardReaderDetailComponent],
                providers: [
                    CardReaderService
                ]
            })
            .overrideTemplate(CardReaderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardReaderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardReaderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CardReader(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cardReader).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
