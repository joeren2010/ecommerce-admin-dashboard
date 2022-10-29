import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MeetingsService } from 'src/app/services/meetings.service';
import { elementAt, Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.css']
})
export class MeetingsListComponent implements OnInit {

  meetings: any[] = [];
  meetingModel: Meetings | undefined;
  meetingForm: FormGroup = new FormGroup({});
  selectedImageIdx: number = 0;
  thumbnailImageIdx: number = 0;
  tempImageFiles: any[] = [];
  tempFiles: any[] = [];
  loader: boolean = false;

  public meetingsObservable: Observable<any[]> = new Observable();  
  public getData: any[ ] = [ ];                 //use desired name
  public delData: any[ ] = [ ];                 //use desired name  
  public postData: any[ ] = [ ];                //use desired name
  public patchData: any[ ] = [ ];                //use desired name 
  public putData: any[ ] = [ ];                 //use desired name
  //public calData: any[ ] = [ ];                 //use desired name

  @ViewChild("meetingModal",{static: true}) meetingModal : any;

  constructor(
    public meetingsService: MeetingsService,
    private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    //private http: HttpClient,
    //private ngbModalRef: NgbModalRef
  ) { }

  ngOnInit(): void {

    this.meetingsObservable = this.meetingsService.getMeetings();
    this.meetingsService.getMeetings().subscribe({
      next: (getRes: any) => {                      //use desired name
        // console.log(getRes);
        this.getData = getRes;     
      },
      error: (error: any) => {
        this.toast.info("Failed To Retrieved Meeting From Server"); 
        alert('Error!!! Failed To Retrieved Meeting From Server');        
      }
    }); 

  } 

  //ngx daterange picker
  selected: { startDate: moment.Moment; endDate: moment.Moment; } | undefined;   
  
  openModal(modal: any, mtg: Meetings | null = null) {
    this.tempImageFiles = []; 
    this.tempFiles = []; 
    this.initialiseModal(mtg);
    this.modalService.open(modal, {
      size: "m", 
      centered: true,
      backdrop: 'static'
    });
  }
 
  initialiseModal(meetingObj: Meetings | null) {
    if (meetingObj == null) {
      //this.updation = false;
      this.meetingForm = this.formBuilder.group({
        meetingId: [],
        meetingTopic: [null],
        numPeople: [0],        
        emailAddress: [null],        
        meetingDate: [],
        meetingTime: [],
        addedOn: [],
        meetingDescription: [null],
        images: this.formBuilder.array([]),
        thumbnailImage: [null],        
        active: [true],
        files: this.formBuilder.array([])
      });
    } else {
      //this.updation = true;
      this.meetingForm = this.formBuilder.group({
        meetingId: [meetingObj.meetingId],
        meetingTopic: [meetingObj.meetingTopic],
        numPeople: [meetingObj.numPeople],        
        emailAddress: [meetingObj.emailAddress],
        meetingDate: [meetingObj.meetingDate],
        meetingTime: [meetingObj.meetingTime],
        addedOn: [meetingObj.addedOn],                
        meetingDescription: [meetingObj.meetingDescription],        
        images: [meetingObj.images],
        thumbnailImage: [meetingObj.thumbnailImage],
        active: [meetingObj.active],
        files: [meetingObj.files]
      });
      this.tempImageFiles = meetingObj.images || [];
      this.tempFiles = meetingObj.files || [];
    }
  } 

  // view image model
  openImageModal(modal: any, imageUrls: string[], thumbnailImageIdx: number) {
    this.tempImageFiles = [...imageUrls];
    this.thumbnailImageIdx = thumbnailImageIdx;
    this.modalService.open(modal, { 
      size: "xl",
      scrollable: true 
    });
  }

  // open image
  openImage(url: string) {
    window.open(url, "_blank")
  }  

