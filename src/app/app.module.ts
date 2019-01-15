import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './app.routing';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './services/login.service';
import { AdminService } from './services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service';
import { LogoutComponent } from "./logout/logout.component";
import { AddEventComponent } from "./admin/addevent/addevent.component";
import { EventComponent } from "./admin/event/event.component";
import { CheckLoginService } from "./services/checkLogin.service";
import { EventService } from "./services/event.service";
import { EditEventComponent } from "./admin/editevent/editevent.component";
import { ShowEventComponent } from "./admin/showevent/show.component";
import { BuyTicketComponent } from "./buyticket/buyticket.component";
import { ModalComponent } from "./modal/modal.component";
import { ModalService } from "./services/modal.service";
import {ChatService} from './services/chat.service';
import {ChatComponent} from './chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AddEventComponent,
    EventComponent,
    EditEventComponent,
    ShowEventComponent,
    BuyTicketComponent,
    ModalComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ChatService, LoginService, AuthService, RegisterService, AdminService, CheckLoginService, EventService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
