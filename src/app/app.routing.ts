import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./services/auth.service";
import { CheckLoginService } from "./services/checkLogin.service";
import { LogoutComponent } from "./logout/logout.component";
import { RegisterComponent } from "./register/register.component";
import { EventComponent } from "./admin/event/event.component";
import { AddEventComponent } from "./admin/addevent/addevent.component";
import { EditEventComponent } from "./admin/editevent/editevent.component";
import { ShowEventComponent } from "./admin/showevent/show.component";
import { BuyTicketComponent } from "./buyticket/buyticket.component";
import { AdminService } from './services/admin.service';
import {ChatComponent} from './chat/chat.component';



export const APP_ROUTER : Routes = [
   { path: '', component: HomeComponent },
   { path: 'admin', component: ProfileComponent, canActivate: [AdminService] },
   { path: 'buy-ticket/:id', component: BuyTicketComponent, canActivate: [AuthService] },
   { path: 'admin/addevent', component: AddEventComponent, canActivate: [AdminService] },
   { path: 'admin/events', component: EventComponent, canActivate: [AdminService] },
   { path: 'admin/event/:id/delete', component: EventComponent, canActivate: [AdminService] },
   { path: 'admin/event/:id/edit', component: EditEventComponent, canActivate: [AdminService] },
   { path: 'admin/event/:id', component: ShowEventComponent},
   { path: 'login', component: LoginComponent, canActivate: [CheckLoginService] },
   { path: 'logout', component: LogoutComponent, canActivate: [AuthService] },
   { path: 'register', component: RegisterComponent, canActivate: [CheckLoginService] },
   { path: 'chat', component: ChatComponent}

]

export const RoutingModule : ModuleWithProviders = RouterModule.forRoot(APP_ROUTER)