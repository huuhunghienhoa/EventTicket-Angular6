import { Injectable } from "@angular/core";
import { ILogin } from "../shared/interface";
import { Observable, pipe, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators"

@Injectable()
export class LoginService {
   apiUrl = "https://quiet-wave-29045.herokuapp.com";

   constructor(
       private http: HttpClient
   ){}

   postLogin(userLogin: ILogin) : Observable<boolean> {
        const httpOptions = {
         headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'Authorization': 'my-auth-token'
  })
};
       return this.http.post<boolean>(this.apiUrl+'/login', userLogin)
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