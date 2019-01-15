import { Component, OnInit, OnDestroy} from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { map, catchError } from "rxjs/operators"
import { EventService } from "../services/event.service";
import { Observable, pipe, throwError, Subscription } from "rxjs";
@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
	apiUrl = "https://quiet-wave-29045.herokuapp.com";
	events : any; 
	filterForm: FormGroup;
	subscription : Subscription;
	constructor(
		private http: HttpClient,
		private eventService: EventService,
		private formBuilder: FormBuilder,

		){}
	ngOnInit() {
		this.buildForm();
		this.loadEvents()
	}
	buildForm() {
        this.filterForm = this.formBuilder.group({
            limit: ['', [Validators.required]],
            page: ['', [Validators.required]]
        })
    }
    submit({ value } : { value: {limit, page}}) {
        console.log(value.limit);
        console.log("Ok");
        this.eventService.getEventsFilter(value.limit, value.page).subscribe(
			data => { 
				this.events = data.data;
		}
	);
    }
    loadEvents(){
    	this.subscription = this.eventService.getEvents().subscribe(
			data => { 
				this.events = data.data;
			}
			);
    }
    checkLogined(){
    	if(localStorage.getItem('userToken') == null)
    		return true
    	else
    		return false;
    }
    ngOnDestroy(){
    	if(this.subscription)
    		this.subscription.unsubscribe();
    }

	
}
