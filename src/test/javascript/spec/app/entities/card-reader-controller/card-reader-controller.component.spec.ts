/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CardReaderControllerComponent } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller.component';
import { CardReaderControllerService } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller.service';
import { CardReaderController } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller.model';

describe('Component Tests', () => {

    describe('CardReaderController Management Component', () => {
        let comp: CardReaderControllerComponent;
        let fixture: ComponentFixture<CardReaderControllerComponent>;
        let service: CardReaderControllerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CardReaderControllerComponent],
                providers: [
                    CardReaderControllerService
                ]
            })
            .overrideTemplate(CardReaderControllerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardReaderControllerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardReaderControllerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CardReaderController(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cardReaderControllers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
