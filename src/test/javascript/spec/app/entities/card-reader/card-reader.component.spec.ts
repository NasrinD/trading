/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { CardReaderComponent } from '../../../../../../main/webapp/app/entities/card-reader/card-reader.component';
import { CardReaderService } from '../../../../../../main/webapp/app/entities/card-reader/card-reader.service';
import { CardReader } from '../../../../../../main/webapp/app/entities/card-reader/card-reader.model';

describe('Component Tests', () => {

    describe('CardReader Management Component', () => {
        let comp: CardReaderComponent;
        let fixture: ComponentFixture<CardReaderComponent>;
        let service: CardReaderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [CardReaderComponent],
                providers: [
                    CardReaderService
                ]
            })
            .overrideTemplate(CardReaderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardReaderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardReaderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CardReader(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cardReaders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
