/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CardReaderControllerDetailComponent } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller-detail.component';
import { CardReaderControllerService } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller.service';
import { CardReaderController } from '../../../../../../main/webapp/app/entities/card-reader-controller/card-reader-controller.model';

describe('Component Tests', () => {

    describe('CardReaderController Management Detail Component', () => {
        let comp: CardReaderControllerDetailComponent;
        let fixture: ComponentFixture<CardReaderControllerDetailComponent>;
        let service: CardReaderControllerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CardReaderControllerDetailComponent],
                providers: [
                    CardReaderControllerService
                ]
            })
            .overrideTemplate(CardReaderControllerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardReaderControllerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardReaderControllerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CardReaderController(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cardReaderController).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
