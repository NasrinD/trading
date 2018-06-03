/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { PrinterComponent } from '../../../../../../main/webapp/app/entities/printer/printer.component';
import { PrinterService } from '../../../../../../main/webapp/app/entities/printer/printer.service';
import { Printer } from '../../../../../../main/webapp/app/entities/printer/printer.model';

describe('Component Tests', () => {

    describe('Printer Management Component', () => {
        let comp: PrinterComponent;
        let fixture: ComponentFixture<PrinterComponent>;
        let service: PrinterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [PrinterComponent],
                providers: [
                    PrinterService
                ]
            })
            .overrideTemplate(PrinterComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrinterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrinterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Printer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.printers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
