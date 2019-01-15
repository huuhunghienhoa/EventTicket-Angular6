import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { map, catchError } from "rxjs/operators"
import { EventService } from "../../services/event.service";
import { Observable, pipe, throwError, Subscription } from "rxjs";
import { ModalService } from '../../services/modal.service';
@Component({
	selector: 'app-event',
	templateUrl: 'event.component.html',
	styleUrls: ['event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
	apiUrl = "https://quiet-wave-29045.herokuapp.com";
	events : any;
	bodyText: string;
	event: any;
	subscription: Subscription;
	constructor(
		private http: HttpClient,
		private eventService: EventService,
		private modalService: ModalService
		){}
	ngOnInit() {
		this.getEvents();
		this.bodyText = 'This text can be updated in modal 1';
	}
	 openModal(id: string) {
        this.modalService.open(id);
    }
 
    closeModal(id: string) {
        this.modalService.close(id);
    }
	getEvents() {
		this.subscription = this.eventService.getEvents().subscribe(
			data => { 
				this.events = data.data;
			}
			);
	}
	editEvent(event){
		console.log("Edited!"+event.name);
	}
	deleteEvent(event) {
		if (confirm("Are you sure you want to delete " + event.name + "?")) {
			console.log("Bat dau xoa");
			this.eventService.deleteEvent(event).subscribe(
				data => {
           // refresh the list
           console.log(data);
           if(data.status == "SUCCESS")
           	this.getEvents(); 
           console.log("Xoa xong!");
       },
       error => {
       	console.error("Error deleting event!");
       	return Observable.throw(error);
       }
       );
		}
	} 
	showbuyTicket(event){
      this.event = event;
      console.log(event);
	}
	ngOnDestroy(){
      if(this.subscription)
      	this.subscription.unsubscribe();
	}
}
