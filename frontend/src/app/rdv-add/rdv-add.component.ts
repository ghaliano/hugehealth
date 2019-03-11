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
    addHours
} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
} from 'angular-calendar';
import {RdvsService} from "../services/rdvs.service";
import {ActivatedRoute, Router} from "@angular/router";

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
        private route: ActivatedRoute,
        private router: Router,
        private modal: NgbModal,
        private rdvsService: RdvsService) {
    }

    ngOnInit(){
        let id = 38;
        this.rdvsService.getRdvsByDoctor(id)
            .subscribe((result) => {
                result['hydra:member'].forEach((rdv) => {
                    this.rdvs.push(
                        {
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
                        }
                    );
                });
                console.log(this.rdvs);
                this.refresh.next();
        });
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
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
        console.log(this.modalData);
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
}
