import { AuthService } from "../_services/auth.service";
import { Injectable } from "@angular/core";
import { Login } from "../_models/Login";
//import { NotificationService } from "./notification.service";
import { AlertService } from "./alert.service";
import { Alert } from "../_models/Alert";

@Injectable()
export class LoginService {
  data = Login;
  constructor(private auth: AuthService, private alertService: AlertService) {

  }
  loginSubmit(form: any, auth: AuthService) {
    this.auth.login(form).subscribe(
      data => {
        //notificationSrv.addNotifications('Logged in!');
          this.alertService.success("Logged in", 5000, false);
          this.alertService.error("Your inventory is low on credits", 0, true);
          this.alertService.warn("You have undistributed uses.", 0, true);
          
        console.log("logged in!");
      },
      error => {
        console.log(error);
      }
    );
  }
}
