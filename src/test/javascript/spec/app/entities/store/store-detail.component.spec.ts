/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { StoreDetailComponent } from '../../../../../../main/webapp/app/entities/store/store-detail.component';
import { StoreService } from '../../../../../../main/webapp/app/entities/store/store.service';
import { Store } from '../../../../../../main/webapp/app/entities/store/store.model';

describe('Component Tests', () => {

    describe('Store Management Detail Component', () => {
        let comp: StoreDetailComponent;
        let fixture: ComponentFixture<StoreDetailComponent>;
        let service: StoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [StoreDetailComponent],
                providers: [
                    StoreService
                ]
            })
            .overrideTemplate(StoreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Store(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.store).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
