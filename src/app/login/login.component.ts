import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ILogin } from "../shared/interface";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    res: any;
    err: string[] = [];
    USERNAME_PASSWORD_NOT_MATCHED: string;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ){}
    
    ngOnInit() {
      this.buildForm()
    }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    submit({ value } : { value: ILogin }) {
        this.loginService.postLogin(value).subscribe(res => {
             this.res = res;
             this.err = this.res
            var loi = "";
            if(this.res.status == 'SUCCESS') {
               localStorage.setItem('userToken', this.res.data.token)
               if(value.username == "BE.admin"){
                   localStorage.setItem('userAdmin', "ok")
                    this.router.navigate(['admin'])
                }else{
                    this.router.navigate([''])
                }
            }
            if(this.res.status == 'VALIDATION_ERROR') {
                this.err = this.res
            }
            if(this.res.status == 'USERNAME_PASSWORD_NOT_MATCHED'){
              this.USERNAME_PASSWORD_NOT_MATCHED = "USERNAME_PASSWORD_NOT_MATCHED";
              this.err = [];
            }
        })
    }
}