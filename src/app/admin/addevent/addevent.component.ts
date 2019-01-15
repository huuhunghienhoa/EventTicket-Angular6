import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IEvent } from "../../shared/ievent";
import { EventService } from "../../services/event.service";

@Component({
    selector: 'app-add-event',
    templateUrl: 'addevent.component.html',
    styleUrls: ['addevent.component.css']
})
export class AddEventComponent implements OnInit {
    eventForm: FormGroup;
    res: any;
    errs: string;
    success: string;

    constructor(
        private formBuilder: FormBuilder,
        private eventService: EventService,
        private router: Router
    ){}
    
    ngOnInit() {
        this.buildForm()
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

    submit({ value } : { value: IEvent }) {

        this.eventService.postEvent(value).subscribe(res => {
            this.res = res;
            console.log(this.res);
            if(this.res.status == 'AUTHORIZATION_REQUIRED') {
              console.log(this.res)
            }
            if(this.res.status == 'VALIDATION_ERROR') {
                this.errs = this.res.validations 
            }
            if(this.res.status == 'SUCCESS') {
                this.success = "Event ( ID: " + this.res.data.event_id + " ) was created successfully!"
            }
            //this.err = loi;
        })
    }
    resetForm(){
        this.eventForm.reset();
    }
    


}