  checkImageFileType(event: any) {
    let fileList: File[] = Object.assign([], event.target.files);
    fileList.forEach((file: any, idx: number) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        this.tempImageFiles.push(file);
      } else {
        //this.toast.warning("accepts only .png/.jpeg/.jpg files!!");
      }
    });
  }

  removeImage(idx: number) {
    this.tempImageFiles.splice(idx, 1);
  }

  changeThumbnailImageIdx(idx: number) {
    this.meetingForm.patchValue({
      thumbnailImage: idx
    })
  }

  openFile(url: string) {
    window.open(url, "_blank")
  }  

  checkFileType(event: any) {
    let fileList: File[] = Object.assign([], event.target.files);
    fileList.forEach((file: any, idx: number) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        this.tempFiles.push(file);
      } else {
        //this.toast.warning("accepts only .png/.jpeg/.jpg files!!");
      }
    });
  }

  removeFile(idx: number) {
    this.tempFiles.splice(idx, 1);
  }

  deleteMeeting(meeting: any) {
    if(confirm('Please Confirm Delete?')){
      console.log(meeting);
      this.meetingsService.delMeetings(meeting.id).subscribe({
        next: (delRes: any) => {
          //console.log(delRes);
          //this.postData = delRes;     
          this.postData = delRes.toString();    
          this.toast.success("Meeting Successfully Deleted");             
          //alert('Success!!! Meeting Successfully Deleted');  
          setTimeout(() =>{            
            window.location.reload(); 
          }, 1000);                            
        },
        error: (error: any) => {
          alert('Error!!! Unable To Delete Meeting');
          this.toast.info("Unable To Delete Meeting");       
        }
      });    
      this.meetingsService.getMeetings();
    }
  }    

  addMeeting(meetingForm: any) {
    if(this.meetingForm.valid){
      console.log(meetingForm.value);
      let postData = meetingForm.value;
      this.meetingsService.postMeetings(postData).subscribe({
        next: (postRes: any) => {
          //console.log(postRes);
          this.postData = postRes.toString();
          this.toast.success("Meeting Successfully Added");          
          //alert('Success!!! Meeting Successfully Added');          
          // setTimeout(() =>{            
          //   window.location.reload(); 
          // }, 1000);  
        },
        error: (error: any) => {
          alert('Error!!! Failed To Add New Meeting');
          this.toast.info("Failed To Add New Meeting");       
        }
      }); 
    }else{
      alert('Please enter valid data, thank you');
      this.toast.info("Please enter valid data, thank you");     
    }      
    this.meetingForm.reset()      
    this.meetingsService.getMeetings();
  }

  updateMeeting(meetingForm: any, patchData: any) {
    if(this.meetingForm.valid){
      console.log(meetingForm.value);
      let patchData = meetingForm.value;
      this.meetingsService.patchMeetings(meetingForm, patchData).subscribe({
        next: (patchRes: any) => {
          //console.log(postRes);
          this.patchData = patchRes;
          alert('Success!!! Meeting Successfully Updated');        
          this.toast.success("Meeting Successfully Updated");
          setTimeout(() =>{            
            window.location.reload(); 
          }, 1000);            
        },
        error: (error: any) => {
          alert('Error!!! Failed To Update Meeting');
          this.toast.info("Failed To Update Meeting");       
        }
      }); 
    }else{
      alert('Please enter valid data, thank you');
      this.toast.info("Please enter valid data, thank you");     
    }      
    this.meetingForm.reset()      
    this.meetingsService.getMeetings();
  } 
  
}

//creates meeting model
export interface Meetings {
  meetingId?: string;
  meetingTopic?: string;
  numPeople?: number;
  emailAddress?: string;
  meetingDate?: Date;    
  meetingTime?: string;    
  addedOn?: Date;    
  meetingDescription?: string;
  images?: string[];
  thumbnailImage?: number;
  active?: boolean;
  files?: string[];  
}


  // saveMeeting(mtg: any, mtgIdx: number = -1) {
  //   if(!this.meetings.some(x => x["id"] === mtg["id"])) {
  //     this.addMeeting;
  //   } 
  //   else {
  //     this.updateMeeting;
  //   } 
  // }   
