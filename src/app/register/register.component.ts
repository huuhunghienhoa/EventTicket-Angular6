import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ILogin } from "../shared/interface";
import { RegisterService } from "../services/register.service";
import { Router } from "@angular/router";
import { RegistrationValidator } from '../shared/register_validator';
//Auto login after register successfull
import { LoginService } from "../services/login.service";

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    res: any;
    errs: string[] = [];
    mess: string;

    constructor(
        private formBuilder: FormBuilder,
        private registerService: RegisterService,
        private loginService: LoginService,
        private router: Router
    ){}
    
    ngOnInit() {
      this.buildForm()
    }

    buildForm() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmpassword: ['', [Validators.required]],
        }, {
      validator: RegistrationValidator.MatchPassword 
    })
    }

    submit({ value } : { value: ILogin }) {
        this.registerService.postregister(value).subscribe(res => {
            this.res = res;
            console.log(this.res)
            if(this.res.status == 'USERNAME_EXISTED') {
               this.mess = "USERNAME EXISTED";
               this.errs = [];
            }
            if(this.res.status == 'SUCCESS'){
                this.loginService.postLogin(value).subscribe(res => {
                    localStorage.setItem('userToken', this.res.data)
                    this.router.navigate(['/'])
                });
            }
            if(this.res.status == 'VALIDATION_ERROR'){
                this.errs = this.res.validations;
                this.mess = "";
            }
        })
    }
}