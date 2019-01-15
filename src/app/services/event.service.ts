import { Injectable } from "@angular/core";
import { IEvent } from "../shared/ievent";
import { Observable, pipe, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators"

@Injectable()
export class EventService {
  apiUrl = "https://quiet-wave-29045.herokuapp.com";

  constructor(
    private http: HttpClient
    ){}

  postEvent(event: IEvent) : Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken')
      })
    };
    return this.http.post<boolean>(this.apiUrl+'/event', event, httpOptions)
    .pipe(
      map(response => {
        return response
      })
      )
  }
  editEvent(event, id) : Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken')
      })
    };
    return this.http.post<boolean>(this.apiUrl+'/event/' + id, event, httpOptions)
    .pipe(
      map(response => {
        return response
      })
      )
  }
  getEvents() {
    return this.http.get(this.apiUrl+'/events?limit=0', {responseType: 'json'});
  }
  getEventsFilter(limit, page) {
    return this.http.get(this.apiUrl+'/events?limit='+limit+'&page='+page, {responseType: 'json'});
  } 
  getEvent(id) {
    return this.http.get(this.apiUrl+'/event/'+id, {responseType: 'json'});
  }
  getTicket(event_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken')
      })
    };
    return this.http.get(this.apiUrl+'/tickets/' + event_id, httpOptions);
  }
  buyTicket(event, event_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken')
      })
    };
    return this.http.post(this.apiUrl+'/buy-ticket/' + event_id, event ,httpOptions);
  }
  deleteEvent(event) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken')
      })
    };
     return this.http.delete(this.apiUrl+'/event/' + event.id, httpOptions);
  }
}