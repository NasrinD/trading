/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { NetworkDetailComponent } from '../../../../../../main/webapp/app/entities/network/network-detail.component';
import { NetworkService } from '../../../../../../main/webapp/app/entities/network/network.service';
import { Network } from '../../../../../../main/webapp/app/entities/network/network.model';

describe('Component Tests', () => {

    describe('Network Management Detail Component', () => {
        let comp: NetworkDetailComponent;
        let fixture: ComponentFixture<NetworkDetailComponent>;
        let service: NetworkService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [NetworkDetailComponent],
                providers: [
                    NetworkService
                ]
            })
            .overrideTemplate(NetworkDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NetworkDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NetworkService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Network(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.network).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
