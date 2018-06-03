/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { StoreComponent } from '../../../../../../main/webapp/app/entities/store/store.component';
import { StoreService } from '../../../../../../main/webapp/app/entities/store/store.service';
import { Store } from '../../../../../../main/webapp/app/entities/store/store.model';

describe('Component Tests', () => {

    describe('Store Management Component', () => {
        let comp: StoreComponent;
        let fixture: ComponentFixture<StoreComponent>;
        let service: StoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [StoreComponent],
                providers: [
                    StoreService
                ]
            })
            .overrideTemplate(StoreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Store(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stores[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
