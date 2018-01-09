import { Component } from "@angular/core";
import { NotificationService } from "../../_services/notification.service";
import { AlertService } from "./../../_services/alert.service";
import { AuthService } from "../../_services/auth.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  addNewClient() {
    //this.notificationService.addNotification("Added New Client");
    this.alertService.success("New Client Added", 5000);
  }
}
