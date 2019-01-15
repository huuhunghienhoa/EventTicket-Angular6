import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: 'app-logout',
    template: ''
})
export class LogoutComponent {
    constructor(
        private router: Router
    ){}
  ngOnInit() {
  	if(localStorage.getItem('userToken') != null)
 	  localStorage.removeItem('userToken')
 	if(localStorage.getItem('userAdmin') != null)
 	  localStorage.removeItem('userAdmin')
    this.router.navigate(['/login'])
}
}
