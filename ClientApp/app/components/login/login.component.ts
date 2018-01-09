
import { Component } from '@angular/core';
import { LoginService } from '../../_services/login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent {
    data:any;
    submit:Function;
    constructor(login:LoginService) {
        this.data = login.data;
        this.submit = login.loginSubmit;
    }

}
