import { Injectable } from "@angular/core";
import { ILogin } from "../shared/interface";
import { Observable, pipe, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators"

@Injectable()
export class RegisterService {
   apiUrl = "https://quiet-wave-29045.herokuapp.com";

   constructor(
       private http: HttpClient
   ){}

   postregister(userregister: ILogin) : Observable<boolean> {

       return this.http.post<boolean>(this.apiUrl+'/register', userregister)
          .pipe(
              map(response => {
                return response
              })
          )
   }

   handleError(error: HttpErrorResponse) {
      return throwError(error.error)
   }
}