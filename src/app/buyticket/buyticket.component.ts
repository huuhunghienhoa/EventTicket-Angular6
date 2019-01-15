import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ITicket } from "../shared/iticket";
import { EventService } from "../services/event.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: 'app-buy-ticket',
	templateUrl: 'buyticket.component.html',
	styleUrls: ['buyticket.component.css']
})
export class BuyTicketComponent implements OnInit {
	buyticketForm: FormGroup;
	res: any;
	errs: string[] = [];
	mess: string;
	@Input() event_id: string;

	constructor(
		private formBuilder: FormBuilder,
		private eventService: EventService,
		private router: Router,
		private route: ActivatedRoute
		){}

	ngOnInit() {
		this.buildForm()
	}

	buildForm() {
		this.buyticketForm = this.formBuilder.group({
			quantity: ['', [Validators.required, Validators.min(1)]],
			card_type:['', [Validators.required]],
			card_number:['', [Validators.required]],
			card_expiration:['', [Validators.required]],
			cvc_code: ['', [Validators.required]]

		})
	}

	submit({ value } : { value: ITicket }) {
		//const allParams = this.route.snapshot.params;
        //console.log(allParams.id);
		this.eventService.buyTicket(value, this.event_id).subscribe(res => {
			console.log(res);
			if(res.status == 'SUCCESS') {
				console.log("Mua thanh cong");
				this.mess= 'SUCCESS!';
				this.errs = [];
			}
			if(res.status == 'VALIDATION_ERROR') {
				console.log("Loi validate");
				this.errs = res.validations

            }
            if (res.status == 'NOT_TIME_BUY_TICKET') {
            	console.log("NOT_TIME_BUY_TICKET");
            	this.mess= 'NOT_TIME_BUY_TICKET'
            	this.errs = [];
            }
            if (res.status == 'TICKET_SOLD_OUT') {
            	console.log("NOT_TIME_BUY_TICKET");
            	this.mess= 'NOT_TIME_BUY_TICKET';
            	this.errs = [];
            }
        })
	}
}