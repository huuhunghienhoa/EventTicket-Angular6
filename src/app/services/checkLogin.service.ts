import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class CheckLoginService implements CanActivate {
    constructor(
       private router: Router
    ) {}
    canActivate(): boolean {
        if (localStorage.getItem('userToken') == null)   
        return true
        this.router.navigate(['admin'])
        return false
    }
}