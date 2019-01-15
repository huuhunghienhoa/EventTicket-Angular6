import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { IEvent } from "../../shared/ievent";
import { EventService } from "../../services/event.service";

@Component({
    selector: 'app-show-event',
    templateUrl: 'show.component.html',
    styleUrls: ['show.component.css']
})
export class ShowEventComponent implements OnInit {
    eventForm: FormGroup;
    res: any;
    errs: string;
    success: string;
    currentTotal: any;
    event: any;
    ticket: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private eventService: EventService,
        private router: Router,
        private route: ActivatedRoute
        ){}
    
      ngOnInit() {
        this.buildForm();
        //console.log("Start");
        let num_ticket = 0;
        const allParams = this.route.snapshot.params;
        //console.log(allParams.id);
        this.getTotal();
        this.eventService.getEvent(allParams.id).subscribe(res => {
            if(res.status == "SUCCESS")
                this.event = res.data;
            else if(res.status == "EVENT_NOT_EXISTED")
                this.errs = "EVENT_NOT_EXISTED"
            else
                this.errs = "ERROR"
        });
    }
    getTotal() {
        const allParams = this.route.snapshot.params;
        let total = 0;
         this.eventService.getTicket(allParams.id).subscribe(res => {
           //console.log(res);
           for (let ticket of res.data) {
               total += ticket.ticket_count;
           }
           this.currentTotal = total;
           // res.data.forEach(function(ticket) {
           //  //this.ticket += ticket.ticket_count;
           //  console.log(ticket);
           //  total += ticket.ticket_count;
           //          console.log("total",total)

           // }
           // )
        })
    }
    buildForm() {
        this.eventForm = this.formBuilder.group({
            name: [''],
            description: [''],
            banner: [''],
            ticket_price: [''],
            ticket_total: [''],
            start_date: [''],
            end_date: [''],
            ticket_start_date: [''],
            ticket_end_date: ['']
        })
    }

}