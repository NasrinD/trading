/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashDeskGUIComponent } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.component';
import { CashDeskGUIService } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.service';
import { CashDeskGUI } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.model';

describe('Component Tests', () => {

    describe('CashDeskGUI Management Component', () => {
        let comp: CashDeskGUIComponent;
        let fixture: ComponentFixture<CashDeskGUIComponent>;
        let service: CashDeskGUIService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashDeskGUIComponent],
                providers: [
                    CashDeskGUIService
                ]
            })
            .overrideTemplate(CashDeskGUIComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskGUIComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskGUIService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashDeskGUI(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashDeskGUIS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
