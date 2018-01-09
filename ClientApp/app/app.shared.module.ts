//Modules
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import {AlertModule, 
//AccordionModule,
//ButtonsModule,
//CarouselModule,
//CollapseModule,
//BsDatepickerModule,
BsDropdownModule,
//ModalModule,
//PaginationModule,
//ProgressbarModule,
//SortableModule,
//TabsModule,
//TimepickerModule,
//TooltipModule,
//TypeaheadModule
} from 'ngx-bootstrap';
//App Component
import { AppComponent } from './components/app/app.component';
//Page Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AssessComponent } from './components/assess/assess.component';
import { ClientsComponent } from './components/clients/clients.component';
//Components
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { DynamicFormComponent } from './components/_dynamic-form/dynamic-form.component';
import { AssessmentTableComponent } from './components/_assessment-table/assessment-table.component';
import { AlertsComponent } from './components/_alerts/alerts.component';
import { NotificationComponent } from './components/_notification/notification.component';
import { RecentAccessedComponent } from './components/_recent-accessed/recent-accessed.component';
//Services
import { ClientAssessmentService } from "./_services/client.assessment.service";
import { AuthService } from './_services/auth.service';
import { LoginService } from './_services/login.service';
import { NotificationService } from './_services/notification.service';
import { AlertService } from './_services/alert.service';

//Pipes
import { FilterPipe } from "./_pipes/filter.pipe";
import { OrderByPipe } from "./_pipes/orderby.pipe";




@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LoginComponent,
        AssessComponent,
        ClientsComponent,
        DynamicFormComponent,
        AssessmentTableComponent,
        NotificationComponent,
        AlertsComponent,
        RecentAccessedComponent,
        FilterPipe,
        OrderByPipe
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule.forRoot(),
        BsDropdownModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'assess', component: AssessComponent },
            { path: 'clients', component: ClientsComponent },
            { path: 'reports', component: AssessComponent },
            { path: 'account', component: AssessComponent },
            { path: '**', redirectTo: 'home' }
        ])
        
    ],
    providers: [
        ClientAssessmentService, 
        AuthService, 
        LoginService,
        NotificationService, 
        AlertService,  
        TitleCasePipe] 
})
export class AppModuleShared {
}
