import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendar, CalendarOptions } from '@fullcalendar/angular';
import { AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MeetingsService } from 'src/app/services/meetings.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as $ from 'jquery';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';

@Component({
  selector: 'app-meetings-calen',
  templateUrl: './meetings-calen.component.html',
  styleUrls: ['./meetings-calen.component.css']
})
export class MeetingsCalenComponent implements OnInit {

  title = 'calendarIntegration';
  modalRef: BsModalRef | undefined;
  @ViewChild('viewModal')viewModal: TemplateRef<any> | undefined;
  @ViewChild('deleteModal')deleteModal: TemplateRef<any> | undefined;
  eventName: string = "";
  date:any;
  newEvents: any[] = [];
  deleteEventTitle: string ="";

  constructor(
    public meetingsService: MeetingsService,
    private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private http: HttpClient,  
    //private modalService: BsModalService,      
  ) { }

  ngOnInit(): void {
  }

  // ngAfterViewInit(){
  //   this.openModal;    
  //   this.openModal(this.meetingModal);
  //   this.modalService.dismissAll(this.meetingModal)
  // }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
   initialView: 'dayGridMonth',    
    headerToolbar: {
      right: 'prev,next,today',
      center: 'title',
      left: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // puts weekend in grey
    editable: true,    
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)

    //disable pass-date       
  }; 

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }   

  //ngx daterange picker
  selected: { startDate: moment.Moment; endDate: moment.Moment; } | undefined;    

  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }













  // calendarVisible = true;
  // calendarOptions: CalendarOptions = {
  //  initialView: 'dayGridMonth',    
  //   headerToolbar: {
  //     right: 'prev,next,today',
  //     center: 'title',
  //     left: 'dayGridMonth,timeGridWeek,timeGridDay'
  //   },
  //   navLinks: true, // can click day/week names to navigate views
  //   businessHours: true, // puts weekend in grey
  //   editable: true,    
  //   weekends: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   dateClick: this.onDateClick.bind(this),
  //   events: [],
  //   eventClick: this.handleEventClick.bind(this),
    
  //   //disable pass-date       
  // }; 

  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends
  // }   

  // //ngx daterange picker
  // selected: { startDate: moment.Moment; endDate: moment.Moment; } | undefined;   

  // onDateClick(date: { dateStr: string; }) {
  //   this.modalRef = this.modalService.show(this.viewModal);
  //   this.date = date.dateStr;
  // }
  
  // createEvent() {
  //   let newEvent = {
  //     title: this.eventName,
  //     date: this.date
  //   };
  //   this.newEvents.push(newEvent);
  //   this.calendarOptions.events = [...this.newEvents];
  //   this.modalService.hide(1);
  //   this.eventName = "";
  // }

  // handleEventClick(arg: any){
  //   this.deleteEventTitle = arg.event._def.title;
  //   this.modalRef = this.modalService.show(this.deleteModal);
  // }

  // deleteEvent(arg: any){
  //   for (var i = 0; i < this.newEvents.length; i++) {
  //     if (this.newEvents[i].title == this.deleteEventTitle) {
  //       this.newEvents.splice(i, 1);
  //       this.calendarOptions.events=[];
  //       break;
  //     }
  //   }
  //   this.calendarOptions.events = [...this.newEvents];
  //   this.modalService.hide(1);
  // }

  // cancelDialog(){
  //   this.eventName = "";
  //   this.modalService.hide(1);
  // }

}
