/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { NetworkComponent } from '../../../../../../main/webapp/app/entities/network/network.component';
import { NetworkService } from '../../../../../../main/webapp/app/entities/network/network.service';
import { Network } from '../../../../../../main/webapp/app/entities/network/network.model';

describe('Component Tests', () => {

    describe('Network Management Component', () => {
        let comp: NetworkComponent;
        let fixture: ComponentFixture<NetworkComponent>;
        let service: NetworkService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [NetworkComponent],
                providers: [
                    NetworkService
                ]
            })
            .overrideTemplate(NetworkComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NetworkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NetworkService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Network(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.networks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
