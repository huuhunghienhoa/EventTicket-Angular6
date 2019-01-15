import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { IEvent } from "../../shared/ievent";
import { EventService } from "../../services/event.service";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'app-edit-event',
    templateUrl: 'editevent.component.html',
    styleUrls: ['editevent.component.css']
})
export class EditEventComponent implements OnInit, OnDestroy {
    eventForm: FormGroup;
    res: any;
    errs: string;
    success: string;
    event: any = {};
    event_id: string;
    //event : IEvent;
    subscription: Subscription;
    subscriptionGetEvent: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private eventService: EventService,
        private router: Router,
        private route: ActivatedRoute
    ){}
    
    ngOnInit() {
        this.buildForm()
        const allParams = this.route.snapshot.params;
        console.log(allParams.id);
        this.subscriptionGetEvent = this.eventService.getEvent(allParams.id).subscribe(res => {
            this.res = res;
            if(this.res.status == "SUCCESS"){
                this.event_id = this.res.data.id;
                //this.event = res.data;
                this.eventForm.get('name').setValue(this.res.data.name);
                this.eventForm.get('description').setValue(this.res.data.description);
                this.eventForm.get('description').setValue(this.res.data.description);
                this.eventForm.get('ticket_total').setValue(this.res.data.ticket_total);
                this.eventForm.get('ticket_price').setValue(this.res.data.ticket_price);
                this.eventForm.get('start_date').setValue(this.res.data.start_date);
                this.eventForm.get('end_date').setValue(this.res.data.end_date);
                this.eventForm.get('ticket_start_date').setValue(this.res.data.ticket_start_date);
                this.eventForm.get('ticket_end_date').setValue(this.res.data.ticket_end_date);
                this.eventForm.get('banner').setValue(this.res.data.banner);
            }      
      });
    }
     buildForm() {
        this.eventForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            banner: ['', [Validators.required]],
            ticket_price: ['', [Validators.required]],
            ticket_total: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            end_date: ['', [Validators.required]],
            ticket_start_date: ['', [Validators.required]],
            ticket_end_date: ['', [Validators.required]]
        })
    }

    submit({ value} : { value: IEvent}) {
        this.subscription = this.eventService.editEvent(value, this.event_id).subscribe(res => {
            this.res = res;
            console.log(this.res);
            if(this.res.status == 'AUTHORIZATION_REQUIRED') {
              console.log(this.res)
            }
            if(this.res.status == 'VALIDATION_ERROR') {
                this.errs = this.res.validations 
            }
            if(this.res.status == 'SUCCESS') {
                this.success = "Event was updated!"
            }
            //this.err = loi;
        })
    }
    ngOnDestroy(){
      if(this.subscription)
          this.subscription.unsubscribe();
      if(this.subscriptionGetEvent)
          this.subscriptionGetEvent.unsubscribe();
    }


}