/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemMoTestModule } from '../../../test.module';
import { PrinterControllerComponent } from '../../../../../../main/webapp/app/entities/printer-controller/printer-controller.component';
import { PrinterControllerService } from '../../../../../../main/webapp/app/entities/printer-controller/printer-controller.service';
import { PrinterController } from '../../../../../../main/webapp/app/entities/printer-controller/printer-controller.model';

describe('Component Tests', () => {

    describe('PrinterController Management Component', () => {
        let comp: PrinterControllerComponent;
        let fixture: ComponentFixture<PrinterControllerComponent>;
        let service: PrinterControllerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [PrinterControllerComponent],
                providers: [
                    PrinterControllerService
                ]
            })
            .overrideTemplate(PrinterControllerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrinterControllerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrinterControllerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PrinterController(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.printerControllers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
