import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef, OnInit
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
    isPast, isToday, format
} from 'date-fns';
import {Subject, throwError} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
} from 'angular-calendar';
import {RdvsService} from "../services/rdvs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'app-rdv-add',
    templateUrl: './rdv-add.component.html',
    styleUrls: ['./rdv-add.component.css']
})
export class RdvAddComponent implements OnInit{
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    @ViewChild('formContent') formContent: TemplateRef<any>;

    form: FormGroup = this.fb.group({
        address: [null],
        doctor: [null],
        startAt: [null],
        type: ["home-type"]
    });

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.rdvs = this.rdvs.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    refresh: Subject<any> = new Subject();

    rdvs: CalendarEvent[] = [
    ];

    activeDayIsOpen: boolean = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService,
        private modal: NgbModal,
        private rdvsService: RdvsService) {
    }

    ngOnInit(){
        let id = 38;
        this.form.controls['doctor'].patchValue(id);
        this.rdvsService.getRdvsByDoctor(id)
            .pipe(catchError((error) => {
                this.authService.redirectIfNotAuthroized(error);
                return throwError(error);
            }))
            .subscribe((result) => {
                result['hydra:member'].forEach((rdv) => {
                    this.rdvs.push(
                        this.createCalendarRdv(rdv)
                    );
                });
                console.log(this.rdvs);
                this.refresh.next();
        });
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        if (!isPast(date) || isToday(date)) {
            console.log(format(date, 'hh:mm DD-MM-YYYY'));
            console.log(events);
            this.form.controls['startAt'].patchValue(format(date, 'hh:mm DD-MM-YYYY'))
            this.modal.open(
                this.formContent, {size: 'lg'}
            );
        }
    }

    eventTimesChanged({
                          event,
                          newStart,
                          newEnd
                      }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = {event, action};
        this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {
        this.rdvs.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    }

    addRdv(){
        this
            .rdvsService
            .addRdv(this.form.value)
            .subscribe((rdv) => {
                this.modal.dismissAll();
                this.rdvs.push(this.createCalendarRdv(rdv));
                this.refresh.next();
            })
    }

    createCalendarRdv(rdv){
        return {
            start: startOfDay(rdv.startAt),
            title: 'Rdv ' + rdv.patient.firstname,
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: true
        };
    }
}
