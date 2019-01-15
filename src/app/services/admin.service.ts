import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AdminService implements CanActivate {
    constructor(
       private router: Router
    ) {}
    canActivate(): boolean {
    	if (localStorage.getItem('userToken') == null){
        this.router.navigate(['login'])
        return false
    }
        if (localStorage.getItem('userToken') != null && localStorage.getItem('userAdmin') != "ok") { 
        this.router.navigate([''])
        return false
    }
        if (localStorage.getItem('userToken') != null && localStorage.getItem('userAdmin') == "ok") {  
        return true
    }
   return false
}
}